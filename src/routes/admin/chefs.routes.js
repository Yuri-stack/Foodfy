const express = require('express')
const routes = express.Router() 

const multer = require('../../app/middlewares/multer')
const { onlyUsers, isAdmin } = require('../../app/middlewares/session')

const Chefs = require('../../app/controllers/ChefsController')

routes.get("/success", (req, res) => res.render('layouts/success'))
routes.get("/error", (req, res) => res.render('layouts/error'))

// Rotas para a Administração dos Chefs
routes.get('/seeChefs', onlyUsers, Chefs.index)                                 // Mostrar a lista de Chefs aos usuarios padroes
routes.get("/", onlyUsers, isAdmin, Chefs.index)                                // Mostrar a lista de Chefs
routes.get("/create", onlyUsers, isAdmin, Chefs.redirectCreate)                 // Mostrar formulário de novo chef
routes.get("/:id", onlyUsers, Chefs.show)                                       // Exibir detalhes de um chef
routes.get("/:id/edit", onlyUsers, isAdmin, Chefs.edit)                         // Mostrar formulário de edição de chef
routes.post("/", onlyUsers, isAdmin, multer.array("photos", 1), Chefs.post)     // Cadastrar um novo chef
routes.put('/', onlyUsers, isAdmin, multer.array("photos", 1), Chefs.put)       // Editar um chef
routes.delete("/", onlyUsers, isAdmin, Chefs.delete)                            // Deletar um chef

module.exports = routes