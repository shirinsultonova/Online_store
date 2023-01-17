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
        
        newTemplate.querySelector(".product-image").src = `http://localhost:5001/${item.product_img}`;
        newTemplate.querySelector(".product-image").alt = item.product_name;
        newTemplate.querySelector(".product-title").textContent = item.product_name;
        newTemplate.querySelector(".product-price1").textContent = "User Name : " + item.user_name;
        
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


getOrder()

