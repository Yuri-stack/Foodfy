 const db = require('../../config/db')
 const { date } = require('../../lib/utils')

 module.exports = {

    //Função para SELECIONAR todas as receitas
    all(callback){

        db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`, function(err, results){
                if(err) throw `Database error! ${err}`

                callback(results.rows)
        })

    },

    //Função para CRIAR uma nova Receita
    create(data, callback){

        const query = `
            INSERT INTO recipes (
                chef_id,
                image,
                title,
                ingredients,
                preparation,
                information,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id 
        `

        const values = [
            data.chef,
            data.image_url,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })

    },

    //Função para RETORNAR as Receitas
    find(id, callback){

        db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1`, [id], function(err, results){
                if(err) throw `Database Error! ${err}`

                callback(results.rows[0])
            }
        )

    },

    //Função para atualizar uma Receita
    update(data, callback){

        const query = `
            UPDATE recipes SET
                chef_id = ($1),
                image = ($2),
                title = ($3),
                ingredients = ($4),
                preparation = ($5),
                information = ($6)
            WHERE id = ($7) 
        `

        const values = [
            data.chef,
            data.image_url,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback()
        })

    },

    //Função para apagar uma Receita
    delete(id, callback){

        db.query(`DELETE FROM recipes WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database Error! ${err}`

            callback()
        })

    },

    //Função que traz os dados do Chef para o Form do Recipes
    chefSelectOptions(callback){

        db.query(`SELECT name, id FROM chefs`, function(err, results){
            if(err) throw `Database error! ${err}`

            callback(results.rows)
        })

    }

 }