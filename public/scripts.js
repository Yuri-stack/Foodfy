/*Lógica para carregar as informações das receitas - Logic for loading recipe information */

const recipes = document.querySelectorAll(".recipes")

    for(let i = 0; i < recipes.length; i++) {
        recipes[i].addEventListener('click', function() {
            window.location.href = `/recipes/${i}`;
        });
    }

/* ======================================================================================= */

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

/* ======================================================================================= */

/* Lógica para personalizar o menu quando a página referente a ele estiver ativada*/

const currentPage = window.location.pathname                    /* Pega a posição atual da página */
const menuItems = document.querySelectorAll("header nav a")     /* Pega cada item do menu */
const header = document.querySelector("header")
const menuLogo = document.querySelector("header div a img")

for(item of menuItems){
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
    if(currentPage.includes("/admin")){
        item.classList.add("none")
    }
}

if(currentPage.includes("/admin")){
    header.classList.add("black-menu")
    menuLogo.classList.add("invert")
}

/* O INCLUDE verifica se algum termo de uma String existe e retorna True or False
    Ex: "instructors/2".include("instructors") = True
        "instructors/2".include("2") = True
        "instructors/2".include("k") = False
*/