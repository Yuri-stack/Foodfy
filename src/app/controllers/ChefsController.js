const Chef = require('../models/Chef')
const File = require('../models/File')

const { unlinkSync } = require('fs');

const LoadChefService = require('../services/LoadChefService')

module.exports = {

    //Função para LISTAR os Chefs no Index da Administração
    async index(req, res) {
        try {
            const chefs = await LoadChefService.load('chefs')

            return res.render('admin/chefs/index', { chefs })

        } catch (error) {
            console.error(error)
            return res.render('admin/chefs/index', {
                error: "Houve um erro ao carregar os Chef, tente novamente"
            })
        }
    },

    //Função para REDIRECIONAR para a página de criação
    redirectCreate(req, res) {
        return res.render('admin/chefs/create.njk')
    },

    //Função para CADASTRAR um novo Chef 
    async post(req, res) {
        try {
            const { filename, path } = req.files[0]
            const fileId = await File.create({ name: filename, path })

            const { name } = req.body
            const chefId = await Chef.create({ name, file_id: fileId })

            return res.redirect(`/admin/chefs/${chefId}`)

        } catch (error) {
            console.error(error)
            return res.render('admin/chefs/create.njk', {
                error: "Houve um erro na criação do Chef, tente novamente"
            })
        }
    },

    //Função para MOSTRAR os detalhes de um Chef 
    async show(req, res) {      
        try {
            const { id } = req.params
            const chef = await LoadChefService.load('chef', id)

            if(!chef){
                return res.render('admin/chefs/details', {
                    error: "Chef não encontrado, tente novamente mais tarde"
                })
            }

            return res.render('admin/chefs/details', { chef })

        } catch (error) {
            console.error(error)
            return res.render('admin/chefs/details', {
                error: "Houve um erro na apresentação do Chef, tente novamente mais tarde"
            })
        }
    },

    //Função para CARREGAR informações para editar
    async edit(req, res) {
        try {
            const { id } = req.params
            const chef = await LoadChefService.load('chef', id)
            
            if(!chef){
                return res.render('admin/chefs/details', {
                    error: "Chef não encontrado, tente novamente mais tarde"
                })
            }

            return res.render('admin/chefs/edit', { chef })

        } catch (error) {
            console.error(error)
            return res.render('admin/chefs/details', {
                error: "Houve um erro na edição do Chef, tente novamente mais tarde"
            })
        }
    },

    //Função para ATUALIZAR
    async put(req, res){
        try {
            const { name, id, removed_file } = req.body
            let fileId

            if(req.files.length != 0){
                const { filename, path } = req.files[0]
                fileId = await File.create({ name: filename, path })
            }else{
                const chef = await LoadChefService.load('chef', id)
                fileId = chef.file_id
            }

            await Chef.update(id, { name, file_id: fileId })

            if(removed_file){
                const removedFileId = removed_file.replace(',','')
                const file = await File.findOne({ where: { id: removedFileId } })

                await File.delete(removedFileId)

                unlinkSync(file.path);
            }

            return res.redirect(`/admin/chefs/${id}`);

        } catch (error) {
            console.error(error)
            return res.render('admin/chefs/details', {
                chef,
                error: "Houve um erro na atualização do Chef, tente novamente mais tarde"
            })
        }
    },

    //Função para APAGAR
    async delete(req, res) {
        try {
            const { id } = req.body

            const chef = await LoadChefService.load('chef', id)
            let fileId = chef.file_id

            if(chef.total_recipes != 0){
                return res.render('admin/chefs/details', {
                    chef,
                    error: "Chefs com Receitas não podem ser apagados"
                })
            }

            await Chef.delete(id)

            const file = await File.findOne({ where: { id: fileId }})
            
            unlinkSync(file.path);
            
            await File.delete(fileId)   //Apaga a imagem do chef

            return res.redirect('/admin/chefs');
            
        } catch (error) {
            console.error(error)
            return res.render('admin/chefs/details', {
                error: "Houve um erro ao excluir o Chef, tente novamente mais tarde"
            })
        }
    }
}