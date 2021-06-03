const User = require('../models/User')

async function post(req, res, next){

    const keys = Object.keys(req.body)          

    for(key of keys){                           
        if(req.body[key] == ""){                
            return res.send("Por favor, preencha todos os campos") 
        }
    }

    const { email, password, passwordRepeat } = req.body
    const user = await User.findOne(email)

    if(user) return res.render('admin/users/create', {
        user: req.body,
        error: "Usuário já cadastrado"
    })

    // Implantar as passwordRepeat
    // if(password != passwordRepeat) return res.send("As senhas não são idênticas")
    // return res.send("Acessou")

    next()

}

module.exports = { post }