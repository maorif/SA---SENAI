/*
LISTA DE PRODUTOS DENTRO DO CARRINHO DE COMPRA
*/
let myProductsBeingPurchased = (db.isUserLoggedIn()) ? db.getCartInfo() : {};
reloadCart();

/*
EXECUTA AS FUNÇÕES ESPECÍFICADAS SEMPRE QUE ATUALIZAR O CARRINHO
*/
function reloadCart() {
    addProductsOnTable();
    calculatesTotalPurchaseAmount();
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
        let totalTd = document.createElement('div');

        idTd.textContent = '';
        nameTd.textContent = obj.name;
        descriptionTd.textContent = obj.description;
        quantityTd.textContent = myProductsBeingPurchased[key];
        valueTd.textContent = realBR.format(obj.value);
        totalTd.textContent = realBR.format(obj.value * myProductsBeingPurchased[key]);

        accountLine.appendChild(idTd);
        accountLine.appendChild(nameTd);
        accountLine.appendChild(descriptionTd);
        accountLine.appendChild(quantityTd);
        accountLine.appendChild(valueTd);
        accountLine.appendChild(totalTd);

        createLine.classList.remove('hidden');
        createLine.appendChild(accountLine);
        accountLine.classList.add('tr-product');
        idTd.classList.add('tbody-td','tbody-td-code', 'hidden');
        nameTd.classList.add('tbody-td','tbody-td-product-name');
        descriptionTd.classList.add('tbody-td','tbody-td-product-description');
        quantityTd.classList.add('tbody-td','tbody-td-product-stock');
        valueTd.classList.add('tbody-td','tbody-td-product-value');
        totalTd.classList.add('tbody-td','tbody-td-product-value');
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

function comprar() {
    let msg = document.getElementById(`alert-message`);
    msg.classList.remove('hidden');

    if (Object.keys(myProductsBeingPurchased).length) {
        db.processShoppingCart();
        msg.classList.remove('alert-error');
        msg.classList.add('alert','alert-sucess', 'alert-show');
        msg.textContent = 'Compra finalizada com sucesso!';
        setTimeout(() => window.location.href = './my-transactions.html', 5000);
    } else {
        msg.classList.remove('alert-sucess');
        msg.classList.add('alert','alert-error', 'alert-show');
        msg.textContent = 'Seu carrinho está vazio! Adicione produtos em seu carrinho para finalizar uma compra.';
        setTimeout(() => msg.classList.add('hidden'), 5000);
    }
}