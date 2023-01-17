const loginToken = localStorage.getItem("token-login");
if(!loginToken) {
    window.location.pathname = "/login.html"   
}
// DOM
const elForm = document.querySelector(".js-form");
const elNameInp = document.querySelector(".product-name");
const elDescInp = document.querySelector(".product-desc");
const elImgInp = document.querySelector(".product-img");
const elPriceInp = document.querySelector(".product-price");

const elFormPut = document.querySelector(".js-form-put");
const elNameInpPut = document.querySelector(".product-name-put");
const elDescInpPut = document.querySelector(".product-desc-put");
const elImgInpPut = document.querySelector(".product-img-put");
const elPriceInpPut = document.querySelector(".product-price-put");
const elBtnEdit = document.querySelector(".edit-btn");

const elList = document.querySelector(".js-list")
const elTemplate = document.querySelector(".js-temp").content;
const newFragment = document.createDocumentFragment();

// FUNCTIONS
function renderProduct(arr) {
    arr.forEach(item => {
        const newTemplate = elTemplate.cloneNode("true");
        
        
        newTemplate.querySelector(".product-item").dataset.id = item.id;
        newTemplate.querySelector(".btn-edit").dataset.editId = item.id;
        newTemplate.querySelector(".btn-delete").dataset.deleteId = item.id;
        newTemplate.querySelector(".product-image").src = `http://localhost:5001/${item.product_img}`;
        newTemplate.querySelector(".product-image").alt = item.product_name;
        newTemplate.querySelector(".product-title").textContent = "Name: " + item.product_name;
        newTemplate.querySelector(".product-desc1").textContent = "Description: " + item.product_desc;
        newTemplate.querySelector(".product-price1").textContent = "Price: " + item.product_price + "$";
        
        newFragment.appendChild(newTemplate);
    });
    elList.appendChild(newFragment)
}

function createProduct() {
    let formData = new FormData();
    
    formData.append("product_name", elNameInp.value.trim());
    formData.append("product_desc", elDescInp.value.trim());
    formData.append("product_img", elImgInp.files[0]);
    formData.append("product_price", elPriceInp.value.trim());
    
    async function createProductFetch() {
        try {
            const rec = await fetch("http://localhost:5001/product", {
            method: "POST",
            headers: {
                Authorization: loginToken,
            },
            body: formData,
        })
        
        const data = await rec.json()
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
createProductFetch()
}

function editProduct(id) {
    let formData1 = new FormData();
    
    formData1.append("product_name", elNameInpPut.value.trim());
    formData1.append("product_desc", elDescInpPut.value.trim());
    formData1.append("product_img", elImgInpPut.files[0]);
    formData1.append("product_price", elPriceInpPut.value.trim());
    
    async function editProductFetch(edidId) {
        try {
            const rec = await fetch(`http://localhost:5001/product/${edidId}`, {
            method: "PUT",
            headers: {
                Authorization: loginToken,
            },
            body: formData1,
        })
        
        const data = await rec.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
editProductFetch(id)
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
    
    
    renderProduct(data)
} catch (error) {
    console.log(error);
}
}

async function deletePosts(id) {
    try {
        const rec = await fetch(`http://localhost:5001/product/${id}`, {
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
// AirTag
// AirTag is a supereasy way to keep track of your stuff

// 328672 so'm

// EVENTS

elForm.addEventListener("submit", function() {
    
    createProduct()
})

elList.addEventListener("click", function(evt){
    if(evt.target.matches(".btn-edit")){
        const btnId = evt.target.dataset.editId;
        elBtnEdit.dataset.id = btnId;
    }
    
    if (evt.target.matches(".btn-delete")) {
        const btnId = evt.target.dataset.deleteId;
        console.log(btnId);
        deletePosts(btnId)
        window.location.reload()
    }
})

elFormPut.addEventListener("submit", function() {
    
    editProduct(elBtnEdit.dataset.id)
})


getPosts()
