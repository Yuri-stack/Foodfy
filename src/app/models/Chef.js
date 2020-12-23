const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {

    //Função para SELECIONAR todos os Chefs 
    all(){
        const query = `SELECT * FROM chefs ORDER BY chefs.id ASC`
        return db.query(query)
    },
 
    //Função para CRIAR um novo Chef
    create(data){         //data aqui é o req.body

        const query = `
            INSERT INTO chefs (
                name,
                created_at,
                file_id
            ) VALUES ($1, $2, $3)
            RETURNING id
        `

        const values = [
            data.name,
            date(Date.now()).iso,
            data.file_id
        ]

        return db.query(query, values)

    },

    // create(data, callback){         //data aqui é o req.body

    //     const query = `
    //         INSERT INTO chefs (
    //             name,
    //             avatar_url,
    //             created_at
    //         ) VALUES ($1, $2, $3)
    //         RETURNING id
    //     `

    //     const values = [
    //         data.name,
    //         data.avatar_url,
    //         date(Date.now()).iso
    //     ]

    //     db.query(query, values, function(err, results){
    //         if(err) throw `Database Error! ${err}`

    //         callback(results.rows[0])

    //     })

    // },

    //Função para RETORNAR os dados dos Chefs
    find(id){

        const query = `
            SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            WHERE chefs.id = $1
            GROUP BY chefs.id
            ORDER BY chefs.id ASC
        `

        return db.query(query, [id])

    }, 

    //Função para ATUALIZAR um Chef
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

    //Função para APAGAR um Chef
    delete(id){
        const query = `DELETE FROM chefs WHERE id = $1`
        return db.query(query, [id])
    },

    // delete(id){

    //     const query = `
    //         DELETE FROM chefs WHERE id = $1
    //     `

    //     db.query(query, [id], function(err, results){
    //         if(err) throw `Database Error! ${err}`

    //         return callback()
    //     })
    // },

    //Função para RETORNAR os Chefs com suas respectivas Receitas
    chefRecipes(id){

        const query = `
            SELECT recipes.*
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            WHERE chefs.id = $1
            GROUP BY chefs.id, recipes.id
        `

        return db.query(query, [id])
    }
}