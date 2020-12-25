const db = require('../../config/db')

module.exports = {

    //Função para SELECIONAR todas as Receitas
    allRecipes(){

        try {

            const query = `
                SELECT recipes.*, chefs.name AS chef_name
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                ORDER BY recipes.id ASC LIMIT 6
            `

            return db.query(query)

        } catch (err) {
            console.log(err)
        }

    },

    //Função para SELECIONAR todos os Chefs
    allChefs(){

        try {
        
            const query = `
                SELECT chefs.*, count(recipes) AS total_recipes
                FROM chefs
                LEFT JOIN recipes ON (chefs.id = recipes.chef_id) 
                GROUP BY chefs.id
                ORDER BY chefs.id ASC
            `

            return db.query(query)
            
        } catch (err) {
            console.log(err)
        }

    },

    //Função para RETORNAR os dados das Receitas
    showRecipe(id){

        try {

            const query = `
                SELECT recipes.*, chefs.name AS chef_name
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE recipes.id = $1
            `

            return db.query(query, [id])
            
        } catch (error) {
            console.log(error)
        }

    },

    //Função para FILTRAR as Receitas
    findBy(params){

        try {
            
            const { filter, limit, offset } = params

            let totalQuery = `(
                SELECT count(*) FROM recipes
            ) AS total` 

            const query = `
                SELECT recipes.*, ${totalQuery}, chefs.name AS chef_name
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE recipes.title ILIKE '%${filter}%'
                ORDER BY recipes.id ASC LIMIT $1 OFFSET $2
            `

            return db.query(query, [limit, offset])

        } catch (error) {
            console.log(error)
        }

    },

    //Função relacionado a PAGINAÇÃO das Receitas
    paginate(params){

        try {

            const { filter, limit, offset } = params

            let query = "",
                filterQuery = "",
                totalQuery = `(
                    SELECT count(*) FROM recipes
                ) AS total
                `
    
            if( filter ){
                filterQuery = `WHERE recipes.title ILIKE '%${filter}%'`
    
                totalQuery = `(
                    SELECT count(*) FROM recipes
                    ${filterQuery}
                ) AS total`
            }
    
            query = `
                SELECT recipes.*, ${totalQuery}, chefs.name AS chef_name
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                ${filterQuery}
                ORDER BY recipes.id ASC LIMIT $1 OFFSET $2
            `
    
            return db.query(query, [limit, offset])         

        } catch (error) {
            console.log(error)
        }

    }

}