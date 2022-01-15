let myTransactions = db.getMyTransactions();

myTransactions.seller.forEach(code => addTransactionOnTable(code, 'my-seller-table'));
myTransactions.buyer.forEach(code => addTransactionOnTable(code, 'my-buyer-table'));


function addTransactionOnTable(code, tableId) {
    let obj = db.getTransactionByCode(code);
    let accountLine = document.createElement('div');
    let nameTd = document.createElement('div');
    let quantityTd = document.createElement('div');
    let descriptionTd = document.createElement('div');
    let valueTd = document.createElement('div');
    let totalTd = document.createElement('div');

    nameTd.textContent = obj.product.name;
    descriptionTd.textContent = obj.product.description;
    quantityTd.textContent = obj.quantity;
    valueTd.textContent = realBR.format(obj.product.value);
    totalTd.textContent = realBR.format(obj.product.value * obj.quantity);

    accountLine.appendChild(nameTd);
    accountLine.appendChild(descriptionTd);
    accountLine.appendChild(quantityTd);
    accountLine.appendChild(valueTd);
    accountLine.appendChild(totalTd);

    let createLine = document.getElementById(tableId);
    createLine.classList.remove('hidden');
    createLine.appendChild(accountLine);
    accountLine.classList.add('tr-product');
    nameTd.classList.add('tbody-td','tbody-td-product-name');
    descriptionTd.classList.add('tbody-td','tbody-td-product-description');
    quantityTd.classList.add('tbody-td','tbody-td-product-stock');
    valueTd.classList.add('tbody-td','tbody-td-product-value');
    totalTd.classList.add('tbody-td','tbody-td-product-value');
}