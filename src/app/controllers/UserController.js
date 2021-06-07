const User = require('../models/User')

const { hash } = require('bcryptjs')

const mailer = require('../../lib/mailer')
const { generatePassword} = require('../../lib/utils')

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
            const { name, email, isAdmin } = req.body

            const password = generatePassword()

            await mailer.sendMail({
                to: req.body.email,
                from: 'no-replay@foodfy.com.br',
                subject: 'Cadastro Realizado',
                html: `
                    <h1>Olá ${name}!</h1>
                    <p>Parabéns! Sua conta no Foodfy foi criada com sucesso!</p>
                    <p>Segue seus dados de usuário:</p>
                    <p>Login: ${email}</p>
                    <p>Senha: ${password}</p>
                    <p><br></p>
                    <p>
                        Faça seu primeiro acesso para validar sua conta clicando 
                        <a href="href"="http://localhost:3000/admin/users/login">aqui</a>.
                    </p>
                `
            })

            let passwordHash = await hash(password, 8)

            await User.create(name, email, passwordHash, isAdmin || false)

            const results = await User.all()
            const userList = results.rows

            return res.render('admin/users/index', {
                // userId: req.session.userId,
                users: userList,
                success: 'Usuário criado com sucesso!'
            })

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