/*
    Por enquanto ficou meio quebra-galho: todo o conteudo dentro de strings passadas ao innerHTML dos containers
    é chato de editar mas está concentrado num lugar só o que facilita alteracoes posteriores
*/
let flagUser = db.isUserLoggedIn();
let flagAdmin = db.isUserAdmin();
let cart = document.getElementById('shopping-cart-bar');
let username = '';
let divLogout = '';
let divCartBtn = '';

if (flagUser) {
    username = db.getMyAccountInfo().firstname;
    divLogout = '<button class="icon" id="end-section-button" type="button" title="Sair" onclick="logout(); return false"><i class="fa fa-times-circle" aria-hidden="true"></i></button>';
}

if (cart && flagUser) {
    divCartBtn = `
        <div class="product-counter-and-shopping-cart-container" onclick="sideMyShoppingCart(); return false">
            <div class="product-counter-container-in-shopping-cart hidden">
                <p class="number-of-product-counter-in-shopping-cart"></p>
            </div>
            <button class="icon" id="my-shopping-cart" type="button" title="Compras"><i class="fa fa-shopping-cart shopping-cart-icon" aria-hidden="true"></i></button>
        </div>
    `;

    cart.innerHTML = `
        <div class="table-container-shopping-cart">
            <div>
                <h2>meu carrinho</h2> 
            </div>
            <div id="my-shopping-products-table" class="table hidden">
                <div id="registration-line" class="thead tr">
                    <div>
                    </div>
                    <div class="thead-td thead-td-shopping-cart-name">
                        nome
                    </div>
                    <div class="thead-td thead-td-shopping-cart-value">
                        valor
                    </div>
                </div>
            </div>
            <div class="row">
                <p class="cart-title">total</p>
                <p id="shopping-cart-total-price">R$ 0,00</p>
            </div>
            <div class="align-center width100">
                <button class="cart-button" onclick="cartPurchase()">comprar</button>
            </div>
        </div>    
    </div>
`;
}

document.getElementById('hdr').innerHTML = `
    <div class="row header-img-container">
        <button class="icon" id="menu-button" type="button" title="Menu" onclick="sideGeneralMenu(); return false"><i class="fa fa-bars menu-icon" aria-hidden="true"></i></button>
        <a href="./main-page.html">
            <img src="img/logo-header.png" alt="logo">
        </a>
    </div>
    <div class="header-button-container">
        ${username}
        <button class="icon" id="my-account-data-button" type="button" title="Meus Dados" onclick="myAccountData(); return false"><i class="fa fa-user" aria-hidden="true"></i></button>
        ${divCartBtn}
        ${divLogout}
    </div>
`;

let sideAdmin = `
    <a id="menu-main-page" href="main-page.html" class="link-text"><button class="menu-button hidden" type="button">tela de início</button></a>
    <a id="" href="cart-purchase.html" class="link-text"><button class="menu-button hidden" type="button">meu carrinho</button></a>
    <button id="menu-registration-account" class="menu-button menu-header" type="button" onclick="accountMenuOptions(); return false">conta<i class="fa fa-chevron-circle-up up-down-icon1" aria-hidden="true"></i></button>
    <a id="menu-registration-search-account" href="search-account.html" class="link-text"><button class="menu-button hidden" type="button">buscar</button></a>
    <a id="menu-registration-new-account" href="register-account.html" class="link-text"><button class="menu-button hidden" type="button">novo</button></a>
    <a id="menu-registration-edit-account" href="edit-account.html" class="link-text"><button class="menu-button hidden" type="button">editar/excluir</button></a>
    <a id="menu-registration-transactions" href="my-transactions.html" class="link-text"><button class="menu-button hidden" type="button">minhas transações</button></a>
    <button id="menu-registration-product" class="menu-button menu-header" type="button" onclick="productMenuOptions(); return false">produto<i class="fa fa-chevron-circle-up up-down-icon2" aria-hidden="true"></i></button>
    <a id="menu-registration-search-product" href="search-product.html" class="link-text"><button class="menu-button hidden" type="button">buscar</button></a>
    <a id="menu-registration-new-product" href="register-product.html" class="link-text"><button class="menu-button hidden" type="button" onclick="">novo</button></a>
    <a id="menu-registration-edit-product" href="edit-product.html" class="link-text"><button class="menu-button hidden" type="button" onclick="">editar/excluir</button></a>
`;

let sideUser = `
    <a id="menu-main-page" href="main-page.html" class="link-text"><button class="menu-button hidden" type="button">tela de início</button></a>
    <a id="" href="cart-purchase.html" class="link-text"><button class="menu-button hidden" type="button">meu carrinho</button></a>
    <button id="menu-registration-account" class="menu-button menu-header" type="button" onclick="accountMenuOptions(); return false">conta<i class="fa fa-chevron-circle-up up-down-icon1" aria-hidden="true"></i></button>
    <a id="menu-registration-new-account" href="register-account.html" class="link-text"><button class="menu-button hidden" type="button">novo</button></a>
    <a id="menu-registration-edit-account" href="my-account-data.html" class="link-text"><button class="menu-button hidden" type="button">editar/excluir</button></a>
    <a id="menu-registration-transactions" href="my-transactions.html" class="link-text"><button class="menu-button hidden" type="button">minhas transações</button></a>
    <button id="menu-registration-product" class="menu-button menu-header" type="button" onclick="productMenuOptions(); return false">produto<i class="fa fa-chevron-circle-up up-down-icon2" aria-hidden="true"></i></button>
    <a id="menu-registration-search-product" href="search-product.html" class="link-text"><button class="menu-button hidden" type="button">buscar</button></a>
    <a id="menu-registration-new-product" href="register-product.html" class="link-text"><button class="menu-button hidden" type="button" onclick="">novo</button></a>
`;

let sideOff = `
    <a id="menu-main-page" href="main-page.html" class="link-text"><button class="menu-button hidden" type="button">tela de início</button></a>
    <button id="menu-registration-account" class="menu-button menu-header" type="button" onclick="accountMenuOptions(); return false">conta<i class="fa fa-chevron-circle-up up-down-icon1" aria-hidden="true"></i></button>
    <a id="menu-registration-new-account" href="register-account.html" class="link-text"><button class="menu-button hidden" type="button">novo</button></a>
    <button id="menu-registration-product" class="menu-button menu-header" type="button" onclick="productMenuOptions(); return false">produto<i class="fa fa-chevron-circle-up up-down-icon2" aria-hidden="true"></i></button>
    <a id="menu-registration-search-product" href="search-product.html" class="link-text"><button class="menu-button hidden" type="button">buscar</button></a>
`;

document.getElementById('general-menu-bar').innerHTML = (flagUser) ? (flagAdmin) ? sideAdmin : sideUser : sideOff;

document.getElementById('ftr').innerHTML = `
<div class="row width100">
    <div class="footer-column align-center">
        <img src="img/logo-footer.png" alt="logo">
    </div>
    <div class="footer-column">
        <p class="footer-topics">Seja um vendedor:</p>
        <p class="footer-text"><a href="register-account.html">Cadastre-se</a></p>
    </div>
    <div class="footer-column">
        <p class="footer-topics">Trabalhe conosco:</p>
        <p class="footer-icon"><a href="mailto:cv@mercadotech.com"><i class="fa fa-envelope" aria-hidden="true"></i></a></p>
        <p class="footer-icon"><a href="tel:+48999951728"><i class="fa fa-phone-square" aria-hidden="true"></i></a></p>
    </div>
    <div class="footer-column">
        <p class="footer-topics">Páginas:</p>
        <p class="footer-icon"><a href="https://play.google.com/store/"><i class="fa fa-android" aria-hidden="true"></i></a></p>
        <p class="footer-icon"><a href="https://www.apple.com/br/app-store/"><i class="fa fa-apple" aria-hidden="true"></i></a></p>
        <p class="footer-icon"><a href="https://www.linkedin.com/"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a></p>
    </div>
    <div class="footer-column">
        <p class="footer-topics">Nosso endereço:</p>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3537.4692422883536!2d-48.49999868498831!3d-27.54794388285825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9527475e01a8efef%3A0x5b0f13adab8483ec!2sSENAI%20Florian%C3%B3polis%20(CTAI)!5e0!3m2!1spt-BR!2sbr!4v1635451740192!5m2!1spt-BR!2sbr" width="100%" height="100" style="border:0; border-radius: 6px;" allowfullscreen="" loading="lazy"></iframe>
    </div>
</div>
<div class="footer-column">
    <p class="creator-rights">Todos os direitos reservados @MercadoTech 2021</p>
</div>
`;

/*
**  FUNÇÃO DE CONVERSÃO DA STRING EM MOEDA
*/
let realBR = Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
});

/*
**  Logout limpando os dados armazenados e redirecionando para o login
*/
function logout() {
    db.requestLogout();
    window.location.href = "./login.html";
};

/*
**  Testa se existe usuario logado para passar para os dados cadastrais, senao vai pro login
*/
function myAccountData() {
    let page = (db.isUserLoggedIn()) ? "./my-account-data.html" : "./login.html";
    window.location.href = page;
};

function cartPurchase() {
    window.location.href = './cart-purchase.html';
}