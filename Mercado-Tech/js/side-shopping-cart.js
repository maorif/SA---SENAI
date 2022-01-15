/*
LISTA DE PRODUTOS DENTRO DO CARRINHO DE COMPRA
*/
let myProductsBeingPurchased;
if (db.isUserLoggedIn()) {
    myProductsBeingPurchased = db.getCartInfo();
    reloadCart();
}

/*
EXECUTA AS FUNÇÕES ESPECÍFICADAS SEMPRE QUE ATUALIZAR O CARRINHO
*/
function reloadCart() {
    db.updateMyAccountInfo();
    removeLinesFromPurchaseTable();
    chargeLinesOnPurchaseTable();
    calculatesTotalPurchaseAmount();
    countTheNumberOfProductsInTheShoppingCart();
}

/*
FUNÇÃO PARA CARREGAR NA TABELA AS LINHAS COM O CONTEÚDO DE CADA PRODUTO
*/
function chargeLinesOnPurchaseTable() {
    Object.keys(myProductsBeingPurchased).forEach((key) => {
        let productContainer = document.createElement('div');
        let productLine = document.createElement('div');
        let codeTd = document.createElement('div');
        let nameTd = document.createElement('div');
        let valueTd = document.createElement('div');

        let [name, value] = db.getProductNameValue(key);
        codeTd.textContent = key;
        nameTd.textContent = name;
        valueTd.textContent = realBR.format(value);

        productLine.appendChild(codeTd);
        productLine.appendChild(nameTd);
        productLine.appendChild(valueTd);        
        let createLine = document.querySelector('#my-shopping-products-table');
        createLine.classList.remove('hidden');
        productContainer.classList.add('container-with-product-data-inside-table');
        
        createLine.appendChild(productContainer);
        productContainer.appendChild(productLine);

        productLine.classList.add('tr-product', 'table-line-from-shopping-cart');
        nameTd.classList.add('tbody-td');
        valueTd.classList.add('tbody-td','tbody-td-shopping-cart-value');
        codeTd.classList.add('tbody-td', 'shopping-cart-product-code', 'hidden');
        
        let deleteTd = document.createElement('div')
        deleteTd.innerHTML = `
        <button class="tbody-td-shopping-cart-delete" onclick="removeProductFromShoppingCart(${key})">
            <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
        <button class="tbody-td-shopping-cart-more-less" onclick="changeQuantityOfProductBeingPurchasedForMore(${key})">
            <i class="fa fa-plus" aria-hidden="true"></i>
        </button>
        <p class="count-shopping-cart-product-quantity">${myProductsBeingPurchased[key]}</p>
        <button class="tbody-td-shopping-cart-more-less" onclick="changeQuantityOfProductBeingPurchasedForLess(${key})">
            <i class="fa fa-minus" aria-hidden="true"></i>
        </button>
        `;
        deleteTd.classList.add('table-line-from-shopping-cart','row', 'tbody-td-shopping-cart-delete', 'align-center');
        productContainer.appendChild(deleteTd);
    });
}

/*
CALCULANDO O VALOR TOTAL DA COMPRA
1. Declara a variável total, inicializando-a zerada;
2. Percorre o array e passa o elemento dentro da função;
3. Calcula o valor vezes a quantidade atribuída ao objeto e incrementa o total;
4. Coleta o elemento que contém a identificação especificada;
5. Altera o conteúdo de texto do elemento já passando a função de conversão para moeda;
*/
function calculatesTotalPurchaseAmount() {
    let total = 0;
    Object.keys(myProductsBeingPurchased).forEach((key) => {
        total += db.getProductValue(key) * myProductsBeingPurchased[key];
    });
    let totalPurchaseAmount = document.getElementById('shopping-cart-total-price');
    totalPurchaseAmount.textContent = realBR.format(total);
}

/*
REMOVENDO DO OBJETO E DA TABELA O ELEMENTO DELETADO ATRAVÉS DO BOTÃO
1. Recebe o codigo do produto como parametro e deleta a property do objeto;
2. Recarrega o carrinho;
*/
function removeProductFromShoppingCart(code) {
    delete myProductsBeingPurchased[code];
    reloadCart();
}

/*
REMOVENDO AS LINHAS DE PRODUTO EXISTENTES NA TABELA
1. Coleta os elementos que contém a classe especificada e retorna um array;
2. Percorre o array e passa o elemento dentro da função;
3. Coleta o elemento que contém a identificação especificada;
4. Executa função para remover cada um dos filhos (com a classe) do elemento supracitado;
*/
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