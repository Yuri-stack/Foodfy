const db = require('../../config/db')

function find(filters, table) {
    let query = `SELECT * FROM ${table}`
    
    if(filters){
        Object.keys(filters).map(key => {
            // Aqui recebemos essas cláusulas WHERE | OR | AND
            query += ` ${key}`
    
            Object.keys(filters[key]).map(field => {
                query += ` ${field} = '${filters[key][field]}'`
            })
        })
    }

    return db.query(query)
}

const Base = {
    init({ table }) {
        if (!table) throw new Error('Invalid Params')

        this.table = table
        return this
    },

    async find(id) {
        try {
            const results = await find({ where: { id } }, this.table)
            return results.rows[0]
        } catch (error) {
            console.log(error)
        }
    },

    async findOne(filters) {
        try {
            const results = await find(filters, this.table)
            return results.rows[0]
        } catch (error) {
            console.log(error)
        }
    },

    async findAll(filters) {
        try {
            const results = await find(filters, this.table)
            return results.rows
        } catch (error) {
            console.log(error)
        }
    },

    async create(fields) {
        try {
            let keys = [], values = []

            Object.keys(fields).map(key => {
                keys.push(key)

                if(Array.isArray(fields[key])){
                    values.push(`'{"${fields[key].join('","')}"}'`)
                }else{
                    values.push(`'${fields[key]}'`)
                }
            })

            const query = `INSERT INTO ${this.table} (${keys.join(',')})
                VALUES (${values.join(',')})
                RETURNING id
            `

            const results = await db.query(query)
            return results.rows[0].id

        } catch (error) {
            console.error(error)
        }
    },

    update(id, fields) {
        try {
            let update = []

            Object.keys(fields).map(key => {
                let line

                if(Array.isArray(fields[key])){
                    line = `${key} = '{"${fields[key].join('","')}"}'`
                }else{
                    line = `${key} = '${fields[key]}'`
                }

                update.push(line)
            })

            let query = `
                UPDATE ${this.table} SET
                ${update.join(',')} 
                WHERE id = ${id}
            `

            return db.query(query)

        } catch (error) {
            console.log(error)
        }
    },
    
    delete(id) {
        try {
            const query = `DELETE FROM ${this.table} WHERE id = $1`
            return db.query(query, [id])
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Base