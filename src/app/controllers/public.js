//Variavéis

const data = require('../data.json')

//Função para LISTAR as receitas no Index
exports.index = function(req, res){
    return res.render('public/index', {recipes : data.recipes })
}

//Função para LISTAR as receitas na pag. Receitas
exports.list = function(req, res){
    return res.render('public/recipes', { recipes : data.recipes })
}

//Função para MOSTRAR os detalhes das receitas
exports.show = function(req, res){
    const { id } = req.params

    const foundRecipe = data.recipes.find(function(recipe){
        return recipe.id == id
    })

    if(!foundRecipe) return res.send('Receita não encontrada')

    const recipe = {
        ...foundRecipe
    }

    return res.render('public/details_recipe', { recipe })
}



