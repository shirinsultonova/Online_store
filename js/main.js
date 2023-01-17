const loginToken = localStorage.getItem("token-login");

if(!loginToken) {
    window.location.pathname = "/login.html"   
}

// DOM
const elList = document.querySelector(".js-list")
const elTemplate = document.querySelector(".js-temp").content;
const newFragment = document.createDocumentFragment();

const elSearchForm = document.querySelector(".search-form");
const elSearchInp = document.querySelector(".search-inp");
const searchArr = [];


// Functions
function renderProduct(arr) {
    elList.innerHTML = ""
    arr.forEach(item => {
        const newTemplate = elTemplate.cloneNode("true");


        newTemplate.querySelector(".order-btn1").dataset.id = item.id;
        newTemplate.querySelector(".product-image").src = `http://localhost:5001/${item.product_img}`;
        newTemplate.querySelector(".product-image").alt = item.product_name;
        newTemplate.querySelector(".product-title").textContent = "Name: " + item.product_name;
        newTemplate.querySelector(".product-desc1").textContent = "Description: " + item.product_desc;
        newTemplate.querySelector(".product-price1").textContent = "Price: " + item.product_price + "$";
        
        newFragment.appendChild(newTemplate);
    });
    elList.appendChild(newFragment)
}

async function getPosts() {
    try {
        const rec = await fetch("http://localhost:5001/product", {
        method: "GET",
        headers: {
            Authorization: loginToken,
        }
    });
    
    const data = await rec.json();
    data.forEach(item => {
        searchArr.push(item)
    })
    renderProduct(data)
} catch (error) {
    console.log(error);
}
}

function createOrder(id) {
    let formData = new FormData();
    
    formData.append("product_id", id);
    
    async function createOrderFetch() {
        try {
            const rec = await fetch("http://localhost:5001/order", {
            method: "POST",
            headers: {
                Authorization: loginToken,
            },
            body: formData,
        })
        
        const data = await rec.json()
        console.log(data);
        // renderProduct(data)
    } catch (error) {
        console.log(error);
    }
}
createOrderFetch()
}

// EVENTS
elSearchForm.addEventListener("submit", function(evt){
    evt.preventDefault();
    
    const searchInpValue = elSearchInp.value.trim()
    
    const regexTitle = new RegExp(searchInpValue, "gi");
    const searchProduct = searchArr.filter(item => {
        const searchInp = item.product_name.match(regexTitle);
        
        return searchInp
    });
    
    console.log(searchProduct);
    if(searchProduct.length > 0) {
        renderProduct(searchProduct);
    } else {
        elList.innerHTML = "Product not found !"
    }
})

elList.addEventListener("click", function(evt) {
    if(evt.target.matches(".order-btn1")) {
        const btnId = evt.target.dataset.id;
        createOrder(btnId);
        window.location.pathname = "/order.html"
    }
})

getPosts()