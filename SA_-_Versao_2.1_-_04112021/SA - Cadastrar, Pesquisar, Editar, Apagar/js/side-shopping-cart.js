let myShoppingProducts = [
    {
        name: 'Maçã',
        quantity: 3,
        value: 300,
    },
    {
        name: 'Uva',
        quantity: 1,
        value: 250,
    }

];

let realBR = Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
});

showShoppingProducts(myShoppingProducts);
showShoppingTotalPrice(myShoppingProducts);

function showShoppingProducts(myShoppingProducts) {
    myShoppingProducts.forEach(function (product) {
        
        let productLine = document.createElement('div');
        
        let deleteTd = document.createElement('div')
        let nameTd = document.createElement('div');
        let quantityTd = document.createElement('div');
        let valueTd = document.createElement('div');
        
        deleteTd.innerHTML = `
        <button class="tbody-td-shopping-cart-delete">
            <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
        <button class="tbody-td-shopping-cart-more-less">
            <i class="fa fa-sort-asc" aria-hidden="true"></i>
        </button>
        <p class="count-shopping-cart-product-quantity">${product.quantity}</p>
        <button class="tbody-td-shopping-cart-more-less">
            <i class="fa fa-caret-down" aria-hidden="true"></i>
        </button>
        `;
        nameTd.textContent = product.name;
        valueTd.textContent = realBR.format(product.value);
        
        productLine.appendChild(nameTd);
        deleteTd.appendChild(quantityTd);
        productLine.appendChild(valueTd);

        let createLine = document.querySelector('#my-shopping-products-table');
        createLine.classList.remove('hidden');
        createLine.appendChild(productLine);
        productLine.classList.add('tr-product');
        createLine.appendChild(deleteTd);

        deleteTd.classList.add('row', 'tbody-td-shopping-cart-delete', 'align-center');

        nameTd.classList.add('tbody-td');
        quantityTd.classList.add('tbody-td','tbody-td-shopping-cart-quantity');
        valueTd.classList.add('tbody-td','tbody-td-shopping-cart-value');
    });  
};

function showShoppingTotalPrice(myShoppingProducts) {
    let total = 0;
    let subtotal = 0;
    let somaValor = 0;
    
    myShoppingProducts.forEach(function (product) {
        let productValue = product.value;
        let productQuantity = product.quantity;
        subtotal = productValue * productQuantity;
        somaValor = somaValor + subtotal;
    });
    total = total + somaValor;
    let shoppingTotalPrice = document.getElementById('shopping-cart-total-price');
    shoppingTotalPrice.textContent = realBR.format(total);
}