const LoadRecipeService = require('../services/LoadRecipeService')
const LoadChefService = require('../services/LoadChefService')

module.exports = { 

    //Função para LISTAR as receitas no Index
    async index(req, res){
        try {
            const recipes = await LoadRecipeService.load('recipes')

            return res.render('public/index', { recipes })

        } catch (error) {
            console.error(error)
            return res.render('public/index', {
                error: "Houve um erro ao carregar as receitas, tente novamente"
            })
        }


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

    //Função para LISTAR os Chefs
    async listChef(req, res){
        try {
            const chefs = await LoadChefService.load('chefs')

            return res.render('public/chefs', { chefs })

        } catch (error) {
            console.error(error)
            return res.render('public/chefs', {
                error: "Houve um erro ao carregar os Chef, tente novamente"
            })
        }
    },

    //Função para LISTAR as receitas na Pag. Receitas
    async listRecipes(req, res){
        try {
            let { page, limit, filter } = req.query

            page = page || 1
            limit = limit || 6
            let offset = limit * (page - 1)

            const params = { page, limit, filter, offset }

            if(filter) {
                const recipes = await LoadRecipeService.load('recipes', params)

                const pagination = { total: Math.ceil(recipes[0].total / limit), page }
                return res.render('public/search', { recipes, pagination, filter })
            }else{
                const recipes = await LoadRecipeService.load('recipes')

                const pagination = { total: Math.ceil(recipes[0].total / limit), page }
                return res.render('public/recipes', { recipes, pagination })
            }
            
        } catch (error) {
            console.error(error)
            return res.render('public/recipes', {
                error: "Houve um erro ao carregar as Receitas, tente novamente"
            })
        }      
    },

    //Função para MOSTRAR os detalhes das receitas
    async showRecipe(req, res){
        try {
            const { id } = req.params
            const recipe = await LoadRecipeService.load('recipe', id)

            if(!recipe){
                return res.render('public/details', {
                    error: "Receita não encontrada, tente novamente mais tarde"
                })
            }

            return res.render('public/details', { recipe })

        } catch (error) {
            console.error(error)
            return res.render('public/details', {
                error: "Houve um erro na apresentação da Receita, tente novamente mais tarde"
            })
        }

        // const { id } = req.params

        // let results = await Public.showDataRecipes(id)
        // const recipe = results.rows[0]

        // if(!recipe) return res.send("Recipe not found / Receita não encontrada")

        // results = await Recipe.findImageRecipe(id)
        // const files = results.rows.map( file => ({
        //     src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`  
        // }))

        // return res.render("public/details", { recipe, files })

    }
}