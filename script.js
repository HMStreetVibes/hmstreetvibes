const addToCartButton = document.querySelector(".btn-compra");
const popup = document.getElementById("popup");
const closeButton = document.querySelector(".close-btn");

addToCartButton.addEventListener("click", () => {
    popup.style.display = "block";
});
closeButton.addEventListener("click", () => {
    popup.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === popup) {
        popup.style.display = "none";
    }
});
