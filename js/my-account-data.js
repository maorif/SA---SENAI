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
} else simpleError('Você não está logado!');

function simpleError(alertText) {
    let msg = document.getElementById(`alert-message`);
    
    msg.classList.remove('hidden');
    msg.classList.remove('alert-sucess');
    msg.classList.add('alert','alert-error', 'alert-show');
    msg.textContent = `${alertText}`;

    setTimeout(() => {
        let element = document.getElementById(`alert-message`);
        element.classList.add('hidden');
        window.location.href = "./login.html";
    }, 5000);
}

function displayAccountInfo(obj) {
    accountCode.value = '';
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
    return;
}

function deleteAccount() {
    return;
}