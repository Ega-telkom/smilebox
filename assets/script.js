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

