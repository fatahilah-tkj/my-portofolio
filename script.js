document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. LOGIKA BUKA/TUTUP HAMBURGER MENU (MOBILE)
  // ==========================================
  const menuToggle = document.getElementById('mobile-menu');
  const navOverlay = document.getElementById('nav-overlay');
  const closeMenu = document.getElementById('close-menu');
  const overlayLinks = document.querySelectorAll('.overlay-links a');

  if (menuToggle && navOverlay) {
    menuToggle.addEventListener('click', () => {
      navOverlay.classList.add('open');
    });
  }

  if (closeMenu && navOverlay) {
    closeMenu.addEventListener('click', () => {
      navOverlay.classList.remove('open');
    });
  }

  overlayLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && navOverlay) {
        navOverlay.classList.remove('open');
      }
    });
  });

  // ==========================================
  // 2. LOGIKA SMART HIDDEN NAVBAR ON SCROLL (DENGAN THROTTLE + RAF)
  // ==========================================
  let lastScrollTop = 0;
  let ticking = false;
  const navbar = document.getElementById('main-nav');

  if (navbar) {
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(() => {
          let currentScroll = window.scrollY;
          
          if (currentScroll > lastScrollTop && currentScroll > 100) {
            navbar.classList.add('nav-hidden');
          } else {
            navbar.classList.remove('nav-hidden');
          }
          
          lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ==========================================
  // 3. LOGIKA POP-UP MODAL (ON-DEMAND LAZY LOADING)
  // ==========================================
  const modal = document.getElementById("certModal");
  const modalImg = document.getElementById("modalImg");
  const closeModal = document.getElementById("closeModal");

  if (modal && modalImg && closeModal) {
    document.querySelectorAll(".btn-transkrip").forEach(button => {
      button.addEventListener("click", function() {
        const targetImageSrc = this.getAttribute("data-fullimg");
        modalImg.src = targetImageSrc;
        modal.classList.add("show");
      });
    });

    closeModal.addEventListener("click", () => {
      modal.classList.remove("show");
      setTimeout(() => { modalImg.src = ""; }, 300); 
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
        setTimeout(() => { modalImg.src = ""; }, 300);
      }
    });
  }
});