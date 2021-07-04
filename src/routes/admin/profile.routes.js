const express = require('express')
const routes = express.Router()

const Profile = require('../../app/controllers/ProfileController')

// Rotas de um Usuário logado

routes.get('/profile', Profile.index)   // Mostrar o formulário com dados do usuário logado
routes.put('/profile', Profile.put)     // Editar o usuário logado

module.exports = routes