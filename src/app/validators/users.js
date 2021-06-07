const { compare } = require('bcryptjs')
const User = require('../models/User')

function checkAllFields(body){
    const keys = Object.keys(body)          

    for(key of keys){                           
        if(body[key] == ""){                
            return {
                user: body,
                error: "Por favor, preencha todos os campos"
            }
        }
    }
}

async function post(req, res, next){

    const fillAllFields = checkAllFields(req.body)
    if(fillAllFields){
        return res.render("admin/users/create", fillAllFields)
    }
    
    const { email } = req.body
    const user = await User.findOneEmail(email)

    if(user) return res.render('admin/users/create', {
        user: req.body,
        error: "Usuário já cadastrado"
    })

    // Implantar as passwordRepeat
    // if(password != passwordRepeat) return res.send("As senhas não são idênticas")
    // return res.send("Acessou")

    next()

}

async function show(req, res, next){
    const { id } = req.params
    // const { userId: id } = req.session

    const user = await User.findOne(id)

    if(!user) return res.render("admin/users/edit", {
        error: "Usuário não encontrado"
    })

    req.user = user

    next()
}

async function put(req, res, next){
    const fillAllFields = checkAllFields(req.body)
    
    if(fillAllFields){
        return res.render("admin/users/", fillAllFields)
    }

    const { id, password } = req.body

    const user = await User.findOne(id)

    // const passed = await compare(password, user.password)
    const passed = true;

    if(!passed) return res.render("admin/users/edit",{
        user: req.body,
        error: "Senha Incorreta"
    })

    req.user = user

    next()
}

module.exports = { post, show, put }