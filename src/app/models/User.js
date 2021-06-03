const db = require('../../config/db')
const { hash } = require('bcryptjs')

module.exports = {
    async findOne(email){
        try {
            const query = `SELECT * FROM users WHERE users.email = $1`
            const results = await db.query(query, [email])
            
            return results.rows[0]
        } catch (error) {
            console.log(error)
        }
    },

    // async create({name, email, password, is_admin}){
    async create({name, email, isAdmin}){
        try {
            const query = `
                INSERT INTO users (name, email, password, is_admin)
                VALUES ($1, $2, $3, $4)
                RETURNING id
            `

            // const passwordHash = await hash(password, 8)
            const passwordHash = 1111
            const is_admin = isAdmin || false

            const values = [name, email, passwordHash, is_admin]
            return db.query(query, values)
            // return results.rows[0].id

        } catch (error) {
            console.log(error)
        }
    }
}