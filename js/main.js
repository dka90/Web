// XQG Group — shared site behaviour

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  // Sticky header shadow on scroll
  if (header) {
    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Mobile nav toggle
  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("mobile-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("mobile-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Highlight active nav link based on current page
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current || (current === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  // Scroll reveal animation
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }

  // Footer year
  document.querySelectorAll(".current-year").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Contact form: static demo handler (no backend wired up yet)
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const success = document.getElementById("form-success");
      if (success) {
        success.classList.add("show");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
    });
  }

  initCursorFX();
});

// Animated trend-arrow cursor trail. Skipped on touch devices and when the
// user prefers reduced motion — native cursor GIFs don't animate in browsers,
// so this is a following DOM element instead.
function initCursorFX() {
  const noHover = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (noHover || reduceMotion) return;

  const el = document.createElement("img");
  el.src = "assets/cursor-arrow-120.png";
  el.alt = "";
  el.setAttribute("aria-hidden", "true");
  el.className = "cursor-fx";
  document.body.appendChild(el);

  let mouseX = -100;
  let mouseY = -100;
  let curX = mouseX;
  let curY = mouseY;
  let active = false;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!active) {
      active = true;
      el.classList.add("active");
    }
  });

  document.addEventListener("mouseleave", () => {
    active = false;
    el.classList.remove("active");
  });

  function tick() {
    curX += (mouseX - curX) * 0.18;
    curY += (mouseY - curY) * 0.18;
    el.style.transform = `translate(${curX + 16}px, ${curY - 40}px) rotate(-8deg)`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
