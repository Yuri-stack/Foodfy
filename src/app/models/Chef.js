const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {

    //Função para SELECIONAR todos os chefes
    all(callback){

        db.query(`SELECT * FROM chefs`, function(err, results){
            if(err) return res.send("Database Error!")

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
            if(err) return res.send("Database Error!")

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

    }
}