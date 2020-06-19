//Variavéis

const data = require('../data')

//Função para LISTAR as receitas no Index da Administração
exports.index = function(req, res){
    return res.render('admin/index', {recipes : data})
}

//Função para LISTAR as receitas na pag. Receitas
exports.list = function(req, res){
    return res.render('recipes', { recipes : data })
}

//Função para mostrar os detalhes das receitas
exports.details = function(req, res){
    const index = req.params.id;
    const recipe = data[index]

    // return res.render('details_recipe', { recipe : recipe })
    return res.render('details_recipe', { recipe })
}



