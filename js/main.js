/// <reference types="../@types/jquery" />


//----------------------------------------- Home Side Menu Section -----------------------------------------
let data = document.getElementById("data");
let searchPage = document.getElementById("searchPage");
let submitBtn;
const baseURL = "https://www.themealdb.com";
// const testKey = "1";



document.addEventListener("DOMContentLoaded", function() {
    // Code to be executed when the DOM is ready

    searchByName("").then(() => {
        // $(".loading-screen").fadeIn(500)
        $(".loading-screen").fadeOut(5000)
        $("body").css("overflow", "visible")

    })

    // $(".loading-screen").fadeOut(20000)
    // $("body").css("overflow", "visible")
  });



  function openSideNav() {
    $(".side-menu").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");

        // $( '.links li' ).animate( {'bottom' : 0 }, 1000 );


    for (let i = 0; i < 5; i++) {
        $(".links-list li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let boxWidth = $(".side-menu .menu-body").outerWidth()
    $(".side-menu").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links-list li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$(".side-menu i.open-close-icon").on("click",() => {
    if ($(".side-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})



function displayMeals(mealArr) {
    let htmlMeal = "";

    for (let i = 0; i < mealArr.length; i++) {
        htmlMeal += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${mealArr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${mealArr[i].strMealThumb}" alt="Delicious Food">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${mealArr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    data.innerHTML = htmlMeal
}



async function getCategories() {
    data.innerHTML = ""
    searchPage.innerHTML = "";

    // $(".inner-loading-screen").removeClass("d-none")
    // $(".inner-loading-screen").addClass("d-flex")
    $(".inner-loading-screen").fadeIn(300)
    let fileName="categories.php";
    let response = await fetch(`${baseURL}/api/json/v1/1/${fileName}`)
    response = await response.json()
    displayCategories(response.categories)
    $(".inner-loading-screen").fadeOut(300)

}

function displayCategories(mealArr) {
    let htmlMeal = "";

    for (let i = 0; i < mealArr.length; i++) {
        htmlMeal += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${mealArr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${mealArr[i].strCategoryThumb}" alt="Delicious Food">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${mealArr[i].strCategory}</h3>
                        <p>${mealArr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    data.innerHTML = htmlMeal
}


async function getArea() {
    data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    searchPage.innerHTML = "";
    let fileName="list.php";
    let respone = await fetch(`${baseURL}/api/json/v1/1/${fileName}?a=list`)
    respone = await respone.json()
    displayArea(respone.meals)
    $(".inner-loading-screen").fadeOut(300)

}


function displayArea(mealArr) {
    let htmlMeal = "";

    for (let i = 0; i < mealArr.length; i++) {
        htmlMeal += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${mealArr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${mealArr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    data.innerHTML = htmlMeal
}


async function getIngredients() {
    data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    searchPage.innerHTML = "";
    let fileName="list.php";
    let respone = await fetch(`${baseURL}/api/json/v1/1/${fileName}?i=list`)
    respone = await respone.json()
    console.log(respone.meals);
    displayIngredients(respone.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}


function displayIngredients(mealArr) {
    let htmlMeal = "";

    for (let i = 0; i < mealArr.length; i++) {
        htmlMeal += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${mealArr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${mealArr[i].strIngredient}</h3>
                        <p>${mealArr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    data.innerHTML = htmlMeal
}


async function getCategoryMeals(category) {
    data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    let fileName = "filter.php";
    let response = await fetch(`${baseURL}/api/json/v1/1/${fileName}?c=${category}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}



async function getAreaMeals(area) {
    data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    let fileName = "filter.php";
    let response = await fetch(`${baseURL}/api/json/v1/1/${fileName}?a=${area}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}


async function getIngredientsMeals(ingredients) {
    data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    let fileName = "filter.php";
    let response = await fetch(`${baseURL}/api/json/v1/1/${fileName}?i=${ingredients}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

async function getMealDetails(mealID) {
    closeSideNav()
    data.innerHTML = ""
    searchPage.innerHTML = "";
    let fileName = "lookup.php";
    $(".inner-loading-screen").fadeIn(300)
    let respone = await fetch(`${baseURL}/api/json/v1/1/${fileName}?i=${mealID}`);
    respone = await respone.json();
    displayMealDetails(respone.meals[0])
    $(".inner-loading-screen").fadeOut(300)

}


function displayMealDetails(meal) {
    
    searchPage.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")

    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let htmlMeal = `
    <div class="col-md-4">
        <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="Delicious Food">
        <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <h3 class="fw-bolder">Area ${meal.strArea}</h3>
        <h3 class="fw-bolder">Category : ${meal.strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${ingredients}
        </ul>
        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">${tagsStr}</ul>
        <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>`
    data.innerHTML = htmlMeal
}


function showSearchInputs() {
    searchPage.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control form-bg" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control form-bg" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    data.innerHTML = ""
}

async function searchByName(term) {
    closeSideNav()
    data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    let fileName = "search.php";
    let response = await fetch(`${baseURL}/api/json/v1/1/${fileName}?s=${term}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)

}

async function searchByFLetter(term) {
    closeSideNav()
    data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    let fileName = "search.php";
    let response = await fetch(`${baseURL}/api/json/v1/1/${fileName}?f=${term}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)

}



let userName;
let userEmail;
let userPhone;
let userAge;
let userPassword;
let userRepassword;

function showContacts() {
    closeSideNav();
    data.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="userValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed e,g: Kholoud
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="userValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email is not valid e.g: kholoud@gmail.com
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="userValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter a valid Mobile Number e.g: 011111111
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="userValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter a valid Age e.g: 24
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="userValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password: "Minimum eight characters, at least one letter, and one number:"
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="userValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Repassword is not matching the Password
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        userName = document.getElementById("nameInput");
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        userEmail = document.getElementById("emailInput");
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        userPhone = document.getElementById("phoneInput");
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        userAge = document.getElementById("ageInput");
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        userPassword = document.getElementById("passwordInput");
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        userRepassword = document.getElementById("repasswordInput");
    })
}



function userValidation() {
    if (userName) {
        if ( /^[a-zA-Z]+([ ]?[a-zA-Z])*$/.test(userName.value)) 
        {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (userEmail) {

        if (/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(userEmail.value)) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (userPhone) {
        if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(userPhone.value)) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (userAge) {
        if (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(userAge.value)) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (userPassword) {
        if (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(userPassword.value)) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (userRepassword) {
        if (userRepassword.value == userPassword.value) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (userName &&
        userEmail &&
        userPhone &&
        userAge &&
        userPassword &&
        userRepassword) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}



$("#submitBtn").addEventListener("click", () => {
    alert("successfully created a new account!")
}
)