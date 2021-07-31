const User = require('../models/User')
const mailer = require('../../lib/mailer')

const { hash } = require('bcryptjs')
const { generatePassword } = require('../../lib/utils')

module.exports = {

    redirectCreate(req, res){
        return res.render('admin/users/create.njk')
    },

    async list(req, res){
        try {
            const users = await User.findAll()

            return res.render('admin/users/index', { users })  
        } catch (error) {
            console.error(error)
            return res.render("admin/users/index", {
                error: "Houve um erro ao carregar os usuários, tente novamente"
            })
        }
    },

    async post(req, res){
        try {
            const { name, email, isAdmin } = req.body
            let userPassword = generatePassword()
            const password = await hash(userPassword, 8)

            await User.create({ name, email, password, is_admin:isAdmin || false })

            await mailer.sendMail({
                to: req.body.email,
                from: 'no-replay@foodfy.com.br',
                subject: 'Cadastro Realizado',
                html: `
                    <h1>Olá ${name}!</h1>
                    <p>Parabéns! Sua conta no Foodfy foi criada com sucesso!</p>
                    <p>Segue seus dados de usuário:</p>
                    <p>Login: ${email}</p>
                    <p>Senha: ${userPassword}</p>
                    <p><br></p>
                    <p>
                        Faça seu primeiro acesso para validar sua conta clicando 
                        <a href="href"="http://localhost:3000/admin/users/login">aqui</a>.
                    </p>
                `
            })

            const users = await User.findAll()

            return res.redirect(`/admin/users/success`)

        } catch (error) {
            console.error(error)
            return res.redirect('/admin/users/error')
        }
    },

    async edit(req, res){ 
        try {
            const user = req.user
            return res.render('admin/users/edit', { user })
        } catch (error) {
            console.error(error)
            return res.redirect('/admin/users/error')
        }
    },

    async put(req, res){
        try {
            const { user } = req
            const { name, email, isAdmin } = req.body

            await User.update(user.id, {
                name, email, is_admin:isAdmin || false
            })

            return res.redirect(`/admin/users/success`)  
            
        } catch (error) {
            console.error(error)
            return res.redirect('/admin/users/error')
        }
    },

    async delete(req, res){
        try {
            const { id } = req.body

            const users = await User.findAll()

            if(id == req.session.userId){
                return res.render('admin/users/index', {
                    users,
                    error: 'Você não pode excluir sua própria conta'
                }) 
            }

            await User.delete(id)

            return res.redirect(`/admin/users/success`)
            
        } catch (error) {
            console.error(error)
            return res.redirect('/admin/users/error')
        }
    }
}