const User = require('../models/User')

const { hash } = require('bcryptjs')

module.exports = {
    async index(req, res){
        const { userId: id } = req.session
    
        const user = await User.findOne({ where: { id }}) 
    
        if(!user) return res.render("admin/profile/index", {
            error: "Usuário não encontrado"
        })
    
        return res.render('admin/profile/index', { user })
    },

    async put(req, res){
        try {
            const { userId } = req.session
            let { name, email, password } = req.body

            password = await hash(password, 8)

            await User.update(userId, { name, email, password })

            return res.render(`admin/profile/index`, {
                user: req.body,
                success: "Dados Atualizados"
            })  
            
        } catch (error) {
            console.error(error)
            return res.render("admin/profile/index", {
                user: req.body,
                error: "Houve um erro na atualização, tente novamente"
            })
        }
    }
}