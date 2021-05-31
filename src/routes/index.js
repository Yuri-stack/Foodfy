const express = require('express')
const routes = express.Router()

const adminRoutes = require('./admin')
const publicRoutes = require('./public')

routes.use('/', publicRoutes)       
routes.use('/admin', adminRoutes)   // Colocando /admin na frente da rota

module.exports = routes