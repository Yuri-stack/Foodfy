const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {

    //Função para SELECIONAR todos os Chefs
    all(callback){

        let query = `
            SELECT * 
            FROM chefs
            ORDER BY chefs.id ASC
        `

        db.query(query, function(err, results){
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

    //Função para RETORNAR os dados dos Chefs
    find(id, callback){

        let query = `
            SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            WHERE chefs.id = $1
            GROUP BY chefs.id
            ORDER BY chefs.id ASC
        `

        db.query(query, [id], function(err, results){
                if(err) throw `Database Error! ${err}`

                callback(results.rows[0])
            }
        )

    }, 

    //Função para ATUALIZAR um Chef
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

    //Função para APAGAR um Chef
    delete( id, callback ){

        db.query(`DELETE FROM chefs WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database Error! ${err}`

            return callback()
        })
    },

    //Função para RETORNAR os Chefs com suas respectivas Receitas
    chefRecipes(id, callback){

        let 
            query = ""
            countRecipe = ""
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
        
        // countRecipe = `
        //     SELECT count(recipes) 
        //     FROM chefs
        //     LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        //     WHERE chefs.id = $1
        //     GROUP BY chefs.id
        // `

        // query = `
        //     SELECT chefs.*, ${countRecipe} AS total_recipes
        //     FROM chefs
        //     LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        //     WHERE chefs.id = $1
        //     GROUP BY chefs.id, recipes.id
        // `


        query = `
            SELECT recipes.*
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            WHERE chefs.id = $1
            GROUP BY chefs.id, recipes.id
        `

        // query = `
        // SELECT recipes.title
        //   FROM recipes
        //   LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        //   WHERE chefs.id = $1
        //   GROUP BY recipes.id
        // `

        db.query(query, [id], function(err, results){
                if(err) throw `Database Error! ${err}`

                // console.log(results.rows)
                callback(results.rows)
            }
        )

    }, 
}