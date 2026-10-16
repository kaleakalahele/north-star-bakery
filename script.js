const bakeryProducts = [
    "Signature Loaf",
    "Butter Croissants",
    "Cinnamon Rolls",
    "Birthday Cakes",
    "Celebration Cakes"
];

const favoriteButtons = document.querySelectorAll(".favorite-button");
const favoritesList = document.querySelector("#favorites-list");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function displayFavorites() {
    favoritesList.innerHTML = "";

    if (favorites.length === 0) {
        favoritesList.innerHTML = "<li>No favorites saved yet.</li>";
        return;
    }

    favorites.forEach(function (product) {
        const listItem = document.createElement("li");
        listItem.textContent = product;
        favoritesList.appendChild(listItem);
    });
}

function addFavorite(product) {
    if (bakeryProducts.includes(product) && !favorites.includes(product)) {
        favorites.push(product);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    displayFavorites();
}

favoriteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const product = button.dataset.product;
        addFavorite(product);
    });
});

if (favoritesList) {
    displayFavorites();
}

const contactForm = document.querySelector("#contact-form");
const customerName = document.querySelector("#customer-name");
const customerEmail = document.querySelector("#customer-email");
const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");

function validateName() {
    if (customerName.value.trim() === "") {
        nameError.textContent = "Please enter your full name.";
        return false;
    }


    nameError.textContent = "";
    return true;
}

function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(customerEmail.value.trim())) {
        emailError.textContent = "Please enter a valid email address.";
        return false;
    }

    emailError.textContent = "";
    return true;
}

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();

        if (!isNameValid || !isEmailValid) {
            event.preventDefault();
        }
    });
}