const header = document.querySelector(".header");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

menuToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
  menuToggle.textContent = open ? "×" : "☰";
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-link")];

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id));
    }
  });
}, {rootMargin: "-35% 0px -55% 0px"});

sections.forEach(section => observer.observe(section));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    document.querySelectorAll(".project").forEach(project => {
      const show = filter === "all" || project.dataset.category === filter;
      project.classList.toggle("hidden", !show);
    });
  });
});

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("formMessage");

  message.textContent = `Thanks${name ? ", " + name : ""}! The form is ready — connect it to your email service before publishing.`;
  e.target.reset();
});

document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener("click", e => e.preventDefault());
});
