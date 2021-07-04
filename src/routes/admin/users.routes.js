const express = require('express')
const routes = express.Router()

const Validator = require('../../app/validators/users')
const { onlyUsers } = require('../../app/middlewares/session')

const User = require('../../app/controllers/UserController')

// Rotas para o Administrador gerenciar usuários

routes.get('/', onlyUsers, User.list)                          // Mostrar a lista de usuários cadastrados
routes.get('/register', onlyUsers, User.redirectCreate)        // Mostrar o formulário de criação de um usuário
routes.get('/:id/edit', onlyUsers, Validator.show, User.edit)  // Mostrar o formulário de edição de um usuário
routes.post("/", onlyUsers, Validator.post, User.post)         // Cadastrar um usuário
routes.put('/', onlyUsers, Validator.put, User.put)            // Editar um usuário
routes.delete('/', onlyUsers, User.delete)                     // Deletar um usuário 

module.exports = routes