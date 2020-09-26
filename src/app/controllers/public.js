module.exports = {

    //Função para LISTAR as receitas no Index
    index(req, res){
        return res.render('public/index')
    },

    //Função para LISTAR as receitas na pag. Receitas
    list(req, res){
        return res.render('public/recipes')
    },

    //Função para MOSTRAR os detalhes das receitas
    show(req, res){

        return
    
    }

}