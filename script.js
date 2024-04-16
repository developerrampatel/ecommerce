// get product home page
async function getdataproduct() {
  try {
    let row = " ";
    let res = await fetch('https://fakestoreapi.com/products');
    let data = await res.json();
    data.slice(0,8).forEach((items) => {
      row += `<div class='col-md-3'>
        <div class="card">
            <img class="card-img-top" src=${items.image} alt="Card image">
            <div class="card-body">
            <h4 class="card-title">${items.category}</h4>
            <p class="card-text">Price : ${items.price}</p>
            <button class="btn btn-primary " onclick='single_product(${items.id})'>View</button>
            <button  class="btn btn-primary " onclick='addtocart(${items.id})' > add to Cart</button>
            </div>
        </div>
   </div>`
    });
    document.getElementById('result').innerHTML = row;
  } catch (error) {
  }
}
getdataproduct();

// allproductcategorydata shop page
async function product() {
  try {
    let row = " ";
    let res = await fetch('https://fakestoreapi.com/products');
    let data = await res.json();
    data.forEach((items) => {
      row += `<div class='col-md-3'>
        <div class="card">
            <img class="card-img-top" src=${items.image} alt="Card image">
            <div class="card-body">
            <h4 class="card-title">${items.category}</h4>
            <p class="card-text">Price : ${items.price}</p>
            <button class="btn btn-primary" onclick='single_product( ${items.id})'>View</button>
            <button class="btn btn-primary">Add to Cart</button>
            </div>
        </div>
   </div>`
    });
    document.getElementById('allcategoryproduct').innerHTML = row;
  } catch (error) {
  }
}
product();
// get all category 
async function getAllCategory() {
  try {
    let row = "";
    let res = await axios.get('https://fakestoreapi.com/products/categories');
    res.data.forEach((items) => {
      row += `<a class="nav-link" onclick="productcategory(this)" href="#">${items}</a>`
    });
    document.getElementById('categories').innerHTML = row;
  } catch (error) {
  }
}
getAllCategory();

// single product click view button
async function single_product(pid) {
  try {
    let res = await axios.get(`https://fakestoreapi.com/products/${pid}`);
    localStorage.setItem('singleproductdata', JSON.stringify(res.data));
    window.location = 'single_product.html';
  } catch (error) {
  }
}
// get single product data from localstorage
function singleproduct() {
  try {
    let data = localStorage.getItem('singleproductdata');
    // console.log(data)
    if (data != null) {
      details = JSON.parse(data);
    }
    document.getElementById('productimage').src = details.image;
    document.getElementById('title').innerText = details.title;
    document.getElementById('category-name').innerText = details.category;
    document.getElementById('desc').innerText = details.description;
    document.getElementById('price').innerText = "Price : " + details.price
    document.getElementById('totalcartdata'). innerHTML = `<button  class="btn btn-dark " onclick='addtocart(${details.id})'> 
    add to Cart</button>`
  } catch (error) {
  }
}
singleproduct();
// productcategory click category
async function productcategory(t) {
  try {
    let productname = t.innerText
    let res = await axios.get(`https://fakestoreapi.com/products/category/${productname}`);
    //  console.log(productname)
    localStorage.setItem('productcategorydata', JSON.stringify(res.data));
    window.location = 'category_product.html';
    showcart();
  } catch (error) {
  }
}
// category_product
function category_product() {
  try {
    let res = localStorage.getItem('productcategorydata');
    if (res != null) {
      data = JSON.parse(res)
    }
    else {
      data = [];
    }
    let row = " ";
    data.forEach((items) => {
      row += `<div class='col-md-3'>
        <div class="card">
            <img class="card-img-top" src=${items.image} alt="Card image">
            <div class="card-body">
            <h4 class="card-title">${items.category}</h4>
            <p class="card-text">Price : ${items.price}</p>
            <button class="btn btn-primary" onclick='single_product( ${items.id})'>View</button>
            <a href="#" class="btn btn-primary">Add to Cart</a>
            </div>
        </div>
   </div>`
    });
    document.getElementById('categoryproduct').innerHTML = row;
  } catch (error) {
  }
}
category_product();

// add to cart
async function addtocart(pid) {
  try {
    let res = await axios.get(`https://fakestoreapi.com/products/${pid}`);
    let data = localStorage.getItem("cart5new");
    if (data != null) {
      cartArray = JSON.parse(data);
    } else {
      cartArray = [];
    }
     // check items already exist into the cart 
     let resultArray = cartArray.filter((items)=>{
      return items.id == pid;
  });
  if(resultArray.length > 0) {
      alert("Item already exists int the cart");
  }
    cartArray.push(res.data);
    localStorage.setItem('cart5new', JSON.stringify(cartArray))
    showcart();
    alert("item added int the cart..")
  } catch (error) {
  }
}
// showcart data
function showcart() {
  try {
    let data = localStorage.getItem('cart5new');
    if (data != null) {
      carts = JSON.parse(data);
      console.log(carts)
    }
    else{
       carts = [];
    }
    let row = " ";
    carts.forEach((items) => {
      row += `<tr>
            <td><img src=${items.image} style='width: 80px !important; height: 50px'/></td>
            <td>${items.title}</td>
            <td>${items.price}</td>
            <td><button onclick='removeItems(${items.id})' class='btn btn-danger btn-sm'>Remove</button></td>
        </tr>`;
    });
    let elements = document.querySelectorAll(".count");
    elements[0].innerText = carts.length;
    document.getElementById("cartdata").innerHTML = row;
    total();
  } catch (error) {
  }
}
showcart();

// remove card data
function removeItems(pid){
   let data = localStorage.getItem('cart5new');
  if (data != null) {
    carts = JSON.parse(data);
    // console.log(carts)
  }
  else{
     carts = [];
  }
  let newdata = carts.filter((items ,index)=>{
    return items.id != pid ;
  })
  localStorage.setItem('cart5new', JSON.stringify(newdata));
  showcart();
}
// totalcartdata
function total(){
  let data = localStorage.getItem('cart5new');
  if(data != null){
    carts =  JSON.parse(data)
  }
  let totaldata = carts.reduce((current_value,next_value)=>{
     return current_value + next_value.price 
  },0)
  document.getElementById('total_amount').innerText = totaldata;
}
total();