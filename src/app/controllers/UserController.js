const User = require('../models/User')

module.exports = {

    redirectCreate(req, res){
        return res.render('admin/users/create.njk')
    },

    list(req, res){
        return res.send('Ok, cadastrado')      
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