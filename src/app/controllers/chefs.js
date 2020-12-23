const Chef = require('../models/Chef')

module.exports = { 
 
    //Função para LISTAR os Chefs no Index da Administração
    async index(req, res){ 

        const results = await Chef.all()
        const chefs = results.rows

        return res.render('admin/chefs/index', { chefs })

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
    async show(req, res){

        const { id } = req.params

        let results = await Chef.find(id)
        const chef = results.rows[0]

        if(!chef) return res.send("Chef not found")

        results = await Chef.chefRecipes(id)
        const recipes = results.rows

        return res.render('admin/chefs/details', { chef, recipes })
    },

    //Função para CARREGAR informações para editar
    async edit(req, res){

        const { id } = req.params

        let results = await Chef.find(id)
        const chef = results.rows[0]

        if(!chef) return res.send("Chef not found")

        return res.render('admin/chefs/edit', { chef })

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
    async delete(req, res){

        const { id } = req.body

        const chef = await Chef.find(id)

        if(chef.total_recipes >= 1){
            return res.send('Chefs que possuem receitas não podem ser apagados')
        }

        await Chef.delete(id)
        return res.redirect(`/admin/chefs`)
    }

}