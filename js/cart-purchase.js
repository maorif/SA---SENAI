/*
LISTA DE PRODUTOS DENTRO DO CARRINHO DE COMPRA
*/
let myProductsBeingPurchased = (db.isUserLoggedIn()) ? db.getCartInfo() : {};
reloadCart();

/*
EXECUTA AS FUNÇÕES ESPECÍFICADAS SEMPRE QUE ATUALIZAR O CARRINHO
*/
function reloadCart() {
    //db.updateMyAccountInfo();
    //removeLinesFromPurchaseTable();
    addProductsOnTable();
    calculatesTotalPurchaseAmount();
    //countTheNumberOfProductsInTheShoppingCart();
}

function addProductsOnTable() {
    Object.keys(myProductsBeingPurchased).forEach((key) => {
        let obj = db.getProductByCode(key);
        let createLine = document.getElementById('my-product-table');
        let accountLine = document.createElement('div');
        let idTd = document.createElement('div');
        let nameTd = document.createElement('div');
        let quantityTd = document.createElement('div');
        let descriptionTd = document.createElement('div');
        let valueTd = document.createElement('div');

        idTd.textContent = '';
        nameTd.textContent = obj.name;
        descriptionTd.textContent = obj.description;
        quantityTd.textContent = myProductsBeingPurchased[key];
        valueTd.textContent = realBR.format(obj.value);

        accountLine.appendChild(idTd);
        accountLine.appendChild(nameTd);
        accountLine.appendChild(descriptionTd);
        accountLine.appendChild(quantityTd);
        accountLine.appendChild(valueTd);

        createLine.classList.remove('hidden');
        createLine.appendChild(accountLine);
        accountLine.classList.add('tr-product');
        idTd.classList.add('tbody-td','tbody-td-code', 'hidden');
        nameTd.classList.add('tbody-td','tbody-td-product-name');
        descriptionTd.classList.add('tbody-td','tbody-td-product-description');
        quantityTd.classList.add('tbody-td','tbody-td-product-stock');
        valueTd.classList.add('tbody-td','tbody-td-product-value');
    });
}

function calculatesTotalPurchaseAmount() {
    let total = 0;
    Object.keys(myProductsBeingPurchased).forEach((key) => {
        total += db.getProductValue(key) * myProductsBeingPurchased[key];
    });
    let totalPurchaseAmount = document.getElementById('shopping-cart-total-price');
    totalPurchaseAmount.textContent = realBR.format(total);
}

/*
function removeProductFromShoppingCart(code) {
    delete myProductsBeingPurchased[code];
    reloadCart();
}

function removeLinesFromPurchaseTable() {
        tableLineFromShoppingCart = document.querySelectorAll('.container-with-product-data-inside-table');
        tableLineFromShoppingCart.forEach(function (line) {
            shoppingCartTableElement = document.getElementById('my-shopping-products-table');
            shoppingCartTableElement.removeChild(line);
        });
};


function changeQuantityOfProductBeingPurchasedForMore(code) {
    myProductsBeingPurchased[code]++;
    reloadCart();
}

function changeQuantityOfProductBeingPurchasedForLess(code) {
    myProductsBeingPurchased[code]--;
    if (myProductsBeingPurchased[code] < 1) removeProductFromShoppingCart(code);
    else reloadCart();
}

function countTheNumberOfProductsInTheShoppingCart() {
    let productCounterContainerInShoppingCart = document.querySelector('.product-counter-container-in-shopping-cart');
    let numberOfProductCounterInTheShoppingCart = document.querySelector('.number-of-product-counter-in-shopping-cart');
    let len = Object.keys(myProductsBeingPurchased).length;
    if (len > 0) {
        productCounterContainerInShoppingCart.classList.remove('hidden');
        numberOfProductCounterInTheShoppingCart.textContent = len;
    } else {
        productCounterContainerInShoppingCart.classList.add('hidden');
    }
}
*/