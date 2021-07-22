const express = require('express')
const routes = express.Router()

const { onlyUsers } = require('../../app/middlewares/session')

const Profile = require('../../app/controllers/ProfileController')

// Rotas de um Usuário logado

routes.get('/profile', onlyUsers, Profile.index)   // Mostrar o formulário com dados do usuário logado
routes.put('/profile', onlyUsers, Profile.put)     // Editar o usuário logado

module.exports = routes