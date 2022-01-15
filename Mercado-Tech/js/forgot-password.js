//"envia" email para recuperação de senha
function SendEmail(){
    let email = document.getElementById("email");
    let alertText = '';
    
    if (db.isEmailRegistered(email.value)) {
        alertText = `E-mail enviado com sucesso!`
        EmailSent(alertText);
    } else {
        alertText = `O e-mail (${email.value}) não está cadastrado!`
        ErrorMessage(alertText);
    }
}


//reutilizei as funções de erro do Gabriel
function ErrorMessage(alertText) {
    let param1 = document.getElementById(`email`);
    let param2 = document.getElementById('alert-message');
    

     
    param1.classList.add('input-error');
    
    param2.classList.remove('hidden');
    param2.classList.remove('alert-sucess');
    param2.classList.add('alert','alert-error', 'alert-show');
    param2.textContent = `${alertText}`;

    setTimeout(function(){ 
        let element = document.getElementById(`alert-message`);
        element.classList.add('hidden'); }, 5000); 
};

function EmailSent(alertText) {
    let param1 = document.getElementById(`email`);
    let param2 = document.getElementById('alert-message');
    
    param1.classList.remove('input-error');
    
    param2.classList.remove('hidden');
    param2.classList.remove('alert-sucess');
    param2.classList.add('alert','alert-sucess', 'alert-show');
    param2.textContent = `${alertText}`;

    setTimeout(function(){ 
        let element = document.getElementById(`alert-message`);
        element.classList.add('hidden'); 
        window.location.href = "./login.html";
    }, 5000);
};