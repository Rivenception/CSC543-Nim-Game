

cards = document.querySelectorAll(".card");

cards.forEach(element => {
    element.addEventListener("click", function() {
        console.log("clicking button");
        element.classList.toggle("shadow");
    }); 
});