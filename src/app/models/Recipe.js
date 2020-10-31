const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {

    //Função para SELECIONAR todas as Receitas
    all(callback){ 

        const query = `
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            ORDER BY recipes.id ASC        
        `

        db.query(query, function(err, results){
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

    //Função para RETORNAR os dados das Receitas
    find(id, callback){

        const query = `
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1
        `

        db.query(query, [id], function(err, results){
            if(err) throw `Database error! ${err}`

            callback(results.rows[0])
    })

    },

    //Função para ATUALIZAR uma Receita
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

    //Função para APAGAR uma Receita
    delete(id, callback){

        const query = `
            DELETE FROM recipes WHERE id = $1
        `

        db.query(query, [id], function(err, results){
            if(err) throw `Database Error! ${err}`

            callback()
        })

    },

    //Função que CARREGA os nomes dos Chefs para o Form das Receitas
    chefSelectOptions(callback){

        const query = `
            SELECT name, id FROM chefs
        `

        db.query(query, function(err, results){
            if(err) throw `Database error! ${err}`

            callback(results.rows)
        })

    }

 }