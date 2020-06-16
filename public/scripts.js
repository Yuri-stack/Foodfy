/*Lógica para carregar as informações das receitas - Logic for loading recipe information */

const recipes = document.querySelectorAll(".recipes")

    for(let i = 0; i < recipes.length; i++) {
        recipes[i].addEventListener('click', function() {
            window.location.href = `/recipes/${i}`;
        });
    }

/* Lógica para esconder/mostrar info das receitas - Logic to hide / show recipe info */

const info = document.querySelectorAll(".recipe-info")
const visibility = document.querySelectorAll(".visibility")

    for(let i = 0; i < visibility.length; i++){
        visibility[i].addEventListener('click', function(){

            if(info[i].classList.contains('hide')){
                info[i].classList.remove('hide')
                visibility[i].innerHTML = "ESCONDER"
            }else{
                info[i].classList.add('hide')
                visibility[i].innerHTML = "MOSTRAR"
            }
        })
    }