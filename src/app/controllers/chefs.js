const db = require('../../config/db')
const { age, date } = require('../../lib/utils')

module.exports = {

    //Função para LISTAR as receitas no Index da Administração
    index(req, res){
        return res.render('admin/chefs/index.njk')
    },

    redirectCreate(req, res){
        return res.render('admin/chefs/create.njk')
    },

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

    }

}