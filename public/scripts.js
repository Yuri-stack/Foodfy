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

const currentPage = window.location.pathname                               /* Pega a posição atual da página */
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
}

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

    return pages

}

function createPagination(pagination){
    const filter = pagination.dataset.filter
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const pages = paginate(page, total)
    
    let elements = ""
    
    for(let page of pages){
        if(String(page).includes("...")){
            elements += `<span>${page}</span>`
        }else{
            if (filter) {
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }
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

/* Lógica para fazer o upload das fotos das Receitas*/
const PhotosUpload = {

    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 5,
    files: [],

    handleFileInput(event){
        const { files: filesList } = event.target
        PhotosUpload.input = event.target

        if(PhotosUpload.hasLimit(event)){
            PhotosUpload.updateInputFiles()
            return
        }
        
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

        PhotosUpload.updateInputFiles()
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
        const newFiles = Array.from(PhotosUpload.preview.children)      
            .filter(function(file) {
                if(file.classList.contains('photo') && !file.getAttribute('id')) return true
            })                                                          // carrega as fotos no photosArray
        
        const index = newFiles.indexOf(photoDiv)                        // busca o index do item/foto clicado
        PhotosUpload.files.splice(index, 1)                             // encontra o item do array e remove ele

        PhotosUpload.updateInputFiles()
        photoDiv.remove()
    },

    removeOldPhoto(event){
        const photoDiv = event.target.parentNode

        if(photoDiv.id){
            const removedFiles = document.querySelector('input[name="removed_file"]')
            if(removedFiles){
                removedFiles.value += `${photoDiv.id},`
            }
        }

        photoDiv.remove()
    },

    updateInputFiles(){
        PhotosUpload.input.files = PhotosUpload.getAllFiles()           // o input é recarregado com o método 
    }
}

/* Lógica para fazer o upload das fotos dos Chefs*/
const ChefPhotoUpload = {

    input: "",
    previewChef: document.querySelector('#photo-preview'),
    uploadLimit: 1,
    files: [],

    handleFileInput(event){
        const { files: fileList } = event.target
        ChefPhotoUpload.input = event.target

        if(ChefPhotoUpload.hasLimit(event)){
            ChefPhotoUpload.updateInputFile()
            return
        } 

        Array.from(fileList).forEach(file => {

            ChefPhotoUpload.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = ChefPhotoUpload.getContainer(image)
                ChefPhotoUpload.previewChef.appendChild(div)
            }

            reader.readAsDataURL(file)
        })

        ChefPhotoUpload.updateInputFile()
    },

    hasLimit(event){
        const { uploadLimit, input, previewChef } = ChefPhotoUpload
        const { files: fileList } = input

        //Validando a quantidade de fotos enviadas
        if( fileList.length > uploadLimit ){
            alert(`Envie no máximo ${uploadLimit} foto`)
            event.preventDefault()
            return true
        }

        const photoDiv = []
        previewChef.childNodes.forEach(item => {
            if(item.classList && item.classList.value == "photo"){
                photoDiv.push(item)
            }
        })

        const totalPhotos = fileList.length + photoDiv.length
        if(totalPhotos > uploadLimit){
            alert('Você atingiu o máximo de fotos')
            event.preventDefault()
            return true
        }

        return false
    },

    getAllFiles(){
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()
        
        ChefPhotoUpload.files.forEach(file => dataTransfer.items.add(file))
        
        return dataTransfer.files
    },

    getContainer(image){
        const container = document.createElement('div')
        container.classList.add('photo')

        container.onclick = ChefPhotoUpload.removePhoto

        container.appendChild(image)
        container.appendChild(ChefPhotoUpload.getRemoveButton())

        return container
    },

    getRemoveButton(){
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },

    removePhoto(event){
        const photoDiv = event.target.parentNode
        const newFile = Array.from(ChefPhotoUpload.previewChef.children)
            .filter(function(file) {
                if(file.classList.contains('photo') && !file.getAttribute('id')) return true
            }) 

        const index = newFile.indexOf(photoDiv)
        ChefPhotoUpload.files.splice(index, 1)
        
        ChefPhotoUpload.updateInputFile()
        photoDiv.remove()
    },

    removeOldPhoto(event){
        const photoDiv = event.target.parentNode

        if(photoDiv.id){
            const removedFiles = document.querySelector('input[name="removed_file"]')
            if(removedFiles){
                removedFiles.value += `${photoDiv.id},`
            }
        }

        photoDiv.remove()
    },

    updateInputFile(){
        PhotosUpload.input.files = ChefPhotoUpload.getAllFiles()
    }

}

/* Lógica para fazer a troca das imagens na Galeria */
const ImageGallery = {

    highlight: document.querySelector('.gallery .highlight > img'),
    previews: document.querySelectorAll('.gallery-preview img'),

    setImage(e){
        const { target } = e

        ImageGallery.previews.forEach(preview => preview.classList.remove('active'))
        target.classList.add('active')

        ImageGallery.highlight.src = target.src

    }

}

/* Lógica para fazer a validação */
const Validate = {

    apply(input, func){
        Validate.clearErrors(input)

        let results = Validate[func](input.value)
        input.value = results.value

        if(results.error)
            Validate.displayError(input, results.error)

    },

    displayError(input, error){
        const div = document.createElement('div')
        div.classList.add('error')
        div.innerHTML = error
        input.parentNode.appendChild(div)

        input.focus()
    },

    clearErrors(input){
        const errorDiv = input.parentNode.querySelector(".error")

        if(errorDiv)
            errorDiv.remove()
    },

    isEmail(value){
        let error = null
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/  //Expressão Regular para validar o email

        if(!value.match(mailFormat)){
            error = "Email inválido"
        }

        return{
            error,
            value
        }
    },

    allFields(e){
        const items = document.querySelectorAll('.item input, .item select')

        for(item of items){
            if(item.value == ""){
                const message = document.createElement('div')

                message.classList.add('messages')
                message.classList.add('error')

                message.style.position = 'fixed'
                message.innerHTML = "Os campos são obrigatórios"
                
                document.querySelector('body').append(message)

                e.preventDefault()
            }
        }
    }

}

AddField.listen()
