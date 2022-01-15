let productCode = document.getElementById('product-code');
let productName = document.getElementById('product-name');
let productDescription = document.getElementById('product-description');
let productStockQuantity = document.getElementById('product-stock-quantity');
let productValue = document.getElementById('product-value');
let product = db.getSessionProduct();
showProductData(product);

// Abaixo são as funções para mostrar os dados de um produto pesquisado.

function showProductData() {
    productCode.value = product.code;
    productName.value = product.name;
    productDescription.value = product.description;
    productStockQuantity.value = product.quantity;
    productValue.value = product.value;
}

// Abaixo são as funções para editar ou deletar um produto.

function editProduct() {
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
            product.name = productName.value;
            product.quantity = Number(productStockQuantity.value);
            product.value = Number(productValue.value);
            product.description = productDescription.value;
            db.updateProducts();
            alertText = `Produto ${productName.value} alterado com sucesso!`;
            sucessfulEditedProduct(alertText);
    }
}

function deleteProduct() {
    let productName = document.getElementById('product-name');
    alertText = `${productName.value} excluído com sucesso!`;
    sucessfulEditedProduct(alertText);
    db.deleteProduct(product.code);
    setTimeout(() => window.location.href = './main-page.html', 2000);
}

// Abaixo são as funções para apresentar alertas e contornar os campos que causam erros nas validações.

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

// Abaixo é a função para apresentar a mensagem de sucesso ao alterar ou excluir um Produto.

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