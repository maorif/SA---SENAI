let myProducts = db.getMyProducts();
let allProducts = db.getProducts();

if (myProducts.length) {
    myProducts.forEach(obj => addNewProductOnTable(obj, true));
} else document.getElementById('my-product-container').style.display = 'none';

allProducts.forEach(obj => addNewProductOnTable(obj));

function addNewProductOnTable(obj, mine = false) {
    let tableId = '';
    let accountLine = document.createElement('div');
    let idTd = document.createElement('div');
    let nameTd = document.createElement('div');
    let quantityTd = document.createElement('div');
    let descriptionTd = document.createElement('div');
    let valueTd = document.createElement('div');
    let buttonTd = document.createElement('div');
    let buttonGeneral = document.createElement('button');
    let buttonDetails = document.createElement('button');

    idTd.textContent = '';
    nameTd.textContent = obj.name;
    descriptionTd.textContent = obj.description;
    quantityTd.textContent = obj.quantity;
    valueTd.textContent = realBR.format(obj.value);

    if (mine) {
        tableId = 'my-product-table';
        buttonGeneral.textContent = 'Editar';
        buttonGeneral.onclick = function() {
            db.setSessionProductCode(obj.code);
            window.location.href = './my-product-data.html';
        };

        accountLine.appendChild(idTd);
        accountLine.appendChild(nameTd);
        accountLine.appendChild(descriptionTd);
        accountLine.appendChild(quantityTd);
        accountLine.appendChild(valueTd);
        accountLine.appendChild(buttonTd);
        buttonTd.appendChild(buttonGeneral);

    } else {
        tableId = 'all-registered-product-table';
        buttonGeneral.textContent = 'Comprar';
        buttonGeneral.onclick = function() {
            db.addProductToCart(obj.code);
            reloadCart();
        };

        //botão detalhes do produto (apenas na lista de ofertas)
        buttonDetails.textContent = 'Detalhes';
        buttonDetails.onclick = function() {
            db.setSessionProductCode(obj.code);
            window.location.href = './product-detail.html';
        }

        accountLine.appendChild(idTd);
        accountLine.appendChild(nameTd);
        accountLine.appendChild(descriptionTd);
        accountLine.appendChild(quantityTd);
        accountLine.appendChild(valueTd);
        accountLine.appendChild(buttonTd);
        buttonTd.appendChild(buttonGeneral);
        buttonTd.appendChild(buttonDetails);
    }

    

    let createLine = document.getElementById(tableId);
    createLine.classList.remove('hidden');
    createLine.appendChild(accountLine);
    accountLine.classList.add('tr-product');
    idTd.classList.add('tbody-td','tbody-td-code', 'hidden');
    nameTd.classList.add('tbody-td','tbody-td-product-name');
    descriptionTd.classList.add('tbody-td','tbody-td-product-description');
    quantityTd.classList.add('tbody-td','tbody-td-product-stock');
    valueTd.classList.add('tbody-td','tbody-td-product-value');
    buttonTd.classList.add('tbody-td','tbody-td-product-buttons');
    buttonGeneral.classList.add('tbody-button');
    buttonDetails.classList.add('tbody-button');
}