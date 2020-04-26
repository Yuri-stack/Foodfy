const modalOverlay = document.querySelector(".modal-overlay")
const recipes = document.querySelectorAll(".recipes-image")

for(let recipe of recipes){
    recipe.addEventListener("click", function(){

        const imgID = recipe.getAttribute("id")
        const recipeName = recipe.querySelector('.recipes-name').textContent
        const recipeAuthor = recipe.querySelector('.recipes-author').textContent

        modalOverlay.classList.add('active')
        modalOverlay.querySelector('img').src = `/assets/${imgID}`

        modalOverlay.querySelector('.modal-container-title').innerHTML = `<h2>${recipeName}</h2>`
        modalOverlay.querySelector('.modal-container-author').innerHTML = `<p>${recipeAuthor}</p>`

    })

}

document.querySelector(".close-modal").addEventListener("click", function(){
    modalOverlay.classList.remove("active")
})