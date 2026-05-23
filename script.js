const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.querySelectorAll(".slide-track").forEach((track) => {
  [...track.children].forEach((child) => track.appendChild(child.cloneNode(true)));
});

document.querySelectorAll(".faq-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.contains("open");

    document.querySelectorAll(".faq-item.open").forEach((openItem) => {
      openItem.classList.remove("open");
      openItem.querySelector(".faq-btn").setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

const videoStart = document.getElementById("videoStart");
const youtubeFrame = document.getElementById("youtubeFrame");
const videoCover = document.getElementById("videoCover");

videoStart?.addEventListener("click", () => {
  youtubeFrame.src = youtubeFrame.dataset.src;
  youtubeFrame.style.display = "block";
  videoCover.style.display = "none";
  videoStart.style.display = "none";
});

document.addEventListener("mousedown", () => document.documentElement.classList.add("click"));
document.addEventListener("mouseup", () => document.documentElement.classList.remove("click"));
document.addEventListener("mouseleave", () => document.documentElement.classList.remove("click"));

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
