const db = require('../../config/db')

module.exports = {

    //Função para SELECIONAR todas as Receitas
    allRecipes(callback){

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

    //Função para SELECIONAR todos os Chefs
    allChefs(callback){

        const query = `
            SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id) 
            GROUP BY chefs.id
            ORDER BY chefs.id ASC
        `

        db.query(query, function(err, results){
            if(err) throw `Database error! ${err}`
            callback(results.rows)
        })
    },

    //Função para RETORNAR os dados das Receitas
    showRecipes(id, callback){

        const query = `
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1
        `

        db.query(query, [id], function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })

    }
}