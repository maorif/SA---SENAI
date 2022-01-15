let firstname = document.getElementById('firstname');
let surname = document.getElementById('surname');
let phone = document.getElementById('phone');
let email = document.getElementById('email');
let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirm-password');
let registrationError = document.getElementById('alert-message');

// Abaixo são as funções adicionar o objeto Conta em um array de objetos e validar os campos preenchidos.

function createNewAccount() {
    let inputError = '';
    let alertText = '';
    let existingAccountEmail = db.isEmailRegistered(email.value);
    
    switch (true) {
        case (firstname.value == ''):
            inputError = 'firstname';
            alertText = `O campo Nome é obrigatório e deve estar preenchido!`;
            nullInputErrorOnRegisterAccount(inputError, alertText);
            break;
        case (surname.value == ''):
            inputError = 'surname';
            alertText = `O campo Sobrenome é obrigatório e deve estar preenchido!`;
            nullInputErrorOnRegisterAccount(inputError, alertText);
            break;
        case (email.value == ''):
            inputError = 'email';
            alertText = `O campo E-mail é obrigatório e deve estar preenchido!`;
            nullInputErrorOnRegisterAccount(inputError, alertText);
            break;
        case (existingAccountEmail == true):
            inputError = 'email';
            alertText = `Este e-mail (${email.value}) já encontra-se cadastrado!`;
            emailValidationErrorOnRegisterAccount(inputError, alertText);
            break;
        case (phone.value == ''):
            inputError = 'phone';
            alertText = `O campo Telefone é obrigatório e deve estar preenchido!`;
            nullInputErrorOnRegisterAccount(inputError, alertText);
            break;
        case (password.value == ''):
            inputError = 'password';
            alertText = `O campo Senha é obrigatório e deve estar preenchido!`;
            nullInputErrorOnRegisterAccount(inputError, alertText);
            break;
        case (confirmPassword.value == ''):
            inputError = 'confirm-password';
            alertText = `O campo Repetir Senha é obrigatório e deve estar preenchido!`;
            nullInputErrorOnRegisterAccount(inputError, alertText);
            break;
        case (password.value != confirmPassword.value):
            passwordValidationErrorOnRegisterAccount();
            break;
        default:
            let fullname = `${firstname.value} ${surname.value}`;
            let inputsArr = [
                firstname.value,
                surname.value,
                email.value,
                phone.value,
                password.value
            ];
            let code = db.createNewAccount(...inputsArr);
            addNewAccountOnTable(...inputsArr, code);
            successfulAccountRegistration(fullname);
            clearInputFieldsOnScreen();
    }
}

// Abaixo é a função para limpar os campos de input.

function clearInputFieldsOnScreen() {
    firstname.value = '';
    surname.value = '';
    phone.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
}

// Abaixo é a função para apresentar a Conta cadastrada na tabela da página.

function addNewAccountOnTable(firstname, surname, email, phone, password, code) {
    let accountLine = document.createElement('div');
    let idTd = document.createElement('div');
    let nameTd = document.createElement('div');
    let emailTd = document.createElement('div');
    let phoneTd = document.createElement('div');
    let passwordTd = document.createElement('div');
    idTd.textContent = code;
    nameTd.textContent = `${firstname} ${surname}`;
    emailTd.textContent = email;
    phoneTd.textContent = phone;
    passwordTd.textContent = password;
    accountLine.appendChild(idTd);
    accountLine.appendChild(nameTd);
    accountLine.appendChild(emailTd);
    accountLine.appendChild(phoneTd);
    accountLine.appendChild(passwordTd);
    let createLine = document.querySelector('#recent-registered-account-table');
    createLine.classList.remove('hidden');
    createLine.appendChild(accountLine);
    accountLine.classList.add('tr-account');
    idTd.classList.add('tbody-td','tbody-td-code');
    nameTd.classList.add('tbody-td','tbody-td-name');
    emailTd.classList.add('tbody-td','tbody-td-email');
    phoneTd.classList.add('tbody-td','tbody-td-phone');
    passwordTd.classList.add('tbody-td','tbody-td-password');
};

// Abaixo são as funções para apresentar alertas e contornar os campos que causam erros nas validações.

function nullInputErrorOnRegisterAccount(inputError, alertText) {
    let param1 = document.getElementById(`firstname`);
    let param2 = document.getElementById(`surname`);
    let param3 = document.getElementById(`email`);
    let param4 = document.getElementById(`phone`);
    let param5 = document.getElementById(`password`);
    let param6 = document.getElementById(`confirm-password`);
    let param7 = document.getElementById(`${inputError}`);
    let param8 = document.getElementById('alert-message');
    
    param1.classList.remove('input-error');
    param2.classList.remove('input-error');
    param3.classList.remove('input-error');
    param4.classList.remove('input-error');
    param5.classList.remove('input-error');
    param6.classList.remove('input-error');   
    
    param7.classList.add('input-error');
    
    param8.classList.remove('hidden');
    param8.classList.remove('alert-sucess');
    param8.classList.add('alert','alert-error', 'alert-show');
    param8.textContent = `${alertText}`;

    setTimeout(function(){ 
        let element = document.getElementById(`alert-message`);
        element.classList.add('hidden'); }, 5000); 
};

function emailValidationErrorOnRegisterAccount(inputError, alertText) {
    let param1 = document.getElementById(`email`);
    let param2 = document.getElementById(`password`);
    let param3 = document.getElementById(`confirm-password`);
    let param4 = document.getElementById(`${inputError}`);
    let param5 = document.getElementById('alert-message');
    
    param1.classList.remove('input-error'); 
    param2.classList.remove('input-error');   
    param3.classList.remove('input-error');   
    
    param4.classList.add('input-error');
    
    param5.classList.remove('hidden');
    param5.classList.remove('alert-sucess');
    param5.classList.add('alert','alert-error', 'alert-show');
    param5.textContent = `${alertText}`;

    setTimeout(function(){ 
        let element = document.getElementById(`alert-message`);
        element.classList.add('hidden'); }, 5000); 
};

function passwordValidationErrorOnRegisterAccount() {
    let param1 = document.getElementById(`email`);
    let param2 = document.getElementById(`password`);
    let param3 = document.getElementById(`confirm-password`);
    let param4 = document.getElementById(`alert-message`);
    
    param1.classList.remove('input-error'); 
    param2.classList.remove('input-error');   
    param3.classList.remove('input-error');  

    param2.classList.add('input-error');
    param3.classList.add('input-error');   

    param4.classList.remove('hidden');
    param4.classList.remove('alert-sucess');
    param4.classList.add('alert','alert-error', 'alert-show');             
    param4.textContent = 'As senhas estão diferentes. Digite o mesmo valor em ambos os campos!';

    setTimeout(function(){ 
        let element = document.getElementById(`alert-message`);
        element.classList.add('hidden'); }, 5000);
};

// Abaixo é a função para apresentar a mensagem de sucesso ao cadastrar a Conta.

function successfulAccountRegistration(fullname) {
    let param1 = document.getElementById(`firstname`);
    let param2 = document.getElementById(`surname`);
    let param3 = document.getElementById(`email`);
    let param4 = document.getElementById(`phone`);
    let param5 = document.getElementById(`password`);
    let param6 = document.getElementById(`confirm-password`);
    let param7 = document.getElementById('alert-message');

    param1.classList.remove('input-error');
    param2.classList.remove('input-error');
    param3.classList.remove('input-error');
    param4.classList.remove('input-error');
    param5.classList.remove('input-error');
    param6.classList.remove('input-error');

    param7.classList.remove('hidden');
    param7.classList.remove('alert-error');
    param7.classList.add('alert','alert-sucess', 'alert-show');             
    param7.textContent = `Conta de ${fullname} foi cadastrada com sucesso!`;
    
    setTimeout(function(){ 
        let element = document.getElementById(`alert-message`);
        element.classList.add('hidden'); 
        window.location.href = 'login.html'    
        }, 5000);
};

function addAndRemovePasswordMask() {
    let passwordInput = document.getElementById("password");
    let confirmPasswordInput = document.getElementById("confirm-password");
    
    let eyeIcon = document.querySelectorAll('.eye-icon');
    eyeIcon.forEach(function (icon) {
        if (passwordInput.type === "password" || confirmPasswordInput.type === "password") {
            icon.classList.add('fa-eye-slash');
            icon.classList.remove('fa-eye');
        } else {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } 
    });
    
    if (passwordInput.type === "password" || confirmPasswordInput.type === "password") {
        passwordInput.type = "text";
        confirmPasswordInput.type = "text";
    } else {
        passwordInput.type = "password";
        confirmPasswordInput.type = "password"
    } 
};