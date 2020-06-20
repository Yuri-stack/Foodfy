//Variavéis

const data = require('../data')

//Função para LISTAR as receitas no Index da Administração
exports.index = function(req, res){
    return res.render('admin/index', {recipes : data})
}

//Função para MOSTRAR os detalhes da receitas
exports.show = function(req, res){
    return res.render('admin/details_recipe', {recipe : data})
} 



