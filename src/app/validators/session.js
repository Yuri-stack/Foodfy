const { compare } = require('bcryptjs')
const User = require('../models/User')

async function login(req, res, next){
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if(!user) return res.render("admin/session/login", {
        user: req.body,
        error: "Usuário não cadastrado"
    })

    const passed = await compare(password, user.password)

    if(!passed) return res.render("admin/session/login",{
        user: req.body,
        error: "Senha Incorreta"
    })

    req.user = user

    next()
}

async function forgot(req, res, next) {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) return res.render('session/forgot-password', {
            user: req.body,
            error: 'Email não encontrado'
        });

        req.user = user;

        next()
        
    } catch (err) {
        console.error(err);
    }
}

async function reset(req, res, next){
    const { email, password, repeatPassword, token } = req.body

    const user = await User.findOne({ where: { email } })

    if(!user) return res.render("admin/session/password-reset", {
        user: req.body,
        token,
        error: "Usuário não cadastrado"
    })

    if(password != repeatPassword){
        return res.render('admin/session/password-reset', {
            user: req.body,
            token,
            error: "As senhas não são iguais"
        })
    }

    if(token != user.reset_token){
        return res.render('admin/session/password-reset', {
            user: req.body,
            token,
            error: "Token inválido. Solicite novamente uma senha"
        })
    }

    // Verificar se o Token não expirou
    let now = new Date()
    now = now.setHours(now.getHours())

    if(now > user.reset_token_expires){
        return res.render('session/password-reset', {
            user: req.body,
            token,
            error: "Token expirado. Solicite novamente uma senha"
        })
    }

    req.user = user
    next()
}

module.exports = { login, forgot, reset }