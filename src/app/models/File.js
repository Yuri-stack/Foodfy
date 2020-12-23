 const db = require('../../config/db')

 module.exports = {

    //Função para CRIAR as imagens no Banco de Dados
    create( {filename, path, product_id} ){

      const query = `
         INSERT INTO files (
            name,
            path
         )VALUES ($1, $2, $3)
         RETURNING id
      `

      const values = [
         filename,
         path,
         product_id
     ]
     
      return db.query(query, values)

    },

    //Função para APAGAR as imagens do Banco de Dados
    delete(){}

 }