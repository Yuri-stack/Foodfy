module.exports = {

    //Função para LISTAR as receitas no Index da Administração
    index(req, res){
        return res.render('admin/index')
    },

    //Função para REDIRECIONAR para a pag de Create
    redirectCreate(req, res){
        return res.render('admin/create')
    },

    //Função para CADASTRAR uma nova receita
    post(req, res){

        const keys = Object.keys(req.body).pop()    //Aqui eu pego todos os campos(keys) do formulário de receitas, exceto o último que é opcional

        for(key of keys){                           //verificando se cada key está preenchidas
            if(req.body[key] == ""){                //é o mesmo que fazer req.body.(cada item do vetor) == ""
                return res.send("Por favor, preencha todos os campos!") 
            }
        }

        let { image_url, name, author, ingredients, preparation, information} = req.body   //desestruturando o req.body

        return

    },

    //Função para MOSTRAR os detalhes da receitas
    show(req, res){

        return

    },

    //Função para CARREGAR INFORMAÇÕES PARA EDITAR
    edit(req, res){

        return

    },

    //Função para ATUALIZAR as receitas
    put(req, res){

        const keys = Object.keys(req.body).pop()    //Aqui eu pego todos os campos(keys) do formulário de receitas, exceto o último que é opcional

        for(key of keys){                           //verificando se cada key está preenchidas
            if(req.body[key] == ""){                //é o mesmo que fazer req.body.(cada item do vetor) == ""
                return res.send("Por favor, preencha todos os campos!") 
            }
        }

        return

    },

    //Função para APAGAR as receitas
    delete(req, res){

        return
    
    }

}