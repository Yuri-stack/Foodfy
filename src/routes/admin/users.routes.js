const express = require('express')
const routes = express.Router()

const Validator = require('../../app/validators/users')
const { onlyUsers, isAdmin } = require('../../app/middlewares/session')

const User = require('../../app/controllers/UserController')

routes.get("/success", (req, res) => res.render('layouts/success'))
routes.get("/error", (req, res) => res.render('layouts/error'))

// Rotas para o Administrador gerenciar usuários
routes.get('/', onlyUsers, isAdmin, User.list)                          // Mostrar a lista de usuários cadastrados
routes.get('/register', onlyUsers, isAdmin, User.redirectCreate)        // Mostrar o formulário de criação de um usuário
routes.get('/:id/edit', onlyUsers, isAdmin, Validator.show, User.edit)  // Mostrar o formulário de edição de um usuário
routes.post("/", onlyUsers, isAdmin, Validator.post, User.post)         // Cadastrar um usuário
routes.put('/', onlyUsers, isAdmin, Validator.put, User.put)            // Editar um usuário
routes.delete('/', onlyUsers, isAdmin, User.delete)                     // Deletar um usuário 

module.exports = routes