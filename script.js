const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const projects = Array.from(document.querySelectorAll("[data-project]"));
const prevButton = document.querySelector("[data-carousel-prev]");
const nextButton = document.querySelector("[data-carousel-next]");
const dotsContainer = document.querySelector(".dots");
const navLinks = Array.from(document.querySelectorAll(".nav a"));

let activeProject = 0;
let dots = [];

function showProject(index) {
  activeProject = (index + projects.length) % projects.length;
  projects.forEach((project, projectIndex) => {
    project.classList.toggle("active", projectIndex === activeProject);
  });
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === activeProject);
  });
}

function setActiveNav() {
  const current = [...document.querySelectorAll("main section")]
    .filter((section) => section.getBoundingClientRect().top < 180)
    .at(-1);

  navLinks.forEach((link) => {
    link.classList.toggle("active", current && link.getAttribute("href") === `#${current.id}`);
  });
}

if (dotsContainer) {
  dots = projects.map((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show project ${index + 1}`);
    dot.addEventListener("click", () => showProject(index));
    dotsContainer.append(dot);
    return dot;
  });
}

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

prevButton?.addEventListener("click", () => showProject(activeProject - 1));
nextButton?.addEventListener("click", () => showProject(activeProject + 1));
window.addEventListener("scroll", setActiveNav, { passive: true });

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showProject(activeProject - 1);
  if (event.key === "ArrowRight") showProject(activeProject + 1);
});

showProject(0);
setActiveNav();
