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

document.querySelectorAll(".slide-marquee").forEach((marquee) => {
  const scrollContainer = marquee.querySelector(".marquee-scroll-container") || marquee;
  const track = marquee.querySelector(".slide-track");
  if (!track) return;
  
  // Clone children for infinite looping
  const originalChildren = [...track.children];
  originalChildren.forEach((child) => track.appendChild(child.cloneNode(true)));
  
  let isPaused = false;
  const isReverse = track.classList.contains("reverse");
  
  // Pause on hover
  marquee.addEventListener("mouseenter", () => { isPaused = true; });
  marquee.addEventListener("mouseleave", () => { isPaused = false; });
  
  // Scroll Loop
  const scrollSpeed = 0.85;
  function scrollStepLoop() {
    if (!isPaused) {
      const limit = track.scrollWidth / 2;
      if (isReverse) {
        scrollContainer.scrollLeft -= scrollSpeed;
        if (scrollContainer.scrollLeft <= 0) {
          scrollContainer.scrollLeft = limit;
        }
      } else {
        scrollContainer.scrollLeft += scrollSpeed;
        if (scrollContainer.scrollLeft >= limit) {
          scrollContainer.scrollLeft = 0;
        }
      }
    }
    requestAnimationFrame(scrollStepLoop);
  }
  
  // Start after tiny layout calculation delay
  setTimeout(() => {
    if (isReverse) {
      scrollContainer.scrollLeft = track.scrollWidth / 2;
    }
    requestAnimationFrame(scrollStepLoop);
  }, 150);
  
  // Arrow Button Listeners
  const prevBtn = marquee.querySelector(".marquee-btn.prev");
  const nextBtn = marquee.querySelector(".marquee-btn.next");
  
  const stepAmount = isReverse ? 420 : 300;
  
  function triggerManualScroll(offset) {
    isPaused = true;
    scrollContainer.scrollBy({ left: offset, behavior: "smooth" });
    
    // Resume auto-scroll after smooth scroll finishes
    clearTimeout(marquee.resumeTimeout);
    marquee.resumeTimeout = setTimeout(() => {
      isPaused = false;
    }, 750);
  }
  
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      triggerManualScroll(-stepAmount);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      triggerManualScroll(stepAmount);
    });
  }
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
