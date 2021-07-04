const express = require('express')
const routes = express.Router()

const Session = require('../../app/controllers/SessionController')
const Validator = require('../../app/validators/session')

// Rotas para Login / Logout
routes.get("/login", Session.loginForm)
routes.post("/login", Validator.login, Session.login)
routes.post("/logout", Session.logout)

// Rotas para Reset da Senha
routes.get("/forgot-password", Session.forgotForm)
routes.get("/password-reset", Session.resetForm)
// routes.post("/forgot-password", Session.forgot)
// routes.post("/password-reset", Session.reset)

module.exports = routes