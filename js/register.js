const registerToken = localStorage.getItem("register-token");

if(registerToken) {
    window.location.pathname = "/index.html"   
};

// DOM
const elForm = document.querySelector(".register-form");
const elInpName = document.querySelector(".register-name");
const elInpPhone = document.querySelector(".register-phone");
const elInpEmail = document.querySelector(".register-email");
const elInpPassword = document.querySelector(".register-password");
const elBtneys = document.querySelector(".btn-koz2");

// function

async function registerUser() {  
    try {
        const res = await fetch("http://localhost:5001/user/register" , {
        method: "POST",
        
        headers: {
            "Content-Type": "application/json",
        },
        
        body : JSON.stringify({
            user_name: elInpName.value,
            phone: elInpPhone.value,
            email: elInpEmail.value,
            password: elInpPassword.value,
        })
    });
    
    const data = await res.json()
    
    if(data.token) {
        localStorage.setItem("register-token", data.token);
        window.location.pathname = "/index.html"
    }
} catch (error) {
    console.log(error);
}
}

elBtneys.addEventListener("mousedown", function(){
    elInpPassword.type = "text"
});

window.addEventListener("mouseup", function(){
    elInpPassword.type = "password"
});

elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    
    registerUser()
})