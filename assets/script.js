document.addEventListener("scroll", () => {
  document.querySelectorAll(".navbar").forEach(navbar => {
    if (window.scrollY > 50) {
      navbar.classList.add(
        "bg-white/30",
        "backdrop-blur-sm",
        "border-white/20",
        "shadow-md"
      );
      navbar.classList.remove(
        "bg-transparent",
        "border-transparent",
        "shadow-none"
      );
    } else {
      navbar.classList.remove(
        "bg-white/30",
        "backdrop-blur-sm",
        "border-white/20",
        "shadow-md"
      );
      navbar.classList.add(
        "bg-transparent",
        "border-transparent",
        "shadow-none"
      );
    }
  });
});


function toggleMenu() {
  // Elemen garis nya
  const menu = document.getElementById('menu-items');
  const navContainer = document.getElementById('nav-container');
  const l1 = document.getElementById('line-1');
  const l2 = document.getElementById('line-2');
  const l3 = document.getElementById('line-3');

  // Jalanin toggle button nya
  menu.classList.toggle('hidden');

  // Jika navContainer transparan,beri warna saat menu buka
  navContainer.classList.toggle('bg-white');
  navContainer.classList.toggle('shadow-lg');

  // Animasi Transformasi Burger ke X
  l1.classList.toggle('rotate-90');
  l1.classList.toggle('translate-x-[-8px]'); // Geser sedikit ke kiri
  l1.classList.toggle('translate-y-[10px]'); // Sesuaikan posisi tinggi

  l2.classList.toggle('rotate-90');
  l2.classList.toggle('translate-y-[-3px]');
  // Garis tengah tetap di porosnya, hanya berputar

  l3.classList.toggle('rotate-90');
  l3.classList.toggle('translate-x-[8px]');  // Geser sedikit ke kanan
  l3.classList.toggle('translate-y-[-17px]'); // Sesuaikan posisi tinggi
}

// Tambahan: Menutup menu otomatis saat link diklik (untuk Single Page Application)
document.querySelectorAll('#menu-items a').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('menu-items');
    if (!menu.classList.contains('hidden')) {
      toggleMenu();
    }
  });
});


// Galeri Header 
const images = document.querySelectorAll('.slide-img');
let currentIndex = 0;

function showNextImage() {
  // Remove opacity from current image
  images[currentIndex].classList.replace('opacity-100', 'opacity-0');

  // Increment index (loop back to 0 at the end)
  currentIndex = (currentIndex + 1) % images.length;

  // Add opacity to next image
  images[currentIndex].classList.replace('opacity-0', 'opacity-100');
}

// Run every 5000ms (5 seconds)
setInterval(showNextImage, 5000);

// Scroll Reveal Observer
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

reveals.forEach(el => observer.observe(el));

// AI CHATBOT INTEGRATION
const toggleChat = document.getElementById("toggleChat");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const chips = document.querySelectorAll(".chat-chip");
// AUTO HIDE CHATBOT SAAT FOOTER TERLIHAT
const chatWidget = document.getElementById("toggleChat");
const footer = document.getElementById("footer");

if (chatWidget && footer) {
  const footerObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        // Footer muncul → sembunyikan chatbot
        chatWidget.classList.add("chat-hidden");

        // Optional: tutup chat window kalau lagi terbuka
        if (isChatOpen) {
          toggleChatWidget();
        }
      } else {
        // Footer hilang → tampilkan chatbot lagi
        chatWidget.classList.remove("chat-hidden");
      }
    },
    {
      threshold: 0.15, // 15% footer terlihat
    }
  );

  footerObserver.observe(footer);
}


let isChatOpen = false;

// Toggle Chat
function toggleChatWidget() {
  isChatOpen = !isChatOpen;
  if (isChatOpen) {
    chatWindow.style.display = "flex";
    // Small delay to allow display:flex to apply before opacity transition
    setTimeout(() => {
      chatWindow.classList.remove("opacity-0", "translate-y-10", "scale-95");
      chatWindow.classList.add("opacity-100", "translate-y-0", "scale-100");
      chatInput.focus();
    }, 10);
    toggleChat.classList.add("scale-0", "opacity-0");
  } else {
    chatWindow.classList.remove("opacity-100", "translate-y-0", "scale-100");
    chatWindow.classList.add("opacity-0", "translate-y-10", "scale-95");
    setTimeout(() => {
      chatWindow.style.display = "none";
    }, 300);
    toggleChat.classList.remove("scale-0", "opacity-0");
  }
}

toggleChat.addEventListener("click", toggleChatWidget);
closeChat.addEventListener("click", toggleChatWidget);

// Manual Chat Logic (Offline/Rule-Based)

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = "flex gap-3 " + (sender === "user" ? "flex-row-reverse" : "");

  const avatar = sender === "ai"
    ? `<div class="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0"><img src="./assets/image/logo.png" alt="Smilebox Logo AI" class="w-6 h-6" /></div>`
    : `<div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold shrink-0">U</div>`;

  const bubbleStyle = sender === "ai"
    ? "bg-white/10 border border-white/10 text-gray-800 backdrop-blur-sm rounded-tl-none"
    : "bg-sky-400 text-white rounded-tr-none shadow-md";

  div.innerHTML = `
            ${avatar}
            <div class="${bubbleStyle} p-3 rounded-2xl text-sm max-w-[85%] self-start leading-relaxed">
                ${text}
            </div>
        `;

  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
  const div = document.createElement("div");
  div.id = "typingIndicator";
  div.className = "flex gap-3";
  div.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0"><img src="./assets/image/logo.png" alt="Smilebox Logo AI" class="w-6 h-6" /></div>
            <div class="bg-white/10 border border-white/10 p-3 rounded-2xl rounded-tl-none backdrop-blur-sm flex gap-1 items-center h-10">
                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
            </div>
        `;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById("typingIndicator");
  if (typing) typing.remove();
}

const KNOWLEDGE_BASE = {
  "halo": "Halo! Selamat datang di Smilebox. Siap membantu kamu menemukan perawatan terbaik untuk senyumanmu.? 👋",
  "hai": "Hai! Ada yang bisa saya bantu?",
  "behel gigi": "Behel gigi membantu merapikan susunan gigi dan memperbaiki fungsi gigitan. Di Smilebox, perawatan behel disesuaikan dengan kondisi gigimu agar hasilnya rapi, nyaman, dan optimal.",
  "tips menjaga gigi": "Menjaga gigi tetap sehat itu penting, lho! Beberapa tips sederhana yang bisa kamu lakukan: Sikat gigi 2× sehari dengan pasta gigi berfluoride, Gunakan benang gigi (dental floss), Kurangi makanan dan minuman manis, Periksa gigi secara rutin setiap 6 bulan Kalau mau tips sesuai kondisi gigimu, aku siap bantu.",
  "jadwal klinik": "Untuk jadwal praktik dokter di Smilebox, kamu bisa bertanya langsung di sini...",
  "layanan smilebox": "Smilebox menyediakan berbagai layanan kesehatan gigi, antara lain: pelayanan umum, perawatan gigi, ortodontik / behel gigi, estetika & kosmetik, bedah mulut, dan pelayanan lain-lainnya. kamu cukup menuliskan kata kuncinya saja 😁 nanti saya akan menjelaskan lebih detailnya ✨.",
  "pelayanan umum": "Smilebox menyediakan pelayanan umum mulai dari konsultasi ringan sampai perawatan rutin. Kami melayani scaling (pembersihan karang gigi), rontgen gigi, hingga perawatan gigi anak dengan pendekatan yang ramah dan nyaman, supaya ke dokter gigi tidak lagi terasa menakutkan.",
  "perawatan gigi": "Gigi bermasalah? Tenang 😊 Kami menangani tambal gigi, perawatan saluran akar, crown, hingga veneer dengan teknik yang aman dan hasil yang tahan lama, agar gigimu kembali berfungsi dengan baik dan tetap nyaman digunakan.",
  "ortodontik": "Layanan ortodontik di Smilebox berfokus pada perawatan kawat gigi (behel) untuk merapikan susunan gigi. Perawatan dilakukan secara bertahap dan disesuaikan dengan kebutuhanmu, agar hasilnya rapi dan senyuman tetap sehat.",
  "estetika & kosmetik gigi": "Senyum cerah bisa meningkatkan rasa percaya diri ✨ Smilebox menyediakan layanan estetika seperti bleaching, gigi palsu, hingga implan gigi. Semua dirancang agar senyummu terlihat lebih sehat, alami, dan menawan.",
  "bedah mulut": "Untuk tindakan lanjutan, Smilebox juga melayani pencabutan gigi dan bedah mulut minor. Prosedur dilakukan secara aman, minim rasa tidak nyaman, dan ditangani oleh tenaga medis berpengalaman.",
  "layanan lainnya": "Selain layanan di klinik, kami juga menangani berbagai masalah penyakit mulut dan menyediakan layanan teledentistry. Kamu bisa berkonsultasi dengan lebih praktis tanpa harus datang langsung ke klinik.",
  "terima kasih": "Sama-sama! Semoga harimu menyenangkan. Jangan ragu bertanya lagi ya! 😊",
};

async function generateResponse(prompt) {
  // Simulate thinking delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const lowerPrompt = prompt.toLowerCase();

  // Simple keyword matching
  for (const [key, answer] of Object.entries(KNOWLEDGE_BASE)) {
    if (lowerPrompt.includes(key)) {
      return answer;
    }
  }

  // Default Fallback
  return "Maaf, saya masih belajar. Coba tanya tentang 'Behel gigi', 'estetika & kosmetik gigi', 'perawatan gigi', atau 'bedah mulut'. 😊";
}

async function handleSend(e) {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;

  // User Message
  addMessage(text, "user");
  chatInput.value = "";

  // AI Response
  showTyping();
  const aiResponse = await generateResponse(text);
  removeTyping();
  addMessage(aiResponse, "ai");
}

chatForm.addEventListener("submit", handleSend);

// Quick Chips Logic
chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chatInput.value = chip.innerText;
    handleSend({ preventDefault: () => { } });
  });
});

const openModalBtn = document.getElementById("openCertificateModal");
const closeModalBtn = document.getElementById("closeCertificateModal");
const modal = document.getElementById("certificateModal");

openModalBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});

// Klik area gelap untuk menutup modal
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
});

const swiper = new Swiper(".mySwiper", {
  grabCursor: true,

  // Konfigurasi Navigasi
  navigation: {
    nextEl: ".swiper-button-next-custom",
    prevEl: ".swiper-button-prev-custom",
  },

  // Konfigurasi Grid & Gap
  breakpoints: {
    320: {
      slidesPerView: 1.2,
      spaceBetween: 15
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30
    }
  }
});

