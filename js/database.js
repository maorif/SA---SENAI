
/**
 * Classe para concentração da lógica de operação com localStorage
 */

class Database {

    // declaracao dos private fields    
    #accounts;
    #sessionUserCode;
    #sessionUser;
    #products;
    #transactions;
    #sessionProductCode;

    // inicialização com leitura do localStorage ou valores default
    constructor() {

        this.#accounts = JSON.parse(localStorage.getItem('accounts')) || this.#getDefaultUsersObj();
        this.#products = JSON.parse(localStorage.getItem('products')) || this.#getDefaultProductsObj();
        this.#transactions = JSON.parse(localStorage.getItem('transactions')) || {};
        this.#sessionUserCode = JSON.parse(localStorage.getItem('sessionUserCode')) || 'off';
        this.#sessionProductCode = JSON.parse(localStorage.getItem('sessionProductCode')) || 'off';
        this.#storeAccounts();
        this.#storeProducts();
        this.#storeTransactions();
        this.#storeSessionUserCode();
        this.#storeSessionProductCode();

        this.#sessionUser = (this.#sessionUserCode === 'off') ? false : this.#accounts[this.#sessionUserCode];
    }

    // check do usuário logado para controle de fluxo e lógica (método público)
    isUserLoggedIn() {
        return (this.#sessionUser) ? true : false;
    }

    // check do admin logado para controle de fluxo e lógica
    isUserAdmin() {
        return (this.#sessionUserCode === 9999) ? true : false;
    }

    // retorna usuário admin, por enquanto para testes, depois terá funcionalidades a mais
    #getDefaultUsersObj() {
        let admin = {
            code: 9999,
            firstname: '',
            surname: '',
            email: 'admin',
            phone: '',
            password: 'admin',
            cpf: '',
            nationality: '',
            address: {
                postalCode: '',
                street: '',
                district: '',
                city: ''
            },
            card: {
                holderName: '',
                number: '',
                expire: '',
                cvv: ''
            },
            myProducts: [222],
            cartInfo: {111: 1, 333: 1}
        };
        return {9999: admin};
    }

    // produtos para teste de listagem no main-page
    #getDefaultProductsObj() {
        return {
            111: {
                active: true,
                code: 111,
                name: 'Uva',
                quantity: 1,
                description: 'Uva com semente',
                datetime: 0,
                value: 250,
                seller: 55
            },
            222: {
                active: true,
                code: 222,
                name: 'Maçã',
                quantity: 3,
                description: 'Maçã argentina',
                datetime: 0,
                value: 100,
                seller: 9999
            },
            333: {
                active: true,
                code: 333,
                name: 'Açaí',
                quantity: 1,
                description: 'Açaí doce',
                datetime: 0,
                value: 350,
                seller: 159
            }
        };
    }

    /**
     * Armazenamento dos dados sempre que algo for criado, deletado ou atualizado
     */

    #storeAccounts() {
        localStorage.setItem('accounts', JSON.stringify(this.#accounts));
        return;
    }

    #storeSessionUserCode() {
        localStorage.setItem('sessionUserCode', JSON.stringify(this.#sessionUserCode));
        return;
    }

    #storeProducts() {
        localStorage.setItem('products', JSON.stringify(this.#products));
        return;
    }

    #storeSessionProductCode() {
        localStorage.setItem('sessionProductCode', JSON.stringify(this.#sessionProductCode));
        return;
    }

    #storeTransactions() {
        localStorage.setItem('transactions', JSON.stringify(this.#transactions));
        return;
    }

    // geração dos códigos únicos
    #returnNewCode(targetObj) {
        let isExistingCode = true;
        let newCode = 0;
        do {
            newCode = Math.floor(Math.random() * 10000);
            isExistingCode = (targetObj[newCode]) ? true : false;
        } while (isExistingCode || newCode === 0)

        return newCode;
    }

    // criação de conta, retorna o código
    createNewAccount(firstname, surname, email, phone, password) {
        console.log(firstname, surname, email, phone, password);
        let code = this.#returnNewCode(this.#accounts);
        let obj = {
            code: code,
            firstname: firstname,
            surname: surname,
            email: email,
            phone: phone,
            password: password,
            cpf: '',
            nationality: '',
            address: {
                postalCode: '',
                street: '',
                district: '',
                city: ''
            },
            card: {
                holderName: '',
                number: '',
                expire: '',
                cvv: ''
            },
            myProducts: [],
            cartInfo: {}
        };
        this.#accounts[code] = obj;
        this.#storeAccounts();
        return code;
    }

    // criação de produto, retorna o código
    createNewProduct(name, quantity, description, value) {
        let code = this.#returnNewCode(this.#products);
        let obj = {
            code: code,
            name: name,
            quantity: quantity,
            active: true,
            description: description,
            datetime: 0,
            value: value,
            seller: this.#sessionUser.code
        };
        this.#products[code] = obj;
        this.#storeProducts();
        this.#sessionUser.myProducts.push(code);
        this.#storeAccounts();
        return code;
    }

    // operações de carrinho pendente
    addProductToCart(productCode) {
        let cartObj = this.#sessionUser.cartInfo;
        if(cartObj == undefined){
            return false;
        }
        if (cartObj[productCode]) cartObj[productCode]++;
        else cartObj[productCode] = 1;
        return true;
    }

    processShoppingCart() {
        let cartObj = this.#sessionUser.cartInfo;
        for (const key in cartObj) {
            this.createNewTransaction(this.#products[key], cart[key]);
        }
        return;
    }

    setSessionProductCode(code) {
        this.#sessionProductCode = code;
        this.#storeSessionProductCode();
        return;
    }

    // transações sem utilização por enquanto
    createNewTransaction(product, quantity) {
        let code = this.#returnNewCode(this.#transactions);
        let obj = {
            code: code,
            seller: seller,
            buyer: buyer,
            product: product,
            quantity: quantity,
            datetime: 0
        }
        this.#transactions[code] = obj;
        this.#storeTransactions();
        return code;
    }

    // check de email usado na criação de conta e esqueci minha senha
    isEmailRegistered(email) {
        return (this.getAccountByEmail(email)) ? true : false;
    }

    // login de usuário retorna mensagens: ok, erro de email ou erro de password (processados no front-end)
    requestAuthLogin(email, password) {
        let acc = this.getAccountByEmail(email);
        if (acc) {
            if (acc.password === password) {
                this.#sessionUser = acc;
                this.#sessionUserCode = acc.code;
                this.#storeSessionUserCode();
                return 'ok';
            }
            else return 'password';
        }
        else return 'email';
    }

    // limpa os dados de usuário
    requestLogout() {
        this.#sessionUser = false;
        this.#sessionUserCode = 'off';
        this.#storeSessionUserCode();
        return;
    }

    // todas as contas (uso do ADMIN)
    getAccounts() {
        return Object.values(this.#accounts);
    }

    // retorna os dados do usuário
    getMyAccountInfo() {
        return this.#sessionUser;
    }

    // retorna os dados do carrinho do usuário
    getCartInfo() {
        let user = this.#sessionUser;
        return (user) ? user.cartInfo : false;
    }

    // é chamado pra armazenar o update no localStorage
    updateMyAccountInfo() {
        this.#storeAccounts();
        return;
    }

    updateMyProduct() {
        this.#storeProducts();
        return;
    }

    deleteProduct(code) {
        delete this.#products[code];
        this.#sessionProductCode = 'off';
        let arr = this.#sessionUser.myProducts;
        console.log(arr);
        arr.splice(arr.indexOf(code), 1);
        console.log(arr);
        this.#storeAccounts();
        this.#storeProducts();
        this.#storeSessionProductCode();
        return;
    }

    // retorna info de um usuário (uso do ADMIN)
    getAccountByCode(code) {
        return this.#accounts[code];
    }

    // auxiliar para check de email ou uso do ADMIN
    getAccountByEmail(email) {
        return Object.values(this.#accounts).find(obj => obj.email === email);
    }

    getProductNameValue(code) {
        let p = this.#products[code];
        return [p.name, p.value];
    }

    getProductValue(code) {
        return this.#products[code].value;
    }

    // utilizado na pagina de detalhe do produto
    getProductByCode(code) {
        return this.#products[code];
    }

    getSessionProduct() {
        return this.getProductByCode(this.#sessionProductCode);
    }

    // retorna os produtos de um usuário
    getProductsByUser(code, inactive = false) {
        let codes = this.#accounts[code].myProducts;
        let arr = [];
        codes.forEach(code => {
            let obj = this.#products[code];
            if (obj.active || inactive) arr.push(obj);
        });
        return arr;
    }

    // retorna os produtos do usuário logado, vazio se deslogado
    getMyProducts() {
        let user = this.#sessionUser;
        return (user) ? this.getProductsByUser(user.code) : [];
    }

    // retorna todos os produtos para usuário não logado, quando logado não inclui os seus próprios produtos
    getProducts(inactive = false) {
        let user = this.#sessionUser;
        let filterCode = (user) ? user.code : 0;
        let arr = [];
        Object.values(this.#products).forEach(obj => {
            if (obj.seller !== filterCode) {
                if (obj.active || inactive) arr.push(obj);
            }
        });
        return arr;
    }

    getAllProducts(){
        return Object.values(this.#products);
    }
    // ainda não implementado
    getTransactionByCode(code) {
        return this.#transactions[code];
    }
}

let db = new Database();