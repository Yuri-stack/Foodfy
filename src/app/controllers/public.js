const Public = require('../models/Public')
const Chef = require('../models/Chef')
const Recipe = require('../models/Recipe')

module.exports = { 

    //Função para LISTAR as receitas no Index
    async index(req, res){

        const results = await Public.allRecipes()
        const recipes = results.rows

        /* Função para buscar o endereço de cada img das receitas */
        async function getImage(recipeId){
            let results = await Recipe.recipeFiles(recipeId)
            const files = results.rows.map(file =>
                `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
            )
            return files[0]
        }

        /* Função que atualiza o source da receita com o resultado da Função anterior */
        const recipesPromises = recipes.map(async recipe => {
            recipe.src = await getImage(recipe.id)
            return recipe
        })

        await Promise.all(recipesPromises)

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

            /* Função para buscar o endereço de cada img das receitas */
            async function getImage(recipeId){
                let results = await Recipe.recipeFiles(recipeId)
                const files = results.rows.map(file =>
                    `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
                )
                return files[0]
            }
    
            /* Função que atualiza o source da receita com o resultado da Função anterior */
            const recipesPromises = recipes.map(async recipe => {
                recipe.src = await getImage(recipe.id)
                return recipe
            })
    
            await Promise.all(recipesPromises)

            const pagination = { total: Math.ceil(recipes[0].total / limit), page }

            return res.render('public/recipes', { recipes, pagination, filter })

        }
        
    },

    //Função para MOSTRAR os detalhes das receitas
    async showRecipe(req, res){

        const { id } = req.params

        let results = await Public.showRecipe(id)
        const recipe = results.rows[0]

        if(!recipe) return res.send("Recipe not found / Receita não encontrada")

        results = await Recipe.recipeFiles(id)
        const files = results.rows.map( file => ({
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`  
        }))

        return res.render("public/details", { recipe, files })

    },

    //Função para LISTAR os Chefs
    async listChef(req, res){

        const results = await Public.allChefs()
        const chefs = results.rows

        /* Função para buscar o endereço de cada img dos chefs */
        async function getImage(chefId){
            let results = await Chef.chefFiles(chefId)
            const files = results.rows.map(file =>
                `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
            )
            return files[0]
        }

        /* Função que atualiza o source do chef com o resultado da Função anterior */
        const chefsPromise = chefs.map(async chef => {
            chef.src = await getImage(chef.id)
            return chef
        })

        await Promise.all(chefsPromise)

        return res.render('public/chefs', { chefs })

    }

}