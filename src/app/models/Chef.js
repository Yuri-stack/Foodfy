const db = require('../../config/db')
const Base = require('./Base')

Base.init({ table: 'chefs' })

module.exports = {

    ...Base,

    //Função para Contar as receitas dos Chefs
    async countRecipe(id) {
        try {
            const query = `
            SELECT count(recipes) AS total_recipes
                FROM chefs
                LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
                WHERE chefs.id = $1
            `
            const results = await db.query(query, [id])
            return results.rows[0].total_recipes
        } catch (error) {
            console.log(error)
        }
    },

    //Função para RETORNAR aos Chefs suas respectivas Receitas
    async findRecipesChef(id) {
        try {
            const query = `
                SELECT recipes.*
                FROM recipes
                LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
                WHERE chefs.id = $1
                GROUP BY chefs.id, recipes.id
                ORDER BY recipes.created_at DESC
            `
            const results = await db.query(query, [id])
            return results.rows

        } catch (error) {
            console.log(error)
        }
    }
}