const User = require('../models/User')

const { hash } = require('bcryptjs')

module.exports = {
    async index(req, res){
        const { userId: id } = req.session
    
        const user = await User.findOne(id) 
    
        if(!user) return res.render("admin/profile/index", {
            error: "Usuário não encontrado"
        })
    
        return res.render('admin/profile/index', { user })
    },

    async put(req, res){
        try {
            const { userId } = req.session
            const { name, email, password } = req.body

            let passwordHash = await hash(password, 8)

            await User.updateUser(userId, {
                name, email, passwordHash
            })

            //Depois redirecionar para a tela Index cons os dados de lá
            return res.render(`admin/profile/index`, {
                user: req.body,
                success: "Dados Atualizados"
            })  
            
        } catch (error) {
            console.error(error)
            return res.render("admin/profile/index", {
                error: "Houve um erro na atualização, tente novamente"
            })
        }
    }
}

