document.addEventListener('DOMContentLoaded', () => {
    
    if (typeof updateCartIcon === 'function') {
        updateCartIcon();
    }

    const sessaoAtivaString = localStorage.getItem('sessaoAtiva');
    
    if (!sessaoAtivaString) return;

    const sessaoAtiva = JSON.parse(sessaoAtivaString);
    const usuariosCadastrados = JSON.parse(localStorage.getItem('usuariosCadastrados')) || [];
    
    const usuarioLogado = usuariosCadastrados.find(user => user.login === sessaoAtiva.login);

    if (!usuarioLogado) {
        localStorage.removeItem('sessaoAtiva');
        return;
    }
    
    // --- modal de login/conta ---

    const openModalBtn = document.getElementById('openModalBtn');
    const openModalBtnMobile = document.getElementById('openModalBtnMobile');
    const loginModal = document.getElementById('loginModal');
    
    if (!openModalBtn || !loginModal) return;

    const handleAccountClick = () => {
        const modalContent = loginModal.querySelector('.modal-content');
        
        const primeiroNome = usuarioLogado.nome.split(' ')[0];

        // altera o modal para o modo "logado"
        modalContent.innerHTML = `
            <img src="assets/img/img_reserve/close_black_36dp.png" alt="Fechar" class="close-btn">
            <h2>Sua Conta</h2>
            <div class="user-info-modal">
                <p>Bem-vindo(a) de volta,</p>
                <h3>${primeiroNome}</h3> 
                <button id="logoutBtn" class="login-submit">Sair</button>
            </div>
        `;

        // funcionalidade de logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            localStorage.removeItem('sessaoAtiva');
            alert('Você foi desconectado.');
            window.location.reload();
        });

        loginModal.classList.remove('hidden');
    };

    openModalBtn.addEventListener('click', handleAccountClick);
    if(openModalBtnMobile) openModalBtnMobile.addEventListener('click', handleAccountClick);

    loginModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-btn') || e.target === loginModal) {
            loginModal.classList.add('hidden');
        }
    });
});