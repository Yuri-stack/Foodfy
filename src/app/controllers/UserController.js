const User = require('../models/User')

module.exports = {

    redirectCreate(req, res){
        return res.render('admin/users/create.njk')
    },

    async list(req, res){
        try {
            const results = await User.all()
            const users = results.rows
    
            return res.render('admin/users/index', { users })  
        } catch (error) {
            console.error(error)
        }
  
    },

    async post(req, res){
        try {
            const results = await User.create(req.body)
            // req.session.userId = results.rows[0].id
            
            return res.redirect(`/admin/users`)  
        } catch (error) {
            console.error(error)
        }

    },

    async edit(req, res){ 
        try {
            const user = req.user

            return res.render('admin/users/edit', { user })
        } catch (error) {
            console.error(error)
        }

    },

    async put(req, res){
        try {
            const { user } = req
            const { name, email, isAdmin } = req.body

            await User.update(user.id, {
                name, email, is_admin:isAdmin
            })

            console.log(req.body)

            return res.render(`admin/users/edit`, {
                user: req.body,
                success: "Dados Atualizados"
            })  

            // return res.redirect(`/admin/users` + success)  
            
        } catch (error) {
            console.error(error)
            return res.render("admin/users/edit", {
                error: "Houve um erro na atualização, tente novamente"
            })
        }
    },

    delete(req, res){}

}