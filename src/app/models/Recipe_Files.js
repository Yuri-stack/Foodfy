const db = require('../../config/db')
const fs = require('fs')

module.exports = {

    //Função para CRIAR as imagens das Receitas no Banco de Dados
    create(recipeID, fileID){

        try {
            const query = `INSERT INTO recipe_files (recipe_id, file_id) VALUES ($1,$2) RETURNING id`
            const values = [recipeID, fileID]

            return db.query(query, values)
            
        } catch (error) {
            console.log(error)
        }

    },

    //Função para APAGAR as imagens do Banco de Dados
    async delete({ recipeID, fileID }){

        try{
            return db.query(`
                DELETE FROM recipe_files 
                WHERE recipe_id = $1 AND file_id = $2`, [recipeID, fileID]);
        }catch (error) {
            console.log(error)
        }

    }
}