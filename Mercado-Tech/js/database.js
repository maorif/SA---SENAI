
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
        
        this.#sessionUser = (this.#sessionUserCode === 'off') ? false : this.#accounts[this.#sessionUserCode];
        if (this.#sessionUser) {
            Object.keys(this.#sessionUser.cartInfo).forEach(key => {
                if (!this.#products[key].active) delete this.#sessionUser.cartInfo[key];
            });
        }

        this.#storeAccounts();
        this.#storeProducts();
        this.#storeTransactions();
        this.#storeSessionUserCode();
        this.#storeSessionProductCode();
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
            active: true,
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
            cartInfo: {},
            transactions: {
                buyer: [],
                seller: []
            }
        };

        let maoriAcc = {
            code: 9998,
            firstname: 'Maori',
            surname: 'Filippini',
            email: 'maorif94@gmail.com',
            phone: '(48)996071357',
            password: 'm123',
            cpf: '',
            nationality: '',
            active: true,
            address: {
                postalCode: '88032-005',
                street: 'Rod SC-401',
                district: 'Saco Grande',
                city: 'Florianópolis'
            },
            card: {
                holderName: 'Maori Filippini',
                number: '012345678910',
                expire: '2022-11',
                cvv: '012'
            },
            myProducts: [1000, 2000, 3000, 4000, 5000],
            cartInfo: {},
            transactions: {
                buyer: [],
                seller: []
            }
        };
        
        let gabrielAcc = {
            code: 9997,
            firstname: 'Gabriel',
            surname: 'Olivera',
            email: 'g.olivera1993@gmail.com',
            phone: '(48)98765-4321',
            password: 'g123',
            cpf: '',
            nationality: '',
            active: true,
            address: {
                postalCode: '88032-005',
                street: 'Rod SC-401',
                district: 'Saco Grande',
                city: 'Florianópolis'
            },
            card: {
                holderName: 'Gabriel Olivera',
                number: '012345678910',
                expire: '2022-11',
                cvv: '012'
            },
            myProducts: [6000, 7000, 8000, 9000, 1100],
            cartInfo: {},
            transactions: {
                buyer: [],
                seller: []
            }
        };
        
        let rafaelAcc = {
            code: 9996,
            firstname: 'Rafael',
            surname: 'do Nascimento Pereira',
            email: 'rafaeldonp@gmail.com',
            phone: '(48)98765-4321',
            password: 'r123',
            cpf: '',
            nationality: '',
            active: true,
            address: {
                postalCode: '88032-005',
                street: 'Rod SC-401',
                district: 'Saco Grande',
                city: 'Florianópolis'
            },
            card: {
                holderName: 'Rafael do Nascimento Pereira',
                number: '012345678910',
                expire: '2022-11',
                cvv: '012'
            },
            myProducts: [1200, 1300, 1400, 1500, 1600],
            cartInfo: {},
            transactions: {
                buyer: [],
                seller: []
            }
        };
        
        return {9999: admin, 9998: maoriAcc, 9997: gabrielAcc, 9996: rafaelAcc};
    }

    // produtos para teste de listagem no main-page
    #getDefaultProductsObj() {
        return {
            1000: {
                active: true,
                code: 1000,
                name: 'Monitor Gamer',
                quantity: 14,
                description: ' HQ, Curvo 24"", 1ms, 75Hz, preto.',
                datetime: 0,
                value: 849.90,
                seller: 9998
            },
            2000: {
                active: true,
                code: 2000,
                name: 'Processador AMD Ryzen ',
                quantity: 22,
                description: 'Processador AMD Ryzen 5 5600X, Cache 35MB, 3.7GHz (4.6GHz Max Turbo), AM4, Sem Vídeo',
                datetime: 0,
                value: 1839.49,
                seller: 9998
            },
            3000: {
                active: true,
                code: 3000,
                name: 'Nintendo Switch',
                quantity: 12,
                description: 'Nintendo Switch 32GB, 1x Joycon, Neon Azul/Vermelho.',
                datetime: 0,
                value: 2299.90,
                seller: 9998
            },
            4000: {
                active: true,
                code: 4000,
                name: 'Memória Kingston Fury Renegade',
                quantity: 30,
                description: 'Memória Kingston Fury Renegade, 16GB (2x8GB), 3000MHz, DDR4, CL15, Preto.',
                datetime: 0,
                value: 619.59,
                seller: 9998
            },
            5000: {
                active: true,
                code: 5000,
                name: 'Headset Gamer HyperX',
                quantity: 34,
                description: 'Headset Gamer HyperX Cloud Stinger, Drivers 50mm, Múltiplas Plataformas, P2 e P3.',
                datetime: 0,
                value: 299.90,
                seller: 9998
            },
            6000: {
                active: true,
                code: 6000,
                name: 'Smart TV Samsung 55´ 4K QLED',
                quantity: 18,
                description: 'Smart TV Samsung 55´ 4K QLED 55Q60A, Tela Infinita, Processador IA, HDR10+, Design Slim, Alexa Built In.',
                datetime: 0,
                value: 350,
                seller: 9997
            },
            7000: {
                active: true,
                code: 7000,
                name: 'Teclado Óptico-Mecânico Gamer',
                quantity: 1,
                description: 'Teclado Óptico-Mecânico Gamer Razer Huntsman Tournament, Chroma, Razer Switch Red, US.',
                datetime: 0,
                value: 689.90,
                seller: 9997
            },
            8000: {
                active: true,
                code: 8000,
                name: 'Notebook Lenovo Ideapad',
                quantity: 3,
                description: 'Notebook Lenovo Ideapad Flex 5i Intel Core i5-1035G1, 8GB, SSD 256GB, Windows 10 Home, 14´ FHD, Cinza.',
                datetime: 0,
                value: 5200.00,
                seller: 9997
            },
            9000: {
                active: true,
                code: 9000,
                name: 'SSD Kingston A400',
                quantity: 1,
                description: 'SSD Kingston A400, 240GB, SATA, Leitura 500MB/s, Gravação 350MB/s.',
                datetime: 0,
                value: 230.00,
                seller: 9997
            },
            1100: {
                active: true,
                code: 1100,
                name: 'Placa de Vídeo Zotac Gaming',
                quantity: 1,
                description: 'Placa de Vídeo Zotac Gaming NVIDIA GeForce RTX 2060, 6GB GDDR6, Ray Tracing, LED Branco.',
                datetime: 0,
                value: 3499.90,
                seller: 9997
            },
            1200: {
                active: true,
                code: 1200,
                name: 'Placa de Vídeo Asus',
                quantity: 3,
                description: 'Placa de Vídeo Asus NVIDIA GeForce GTX 1650, 4GB, GDDR6 - TUF-GTX1650.',
                datetime: 0,
                value: 2499.90,
                seller: 9996
            },
            1300: {
                active: true,
                code: 1300,
                name: 'Mouse Gamer Logitech',
                quantity: 1,
                description: 'Mouse Gamer Logitech G403 HERO com RGB LIGHTSYNC, 6 Botões Programáveis, Ajuste de Peso e Sensor HERO 25K.',
                datetime: 0,
                value: 210.00,
                seller: 9996
            },
            1400: {
                active: true,
                code: 1400,
                name: 'Memória Corsair Vengeance',
                quantity: 1,
                description: 'Memória Corsair Vengeance LPX, 8GB, 2666MHz, DDR4, C16, Preto.',
                datetime: 0,
                value: 199.90,
                seller: 9996
            },
            1500: {
                active: true,
                code: 1500,
                name: 'Placa-Mãe Gigabyte',
                quantity: 17,
                description: 'Placa-Mãe Gigabyte Intel Ultra Durable (Rev. 1.0), Intel LGA1200, Micro ATX, DDR4 - H410M H V3.',
                datetime: 0,
                value: 649.90,
                seller: 9996
            },
            1600: {
                active: true,
                code: 1600,
                name: 'HD WD Black Performance',
                quantity: 12,
                description: 'HD WD Black Performance, 2TB, 3.5´, SATA.',
                datetime: 0,
                value: 199.90,
                seller: 9996
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
            active: true,
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
            cartInfo: {},
            transactions: {
                buyer: [],
                seller: []
            }
        };
        this.#accounts[code] = obj;
        this.#storeAccounts();
        return code;
    }

    deleteMyAccount() {
        this.deleteAccount(this.#sessionUser.code);
        this.requestLogout();
        return;
    }

    deleteAccount(code) {
        let obj = this.#accounts[code];
        obj.active = false;
        obj.myProducts.forEach(product => this.#products[product].active = false);
        this.#storeAccounts();
        this.#storeProducts();
        return;
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

    // operações de carrinho
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
            let product = this.#products[key];
            let transaction = this.createNewTransaction(product, cartObj[key]);
            this.#accounts[product.seller].transactions.seller.push(transaction);
            this.#sessionUser.transactions.buyer.push(transaction);
        }
        this.#sessionUser.cartInfo = {};
        this.#storeAccounts();
        return;
    }

    setSessionProductCode(code) {
        this.#sessionProductCode = code;
        this.#storeSessionProductCode();
        return;
    }

    // transações
    createNewTransaction(product, quantity) {
        let code = this.#returnNewCode(this.#transactions);
        let obj = {
            code: code,
            product: product,
            quantity: quantity,
        }
        this.#transactions[code] = obj;
        this.#storeTransactions();
        return code;
    }

    getMyTransactions() {
        return this.#sessionUser.transactions;
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

    updateAccounts() {
        this.#storeAccounts();
        return;
    }

    updateProducts() {
        this.#storeProducts();
        return;
    }

    deleteProduct(code) {
        this.#products[code].active = false;
        this.#sessionProductCode = 'off';
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

    getTransactionByCode(code) {
        return this.#transactions[code];
    }
}

let db = new Database();