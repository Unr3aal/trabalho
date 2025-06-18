// Função para adicionar item ao LocalStorage
function addToCart(productName, productSize, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemNameWithSize = `${productName} (${productSize})`;
    const existingItemIndex = cart.findIndex(item => item.name === itemNameWithSize);
    
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({ name: itemNameWithSize, price: productPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
    // O alert de sucesso pode ser trocado por uma notificação mais suave no futuro
    alert(`"${itemNameWithSize}" foi adicionado ao carrinho!`); 
}

// Função para atualizar o ícone do carrinho
function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTotalDesktop = document.querySelector('.cart-total');
    const cartCountDesktop = document.querySelector('.cart-count');
    const cartTotalMobile = document.querySelector('.cart-total-mobile span');
    const cartCountMobileBadge = document.querySelector('.cart-count-mobile-badge');
    const mobileCartBar = document.querySelector('.mobile-cart-bar');

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        if (item.price) {
            totalPrice += item.price * item.quantity;
        }
    });

    const formattedPrice = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;

    if (cartTotalDesktop && cartCountDesktop) {
        cartTotalDesktop.textContent = formattedPrice;
        cartCountDesktop.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'itens'}`;
    }

    if (cartTotalMobile && cartCountMobileBadge && mobileCartBar) {
        if (totalItems > 0) {
            mobileCartBar.style.display = 'block';
            cartTotalMobile.textContent = formattedPrice;
            cartCountMobileBadge.textContent = totalItems;
        } else {
            mobileCartBar.style.display = 'none';
        }
    }
}


// --- Lógica de Eventos da Página ---
document.addEventListener('DOMContentLoaded', function() {

    const productCards = document.querySelectorAll('.pizza-card');

    productCards.forEach(card => {
        const sizeButtons = card.querySelectorAll('.size-btn');
        const buyButton = card.querySelector('.buy-button');
        const errorMessageDiv = card.querySelector('.product-error-message'); // Seleciona a div de erro

        // Adiciona evento de clique para os botões de TAMANHO
        sizeButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove a classe 'active' de todos os botões de tamanho dentro deste card
                sizeButtons.forEach(btn => btn.classList.remove('active'));
                // Adiciona a classe 'active' apenas no botão clicado
                button.classList.add('active');
                // Esconde a mensagem de erro ao selecionar um tamanho
                if (errorMessageDiv) {
                    errorMessageDiv.classList.remove('show');
                }
            });
        });

        // Adiciona evento de clique para o botão COMPRAR
        if (buyButton) {
            buyButton.addEventListener('click', () => {
                const productName = card.querySelector('.pizza-info h3').innerText;
                const activeSizeButton = card.querySelector('.size-btn.active');

                if (activeSizeButton) {
                    // Se um tamanho foi selecionado, procede com a adição ao carrinho
                    const productSize = activeSizeButton.dataset.size;
                    const productPrice = parseFloat(activeSizeButton.dataset.price);
                    addToCart(productName, productSize, productPrice);
                } else {
                    // SE NENHUM TAMANHO FOI SELECIONADO:
                    // 1. Mostra a mensagem de erro estilizada
                    if (errorMessageDiv) {
                        errorMessageDiv.textContent = `Por favor, selecione um tamanho.`;
                        errorMessageDiv.classList.add('show');
                    }
                    
                    // 2. Aplica o efeito de "tremor" no seletor de tamanho
                    const sizeSelector = card.querySelector('.size-selector');
                    if (sizeSelector) {
                        sizeSelector.classList.add('shake-error');
                        // Remove a classe da animação após ela terminar
                        setTimeout(() => {
                            sizeSelector.classList.remove('shake-error');
                        }, 500); 
                    }
                }
            });
        }
    });

    // Atualiza o ícone do carrinho assim que a página carrega
    updateCartIcon();
});