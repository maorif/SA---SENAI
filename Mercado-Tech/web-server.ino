
// Import required libraries
#include <ESP8266WiFi.h>
#include "ESPAsyncWebServer.h"
#include "FS.h"

// Replace with your network credentials
//char* ssid = "NodeMCU";
//char* password = "12345678";

char* ssid = "Maori SE";
char* password = "oi123456";
// Create AsyncWebServer object on port 80
AsyncWebServer server(80);
 
void setup(){
  // Serial port for debugging purposes
  Serial.begin(115200);

  // Initialize SPIFFS
  if(!SPIFFS.begin()){
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  // Print ESP32 Local IP Address
  Serial.println(WiFi.localIP());



  

  // Route for root / web page


  
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
  request->send(SPIFFS, "/main-page.html", "text/html");
});

server.on("/main-page.html", HTTP_GET, [](AsyncWebServerRequest *request){
  request->send(SPIFFS, "/main-page.html", "text/html");
});

server.on("/cart-purchase.html", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/cart-purchase.html","text/html");
      });

server.on("/delete-account.html", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/delete-account.html","text/html");
      });

server.on("/delete-product.html", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/delete-product.html","text/html");
      });

server.on("/edit-account.html", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/edit-account.html","text/html");
      });

server.on("/edit-product.html", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/edit-product.html","text/html");
      });

server.on("/forgot-password.html", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/forgot-password.html","text/html");
      });

server.on("/login.html", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/login.html","text/html");
      });

server.on("/my-transactions.html", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/my-transactions.html","text/html");
      });
      
server.on("/my-account-data.html", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/my-account-data.html","text/html");
      });

server.on("/my-product-data.html", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/my-product-data.html","text/html");
      });

server.on("/product-detail.html", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/product-detail.html","text/html");
      });

server.on("/register-account.html", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/register-account.html","text/html");
      });

server.on("/register-product.html", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/register-product.html","text/html");
      });

server.on("/search-account.html", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/search-account.html","text/html");
      });

server.on("/search-product.html", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/search-product.html","text/html");
      });


server.on("/js/alert-error-message.js", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/alert-error-message.js","text/javascript");
    });

server.on("/js/alert-msg-module.js", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/alert-msg-module.js","text/javascript");
    });

server.on("/js/alert-sucess-message.js", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/alert-sucess-message.js","text/javascript");
    });

server.on("/js/cart-purchase.js", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/cart-purchase.js","text/javascript");
    });

server.on("/js/common-content.js", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/common-content.js","text/javascript");
    });

server.on("/js/database.js", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/database.js","text/javascript");
    });

server.on("/js/delete-account.js", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/delete-account.js","text/javascript");
    });

server.on("/js/edit-account.js", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/edit-account.js","text/javascript");
    });

server.on("/js/edit-product.js", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/edit-product.js","text/javascript");
    });





  //Route for javascript



  
  
server.on("/js/forgot-password.js", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/forgot-password.js","text/javascript");
    });

server.on("/js/index.js", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/index.js","text/javascript");
    });

server.on("/js/login.js", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/login.js","text/javascript");
    });

server.on("/js/main-page.js", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/main-page.js","text/javascript");
    });

server.on("/js/my-account-data.js", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/my-account-data.js","text/javascript");
    });

server.on("/js/my-product-data.js", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/my-product-data.js","text/javascript");
    });

    server.on("/js/my-transactions.js", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/my-transactions.js","text/javascript");
    });

server.on("/js/open-page.js", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/open-page.js","text/javascript");
    });

server.on("/js/product-detail.js", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/product-detail.js","text/javascript");
    });

server.on("/js/register-account.js", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/register-account.js","text/javascript");
    });

server.on("/js/register-product.js", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/register-product.js","text/javascript");
    });

server.on("/js/render-table.js", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/render-table.js","text/javascript");
    });

server.on("/js/search-account.js", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/search-account.js","text/javascript");
    });

server.on("/js/search-product.js", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/search-product.js","text/javascript");
    });

server.on("/js/side-shopping-cart.js", HTTP_GET, [](AsyncWebServerRequest *request){
      request->send(SPIFFS, "/js/side-shopping-cart.js","text/javascript");
    });
    



  // Route for style.css files


  
  
  server.on("/css/alert-message.css", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/css/alert-message.css","text/css");
      });

server.on("/css/footer.css", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/css/footer.css","text/css");
      });

server.on("/css/form.css", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/css/form.css","text/css");
      });

server.on("/css/header.css", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/css/header.css","text/css");
      });

server.on("/css/hidden.css", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/css/hidden.css","text/css");
      });

server.on("/css/hidden-table.css", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/css/hidden-table.css","text/css");
      });

server.on("/css/index.css", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/css/index.css","text/css");
      });

server.on("/css/login.css", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/css/login.css","text/css");
      });

server.on("/css/mobile.css", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/css/mobile.css","text/css");
      });

server.on("/css/reset.css", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/css/reset.css","text/css");
      });

server.on("/css/sidebar-menu.css", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/css/sidebar-menu.css","text/css");
      });

server.on("/css/sidebar-shopping.css", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/css/sidebar-shopping.css","text/css");
      });

server.on("/css/table.css", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/css/table.css","text/css");
      });




// route to images

  server.on("/img/logo-footer.png", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/img/logo-footer.png","image/png");
      });

  server.on("/img/logo-header.png", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/img/logo-header.png","image/png");
      });




  // Start server
  server.begin();
}
 
void loop(){
  
}
