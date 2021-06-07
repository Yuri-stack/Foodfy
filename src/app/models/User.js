const db = require('../../config/db')
const { hash } = require('bcryptjs')

module.exports = {

    all(){
        try {
            const query = `SELECT * FROM users ORDER BY users.id ASC`
            return db.query(query)
        } catch (error) {
            console.log(error)
        }
    },

    async findOne(id){
        try {
            const query = `SELECT * FROM users WHERE users.id = $1`
            const results = await db.query(query, [id])
            
            return results.rows[0]
        } catch (error) {
            console.log(error)
        }
    },

    async findOneEmail(email){
        try {
            const query = `SELECT * FROM users WHERE users.email = $1`
            const results = await db.query(query, [email])
            
            return results.rows[0]
        } catch (error) {
            console.log(error)
        }
    },

    async create(name, email, password, isAdmin){
        try {
            const query = `
                INSERT INTO users (name, email, password, is_admin)
                VALUES ($1, $2, $3, $4)
                RETURNING id
            `

            const values = [name, email, password, isAdmin]

           return results = await db.query(query, values)
        } catch (error) {
            console.log(error)
        }
    },

    // async update({name, email, password, is_admin}){
    async update(id, fields){
        let query = `UPDATE users SET`

        // const is_admin = is_admin || false
        // tá com problema por caisa o admin que é boolean

        Object.keys(fields).map((key, index, array) => {
            if((index + 1) < array.length){
                query = `${query} ${key} = '${fields[key]}',`
            }else{
                query = `${query} ${key} = '${fields[key]}' WHERE id = ${id}`
            }
        })

        await db.query(query)
        return
    }


}