const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {

    //Função para SELECIONAR todos os chefes
    all(callback){

        db.query(`SELECT * FROM chefs`, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })

    },
 
    //Função para CRIAR um novo Chef
    create(data, callback){         //data aqui é o req.body

        const query = `
            INSERT INTO chefs (
                name,
                avatar_url,
                created_at
            ) VALUES ($1, $2, $3)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows[0])

        })

    },

    //Função para RETORNAR os Chefs
    find(id, callback){

        let query = ""
            // recipeQuery = ""

        // recipeQuery = `(
        //     SELECT recipes.id, image, title, chefs.name AS chef_name
        //     FROM recipes
        //     LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        //     ) AS recipes
        //     `

        // SELECT recipes.*, chefs.name AS chef_name
        //     FROM recipes
        //     LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`
        
        query = `
            SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            WHERE chefs.id = $1
            GROUP BY chefs.id
        `

        db.query(query, [id], function(err, results){
                if(err) throw `Database Error! ${err}`

                callback(results.rows[0])
            }
        )

    }, 

    //Função para atualizar um Instrutor
    update(data, callback){

        const query = `
            UPDATE chefs SET
                name = ($1),
                avatar_url = ($2)
            WHERE id = $3
        `

        const values = [
            data.name,
            data.avatar_url,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback()
        })

    },

    //Função para apagar um Instrutor
    delete( id, callback ){

        db.query(`DELETE FROM chefs WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database Error! ${err}`

            return callback()
        })
    },

    //Função para RETORNAR os Chefs com suas respectivas Receitas
    chefRecipes(id, callback){

        let query = ""
            // recipeQuery = ""

        // recipeQuery = `(
        //     SELECT recipes.id, image, title, chefs.name AS chef_name
        //     FROM recipes
        //     LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        //     ) AS recipes
        //     `

        // SELECT recipes.*, chefs.name AS chef_name
        //     FROM recipes
        //     LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`
        
        query = `
            SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            WHERE chefs.id = $1
            GROUP BY chefs.id
        `

        db.query(query, [id], function(err, results){
                if(err) throw `Database Error! ${err}`

                callback(results.rows[0])
            }
        )

    }, 
}