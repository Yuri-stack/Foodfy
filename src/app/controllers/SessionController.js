const User = require('../models/User')
const mailer = require('../../lib/mailer')

const { hash } = require('bcryptjs')
const crypto = require('crypto')

module.exports = {

    loginForm(req,res){
        return res.render('admin/session/login')  
    },

    login(req,res){
        req.session.userId = req.user.id
        req.session.isAdmin = req.user.is_admin;
        return res.redirect("/admin/profile")
    },

    logout(req,res){
        req.session.destroy()
        return res.render('admin/session/login')
    },

    forgotForm(req,res){
        return res.render('admin/session/forgot-password')
    },

    async forgot(req,res){
        try {
            const user = req.user

            // Token para o Usuário
            const token = crypto.randomBytes(20).toString('hex')

            // Criar a Expiração do Token
            let now = new Date()
            now = now.setHours(now.getHours() + 1)

            await User.update(user.id, { 
                reset_token: token, 
                reset_token_expires: now
            })

            // Envia o Email com link de recuperação
            await mailer.sendMail({
                to: user.email,
                from: 'no-replay@foodfy.com.br',
                subject: 'Recuperação de Senha',
                html: 
                `
                    <h1>Olá! Parece que você perdeu sua senha</h1>
                    <p>Não se preocupe, clique no link abaixo para recuperá-la</p>
                    <p>
                        <a href="http://localhost:3000/admin/password-reset?token=${token}" target="_blank">Recuperar</a>.
                    </p>
                    `
            })

            return res.render('admin/session/forgot-password', {
                success: "Verifique seu email para resetar sua senha"
            })
            
        } catch (error) {
            console.error(error)
            return res.render('admin/session/forgot-password', {
                error: "Houve um erro ao enviar o email de recuperação, tente novamente"
            })
        }
    },

    resetForm(req, res) {
        return res.render('admin/session/password-reset', { token: req.query.token });
    },

    async reset(req, res){
        try {
            const user = req.user
            const { password, token } = req.body

            // Cria uma nova senha Hash
            const newPassword = await hash(password, 8)

            // Atualiza o usuário
            await User.update(user.id, {
                password: newPassword,
                reset_token: "",
                reset_token_expires: ""
            })

            // Confirma o cadastro da nova senha
            return res.render("admin/session/login", {
                user: req.body,
                success: "Senha atualizada com sucesso"
            })            

        } catch (error) {
            console.error(error)
            return res.render('admin/session/password-reset', {
                user: req.body,
                token,
                error: "Houve um erro inesperado, tente novamente"
            })
        }
    }
}