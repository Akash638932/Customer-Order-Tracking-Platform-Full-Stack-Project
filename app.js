// PRODUCTS
let products = [
 {id:1, name:"Mobile", price:15000},
 {id:2, name:"Laptop", price:50000},
 {id:3, name:"Headphones", price:2000}
];

// REGISTER
function register(){
 let u=ruser.value, p=rpass.value;
 let users=JSON.parse(localStorage.getItem("users"))||[];
 users.push({u,p});
 localStorage.setItem("users",JSON.stringify(users));
 msg.innerText="Registered Successfully";
}

// LOGIN
function login(){
 let u=username.value, p=password.value;
 if(u==="admin" && p==="admin"){
   location="admin.html"; return;
 }
 let users=JSON.parse(localStorage.getItem("users"))||[];
 let ok=users.find(x=>x.u===u && x.p===p);
 if(ok) location="products.html";
 else msg.innerText="Invalid Login";
}

// PRODUCT LIST
if(document.getElementById("products")){
 products.forEach(p=>{
   productsDiv=document.getElementById("products");
   productsDiv.innerHTML+=`
   <div>
   ${p.name} - ₹${p.price}
   <button onclick="addCart('${p.name}')">Add</button>
   </div>`;
 });
}

// CART
function addCart(name){
 let cart=JSON.parse(localStorage.getItem("cart"))||[];
 cart.push(name);
 localStorage.setItem("cart",JSON.stringify(cart));
 alert("Added to cart");
}

// SHOW CART
if(document.getElementById("cartTable")){
 let cart=JSON.parse(localStorage.getItem("cart"))||[];
 cart.forEach(c=>{
   cartTable.innerHTML+=`<tr><td>${c}</td><td>-</td></tr>`;
 });
}

// PLACE ORDER
function placeOrder(){
 let cart=JSON.parse(localStorage.getItem("cart"))||[];
 let orders=JSON.parse(localStorage.getItem("orders"))||[];
 cart.forEach(c=>orders.push({id:Date.now(),product:c,status:"Pending"}));
 localStorage.setItem("orders",JSON.stringify(orders));
 localStorage.removeItem("cart");
 location="orders.html";
}

// USER ORDERS
if(document.getElementById("orderTable")){
 let orders=JSON.parse(localStorage.getItem("orders"))||[];
 orders.forEach(o=>{
   orderTable.innerHTML+=`
   <tr><td>${o.id}</td><td>${o.product}</td><td>${o.status}</td></tr>`;
 });
}

// ADMIN
if(document.getElementById("adminTable")){
 let orders=JSON.parse(localStorage.getItem("orders"))||[];
 orders.forEach((o,i)=>{
   adminTable.innerHTML+=`
   <tr>
   <td>${o.id}</td><td>${o.product}</td><td>${o.status}</td>
   <td><button onclick="update(${i})">Next</button></td>
   </tr>`;
 });
}

function update(i){
 let orders=JSON.parse(localStorage.getItem("orders"));
 if(orders[i].status==="Pending") orders[i].status="Shipped";
 else orders[i].status="Delivered";
 localStorage.setItem("orders",JSON.stringify(orders));
 location.reload();
}

// ADMIN CHART
if(document.getElementById("orderChart")){
 let orders = JSON.parse(localStorage.getItem("orders")) || [];

 let pending = orders.filter(o=>o.status==="Pending").length;
 let shipped = orders.filter(o=>o.status==="Shipped").length;
 let delivered = orders.filter(o=>o.status==="Delivered").length;

 new Chart(document.getElementById("orderChart"), {
   type: 'bar',
   data: {
     labels: ['Pending','Shipped','Delivered'],
     datasets: [{
       label: 'Orders Count',
       data: [pending, shipped, delivered],
       backgroundColor: ['orange','blue','green']
     }]
   }
 });
}

