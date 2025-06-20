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

    //botao troca modo escuro

    // botões do rodapé (desktop) e o do menu (mobile)
const themeToggleFooterBtn = document.getElementById('theme-toggle-btn');
    const themeToggleMobileBtn = document.getElementById('theme-toggle-btn-mobile');

    // Função que atualiza os ícones com base no tema
    function updateIconsForTheme() {
        const isDarkMode = document.body.classList.contains('dark-mode');

        const loginIcon = document.getElementById('login-icon-header');
        const cartIcon = document.getElementById('cart-icon-header');
        const cardapioIcon = document.getElementById('cardapio-menu-header-mobile');
        const homeIcon = document.getElementById('home-mobile-header-mobile');
        const loginmobIcon = document.getElementById('login-icon-header-mobile');
        const closeIcon = document.getElementById('close-icon-header');

        const iconPaths = {
            login: { dark: 'assets/img/account(white).png', light: 'assets/img/account.png' },
            cart: { dark: 'assets/img/cart(white).png', light: 'assets/img/cart.png' },
            cardapio: { dark: 'assets/img/ticket(white).png', light: 'assets/img/ticket.png' },
            home: { dark: 'assets/img/home(white).png', light: 'assets/img/home.png' },
            loginmob: { dark: 'assets/img/account(white).png', light: 'assets/img/account.png' },
            close: { dark: 'assets/img/img_reserve/close_white_36dp.png', light: 'assets/img/img_reserve/close_black_36dp.png' },
        };

        if (loginIcon) loginIcon.src = isDarkMode ? iconPaths.login.dark : iconPaths.login.light;
        if (cartIcon) cartIcon.src = isDarkMode ? iconPaths.cart.dark : iconPaths.cart.light;
        if (cardapioIcon) cardapioIcon.src = isDarkMode ? iconPaths.cardapio.dark : iconPaths.cardapio.light;
        if (homeIcon) homeIcon.src = isDarkMode ? iconPaths.home.dark : iconPaths.home.light;
        if (loginmobIcon) loginmobIcon.src = isDarkMode ? iconPaths.loginmob.dark : iconPaths.loginmob.light;
        if (closeIcon) closeIcon.src = isDarkMode ? iconPaths.close.dark : iconPaths.close.light;
    }

    // Função que alterna o tema e chama a atualização dos ícones
    const toggleTheme = () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.removeItem('theme');
        }
        
        updateIconsForTheme(); // Chama a função para trocar os ícones
    };

    // Adiciona o evento de clique aos botões de tema
    if (themeToggleFooterBtn) {
        themeToggleFooterBtn.addEventListener('click', toggleTheme);
    }
    if (themeToggleMobileBtn) {
        themeToggleMobileBtn.addEventListener('click', toggleTheme);
    }

    // CHAMA A FUNÇÃO DE ATUALIZAR ÍCONES AO CARREGAR A PÁGINA
    updateIconsForTheme();

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



document.addEventListener('DOMContentLoaded', () => {



    // Seleciona todos os elementos necessários para a lógica de filtros

    const filterButtons = document.querySelectorAll('.filters .filter-button');

    const productCards = document.querySelectorAll('.pizza-card');



    // Verifica se os elementos do filtro existem nesta página antes de executar

    if (filterButtons.length > 0 && productCards.length > 0) {



        // --- INÍCIO DA NOVA LÓGICA DE PREÇOS DINÂMICOS ---



        // 1. Salva os preços originais de cada tamanho ao carregar a página

        productCards.forEach(card => {

            card.querySelectorAll('.size-btn').forEach(button => {

                // Cria um novo atributo 'data-base-price' para guardar o preço original

                button.dataset.basePrice = button.dataset.price;

            });

        });



        // Adiciona a classe 'active' ao primeiro filtro ("Clássicas") por padrão

        filterButtons[0].classList.add('active');





        // 2. Adiciona um evento de clique para cada botão de filtro

        filterButtons.forEach(button => {

            button.addEventListener('click', (e) => {

                // Remove a classe 'active' de todos os filtros

                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Adiciona 'active' apenas no botão clicado

                e.currentTarget.classList.add('active');



                // Define o valor do acréscimo (10 para Premium, 0 para Clássicas)

                const surcharge = e.currentTarget.textContent.trim() === 'Premium' ? 10 : 0;



                // 3. Chama a função para atualizar o preço em todos os produtos

                updateAllProductPrices(surcharge);

            });

        });



        // Função que percorre todos os produtos e atualiza os preços

        function updateAllProductPrices(surcharge) {

            productCards.forEach(card => {

                const sizeButtons = card.querySelectorAll('.size-btn');

                const buyButton = card.querySelector('.buy-button');

               

                // Atualiza o data-price de cada botão de tamanho

                sizeButtons.forEach(sizeBtn => {

                    const basePrice = parseFloat(sizeBtn.dataset.basePrice);

                    const newPrice = basePrice + surcharge;

                    sizeBtn.dataset.price = newPrice.toFixed(2);

                });



                // 4. Se um tamanho já estiver selecionado neste card, atualiza o botão "COMPRAR"

                const activeSizeButton = card.querySelector('.size-btn.active');

                if (activeSizeButton) {

                    const newPrice = parseFloat(activeSizeButton.dataset.price);

                    const formattedPrice = `R$ ${newPrice.toFixed(2).replace('.', ',')}`;

                   

                    // Atualiza o texto do botão com base na lógica de hover que já temos

                    if (buyButton) {

                        buyButton.textContent = formattedPrice;

                        buyButton.dataset.priceText = formattedPrice;

                    }

                }

            });

        }

    }

});





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