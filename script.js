document.addEventListener("DOMContentLoaded", () => {
  // 1. Alternador de Tema
  const themeBtn = document.getElementById("theme-toggle");
  const icon = themeBtn?.querySelector("i");

  // Função para aplicar o tema, trocar ícone e salvar preferência
  const applyTheme = (theme) => {
    if (theme === "light") {
      document.body.classList.add("light-mode");
      icon?.classList.replace("fa-moon", "fa-sun");
    } else {
      document.body.classList.remove("light-mode");
      icon?.classList.replace("fa-sun", "fa-moon");
    }
    localStorage.setItem("theme", theme);
  };

  // Lógica de Inicialização: LocalStorage ou Preferência do Dispositivo
  const savedTheme = localStorage.getItem("theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (prefersLight) {
    applyTheme("light");
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isLight = document.body.classList.contains("light-mode");
      applyTheme(isLight ? "dark" : "light");
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
    if (!typewriterElement) return;
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
    if (!hero) return;
    
    const container = document.createElement("div");
    container.className = "floating-icons-container";
    hero.appendChild(container);

    const iconClasses = [
      "fa-js",
      "fa-node-js",
      "fa-html5",
      "fa-css3-alt",
      "fa-docker",
      "fa-database",
    ];

    function createIcon() {
      const iconEl = document.createElement("i");
      const randomClass = iconClasses[Math.floor(Math.random() * iconClasses.length)];

      iconEl.className = `fab ${randomClass} floating-icon`;
      iconEl.style.left = Math.random() * 100 + "vw";

      const duration = Math.random() * 12 + 8;
      iconEl.style.animationDuration = duration + "s";
      iconEl.style.fontSize = Math.random() * 1.5 + 1.5 + "rem";

      container.appendChild(iconEl);

      setTimeout(() => {
        iconEl.remove();
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