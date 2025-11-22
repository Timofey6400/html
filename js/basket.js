// Безопасный и объединённый скрипт
document.addEventListener("DOMContentLoaded", () => {
  // --- Search (защищённо) ---
  const searchBtn = document.getElementById("searchBtn");
  const searchBox = document.getElementById("searchBox");
  const safeSearch = () => {
    if (typeof search === "function") {
      search();
    } else {
      console.warn("Функция search() не определена.");
    }
  };
  if (searchBtn) searchBtn.addEventListener("click", safeSearch);
  if (searchBox) searchBox.addEventListener("keydown", e => {
    if (e.key === "Enter") safeSearch();
  });

  // --- Theme menu ---
  const toggleBtn = document.getElementById("theme-toggle");
  const menu = document.getElementById("theme-menu");
  const darkBtn = document.getElementById("theme-toggle-dark");
  const lightBtn = document.getElementById("theme-toggle-light");

  if (toggleBtn && menu) {
    // начальное состояние (если хотите скрыть)
    menu.hidden = menu.hasAttribute("hidden") || true;

    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.hidden = !menu.hidden;
      // для доступности
      toggleBtn.setAttribute("aria-expanded", String(!menu.hidden));
    });

    // клик по документу закрывает
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && e.target !== toggleBtn) {
        menu.hidden = true;
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    });

    // Esc закрывает
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        menu.hidden = true;
        toggleBtn?.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (darkBtn) {
    darkBtn.addEventListener("click", () => {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
      if (menu) menu.hidden = true;
    });
  }

  if (lightBtn) {
    lightBtn.addEventListener("click", () => {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
      if (menu) menu.hidden = true;
    });
  }

  // --- Catalog popup ---
  const catalogBtn = document.getElementById("catalog-btn");
  const catalogDiv = document.getElementById("catalog");
  if (catalogBtn && catalogDiv) {
    catalogBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      catalogDiv.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!catalogDiv.contains(e.target) && e.target !== catalogBtn) {
        catalogDiv.classList.remove("show");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") catalogDiv.classList.remove("show");
    });
  }
});