let acc;
addAllAccountOnTable();

function searchAccountToEdit() {
    let editEmailSearch = document.getElementById('search-account-email-to-edit');
    let editCodeSearch = document.getElementById('search-account-code-to-edit');

    switch (true) {
        case (editEmailSearch.value == '' && editCodeSearch.value == ''):
            alertText = `Ao menos um dos campos abaixo deve ser preenchido!`;
            nullInputErrorOnSearchAccountToEdit(alertText);
            break;

        case (editCodeSearch != ''):
            acc = db.getAccountByCode(editCodeSearch.value);
            if (acc) {
                alertText = `Conta de ${acc.firstname} ${acc.surname} encontrada com sucesso!`;
                sucessfulSearchedAccountToEdit(alertText);
                showAccountPageToEdit();
                showAccountData();
                break;
            }

        case (editEmailSearch != ''):
            acc = db.getAccountByEmail(editEmailSearch.value);
            if (acc) {
                alertText = `Conta de ${acc.firstname} ${acc.surname} encontrada com sucesso!`;
                sucessfulSearchedAccountToEdit(alertText);
                showAccountPageToEdit();
                showAccountData();
                break;
            }

        default:
            alertText = `Nenhum usuário foi encontrado para os dados informados!`;
            notFindErrorOnSearchAccountToEdit(alertText);
            break;
    }
}

// Abaixo é a função para limpar os campos de input.

function clearInputFieldsOnScreen() {
    let editEmailSearch = document.getElementById('search-account-email-to-edit');
    let editCodeSearch = document.getElementById('search-account-code-to-edit');

    editEmailSearch.value = '';
    editCodeSearch.value = '';
};

// Abaixo são as funções para mostrar os dados de uma conta pesquisada.

function showAccountData() {
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

    accountCode.value = acc.code;
    accountCpf.value = acc.cpf;
    accountEmail.value = acc.email;
    accountFirstname.value = acc.firstname;
    accountSurname.value = acc.surname;
    accountPhone.value = acc.phone;
    accountPassword.value = acc.password;
    accountNationality.value = acc.nationality;

    accountAddressPostalCode.value = acc.address.postalCode;
    accountAddressStreet.value = acc.address.street;
    accountAddressDistrict.value = acc.address.district;
    accountAddressCity.value = acc.address.city;
    
    accountCardNumber.value = acc.card.number;
    accountCardSecurityNumber.value = acc.card.cvv;
    accountCardValidity.value = acc.card.expire;
    accountCardHolderName.value = acc.card.holderName;
}

// Abaixo são as funções para editar ou deletar uma conta.

function editAccountData() {
    let accountEmail = document.getElementById('account-email');
    let accountCpf = document.getElementById('account-cpf');
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

    let existingAccountEmail = db.isEmailRegistered(accountEmail.value);

    switch (true) {
        case (accountEmail.value == ''):
            alertText = `O campo E-mail é obrigatório e deve estar preenchido!`
            inputError = `account-email`
            nullInputErrorOnEditAccount(alertText, inputError)
            break;
        case (existingAccountEmail && accountEmail.value != acc.email):
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
            fullname = `${accountFirstname.value} ${accountSurname.value}`;

            acc.cpf = accountCpf.value;
            acc.email =  accountEmail.value;
            acc.firstname = accountFirstname.value;
            acc.surname = accountSurname.value;
            acc.phone = accountPhone.value;
            acc.password = accountPassword.value;
            acc.nationality = accountNationality.value;

            acc.address.postalCode = accountAddressPostalCode.value;
            acc.address.street =  accountAddressStreet.value;
            acc.address.district = accountAddressDistrict.value;
            acc.address.city = accountAddressCity.value;
            
            acc.card.number = accountCardNumber.value;
            acc.card.cvv = accountCardSecurityNumber.value;
            acc.card.expire = accountCardValidity.value;
            acc.card.holderName = accountCardHolderName.value;

            alertText = `Conta de ${fullname} alterada com sucesso!`;
            db.updateAccounts();
            sucessfulEditedAccount(alertText);
    }
};

function removeAccountDataInEdition() {
    let accountFirstname = document.getElementById('account-firstname');
    let accountSurname = document.getElementById('account-surname');
    fullname = `${accountFirstname.value} ${accountSurname.value}`;
    alertText = `Conta de ${fullname} excluída com sucesso!`;
    sucessfulEditedAccount(alertText);
    db.deleteAccount(acc.code);
    showSearchPageToEditAccount();
}

// Abaixo são as funções para apresentar alertas e contornar os campos que causam erros nas validações.

function nullInputErrorOnSearchAccountToEdit(alertText) {
    let param1 = document.getElementById(`search-account-code-to-edit`);
    let param2 = document.getElementById(`search-account-email-to-edit`);
    let param3 = document.getElementById(`alert-message`);
    
    param1.classList.remove('input-error');
    param2.classList.remove('input-error');  
    
    param1.classList.add('input-error');
    param2.classList.add('input-error');  
    
    param3.classList.remove('hidden');
    param3.classList.remove('alert-sucess');
    param3.classList.add('alert','alert-error', 'alert-show');
    param3.textContent = `${alertText}`;

    setTimeout(function(){ 
        let element = document.getElementById(`alert-message`);
        element.classList.add('hidden'); }, 5000); 
};

function notFindErrorOnSearchAccountToEdit(alertText) {
    let param1 = document.getElementById(`search-account-code-to-edit`);
    let param2 = document.getElementById(`search-account-email-to-edit`);
    let param3 = document.getElementById(`alert-message`);
    
    param1.classList.remove('input-error');
    param2.classList.remove('input-error');  
    
    param3.classList.remove('hidden');
    param3.classList.remove('alert-sucess');
    param3.classList.add('alert','alert-notify', 'alert-show');
    param3.textContent = `${alertText}`;

    setTimeout(function(){ 
        let element = document.getElementById(`alert-message`);
        element.classList.add('hidden'); }, 5000); 
};

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

    setTimeout(function(){ 
        let element = document.getElementById(`alert-message`);
        element.classList.add('hidden'); }, 5000); 
}

// Abaixo é a função para apresentar a mensagem de sucesso ao encontrar, alterar ou excluir uma Conta.

function sucessfulSearchedAccountToEdit(alertText) {
    let param1 = document.getElementById(`search-account-code-to-edit`);
    let param2 = document.getElementById(`search-account-email-to-edit`);
    let param3 = document.getElementById(`alert-message`);
    
    param1.classList.remove('input-error');
    param2.classList.remove('input-error');  
    
    param3.classList.remove('hidden');
    param3.classList.remove('alert-error');
    param3.classList.remove('alert-notify');
    param3.classList.add('alert','alert-sucess', 'alert-show');
    param3.textContent = `${alertText}`;

    setTimeout(function(){ 
        let element = document.getElementById(`alert-message`);
        element.classList.add('hidden'); }, 5000); 
};

function sucessfulEditedAccount(alertText) {
    
    let param1 = document.getElementById(`account-email`);
    let param2 = document.getElementById(`account-firstname`);
    let param3 = document.getElementById(`account-surname`);
    let param4 = document.getElementById(`account-phone`);
    let param5 = document.getElementById(`account-password`);
    let param6 = document.getElementById(`alert-message`);
    
    param1.classList.remove('input-error');
    param2.classList.remove('input-error'); 
    param3.classList.remove('input-error');
    param4.classList.remove('input-error');
    param5.classList.remove('input-error');
    
    param6.classList.remove('hidden');
    param6.classList.remove('alert-error');
    param6.classList.remove('alert-notify');
    param6.classList.add('alert','alert-sucess', 'alert-show');
    param6.textContent = `${alertText}`;

    setTimeout(function(){ 
        let element = document.getElementById(`alert-message`);
        element.classList.add('hidden'); }, 5000); 
};

function addAllAccountOnTable() {

    let allAcc = db.getAccounts();

    for (let i = 0; i < allAcc.length; i++) {
        let accountLine = document.createElement('div');
        let idTd = document.createElement('div');
        let nameTd = document.createElement('div');
        let emailTd = document.createElement('div');
        let phoneTd = document.createElement('div');
        let passwordTd = document.createElement('div');
        let isActive = allAcc[i].active;
        idTd.textContent = allAcc[i].code;
        nameTd.textContent = `${allAcc[i].firstname} ${allAcc[i].surname}`;
        emailTd.textContent = allAcc[i].email;
        phoneTd.textContent = allAcc[i].phone;
        passwordTd.textContent = (isActive) ? 'Ativo' : 'Desativado';
        accountLine.appendChild(idTd);
        accountLine.appendChild(nameTd);
        accountLine.appendChild(emailTd);
        accountLine.appendChild(phoneTd);
        accountLine.appendChild(passwordTd);
        let createLine = document.querySelector('#all-registered-account-table');
        createLine.classList.remove('hidden');
        createLine.appendChild(accountLine);
        accountLine.classList.add('tr-account');
        idTd.classList.add('tbody-td','tbody-td-code');
        nameTd.classList.add('tbody-td','tbody-td-name');
        emailTd.classList.add('tbody-td','tbody-td-email');
        phoneTd.classList.add('tbody-td','tbody-td-phone');
        passwordTd.classList.add('tbody-td','tbody-td-password');
    };
};

function addAndRemovePasswordMask() {
    let accountPassword = document.getElementById("account-password");
    let eyeIcon = document.querySelectorAll('.eye-icon');
    eyeIcon.forEach(function (icon) {
        if (accountPassword.type === "password") {
            icon.classList.add('fa-eye-slash');
            icon.classList.remove('fa-eye');
        } else {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } 
    });

    if (accountPassword.type === "password") {
        accountPassword.type = "text";
    } else {
        accountPassword.type = "password";
    }
};