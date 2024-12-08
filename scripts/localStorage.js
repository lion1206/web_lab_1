const STORAGE_KEY = "selectedDishes";
let selectedDishes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function addToOrder(id) {
    if (!selectedDishes.includes(id)) {
        selectedDishes.push(id);
        saveToLocalStorage();
    }
}

function getSelectedDishes() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function removeDishFromOrder(id) {
    localStorage.removeItem(id)
    saveToLocalStorage();
}

function saveToLocalStorage(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedDishes));
}

document.addEventListener("DOMContentLoaded", () => {
 /*   document.querySelectorAll(".button").forEach(button => {
        button.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            addToOrder(id);
        });
    });*/

document.querySelectorAll(".remove-from-cart").forEach(button => {
    button.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        removeDishFromOrder(id);
    });
});
});