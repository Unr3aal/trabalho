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
        const errorMessageDiv = card.querySelector('.product-error-message');

        // Adiciona evento de clique para os botões de TAMANHO
        sizeButtons.forEach(button => {
            button.addEventListener('click', () => {
                sizeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                if (errorMessageDiv) errorMessageDiv.classList.remove('show');

                // Pega o preço e formata
                const selectedPrice = parseFloat(button.dataset.price);
                const formattedPrice = `R$ ${selectedPrice.toFixed(2).replace('.', ',')}`;
                
                // Atualiza o texto do botão COMPRAR para mostrar o preço
                if (buyButton) {
                    buyButton.textContent = formattedPrice;
                    // Guarda o texto do preço em um atributo para o efeito de hover
                    buyButton.dataset.priceText = formattedPrice; 
                }
            });
        });

        // Adiciona eventos para o botão COMPRAR
        if (buyButton) {
            
            // Evento para quando o mouse ENTRA no botão
            buyButton.addEventListener('mouseover', () => {
                // Só muda o texto para "COMPRAR" se um preço já foi definido
                if (buyButton.dataset.priceText) {
                    buyButton.textContent = 'COMPRAR';
                }
            });

            // Evento para quando o mouse SAI do botão
            buyButton.addEventListener('mouseout', () => {
                // Volta a mostrar o preço que estava guardado
                if (buyButton.dataset.priceText) {
                    buyButton.textContent = buyButton.dataset.priceText;
                }
            });
            
            // Evento de CLIQUE para adicionar ao carrinho
            buyButton.addEventListener('click', () => {
                const productName = card.querySelector('.pizza-info h3').innerText;
                const activeSizeButton = card.querySelector('.size-btn.active');

                if (activeSizeButton) {
                    const productSize = activeSizeButton.dataset.size;
                    const productPrice = parseFloat(activeSizeButton.dataset.price);
                    addToCart(productName, productSize, productPrice);
                } else {
                    // Lógica de erro estilizada que já implementamos
                    if (errorMessageDiv) {
                        errorMessageDiv.textContent = `Por favor, selecione um tamanho.`;
                        errorMessageDiv.classList.add('show');
                    }
                    const sizeSelector = card.querySelector('.size-selector');
                    if (sizeSelector) {
                        sizeSelector.classList.add('shake-error');
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