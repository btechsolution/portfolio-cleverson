document.addEventListener("DOMContentLoaded", () => {
  // 1. Alternador de Tema
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      const icon = themeBtn.querySelector("i");
      icon.classList.toggle("fa-sun");
      icon.classList.toggle("fa-moon");
    });
  }

  // 2. Scroll Suave
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // 3. Efeito Typewriter para "Geovani"
  const typewriterElement = document.getElementById("typewriter");
  const textToType = "Geovani";
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = textToType.substring(0, charIndex);
    typewriterElement.textContent = currentText;

    if (!isDeleting && charIndex < textToType.length) {
      charIndex++;
      setTimeout(type, 200);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(type, 100);
    } else {
      isDeleting = !isDeleting;
      setTimeout(type, isDeleting ? 1500 : 500);
    }
  }
  type();

  // 4. Ícones Flutuantes de Tech Stack
  function initFloatingIcons() {
    const hero = document.getElementById("home");
    const container = document.createElement("div");
    container.className = "floating-icons-container";
    hero.appendChild(container);

    const iconClasses = [
      "fa-js",
      "fa-node-js",
      "fa-html5",
      "fa-css3-alt",
      "fa-docker",
      "fa-database", // Database para representar Postgres
    ];

    function createIcon() {
      const icon = document.createElement("i");
      const randomClass =
        iconClasses[Math.floor(Math.random() * iconClasses.length)];

      icon.className = `fab ${randomClass} floating-icon`;
      icon.style.left = Math.random() * 100 + "vw";

      const duration = Math.random() * 12 + 8;
      icon.style.animationDuration = duration + "s";
      icon.style.fontSize = Math.random() * 1.5 + 1.5 + "rem";

      container.appendChild(icon);

      setTimeout(() => {
        icon.remove();
      }, duration * 1000);
    }

    setInterval(createIcon, 2000);
  }
  initFloatingIcons();

  // 5. Observer para Fade-in das Seções
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll(
      ".skill-card, .project-item, .about-section, .skills-section",
    )
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "0.8s ease-out";
      observer.observe(el);
    });
});
