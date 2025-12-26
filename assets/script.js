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

