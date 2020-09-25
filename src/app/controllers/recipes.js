//Variavéis

const fs = require('fs')                //fs é um módulo que permite para interagir com o sistema de arquivos 
const data = require('../data.json')

//Função para LISTAR as receitas no Index da Administração
exports.index = function(req, res){
    return res.render('admin/index', {recipes : data.recipes})
}

//Função para REDIRECIONAR para a pag de Create
exports.redirectCreate = function(req, res){
    return res.render('admin/create')
}

//Função para CADASTRAR uma nova receita
exports.post = function(req, res){

    const keys = Object.keys(req.body).pop()    //Aqui eu pego todos os campos(keys) do formulário de receitas, exceto o último que é opcional

    for(key of keys){                           //verificando se cada key está preenchidas
        if(req.body[key] == ""){                //é o mesmo que fazer req.body.(cada item do vetor) == ""
            return res.send("Por favor, preencha todos os campos!") 
        }
    }

    let { image_url, name, author, ingredients, preparation, information} = req.body   //desestruturando o req.body

    let id = 1
    const lastRecipes = data.recipes[data.recipes.length - 1]

    if(lastRecipes){
        id = lastRecipes.id + 1
    }

    data.recipes.push({
        id,
        image_url,
        name,
        author,
        ingredients,
        preparation,
        information,
    })

    let infoData = JSON.stringify(data, null, 2)

    // fs.writeFile("data.json", JSON.stringify(data, null, 2), function(){}    //a forma inline da função abaixo 

    fs.writeFile(                                           //writeFile é um metodo do file system(fs) para escrever arquivos, que no caso serve para salvar as info.
        "data.json",                                        //primeiro parametro pede o nome do arquivo a ser gerado                                       
        infoData,                                           //segundo parametro pede o tipo do arquivo, usamos o constructor JSON com o metodo stringify para transformar as info carregadas no data.json em JSON. Dentro do stringify o 2º é o null por enquanto, e o 3º é o espaçamento entre as linhas do Array                                           
        function(err){                                      //terceiro parametro pede uma CallBack, função que executa após certo tempo e é passada como parametro dentro de outra função                                    
            if(err) return res.send("Erro ao cadastrar")    //no caso, usamos a CallBack para verificar se algum erro ocorreu, assim o processo do Programa não trava. 

            return res.redirect("/admin/recipes")           //se a gravação foi executada com sucesso, redireciona para a página de listagem
        })

}

//Função para MOSTRAR os detalhes da receitas
exports.show = function(req, res){

    const { id } = req.params

    const foundRecipe = data.recipes.find(function(recipe){
        return recipe.id == id
    })

    if(!foundRecipe) return res.send('Receita não encontrada')

    const recipe = {
        ...foundRecipe
    }

    return res.render('admin/details_recipe', {recipe : recipe})
} 

//Função para CARREGAR INFORMAÇÕES PARA EDITAR
exports.edit = function(req, res){

    const { id } = req.params

    const foundRecipe = data.recipes.find(function(recipe){
        return recipe.id == id
    })

    if(!foundRecipe) return res.send("Receita não encontrada")

    const recipe = {
        ...foundRecipe
    }

    return res.render('admin/edit', {recipe : recipe})
}

//Função para ATUALIZAR as receitas
exports.put = function(req, res){

    const { id } = req.body
    let index = 0

    const foundRecipe = data.recipes.find(function(recipe, foundIndex){ //vai procurar a receita e a posição dela no array
        if(id == recipe.id){
            index = foundIndex
            return true

            /* 
                verificamos se a receita procurada existe, e se existe pegamos seus dados e 
                também atualizamos a variavel index com a posição dessa receita no array 
            */
        }
    })

    if(!foundRecipe) return res.send('Receita não encontrada')

    const recipe = {
        ...foundRecipe,     //usando o operador Spread Operator onde ele armazena os campos do foundRecipe que não serão alterados
        ...req.body,        //usando o operador Spread Operator onde ele armazena os dados vindo do req.body
        id: Number(id)
    }

    data.recipes[index] = recipe
     /* pegamos as informações que foram alteradas e as que não foram relacionadas 
    a receita e atualizamos os dados dessa receita na posição dele */

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Erro ao atualizar")

        return res.redirect(`/admin/recipes/${id}`)
    })

}

//Função para APAGAR as receitas
exports.delete = function(req, res){

    const { id } = req.body

    const filteredRecipes = data.recipes.filter(function(recipe){
        return recipe.id != id
    })

    data.recipes = filteredRecipes

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Erro ao apagar a receita")

        return res.redirect(`/admin/recipes`)
    })

    /* Para cada receita dentro do array, o método Filter faz um filtro verificando se 
        o ID informado pelo req.body é diferente do ID que o método está verificando no Array.
     
        Quando o ID é diferente, ele é armazenado na constante filteredRecipes e quando 
        for igual, ou seja, é o ID do receita que queremos apagar ele é retirado do Array.
     */
}
