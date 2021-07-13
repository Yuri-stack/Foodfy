const Base = require('./Base')

Base.init({ table: 'files' })

 module.exports = {

   ...Base,

    // //Função para CRIAR as imagens no Banco de Dados
    // create( { filename, path } ){

    //   try {
    //      const query = `INSERT INTO files (name,path) VALUES ($1, $2) RETURNING id`
    //      const values = [filename,path]

    //      return db.query(query, values)

    //   } catch (error) {
    //      console.log(error) 
    //   }

    // },

   //Função para APAGAR as imagens do Banco de Dados
   // async delete(id){

   //    try {
   //       const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
   //       const file = result.rows[0]

   //       fs.unlinkSync(file.path)

   //       await db.query(`DELETE FROM recipe_files WHERE id = $1`, [id])
         
   //       return db.query(`DELETE FROM files WHERE id = $1`, [id])
         
   //    } catch (err) {
   //       console.log(err)
   //    }

   // }

 }