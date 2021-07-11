const Base = require('./Base')

Base.init({ table: 'users' })

module.exports = {

    ...Base,
    // precisa ordenar os users por id no all() ou FindAll()
}