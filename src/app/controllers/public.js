const Public = require('../models/Public')

module.exports = {

    //Função para LISTAR as receitas no Index
    index(req, res){

        Public.allRecipes(function(recipes){
            return res.render('public/index', { recipes })
        })
    },

    //Função para REDIRECIONAR para a Pag. Index
    redirectIndex(req, res){ 
        return res.redirect('/index') 
    },

    //Função para REDIRECIONAR para a Pag. Sobre
    redirectAbout(req,res){ 
        return res.render('public/about') 
    },

    //Função para LISTAR as receitas na Pag. Receitas
    listRecipes(req, res){

        let { page, limit, filter } = req.query

        page = page || 1
        limit = limit || 6
        let offset = limit * (page - 1)

        if(filter){

            const params = { filter, limit, offset }

            Public.findBy(params, function(recipes){

                const pagination = {
                    total: Math.ceil(recipes[0].total / limit), 
                    page
                }

                return res.render('public/search', { recipes, pagination, filter })
            })

        }else{

            const params = {
                filter, 
                limit, 
                offset, 
                callback(recipes){

                    const pagination = {
                        total: Math.ceil(recipes[0].total / limit), 
                        page
                    }

                    return res.render('public/recipes', { recipes, pagination, filter })
                }
            }

            Public.paginate(params)

        }
        
    },

    //Função para MOSTRAR os detalhes das receitas
    showRecipes(req, res){

        Public.showRecipes(req.params.id, function(recipe){

            if(!recipe) return res.send("Recipe not found")

            return res.render("public/details", { recipe })

        })
    
    },

    //Função para LISTAR os Chefs
    listChef(req, res){

        Public.allChefs(function(chefs){
            return res.render('public/chefs', { chefs })
        })

    }

}