let htmllist = ['cart-purchase.html',
'delete-account.html',
'delete-product.html',
'edit-account.html',
'edit-product.html',
'forgot-password.html',
'login.html',
'my-account-data.html',
'my-product-data.html',
'product-detail.html',
'register-account.html',
'register-product.html',
'search-account.html',
'search-product.html'];

let csslist = ['alert-message.css',
'footer.css',
'form.css',
'header.css',
'hidden.css',
'hidden-table.css',
'index.css',
'login.css',
'mobile.css',
'reset.css',
'sidebar-menu.css',
'sidebar-shopping.css',
'table.css'];

let jslist = ['alert-error-message.js',
'alert-msg-module.js',
'alert-sucess-message.js',
'cart-purchase.js',
'common-content.js',
'database.js',
'delete-account.js',
'edit-account.js',
'edit-product.js',
'forgot-password.js',
'index.js',
'login.js',
'main-page.js',
'my-account-data.js',
'my-product-data.js',
'open-page.js',
'product-detail.js',
'register-account.js',
'register-product.js',
'render-table.js',
'search-account.js',
'search-product.js',
'side-shopping-cart.js'];

let codestring;
let codestring2;

for(let i=0; i<htmllist.length; i++){

    let a = `server.on("/${htmllist[i]}", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/${htmllist[i]}","text/html");
      });\n\n`;

    codestring += a;
};

for(let i=0; i<jslist.length; i++){

  let a = `server.on("/js/${jslist[i]}", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/${jslist[i]}","text/javascript");
    });\n\n`;

  codestring2 += a;
};
console.log(codestring);
console.log(codestring2);