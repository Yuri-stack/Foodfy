const express = require('express')
const routes = express.Router()

const User = require('../../app/controllers/UserController')

const Validator = require('../../app/validators/users')

// Rotas para o Administrador gerenciar usuários

//routes.get('/', User.list)                      // Mostrar a lista de usuários cadastrados
routes.get('/register', User.redirectCreate)    // Mostrar o formulário de criação de um usuário
// routes.get('/:id/edit', User.edit)           // Mostrar o formulário de edição de um usuário
routes.post("/", Validator.post, User.post)     // Cadastrar um usuário
// routes.put('/:id', User.put)                 // Editar um usuário
// routes.delete('/:id', User.delete)           // Deletar um usuário

module.exports = routes