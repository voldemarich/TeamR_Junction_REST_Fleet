## This is REST API for the fleetboard server

* POST /register  
  Content-type: application/json  
  {"username":"ex", "password":"pass"}

* POST /login  
  Content-type: application/json  
  {"username":"ex", "password":"pass"}
  
* GET /myacc   
  Headers:  
  - Authorization: \<token from /login\>
  - Content-type: application/json 
   
  Returns user info (i.e. token quantity etc.)
  
  
* POST /orders  
  Headers:  
  - Authorization: \<token from /login\>
  - Content-type: application/json  
    { "goods_name": "hashish",  
    "goods_type": "solid",  
    "volume": 10,  
    "weight": 300,  
    "distance": 250,  
    "temperature": 10,  
    "username": "johndoe",  
    "shake_level": "fragile",  
    "goods_special": "not_special" }
* GET /orders  
  Headers:  
  - Authorization: \<token from /login\>
  - Content-type: application/json 
   
  Returns all orders of the token owner
  
* GET /orders/\<order_number\>  
  Headers:  
  - Authorization: \<token from /login\>
  - Content-type: application/json 
   
  Returns specific order information

* DELETE /orders/\<order_number\>  
  Headers:  
  - Authorization: \<token from /login\>
  - Content-type: application/json 
   
  Deletes the order of given number
  
* GET /orders/\<order_number\>/violations   
  Headers:  
  - Authorization: \<token from /login\>
  - Content-type: application/json 
   
  Returns violations recorded on order
  
* GET /orders/violations   
  Headers:  
  - Authorization: \<token from /login\>
  - Content-type: application/json 
   
  Returns all recorded violations
  