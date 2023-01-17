const loginToken = localStorage.getItem("token-login");

if(!loginToken) {
    window.location.pathname = "/login.html"
    window.location.reload()
}

const elOrderList = document.querySelector(".oreder-list");
const elTemplate = document.querySelector(".js-temp").content;
const newFragment = document.createDocumentFragment();

function renderProductOrder(arr) {
    arr.forEach(item => {
        const newTemplate = elTemplate.cloneNode("true");
        
        
        newTemplate.querySelector(".order-btn").dataset.id = item.id;
        newTemplate.querySelector(".product-image").src = `http://localhost:5001/${item.product_img}`;
        newTemplate.querySelector(".product-image").alt = item.product_name;
        newTemplate.querySelector(".product-title").textContent = "Name: " + item.product_name;
        
        newFragment.appendChild(newTemplate);
    });
    elOrderList.appendChild(newFragment)
}

async function getOrder() {
    try {
        const rec = await fetch("http://localhost:5001/order", {
        method: "GET",
        headers: {
            Authorization: loginToken,
        }
    });
    
    const data = await rec.json();
    renderProductOrder(data)
    console.log(data);
} catch (error) {
    console.log(error);
}
}

async function deletePosts(id) {
    try {
        const rec = await fetch(`http://localhost:5001/order/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: loginToken,
        }
    });
    
    const data = await rec.json();
} catch (error) {
    console.log(error);
}
}

elOrderList.addEventListener("click", function(evt){
    if(evt.target.matches(".order-btn")) {
        const btnId = evt.target.dataset.id;
        deletePosts(btnId);
        window.location.reload();
    }
})

getOrder()

