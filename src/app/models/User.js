const db = require('../../config/db')

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

    async update(id, { name, email, is_admin }){
        try {
            const query = `
                UPDATE users SET 
                    name = ($1),
                    email = ($2),
                    is_admin = ($3)
                WHERE id = ($4)
            `

            const values = [name, email, is_admin, id]
            return db.query(query, values)

        } catch (error) {
            console.error(error)
        }
    },

    async updateUser(id, { name, email, passwordHash }){

        console.log(name, email, passwordHash, id)

        try {
            const query = `
                UPDATE users SET
                    name = ($1),
                    email = ($2),
                    password = ($3)
                WHERE id = ($4)
            `

            const values = [name, email, passwordHash, id]
            return db.query(query, values)
            
        } catch (error) {
            console.error(error)
        }
    },
    
    delete(id){
        try {
            const query = `DELETE FROM users WHERE id = $1`
            return db.query(query, [id])
        } catch (error) {
            console.log(error)
        }
    },
}