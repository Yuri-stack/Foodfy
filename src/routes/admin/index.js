const express = require('express')
const routes = express.Router()

const sessionRoutes = require('./session.routes')
const userRoutes = require('./users.routes')
const chefRoutes = require('./chefs.routes')
const recipesRoutes = require('./recipes.routes')
const profileRoutes = require('./profile.routes')

routes.use('/chefs', chefRoutes) 
routes.use('/recipes', recipesRoutes) 
routes.use('/users', userRoutes)
routes.use(sessionRoutes)
routes.use(profileRoutes)

module.exports = routes     