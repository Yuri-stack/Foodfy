const express = require('express')
const routes = express.Router()

const Session = require('../../app/controllers/SessionController')
const Validator = require('../../app/validators/session')

const { isLoggedRedirectToProfile } = require('../../app/middlewares/session')

// Rotas para Login / Logout
routes.get("/login", isLoggedRedirectToProfile, Session.loginForm)
routes.post("/login", Validator.login, Session.login)
routes.post("/logout", Session.logout)

// Rotas para Reset da Senha
routes.get("/forgot-password", Session.forgotForm)
routes.get("/password-reset", Session.resetForm)
routes.post("/forgot-password", Validator.forgot, Session.forgot)
routes.post("/password-reset", Validator.reset, Session.reset)

module.exports = routes