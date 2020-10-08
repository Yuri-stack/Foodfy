const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {

    //Função para SELECIONAR todos os chefes
    all(callback){

        db.query(`SELECT * FROM chefs`, function(err, results){
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

    //Função para RETORNAR os Chefs
    find(id, callback){

         db.query(`
            SELECT * FROM chefs WHERE id = $1`, [id], function(err, results){
                if(err) throw `Database Error! ${err}`

                callback(results.rows[0])
        })

    },

    //Função para atualizar um Instrutor
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

    //Função para apagar um Instrutor
    delete( id, callback ){

        db.query(`DELETE FROM chefs WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database Error! ${err}`

            return callback()
        })
    }
}