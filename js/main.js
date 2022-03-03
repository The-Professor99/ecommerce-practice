"use strict";

class Cart {
    constructor() {
      this.cartArray = []
      this.total = 0
    }
    add(item) {
        this.cartArray.push(item)
    }

    removeItem(item) {
        var position = this.cartArray.indexOf(item)
        this.cartArray.splice(position, 1)
    }
  
    calculateTotal() {
      var reducedTotal = this.cartArray.reduce( (previous, current) => {
        return this.total = previous + ((current.price - (current.price * (current.percentageOff / 100))) * current.quantity);
      },0)
      return reducedTotal
    }
}


let cart = new Cart;
let displayedpage = 0;

let items = [{
    "id": 0,
    "name": "Fall Limited Edition Sneakers",
    "description": "These low-profile sneakers are your perfect casual wear companion. Featuring a \
    durable rubber outer sole, they’ll withstand everything the weather can offer.",
    "price": 250.00,
    "percentageOff": 50,
    "imageUrl": "images/image-product-1.jpg"
}, 
{
    "id": 1,
    "name": "Autumn Limited Edition Sneakers",
    "description": "These low-profile sneakers are your perfect casual wear companion. Featuring a \
    durable rubber outer sole, they’ll withstand everything the weather can offer. Better still, they do \
    well in Autumns too.",
    "price": 350.00,
    "percentageOff": 25,
    "imageUrl": "images/image-product-2.jpg"
} , 
{
    "id": 2,
    "name": "Autumn Limited Edition Sneakers2",
    "description": "These low-profile sneakers are your perfect casual wear companion. Featuring a \
    durable rubber outer sole, they’ll withstand everything the weather can offer. Better still, they do \
    well in Autumns too.",
    "price": 3050.00,
    "percentageOff": 10,
    "imageUrl": "images/image-product-3.jpg"
} , 
{
    "id": 3,
    "name": "Autumn Limited Edition Sneakers3",
    "description": "These low-profile sneakers are your perfect casual wear companion. Featuring a \
    durable rubber outer sole, they’ll withstand everything the weather can offer. Better still, they do \
    well in Autumns too.",
    "price": 30.00,
    "percentageOff": 2,
    "imageUrl": "images/image-product-4.jpg"
} 
]

function displayItem(i) {
    const productImageBox = document.createElement("div");
    const prevProductImageBox = document.getElementsByClassName("image1-container");
    if (prevProductImageBox.length > 0) {
        prevProductImageBox[0].remove();
    }
    productImageBox.className = "image1-container";
    productImageBox.innerHTML = `
    <img alt="classy sneakers" id="productImage" src=${items[i].imageUrl} class="img-responsive img-fluid"/>
    `
    const descriptionBox = document.createElement("article");
    const prevDescriptionBox = document.getElementsByClassName("product-description");
    if (prevDescriptionBox.length > 0) {
        prevDescriptionBox[0].remove();
    }
    descriptionBox.className = "product-description";
    descriptionBox.innerHTML = `
    <header class="txt-orange txt-700 mb-3">SNEAKER COMPANY</header>
    <h3 class="txt-dark-blue txt-700 mb-3" id="productName">${items[i].name}</h3>
    <p class="txt-gray-blue">${items[i].description}</p>
    `
    
    const prevSlideImageBox = document.getElementsByClassName("switch-image-laptop");
    if (prevSlideImageBox.length > items.length - 1) {
        for (let j = 0; j < items.length; j++) {
            prevSlideImageBox[0].remove();
        }
    }
    
    for (let j = 0; j < items.length; j++) {
        const slideImageBox = document.createElement("div");
        slideImageBox.innerHTML = 
        `
        <img alt="view next picture" onclick="displayItem(${j})" src=${items[j].imageUrl.replace(".jpg", "-thumbnail.jpg")} class="img-responsive img-fluid"/>
        `
        if (i === j) {
            slideImageBox.className = "switch-image-laptop current-image";
        } else {
            slideImageBox.className = "switch-image-laptop";
        }

        const slideboxParent = document.querySelector(".switch-image-container-laptop");
        const slidenextSibling = document.querySelector(".switch-image-laptop");
        slideboxParent.insertBefore(slideImageBox, slidenextSibling); 
    };

    const priceBox = document.createElement("div");
    const prevPriceBox = document.getElementsByClassName("product-price");
    if (prevPriceBox.length > 0) {
        prevPriceBox[0].remove();
    }
    priceBox.className = "product-price mb-3";
    let currentPrice = items[i].price - ((items[i].percentageOff / 100) * items[i].price);
    priceBox.innerHTML = `
    <div class="product-price-current">
        <div>
            <span class="product-price-value txt-dark-blue txt-700">$<span id="currentPrice">${currentPrice.toFixed(2)}</span></span>
        </div>
        <div class="perc-off">
            <span class="product-price-mark txt-orange">${items[i].percentageOff}%</span>
        </div>
    </div>
    <div class="product-price-original">
        <div class="product-price-del">
            <s class="product-price-value txt-gray-blue-light">$${items[i].price.toFixed(2)}</s>
        </div>
    </div>
    `


    const imgboxParent = document.querySelector(".image-container-main");
    const imgnextSibling = document.querySelector(".switch-image-container");
    imgboxParent.insertBefore(productImageBox, imgnextSibling); 

    const desboxParent = document.querySelector(".product-description-container");
    const desnextSibling = document.querySelector(".product-price-container");
    desboxParent.insertBefore(descriptionBox, desnextSibling); 
    
    const priceboxParent = document.querySelector(".product-price-container");
    const pricenextSibling = document.querySelector(".add-item-container");
    priceboxParent.insertBefore(priceBox, pricenextSibling); 
    document.getElementById("numValue").value = 0
    displayedpage = i
}

function nextImage() {
    if (displayedpage < items.length - 1) {
        displayedpage++
    } else {
        displayedpage = 0
    }

    displayItem(displayedpage)
}

function prevImage() {
    if (displayedpage > 0) {
        displayedpage--
    } else {
        displayedpage = items.length - 1
    }

    displayItem(displayedpage)
}

function showCart() {
    let cartContainer = document.getElementById('cartContainer');
    if (cartContainer.style.display === 'block') {
        cartContainer.style.display = 'none';
    } else {
        cartContainer.style.display = 'block';
    }
}

function addRemove(types) {
    let quantity = document.getElementById("numValue");
    let numValue = Number(quantity.value)
    if (types === 'add') {
        if (numValue < 99){
            numValue++
        }
    } else {
        if (numValue > 1){
            numValue--
        }
    }
    quantity.value = numValue
}

function addToCart() {
    let itemNo = displayedpage;
    let to_add = items[itemNo];
    let quantity = Number(document.getElementById("numValue").value);
    let numOrders = document.getElementById("numOrders");
    let added;
    to_add["quantity"] = quantity;
    to_add["currentPrice"] = to_add.price - (to_add.price * (to_add.percentageOff / 100))
    
    let ordersCount = Number(numOrders.innerHTML); // Number of orders in cart

    

    if (quantity > 0 && quantity < 100 && ordersCount < 100) {
        // boxParent.insertBefore(generatedBox, nextSibling);
        for (let i of cart.cartArray) {
            if (to_add["name"] == i.name) {
                let index = cart.cartArray.indexOf(i)
                cart.cartArray[index]["quantity"] = quantity
                added = "Yes"
                break
            } else {
                added = "No"
            }
        }
        if (added !== "Yes") {
            cart.add(to_add)
            ordersCount++
            numOrders.innerHTML = ordersCount;
        } else {
            alert("Quantity of " + to_add["name"] + " updated!")
        }
        displayCart()
    } else {
        if (quantity < 1 || quantity > 99) {
            alert("Quantity should be within 1 and 99!")
        } else {
            alert("Orders in Cart have exceeded 98 items. Please checkout before adding more!")
        }
    }
}

function displayCart() {
    let emptyCart = document.getElementById("empty");
    let cartContainer = document.getElementById("cardDetailsContainer");
    const boxParent = document.querySelector(".card-details-container-sub");
    boxParent.innerHTML = ""
    const nextSibling = document.querySelector(".card-details");
    let numOrders = document.getElementById("numOrders");
    let ordersCount = Number(numOrders.innerHTML);

    

    cart.cartArray.forEach(function(element) {

        const generatedBox = document.createElement("div");
        generatedBox.className = "card-details";
        generatedBox.innerHTML = `
        <img src="${element.imageUrl.replace(".jpg", "-thumbnail.jpg")}" class="card-images" alt="Product picture thumbnail">
        <div class="details-description">
            <p class="txt-dark-blue">${element.name}</p>
            <p class="txt-dark-blue"><span>$${element.currentPrice.toFixed(2)}</span> x <span>${element.quantity}</span> <span class="txt-dark-blue txt-700">${(element.currentPrice * element.quantity).toFixed(2)}</span></p>
        </div>
        <button type="button" id="remove${element.id}" class="card-images delete">
            <img src="images/icon-delete.svg" alt="delete button">
        </button>
        `;
        boxParent.insertBefore(generatedBox, nextSibling);
        let removeButton = document.getElementById('remove' + element.id);
        removeButton.addEventListener('click', function(e) {
            ordersCount--
            numOrders.innerHTML = ordersCount;
            cart.removeItem(element);
            displayCart();
        });
    });
    numOrders.innerHTML = ordersCount;
    if (ordersCount > 0) {
        emptyCart.style.display = "none";
        cartContainer.style.display = "block";
    } else {
        emptyCart.style.display = "block";
        cartContainer.style.display = "none";
    }
}

displayItem(0)

document.getElementById("nextButton").addEventListener("click", nextImage)

document.getElementById("prevButton").addEventListener("click", prevImage)

document.getElementById("checkOut").addEventListener("click", () => {
    alert("Sum Total: $" + cart.calculateTotal())
});