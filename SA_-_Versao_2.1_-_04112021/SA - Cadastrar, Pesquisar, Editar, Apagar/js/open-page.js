let openedMenuBar = false;
let openedShoppingBar = false;
let openedAccountMenu = false;
let openedProductMenu = false;

function sideGeneralMenu() {
    if (openedMenuBar == false) {
        let generalMenuBar = document.getElementById('general-menu-bar');
        generalMenuBar.classList.remove('hidden');
        let shoppingCartBar = document.getElementById('shopping-cart-bar');
        shoppingCartBar.classList.add('hidden');
        return openedMenuBar = true;  
    } else {
        let generalMenuBar = document.getElementById('general-menu-bar');
        generalMenuBar.classList.add('hidden');
        return openedMenuBar = false;   
    };
};

function sideMyShoppingCart() {
    if (openedShoppingBar == false) {
        let shoppingCartBar = document.getElementById('shopping-cart-bar');
        shoppingCartBar.classList.remove('hidden');
        let generalMenuBar = document.getElementById('general-menu-bar');
        generalMenuBar.classList.add('hidden');
        return openedShoppingBar = true;  
    } else {
        let shoppingCartBar = document.getElementById('shopping-cart-bar');
        shoppingCartBar.classList.add('hidden');
        return openedShoppingBar = false;   
    };
};

function accountMenuOptions() {
    if (openedAccountMenu == false) {
        let menuRegistrationSearchAccount = document.getElementById('menu-registration-search-account');
        let menuRegistrationNewAccount = document.getElementById('menu-registration-new-account');
        let menuRegistrationEditAccount = document.getElementById('menu-registration-edit-account');
        let menuRegistrationDeleteAccount = document.getElementById('menu-registration-delete-account');
        menuRegistrationEditAccount.classList.remove('hidden');
        menuRegistrationNewAccount.classList.remove('hidden');
        menuRegistrationSearchAccount.classList.remove('hidden');
        menuRegistrationDeleteAccount.classList.remove('hidden');
        return openedAccountMenu = true;   
    } else {
        let menuRegistrationSearchAccount = document.getElementById('menu-registration-search-account');
        let menuRegistrationNewAccount = document.getElementById('menu-registration-new-account');
        let menuRegistrationEditAccount = document.getElementById('menu-registration-edit-account');
        let menuRegistrationDeleteAccount = document.getElementById('menu-registration-delete-account');
        menuRegistrationSearchAccount.classList.add('hidden');
        menuRegistrationNewAccount.classList.add('hidden');
        menuRegistrationEditAccount.classList.add('hidden');
        menuRegistrationDeleteAccount.classList.add('hidden');
        return openedAccountMenu = false;    
    };
};

function productMenuOptions() {
    if (openedProductMenu == false) {    
        let menuRegistrationSearchProduct = document.getElementById('menu-registration-search-product');
        let menuRegistrationNewProduct= document.getElementById('menu-registration-new-product');
        let menuRegistrationEditProduct = document.getElementById('menu-registration-edit-product');
        let menuRegistrationDeleteProduct = document.getElementById('menu-registration-delete-product');
        menuRegistrationEditProduct.classList.remove('hidden');
        menuRegistrationNewProduct.classList.remove('hidden');
        menuRegistrationSearchProduct.classList.remove('hidden');
        menuRegistrationDeleteProduct.classList.remove('hidden');
        return openedProductMenu = true;
    } else {    
        let menuRegistrationSearchProduct = document.getElementById('menu-registration-search-product');
        let menuRegistrationNewProduct= document.getElementById('menu-registration-new-product');
        let menuRegistrationEditProduct = document.getElementById('menu-registration-edit-product');
        let menuRegistrationDeleteProduct = document.getElementById('menu-registration-delete-product');
        menuRegistrationNewProduct.classList.add('hidden');
        menuRegistrationEditProduct.classList.add('hidden');
        menuRegistrationSearchProduct.classList.add('hidden');
        menuRegistrationDeleteProduct.classList.add('hidden');
        return openedProductMenu = false;      
    };
};

function showSearchPageToEditAccount() {
    let searchAccountEditSection = document.getElementById('search-account-edit-section');
    let accountEditSection = document.getElementById('account-edit-section');
    searchAccountEditSection.classList.remove('hidden');
    accountEditSection.classList.add('hidden');
};

function showAccountPageToEdit() {
    let searchAccountEditSection = document.getElementById('search-account-edit-section');
    let accountEditSection = document.getElementById('account-edit-section');
    searchAccountEditSection.classList.add('hidden');
    accountEditSection.classList.remove('hidden');
};

function showSearchPageToEditProduct() {
    let searchProductEditSection = document.getElementById('search-product-edit-section');
    let productEditSection = document.getElementById('product-edit-section');
    searchProductEditSection.classList.remove('hidden');
    productEditSection.classList.add('hidden');
};

function showProductPageToEdit() {
    let searchProductEditSection = document.getElementById('search-product-edit-section');
    let productEditSection = document.getElementById('product-edit-section');
    searchProductEditSection.classList.add('hidden');
    productEditSection.classList.remove('hidden');
};