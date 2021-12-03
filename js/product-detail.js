let product = db.getSessionProduct();
showDetails();
function showDetails(){

    document.getElementById("product-code").value = product.code;
    document.getElementById("product-name").value = product.name;
    document.getElementById("product-stock-quantity").value = product.quantity;
    document.getElementById("product-value").value = product.value;
    document.getElementById("product-description").value = product.description;

}

function buyProduct(){
    
    let productOnCart = db.addProductToCart(product.code);
    
    if(productOnCart){
        reloadCart();
        addedToCartMsg(`${product.name} adicionado ao carrinho com sucesso!`);
    }
    else{
        notLoggedInMsg('Você não está logado. Entre na sua conta para continuar comprando!');
    };
    
};

function addedToCartMsg(alertText) {
    let param4 = document.getElementById('alert-message'); 
    
    param4.classList.remove('hidden');
    param4.classList.remove('alert-sucess');
    param4.classList.add('alert','alert-sucess', 'alert-show');
    param4.textContent = `${alertText}`;

    setTimeout(function(){ 
        let element = document.getElementById(`alert-message`);
        element.classList.add('hidden'); 
        }, 5000);
};


function notLoggedInMsg(alertText) {
    let param4 = document.getElementById('alert-message'); 
    
    param4.classList.remove('hidden');
    param4.classList.remove('alert-sucess');
    param4.classList.add('alert','alert-error', 'alert-show');
    param4.textContent = `${alertText}`;

    setTimeout(function(){ 
        let element = document.getElementById(`alert-message`);
        element.classList.add('hidden'); 
        }, 5000);
};