const recipes = document.querySelectorAll(".recipes-image")

for(let recipe of recipes){
    recipe.addEventListener("click", function(){

        const recipeID = recipe.getAttribute("id")
        window.location.href = `/recipes/${recipeID}`

        // for(let i = 0; i < recipes.length; i++) {
        //     recipes[i].addEventListener('click', function() {
        //         window.location.href = `/recipes/${i}`;
        //     });
        // }
    })

}
