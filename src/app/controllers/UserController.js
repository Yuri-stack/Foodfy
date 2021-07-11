const User = require('../models/User')
const mailer = require('../../lib/mailer')

const { hash } = require('bcryptjs')
const { generatePassword} = require('../../lib/utils')

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

            //Depois redirecionar para a tela Index cons os dados de lá
            return res.render(`admin/users/edit`, {
                user: req.body,
                success: "Dados Atualizados"
            })  
            
        } catch (error) {
            console.error(error)
            return res.render("admin/users/edit", {
                error: "Houve um erro na atualização, tente novamente"
            })
        }
    },

    async delete(req, res){
        try {
            const { id } = req.body

            // Apagar o Usuário do Banco
            await User.delete(id)

            return res.render('admin/users/index')
            
        } catch (error) {
            console.error(error)
        }
    }

    // async delete(req, res){
    //     try {
    //         const { id } = req.body

    //         // Pegar as receitas do Usuário
    //         let recipes = await Recipe.findAllRecipesUser(id)

    //         // Apagar as receitas
    //         let results = await Recipe.findImageRecipe(recipes.rows[0].id);

    //         const filesPromise = results.rows.map(async file => {

    //             const files = { recipe_id: id, file_id: file.id}

    //                 await Recipe.deleteImageRecipe(files)

    //                 await File.delete(file.id)

    //                 await Recipe.delete(id)
    //         });

    //         Promise.all(filesPromise);

    //         // Apagar o Usuário do Banco
    //         await User.delete(id)

    //         return res.render('admin/users/index')
            
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

}