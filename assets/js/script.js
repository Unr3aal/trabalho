document.addEventListener('DOMContentLoaded', () => {

    const menuToggleButton = document.getElementById('mobile-menu-toggle');

    // mostra/esconde o menu e troca o ícone
    const toggleMenu = () => {
        const menuMobile = document.querySelector('.menu-mobile');
        const menuIcon = document.getElementById('mobile-menu-icon-img');
        
        const iconHamburger = 'assets/img/img_reserve/menu_white_36dp.png';
        const iconClose = 'assets/img/img_reserve/close_white_36dp.png'; // Verifique se o nome do arquivo está correto

        menuMobile.classList.toggle('open');

        if (menuMobile.classList.contains('open')) {
            menuIcon.src = iconClose;
            menuIcon.alt = "Fechar Menu";
        } else {
            menuIcon.src = iconHamburger;
            menuIcon.alt = "Abrir Menu";
        }
    };

    if (menuToggleButton) {
        menuToggleButton.addEventListener('click', toggleMenu);
    }
});


// login flutuante
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('loginModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const openModalBtnMobile = document.getElementById('openModalBtnMobile'); // Assume que este ID pode existir para mobile
    const openBtns = [];
    if (openModalBtn) openBtns.push(openModalBtn);
    if (openModalBtnMobile) openBtns.push(openModalBtnMobile);

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

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const categoryButtons = document.querySelectorAll(".category-btn");
    const menuContainers = document.querySelectorAll(".menu-container");

    if (categoryButtons.length > 0 && menuContainers.length > 0) {
        categoryButtons[0].classList.add("active");
        menuContainers[0].classList.add("active");

        categoryButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                const targetId = button.getAttribute("data-target");

                categoryButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                menuContainers.forEach(container => {
                    container.classList.remove("active");
                });

                const targetContainer = document.getElementById(targetId);
                if (targetContainer) {
                    targetContainer.classList.add("active");
                }
            });
        });
    }
});

// caarrinho de compras
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItemIndex = cart.findIndex(item => item.name === productName);

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        // adiciona um novo item com quantidade 1 e o preço
        cart.push({ name: productName, quantity: 1, price: productPrice });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`"${productName}" adicionado ao carrinho!`);
    if (document.getElementById('cartItemsContainer')) {
        renderCartItems();
    }
}


// puxa os itens do carrinho na página shopcar.html e calcula totais
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const subtotalSpan = document.getElementById('subtotal');
    const totalSpan = document.getElementById('total');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
    } else {
        cart.forEach((item, index) => {
            // garante que o item tenha um preço
            const itemPrice = item.price || 32.90; // ALTERA PREÇO

            subtotal += itemPrice * item.quantity;

            const itemHTML = `
                <div class="item-carrinho" data-product-name="${item.name}" data-product-price="${itemPrice.toFixed(2)}">
                    <img src="https://via.placeholder.com/90" alt="Imagem da Pizza" class="item-imagem">
                    <div class="item-detalhes">
                        <h3>${item.name}</h3>
                        <p>Meio a meio</p>
                        <a href="#" class="ver-promocao">Ver itens da promoção <span class="seta-baixo">&#9660;</span></a>
                    </div>
                    <div class="item-controles">
                        <a href="#" class="editar-item">Editar</a>
                        <div class="seletor-quantidade">
                            <button class="btn-qtd btn-decrease" onclick="updateQuantity(${index}, -1)">-</button>
                            <span class="quantidade">${item.quantity}</span>
                            <button class="btn-qtd btn-increase" onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.innerHTML += itemHTML;
        });
    }

    // atualiza subtotal e total
    subtotalSpan.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    totalSpan.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
}

// adiciona ou remove quantidade de um item no carrinho
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }
}

// limpa todos os itens do carrinho
function clearCart() {
    localStorage.removeItem('cart');
    renderCartItems();
}

// função para redirecionar ao pagamento (TALVEZ NÃO TENHA, APENAS ILUSTRATIVO)
function goToPayment() {
    alert("Redirecionando para pagamento...");
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('cartItemsContainer')) {
        renderCartItems();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#loginModal form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const identificador = loginForm.querySelector('#identificador').value;
        const senha = loginForm.querySelector('#senha').value;

        const usuariosCadastrados = JSON.parse(localStorage.getItem('usuariosCadastrados')) || [];

        const usuarioEncontrado = usuariosCadastrados.find(
            user => (user.login === identificador || user.email === identificador)
        );

        // valida o usuário e a senha
        if (usuarioEncontrado && usuarioEncontrado.senha === senha) {
            // SUCESSO NO LOGIN
            // salva a sessão ativa
            localStorage.setItem('sessaoAtiva', JSON.stringify({ login: usuarioEncontrado.login }));
            
            alert(`Bem-vindo(a) de volta, ${usuarioEncontrado.nome}!`);
            window.location.reload();

        } else {
            // FALHA NO LOGIN
            alert('Usuário, e-mail ou senha incorretos. Tente novamente.');
        }
    });
});