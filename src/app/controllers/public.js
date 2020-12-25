const Public = require('../models/Public')

module.exports = {

    //Função para LISTAR as receitas no Index
    async index(req, res){

        const results = await Public.allRecipes()
        const recipes = results.rows

        return res.render('public/index', { recipes })

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
    async listRecipes(req, res){

        let { page, limit, filter } = req.query

        page = page || 1
        limit = limit || 6
        let offset = limit * (page - 1)

        if(filter){

            const params = { filter, limit, offset }

            const results = await Public.findBy(params)
            const recipes = results.rows

            const pagination = { total: Math.ceil(recipes[0].total / limit), page }

            return res.render('public/search', { recipes, pagination, filter })

        }else{

            const params = { filter, limit, offset }

            const results = await Public.paginate(params)
            const recipes = results.rows

            const pagination = { total: Math.ceil(recipes[0].total / limit), page }

            return res.render('public/recipes', { recipes, pagination, filter })

        }
        
    },

    //Função para MOSTRAR os detalhes das receitas
    async showRecipe(req, res){

        const { id } = req.params

        const results = await Public.showRecipe(id)
        const recipe = results.rows[0]

        if(!recipe) return res.send("Recipe not found")

        return res.render("public/details", { recipe })

    },

    //Função para LISTAR os Chefs
    async listChef(req, res){

        const results = await Public.allChefs()
        const chefs = results.rows

        return res.render('public/chefs', { chefs })

    }

}