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

