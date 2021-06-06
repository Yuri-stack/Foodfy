const User = require('../models/User')

module.exports = {
    index(req, res){
        const { userId: id } = req.session
    
        const profile = await User.findOne(id)
    
        if(!profile) return res.render("admin/users/edit", {
            error: "Usuário não encontrado"
        })
    
        return res.render('admin/users/edit', { profile })
    },
    async put(req, res){}
}

