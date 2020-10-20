const Chef = require('../models/Chef')

module.exports = { 
 
    //Função para LISTAR os Chefs no Index da Administração
    index(req, res){ 

        Chef.all(function(chefs){
            return res.render('admin/chefs/index', { chefs })
        })

    },

    //Função para REDIRECIONAR para a página de criação
    redirectCreate(req, res){
        return res.render('admin/chefs/create.njk')
    },

    //Função para CADASTRAR um novo Chef
    post(req, res){

        const keys = Object.keys(req.body)          //Aqui eu pego todos os campos(keys) do formulário de chefs

        for(key of keys){                           //verificando se cada key está preenchidas
            if(req.body[key] == ""){                //é o mesmo que fazer req.body.(cada item do vetor) == ""
                return res.send("Please fill in all the fields!") 
            }
        }

        Chef.create(req.body, function(chef){
            return res.redirect(`/admin/chefs/${ chef.id }`)
        })

    },

    //Função para MOSTRAR os detalhes do Chef
    show(req, res){

        Chef.find(req.params.id, function(chef){

            if(!chef) return res.send("Chef not found")

                Chef.chefRecipes(req.params.id, function(recipes){

                    return res.render('admin/chefs/details', { chef, recipes })
            })

        })

    },

    //Função para CARREGAR informações para editar
    edit(req, res){

        Chef.find(req.params.id, function(chef){

            if(!chef) return res.send("Chef not found")

            return res.render('admin/chefs/edit', { chef })
        })


    },

    //Função para ATUALIZAR
    put(req, res){

        const keys = Object.keys(req.body)          //Aqui eu pego todos os campos(keys) do formulário de chefs

        for(key of keys){                           //verificando se cada key está preenchidas
            if(req.body[key] == ""){                //é o mesmo que fazer req.body.(cada item do vetor) == ""
                return res.send("Please fill in all the fields!") 
            }
        }

        Chef.update(req.body, function() {
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })

    },

    //Função para APAGAR
    delete(req, res){

        Chef.delete(req.body.id, function() {
            return res.redirect(`/admin/chefs`)
        })

    }

}