let prod;

if (db.isUserAdmin()) {
    allProd = db.getAllProducts();
} else {
    allProd = db.getMyProducts();
}

addAllProductOnTable();

function searchProductToEdit() {
    let editCodeSearch = document.getElementById('search-product-code-to-edit');

    switch (true) {
        case (editCodeSearch.value == ''):
            alertText = `O campo Código é obrigatório e deve estar preenchido!`;
            nullInputErrorOnSearchProductToEdit(alertText);
            break;

        case (editCodeSearch.value != ''):
            prod = db.getProductByCode(editCodeSearch.value);
            if (prod) {
                alertText = `Produto ${prod.name} encontrado com sucesso!`;
                sucessfulSearchedProductToEdit(alertText);
                showProductPageToEdit();
                showProductData();
                break;
            }

        default:
            alertText = `Nenhum produto foi encontrado para os dados informados!`;
            notFindErrorOnSearchProductToEdit(alertText);
            break;
    }
}

// Abaixo são as funções para mostrar os dados de um produto pesquisado.

function showProductData() {
    let productCode = document.getElementById('product-code');
    let productName = document.getElementById('product-name');
    let productDescription = document.getElementById('product-description');
    let productStockQuantity = document.getElementById('product-stock-quantity');
    let productValue = document.getElementById('product-value');

    productCode.value = prod.code;
    productName.value = prod.name;
    productDescription.value = prod.description;
    productStockQuantity.value = prod.quantity;
    productValue.value = prod.value;
}

// Abaixo são as funções para editar ou deletar um produto.

function editProductData() {
    let productName = document.getElementById('product-name');
    let productStockQuantity = document.getElementById('product-stock-quantity');
    let productValue = document.getElementById('product-value');
    let productDescription = document.getElementById('product-description');

    switch (true) {
        case (productName.value == ''):
            alertText = `O campo Nome é obrigatório e deve estar preenchido!`;
            inputError = `product-name`;
            nullInputErrorOnEditProduct(alertText, inputError);
            break;
        case (productStockQuantity.value == ''):
            alertText = `O campo Quantidade é obrigatório e deve estar preenchido!`;
            inputError = `product-stock-quantity`;
            nullInputErrorOnEditProduct(alertText, inputError);
            break;
        case (productValue.value == ''):
            alertText = `O campo Valor é obrigatório e deve estar preenchido!`;
            inputError = `product-value`;
            nullInputErrorOnEditProduct(alertText, inputError);
            break;
        case (productDescription.value == ''):
            alertText = `O campo Descrição é obrigatório e deve estar preenchido!`;
            inputError = `product-description`;
            nullInputErrorOnEditProduct(alertText, inputError);
            break;
        default:
            prod.name = productName.value;
            prod.quantity = Number(productStockQuantity.value);
            prod.value = Number(productValue.value);
            prod.description = productDescription.value;
            db.updateProducts();
            alertText = `Produto ${productName.value} alterado com sucesso!`;
            sucessfulEditedProduct(alertText);
    }
}

function removeProductDataInEdition() {
    let productName = document.getElementById('product-name');
    alertText = `${productName.value} excluído com sucesso!`;
    sucessfulEditedProduct(alertText);
    db.deleteProduct(prod.code);
    showSearchPageToEditProduct();
}

// Abaixo são as funções para apresentar alertas e contornar os campos que causam erros nas validações.

function nullInputErrorOnSearchProductToEdit(alertText) {
    let param1 = document.getElementById(`search-product-code-to-edit`);
    let param3 = document.getElementById(`alert-message`);
    
    param1.classList.remove('input-error');
    
    param1.classList.add('input-error');
    
    param3.classList.remove('hidden');
    param3.classList.remove('alert-sucess');
    param3.classList.add('alert','alert-error', 'alert-show');
    param3.textContent = `${alertText}`;

    setTimeout(function(){ 
        let element = document.getElementById(`alert-message`);
        element.classList.add('hidden'); }, 5000); 
}

function notFindErrorOnSearchProductToEdit(alertText) {
    let param1 = document.getElementById(`search-product-code-to-edit`);
    let param3 = document.getElementById(`alert-message`);
    
    param1.classList.remove('input-error');
    
    param3.classList.remove('hidden');
    param3.classList.remove('alert-sucess');
    param3.classList.add('alert','alert-notify', 'alert-show');
    param3.textContent = `${alertText}`;

    setTimeout(function(){ 
        let element = document.getElementById(`alert-message`);
        element.classList.add('hidden'); }, 5000); 
}

function nullInputErrorOnEditProduct(alertText, inputError) {
    let param1 = document.getElementById(`product-name`);
    let param2 = document.getElementById(`product-description`);
    let param3 = document.getElementById(`product-stock-quantity`);
    let param4 = document.getElementById(`product-value`);
    let param6 = document.getElementById(`${inputError}`);
    let param7 = document.getElementById(`alert-message`);
    
    param1.classList.remove('input-error');
    param2.classList.remove('input-error'); 
    param3.classList.remove('input-error');
    param4.classList.remove('input-error');
    param6.classList.remove('input-error'); 
    
    param6.classList.add('input-error');
    
    param7.classList.remove('hidden');
    param7.classList.remove('alert-sucess');
    param7.classList.add('alert','alert-error', 'alert-show');
    param7.textContent = `${alertText}`;

    setTimeout(function(){ 
        let element = document.getElementById(`alert-message`);
        element.classList.add('hidden'); }, 5000); 
}

// Abaixo é a função para apresentar a mensagem de sucesso ao encontrar, alterar ou excluir um Produto.

function sucessfulSearchedProductToEdit(alertText) {
    let param1 = document.getElementById(`search-product-code-to-edit`);
    let param2 = document.getElementById(`alert-message`);
    
    param1.classList.remove('input-error'); 
    
    param2.classList.remove('hidden');
    param2.classList.remove('alert-error');
    param2.classList.remove('alert-notify');
    param2.classList.add('alert','alert-sucess', 'alert-show');
    param2.textContent = `${alertText}`;

    setTimeout(function(){ 
        let element = document.getElementById(`alert-message`);
        element.classList.add('hidden'); }, 5000); 
}

function sucessfulEditedProduct(alertText) {
    let param1 = document.getElementById(`product-name`);
    let param2 = document.getElementById(`product-description`);
    let param3 = document.getElementById(`product-stock-quantity`);
    let param4 = document.getElementById(`product-value`);
    let param6 = document.getElementById(`alert-message`);

    param1.classList.remove('input-error');
    param2.classList.remove('input-error'); 
    param3.classList.remove('input-error');
    param4.classList.remove('input-error');
    
    param6.classList.remove('hidden');
    param6.classList.remove('alert-error');
    param6.classList.remove('alert-notify');
    param6.classList.add('alert','alert-sucess', 'alert-show');
    param6.textContent = `${alertText}`;

    setTimeout(function(){ 
        let element = document.getElementById(`alert-message`);
        element.classList.add('hidden'); }, 5000); 
}

function addAllProductOnTable() {
    for (let i = 0; i < allProd.length; i++) {
        let productLine = document.createElement('div');
        let idTd = document.createElement('div');
        let nameTd = document.createElement('div');
        let descriptionTd = document.createElement('div');
        let quantityTd = document.createElement('div');
        let valueTd = document.createElement('div');
        idTd.textContent = allProd[i].code;
        nameTd.textContent = allProd[i].name;
        descriptionTd.textContent = allProd[i].description;
        quantityTd.textContent = allProd[i].quantity;
        valueTd.textContent = realBR.format(allProd[i].value);
        productLine.appendChild(idTd);
        productLine.appendChild(nameTd);
        productLine.appendChild(descriptionTd);
        productLine.appendChild(quantityTd);
        productLine.appendChild(valueTd);
        let createLine = document.querySelector('#all-registered-product-table');
        createLine.classList.remove('hidden');
        createLine.appendChild(productLine);
        productLine.classList.add('tr-product');
        idTd.classList.add('tbody-td','tbody-td-code');
        nameTd.classList.add('tbody-td','tbody-td-product-name');
        descriptionTd.classList.add('tbody-td','tbody-td-product-description');
        quantityTd.classList.add('tbody-td','tbody-td-product-stock');
        valueTd.classList.add('tbody-td','tbody-td-product-value');
    }
}