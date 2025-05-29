//menu mobile//
function menuShow() {
    let menuMobile = document.querySelector('.menu-mobile');
    let icon = document.querySelector('.icon');
    
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        icon.src = "assets/img/img_reserve/menu_white_36dp.png";
    } else {
        menuMobile.classList.add('open');
        icon.src = "assets/img/img_reserve/close_white_36dp.png";
    }
}

// login flutuante
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('loginModal');
  const openBtns = [document.getElementById('openModalBtn'), document.getElementById('openModalBtnMobile')];
  const closeBtn = document.querySelector('.close-btn');
  const togglePassword = document.querySelector('.toggle-password');
  const passwordInput = document.getElementById('senha');

  openBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        modal.classList.remove('hidden');
      });
    }
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });

  togglePassword.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
  });
});


// Esconder container navbar
document.addEventListener("DOMContentLoaded", () => {
  const categoryButtons = document.querySelectorAll(".category-btn");
  const menuContainers = document.querySelectorAll(".menu-container");

  categoryButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const target = button.getAttribute("data-target");

      menuContainers.forEach(container => {
        container.classList.remove("active");
      });

      const targetContainer = document.getElementById(target);
      if (targetContainer) {
        targetContainer.classList.add("active");
      }
    });
  });
})