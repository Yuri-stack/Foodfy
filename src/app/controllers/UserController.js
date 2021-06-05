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

    async post(req, res){
        const results = await User.create(req.body)
        // req.session.userId = results.rows[0].id
        
        return res.redirect(`/admin/users`)  
    },

    async edit(req, res){
        const { id } = req.params
        // const { userId: id } = req.session

        const user = await User.findOne(id)

        if(!user) return res.render("admin/users/edit", {
            error: "Usuário não encontrado"
        })

        return res.render('admin/users/edit', { user })

    },

    put(req, res){},

    delete(req, res){}

}