//Variavéis

const data = require('../data')

//Função para LISTAR as receitas no Index
exports.index = function(req, res){
    return res.render('public/index', {recipes : data })
}

//Função para LISTAR as receitas na pag. Receitas
exports.list = function(req, res){
    return res.render('public/recipes', { recipes : data })
}

//Função para MOSTRAR os detalhes das receitas
exports.show = function(req, res){
    const index = req.params.id;
    const recipe = data[index]

    // return res.render('details_recipe', { recipe : recipe })
    return res.render('public/details_recipe', { recipe })
}



