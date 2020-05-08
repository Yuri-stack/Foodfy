/*Lógica para carregar as informações das receitas*/
/* Logic for loading recipe information */

const recipes = document.querySelectorAll(".recipes")

    for(let i = 0; i < recipes.length; i++) {
        recipes[i].addEventListener('click', function() {
            window.location.href = `/recipes/${i}`;
        });
    }

/* Lógica para esconder/mostrar info das receitas */
/* Logic to hide / show recipe info */

