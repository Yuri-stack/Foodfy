const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {

    //Função para SELECIONAR todos os Chefs 
    all(){
        try {
            const query = `SELECT * FROM chefs ORDER BY chefs.id ASC`
            return db.query(query)
        } catch (error) {
            console.log(error)
        }
    },
 
    //Função para CRIAR um novo Chef
    create(name, file_id){
        try {
            const query = `
                INSERT INTO chefs (name, created_at, file_id) VALUES ($1, $2, $3)
                RETURNING id
            `
            const values = [ name, date(Date.now()).iso, file_id]
            return db.query(query, values)
        } catch (error) {
            console.log(error)
        }

    },

    //Função para RETORNAR os dados dos Chefs
    find(id){
        try {
            const query = `
                SELECT chefs.*, count(recipes) AS total_recipes
                FROM chefs
                LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
                WHERE chefs.id = $1
                GROUP BY chefs.id
                ORDER BY chefs.id ASC
            `
            return db.query(query, [id])
        } catch (error){
            console.log(error)
        }

    }, 

    //Função para ATUALIZAR um Chef
    update(name, file_id, id){

        try {
            const query = `UPDATE chefs SET name = $1, file_id = $2 WHERE id = $3`
            const values = [name, file_id, id]
            return db.query(query, values)
        } catch (error) {
            console.log(error)
        }
  
    },

    //Função para APAGAR um Chef
    delete(id){
        try {
            const query = `DELETE FROM chefs WHERE id = $1`
            return db.query(query, [id])
        } catch (error) {
            console.log(error)
        }
    },

    //Função para RETORNAR os Chefs suas respectivas Receitas
    findRecipesChef(id){

        try {
        
            const query = `
                SELECT recipes.*
                FROM chefs
                LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
                WHERE chefs.id = $1
                GROUP BY chefs.id, recipes.id
                ORDER BY recipes.created_at DESC
            `
            return db.query(query, [id])

        } catch (error) {
            console.log(error)
        }

    },

    //Função para RETORNAR aos Chefs sua respectiva imagem
    findImageChef(id){

        try {
        
            const query = `
                SELECT files.*, chefs.file_id 
                FROM files
                LEFT JOIN chefs ON (files.id = chefs.file_id)
                WHERE chefs.id = $1
                ORDER BY files.id ASC
            `

            return db.query (query, [id])
            
        } catch (error) {
            console.log(error)
        }

    }
}