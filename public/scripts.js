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
        item.remove()
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

/* ======================================================================================= */

/* Lógica para adicionar campos dinâmicos*/

const AddField = {  

    add(parentSelector){
        const parent = document.querySelector(parentSelector)

        if(parent){
            const fields = parent.querySelectorAll("input");

            // let campo = 
            // console.log(fields) //ELE ESTÁ PEGANDO TODOS OS IMPUTS DA TELA
            // // console.log(pai)
            // // console.log(fields.closest("#newIngredient"))

            const lastField = fields[fields.length - 1];

            // console.log(lastField)

            if (lastField && lastField.value === '') return false;  //O ERRO TÁ AQUI ARRUMAR

            const newField = lastField && lastField.cloneNode(true);

            newField.value = '';

            parent.appendChild(newField);

            return newField;

        }

        return false
    },

    listen(){
        const addIngredient = document.querySelector(".fieldIngredient")
        const addPreparation = document.querySelector(".fieldPreparation")

        if(addIngredient){
            document
                .querySelector('.fieldIngredient')
                .addEventListener("click", () => { AddField.add('#newIngredient') })
        }

        if(addPreparation){
            document
                .querySelector('.fieldPreparation')
                .addEventListener("click", () => { AddField.add('#newPreparation') })
        }
    }
}

// O PROBLEMA É QUE ELE SEMPRE PEGA O CAMPO DE PREPARAÇÃO, MESMO QUE EU CLIQUE NO INGREDIENTE

AddField.listen()
// console.log(AddField.listen())

// function addDinamicField() {
//     const dinamicField = document.querySelector(".dinamicField");
//     const fields = document.querySelectorAll(".fields");
  
//     // Realiza um clone do último ingrediente adicionado
//     const newField = fields[fields.length - 1].cloneNode(true);
  
//     // Não adiciona um novo input se o último tem um valor vazio
//     if (newField.children[0].value == "") return false;
  
//     // Deixa o valor do input vazio
//     newField.children[0].value = "";
//     dinamicField.appendChild(newField);
//   }
  
//   document
//     .querySelector(".addField")
//     .addEventListener("click", addDinamicField);