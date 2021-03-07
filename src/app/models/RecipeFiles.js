const db = require('../../config/db')

module.exports = {

    //Função para CRIAR as imagens das Receitas no Banco de Dados
    create(recipeId, fileId){

        try {
            const query = `INSERT INTO recipe_files (recipe_id, file_id) VALUES ($1,$2) RETURNING id`
            const values = [recipeId, fileId]

            return db.query(query, values)
            
        } catch (error) {
            console.log(error)
        }

    },

    //Função para APAGAR as imagens do Banco de Dados
    async delete({ recipeId, fileId }){

        try{
            return db.query(`
                DELETE FROM recipe_files 
                WHERE recipe_id = $1 AND file_id = $2`, [recipeId, fileId]);
        }catch (error) {
            console.log(error)
        }

    }
}