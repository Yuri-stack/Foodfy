const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = { 

    //Função para SELECIONAR todas as Receitas
    all(){
        try {
            const query = `
                SELECT recipes.*, chefs.name AS chef_name
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)   
                ORDER BY recipes.created_at DESC
            ` 
            return db.query(query)
        } catch (error) {
            console.log(error)
        }
    },

    //Função para CRIAR uma nova Receita
    create({chef, title, ingredients, preparation, information}){
        try {
            const query = `
                INSERT INTO recipes (title,ingredients,preparation,information,created_at,chef_id) 
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id 
            `
            const values = [title, ingredients, preparation, information, date(Date.now()).iso,chef]
            return db.query(query, values)

        } catch (error) {
            console.log(error)
        }
    },

    //Função para RETORNAR os dados das Receitas
    find(id){
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

    //Função para ATUALIZAR uma Receita
    update({chef, title, ingredients, preparation, information, id}){

        try {
            const query = `
                UPDATE recipes SET
                    title = ($1),
                    ingredients = ($2),
                    preparation = ($3),
                    information = ($4),
                    chef_id = ($5)
                WHERE id = ($6) 
            `
        const values = [ title, ingredients, preparation, information, chef, id]
        return db.query(query, values)
            
        } catch (error) {
            console.log(error)
        }
    },

    //Função para APAGAR uma Receita
    delete(id){

        try {
            const query = `DELETE FROM recipes WHERE id = $1`
            return db.query(query, [id])
        } catch (error) {
            console.log(error)
        }
    },

    //Função que CARREGA os nomes dos Chefs para o Form das Receitas
    chefSelectOptions(){

        try {
            const query = `SELECT name, id FROM chefs ASC`
            return db.query(query)
        } catch (error) {
            console.log(error)
        }
    },

    //Função para CRIAR as imagens das Receitas no Banco de Dados
    createImageRecipe(recipeId, fileId){

        try {
            const query = `INSERT INTO recipe_files (recipe_id, file_id) VALUES ($1,$2) RETURNING id`
            const values = [recipeId, fileId]

            return db.query(query, values)
            
        } catch (error) {
            console.log(error)
        } 

    },

    //Função para RETORNAR as Receitas suas respectivas Imagens
    findImageRecipe(id){

        try {
            const query =`
            SELECT files.* FROM files 
            LEFT JOIN recipe_files ON (files.id = recipe_files.file_id)
            LEFT JOIN recipes ON (recipes.id = recipe_files.recipe_id) 
            WHERE recipes.id = $1`;

            return db.query(query, [id]);

        } catch (error) {
            console.error(error);
            console.log("Erro recipeFile")
        }
    },

    //Função para APAGAR as imagens do Banco de Dados
    async deleteImageRecipe({ recipeId, fileId }){

        try{
            return db.query(`
                DELETE FROM recipe_files 
                WHERE recipe_id = $1 AND file_id = $2`, [recipeId, fileId]);
        }catch (error) {
            console.log(error)
        }

    }

 }