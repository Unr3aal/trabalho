//Nav-bar responsividade//
function menuShow() {
    let menuMobile = document.querySelector('.menu-mobile');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "assets/img/menu-mobile.png";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "assets/img/close-mobile.png";
    }
}

// Login flutuante
const modal = document.getElementById("loginModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.querySelector(".modal .close");
const togglePassword = document.getElementById("togglePassword");
const senhaInput = document.getElementById("senha");

// Abrir o modal
openBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Fechar modal ao clicar no X
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Fechar modal clicando fora da caixa
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Mostrar/Ocultar senha
togglePassword.addEventListener("click", () => {
  const type = senhaInput.getAttribute("type") === "password" ? "text" : "password";
  senhaInput.setAttribute("type", type);
  togglePassword.textContent = type === "password" ? "👁" : "👁";
});

//modal//
const formSteps = document.querySelectorAll('.form-step');
        const nextBtns = document.querySelectorAll('.next-btn');
        const backBtns = document.querySelectorAll('.back-btn');
        let currentStep = 0;
      
        nextBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
              formSteps[currentStep].classList.remove('active');
              currentStep++;
              formSteps[currentStep].classList.add('active');
            }
          });
        });
      
        backBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            formSteps[currentStep].classList.remove('active');
            currentStep--;
            formSteps[currentStep].classList.add('active');
          });
        });
      
        function validateStep(step) {
          const inputs = formSteps[step].querySelectorAll('input, select');
          for (let input of inputs) {
            if (!input.checkValidity()) {
              input.reportValidity();
              return false;
            }
          }
          return true;
        }
      
        document.getElementById('multiStepForm').addEventListener('submit', function(e) {
          e.preventDefault();
          alert('Formulário enviado com sucesso!');
          this.reset();
          formSteps[currentStep].classList.remove('active');
          currentStep = 0;
          formSteps[currentStep].classList.add('active');
        });

      //SECTIOON//
      document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll(".sub-nav-list a");
    const sections = document.querySelectorAll("section");

    menuLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("data-target");

        
        sections.forEach(section => section.style.display = "none");
       
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.style.display = "block";
        }
      });
    });

    sections.forEach(section => section.style.display = "none");
    const defaultSection = document.getElementById("pizzas");
    if (defaultSection) defaultSection.style.display = "block";
  });