const User = require('../models/User')

module.exports = {

    redirectCreate(req, res){
        return res.render('admin/users/create.njk')
    },

    async list(req, res){
        const results = await User.all()
        const users = results.rows

        return res.render('admin/users/index', { users })    
    },

    edit(req, res){},

    async post(req, res){
        const results = await User.create(req.body)
        const userId = results.rows[0].id
        return res.redirect(`/admin/users`)  
    },

    put(req, res){},

    delete(req, res){}

}