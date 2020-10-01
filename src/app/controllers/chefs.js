module.exports = {

    //Função para LISTAR as receitas no Index da Administração
    index(req, res){
        return res.render('admin/chefs/index.njk')
    },

    redirectCreate(req, res){
        return res.render('admin/chefs/create.njk')
    },

}