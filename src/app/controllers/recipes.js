const Recipe = require('../models/Recipe')

module.exports = {

    //Função para LISTAR as receitas no Index da Administração
    index(req, res){
        
        Recipe.all(function(recipes){
            return res.render('admin/recipes/index', { recipes })
        })

    },

    //Função para REDIRECIONAR para a pag de Create
    redirectCreate(req, res){

        Recipe.chefSelectOptions(function(options){
            return res.render('admin/recipes/create', { chefOptions : options })
        })

    },

    //Função para CADASTRAR uma nova receita
    post(req, res){

        const keys = Object.keys(req.body).pop()    //Aqui eu pego todos os campos(keys) do formulário de receitas, exceto o último que é opcional

        for(key of keys){                           //verificando se cada key está preenchidas
            if(req.body[key] == ""){                //é o mesmo que fazer req.body.(cada item do vetor) == ""
                return res.send("Por favor, preencha todos os campos!") 
            }
        }

        Recipe.create(req.body, function(recipe){
            return res.redirect(`/admin/recipes/${ recipe.id }`)
        })

    },

    //Função para MOSTRAR os detalhes da receitas
    show(req, res){

        Recipe.find(req.params.id, function(recipe){

            if(!recipe) return res.send("Recipe not found")

            return res.render('admin/recipes/details', { recipe })   
        })

    },

    //Função para CARREGAR INFORMAÇÕES PARA EDITAR
    edit(req, res){

        Recipe.find(req.params.id, function(recipe){

            if(!recipe) return res.send("Recipe not found")

            Recipe.chefSelectOptions(function(options){
                return res.render('admin/recipes/edit', { recipe, chefOptions : options })
            })

        })

    },

    //Função para ATUALIZAR as receitas
    put(req, res){

        const keys = Object.keys(req.body).pop()    //Aqui eu pego todos os campos(keys) do formulário de receitas, exceto o último que é opcional

        for(key of keys){                           //verificando se cada key está preenchidas
            if(req.body[key] == ""){                //é o mesmo que fazer req.body.(cada item do vetor) == ""
                return res.send("Por favor, preencha todos os campos!") 
            }
        }

        Recipe.update(req.body, function(){
            return res.redirect(`/admin/recipes/${req.body.id}`)
        })

    },

    //Função para APAGAR as receitas
    delete(req, res){

         Recipe.delete(req.body.id, function(){
            return res.redirect(`/admin/recipes`)
         })
    
    }

}