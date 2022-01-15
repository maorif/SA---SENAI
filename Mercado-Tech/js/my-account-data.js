let accountCode = document.getElementById('account-code');
let accountCpf = document.getElementById('account-cpf');
let accountEmail = document.getElementById('account-email');
let accountFirstname = document.getElementById('account-firstname');
let accountSurname = document.getElementById('account-surname');
let accountPhone = document.getElementById('account-phone');
let accountPassword = document.getElementById('account-password');
let accountNationality = document.getElementById('account-nationality');

let accountAddressPostalCode = document.getElementById('account-address-postal-code');
let accountAddressStreet = document.getElementById('account-address-street');
let accountAddressDistrict = document.getElementById('account-address-district');
let accountAddressCity = document.getElementById('account-address-city');

let accountCardNumber = document.getElementById('account-card-number');
let accountCardSecurityNumber = document.getElementById('account-card-security-number');
let accountCardValidity = document.getElementById('account-card-validity');
let accountCardHolderName = document.getElementById('account-card-holder-name');

let info = db.getMyAccountInfo();

if (info) {
    displayAccountInfo(info);
} else simpleError('Você não está logado!', './login.html');

function displayAccountInfo(obj) {
    accountCode.value = obj.code;
    accountCpf.value = obj.cpf;
    accountEmail.value = obj.email;
    accountFirstname.value = obj.firstname;
    accountSurname.value = obj.surname;
    accountPhone.value = obj.phone;
    accountPassword.value = obj.password;
    accountNationality.value = obj.nationality;

    accountAddressPostalCode.value = obj.address.postalCode;
    accountAddressStreet.value = obj.address.street;
    accountAddressDistrict.value = obj.address.district;
    accountAddressCity.value = obj.address.city;

    accountCardNumber.value = obj.card.number;
    accountCardSecurityNumber.value = obj.card.cvv;
    accountCardValidity.value = obj.card.expire;
    accountCardHolderName.value = obj.card.holderName;

    return;
}

function editAccount() {
    let obj = info;
    let existingAccountEmail = db.isEmailRegistered(accountEmail.value);

    switch (true) {
        case (accountEmail.value == ''):
            alertText = `O campo E-mail é obrigatório e deve estar preenchido!`
            inputError = `account-email`
            nullInputErrorOnEditAccount(alertText, inputError)
            break;
        case (existingAccountEmail && accountEmail.value != obj.email):
            alertText = `Este e-mail (${accountEmail.value}) já encontra-se cadastrado!`
            inputError = `account-email`
            nullInputErrorOnEditAccount(alertText, inputError)
            break;
        case (accountFirstname.value == ''):
            alertText = `O campo Nome é obrigatório e deve estar preenchido!`
            inputError = `account-firstname`
            nullInputErrorOnEditAccount(alertText, inputError)
            break;
        case (accountSurname.value == ''):
            alertText = `O campo Sobrenome é obrigatório e deve estar preenchido!`
            inputError = `account-surname`
            nullInputErrorOnEditAccount(alertText, inputError)
            break;
        case (accountPhone.value == ''):
            alertText = `O campo Telefone é obrigatório e deve estar preenchido!`
            inputError = `account-phone`
            nullInputErrorOnEditAccount(alertText, inputError)
            break;
        case (accountPassword.value == ''):
            alertText = `O campo Senha é obrigatório e deve estar preenchido!`
            inputError = `account-password`
            nullInputErrorOnEditAccount(alertText, inputError)
            break;
        default:
            obj.cpf = accountCpf.value;
            obj.email = accountEmail.value;
            obj.firstname = accountFirstname.value;
            obj.surname = accountSurname.value;
            obj.phone = accountPhone.value;
            obj.password = accountPassword.value;
            obj.nationality = accountNationality.value;

            obj.address.postalCode = accountAddressPostalCode.value;
            obj.address.street = accountAddressStreet.value;
            obj.address.district = accountAddressDistrict.value;
            obj.address.city = accountAddressCity.value;

            obj.card.number = accountCardNumber.value;
            obj.card.cvv = accountCardSecurityNumber.value;
            obj.card.expire = accountCardValidity.value;
            obj.card.holderName = accountCardHolderName.value;
            db.updateMyAccountInfo();
            simpleMsg('Seus dados foram alterados com sucesso!');
    }
    return;
}

function nullInputErrorOnEditAccount(alertText, inputError) {
    let param1 = document.getElementById(`account-email`);
    let param2 = document.getElementById(`account-firstname`);
    let param3 = document.getElementById(`account-surname`);
    let param4 = document.getElementById(`account-phone`);
    let param5 = document.getElementById(`account-password`);
    let param6 = document.getElementById(`${inputError}`);
    let param7 = document.getElementById(`alert-message`);
    
    param1.classList.remove('input-error');
    param2.classList.remove('input-error'); 
    param3.classList.remove('input-error');
    param4.classList.remove('input-error');
    param5.classList.remove('input-error');
    param6.classList.remove('input-error'); 
    
    param6.classList.add('input-error');
    
    param7.classList.remove('hidden');
    param7.classList.remove('alert-sucess');
    param7.classList.add('alert','alert-error', 'alert-show');
    param7.textContent = `${alertText}`;

    setTimeout(() => {
        let element = document.getElementById(`alert-message`);
        element.classList.add('hidden');
    }, 5000);
}

function deleteAccount() {
    db.deleteMyAccount();
    simpleMsg('Sua conta foi excluída com sucesso.', './main-page.html');
}

function simpleError(alertText, link = false) {
    let msg = document.getElementById(`alert-message`);
    
    msg.classList.remove('hidden');
    msg.classList.remove('alert-sucess');
    msg.classList.add('alert','alert-error', 'alert-show');
    msg.textContent = `${alertText}`;

    setTimeout(() => {
        let element = document.getElementById(`alert-message`);
        element.classList.add('hidden');
        if (link) window.location.href = link;
    }, 2000);
}

function simpleMsg(alertText, link = false) {
    let msg = document.getElementById(`alert-message`);
    
    msg.classList.remove('hidden');
    msg.classList.remove('alert-error');
    msg.classList.add('alert','alert-sucess', 'alert-show');
    msg.textContent = `${alertText}`;

    setTimeout(() => {
        let element = document.getElementById(`alert-message`);
        element.classList.add('hidden');
        if (link) window.location.href = link;
    }, 2000);
}

function addAndRemovePasswordMask() {
    let passwordInput = document.getElementById("account-password");
    
    let eyeIcon = document.querySelectorAll('.eye-icon');
    eyeIcon.forEach(function (icon) {
        if (passwordInput.type === "password") {
            icon.classList.add('fa-eye-slash');
            icon.classList.remove('fa-eye');
        } else {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } 
    });
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    } 
}