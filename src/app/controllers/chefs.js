const db = require('../../config/db')
const { age, date } = require('../../lib/utils')

module.exports = {

    //Função para LISTAR as receitas no Index da Administração
    index(req, res){
        return res.render('admin/chefs/index.njk')
    },

    //Função para REDIRECIONAR para a pag de Create
    redirectCreate(req, res){
        return res.render('admin/chefs/create.njk')
    },

    //Função para CADASTRAR um novo Chef
    post(req, res){

        const keys = Object.keys(req.body)          //Aqui eu pego todos os campos(keys) do formulário de chefs

        for(key of keys){                           //verificando se cada key está preenchidas
            if(req.body[key] == ""){                //é o mesmo que fazer req.body.(cada item do vetor) == ""
                return res.send("Por favor, preencha todos os campos!") 
            }
        }

        const query = `
            INSERT INTO chefs (
                name,
                avatar_url,
                created_at
            ) VALUES ($1, $2, $3)
            RETURNING id
        `

        const values = [
            req.body.name,
            req.body.avatar_url,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results){
            if(err) return res.send("Database Error!")

            return res.redirect(`/chefs/${results.rows[0].id}`)
        })

    },

    //Função para MOSTRAR os detalhes da receitas
    show(req, res){

        return res.render('admin/chefs/details.njk')

    },

    //Função para CARREGAR INFORMAÇÕES PARA EDITAR
    edit(req, res){

        return res.render('admin/chefs/edit.njk')

    },



}