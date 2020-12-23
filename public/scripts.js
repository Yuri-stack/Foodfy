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
const menuItems = document.querySelectorAll("header .container nav a")     /* Pega cada item do menu */
const header = document.querySelector("header")
const menuLogo = document.querySelector("header .container div a img")

for(item of menuItems){
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
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

/* Lógica para a PAGINAÇÃO */

function paginate(selectedPage, totalPages){

    let pages = [],
        oldPage

    for(let currentPage = 1; currentPage <= totalPages; currentPage++){

        const firsAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

        if(firsAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage){

            if(oldPage && currentPage - oldPage > 2){
                pages.push("...")
            }

            if(oldPage && currentPage - oldPage == 2){
                pages.push(oldPage + 1)
            }

                pages.push(currentPage)

                oldPage = currentPage

            }   
        }

    console.log(pages)

    return pages

}

function createPagination(pagination){
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const pages = paginate(page, total)
    
    let elements = ""
    
    for(let page of pages){
        if(String(page).includes("...")){
            elements += `<span>${page}</span>`
        }else{
            elements += `<a href="?page=${page}">${page}</a>`
        }
    }
    
    pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination")

if(pagination){
    createPagination(pagination)
}

/* ======================================================================================= */

/* Lógica para adicionar campos dinâmicos*/

const AddField = {  

    add(parentSelector){
        const parent = document.querySelector(parentSelector)

        if(parent){

            const fields = parent.querySelectorAll("input");

            const lastField = fields[fields.length - 1];

            if (lastField && lastField.value === '') return false;  

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

AddField.listen()

/* ======================================================================================= */

/* Lógica para fazer o upload das fotos dos arquivos*/

const PhotosUpload = {

    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 5,
    files: [],

    handleFileInput(event){
        const { files: filesList } = event.target
        PhotosUpload.input = event.target

        if(PhotosUpload.hasLimit(event)) return
        
        Array.from(filesList).forEach(file => {

            PhotosUpload.files.push(file)

            const reader = new FileReader()                     //instanciando um construtor para carregar um arquivo

            reader.onload = () => {
                const image = new Image()                       //criando uma tag <img />
                image.src = String(reader.result)               //resultado do carregamento

                const div = PhotosUpload.getContainer(image)    //chama o método e passa a image para ele
                PhotosUpload.preview.appendChild(div)

            }

            reader.readAsDataURL(file)
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },

    hasLimit(event){
        const { uploadLimit, input, preview } = PhotosUpload
        const { files: fileList } = input

        //Validando a quantidade de fotos enviadas
        if( fileList.length > uploadLimit ){
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }

        const photosDiv = []
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == "photo"){
                photosDiv.push(item)
            }
        })

        const totalPhotos = fileList.length + photosDiv.length
        if(totalPhotos > uploadLimit){
            alert('Você atingiu o máximo de fotos')
            event.preventDefault()
            return true
        }

        return false
    },

    getAllFiles(){
        // Construto para guardar dados arrastados durante uma operação de Arrastar e Soltar
        const dataTransfer = 
            new ClipboardEvent("").clipboardData || // o clipboard é para o Firefox
            new DataTransfer()                      
        
        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
        
    },

    getContainer(image){
        const container = document.createElement('div')         //chama o método e passa a image para ele
        container.classList.add('photo')

        container.onclick = PhotosUpload.removePhoto            //executa a função para remover a photo
        
        container.appendChild(image)                            //add a image na DIV chamada Container
        container.appendChild(PhotosUpload.getRemoveButton())   //add o button na DIV chamada Container

        return container
    },

    getRemoveButton(){
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },

    removePhoto(event){
        const photoDiv = event.target.parentNode                        // o event.target é o I, o parentNode é um item acima, ou seja, a DIV class Photo
        const photosArray = Array.from(PhotosUpload.preview.children)   // carrega as fotos no photosArray
        const index = photosArray.indexOf(photoDiv)                     // busca o index do item/foto clicado

        PhotosUpload.files.splice(index, 1)                             // encontra o item do array e remove ele
        PhotosUpload.input.files = PhotosUpload.getAllFiles()           // o input é recarregado com o método 

        photoDiv.remove()
    }
}
