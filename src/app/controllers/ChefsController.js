const Chef = require('../models/Chef')
const File = require('../models/File')
const Recipe = require('../models/Recipe')
const LoadChefService = require('../services/LoadChefService')

module.exports = {

    //Função para LISTAR os Chefs no Index da Administração
    async index(req, res) {
        try {
            const chefs = await LoadChefService.load('chefs')

            return res.render('admin/chefs/index', { chefs })

        } catch (error) {
            console.error(error)
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

            console.log(fileId)

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

            if (!chef) return res.send("Chef não encontrado")

            return res.render('admin/chefs/details', { chef })

        } catch (error) {
            console.error(error)
            return res.render('admin/chefs/details', {
                error: "Houve um erro na apresentação do Chef, tente novamente mais tarde"
            })
        }
    },

    //Função para CARREGAR informações para editar - Precisa arrumar o bug de não reconhecer a img (Fix-5.13)
    async edit(req, res) {

        const { id } = req.params

        let results = await Chef.findChef(id)
        const chef = results.rows[0]

        if (!chef) return res.send("Chef not found")

        //Carrega a imagem do Chef
        results = await Chef.findImageChef(id)

        let files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render('admin/chefs/edit', { chef, files })

    },

    //Função para ATUALIZAR

    // async put(req, res){

    //     const keys = Object.keys(req.body)

    //     for(key of keys){
    //         if(req.body[key] == "" && key != "removed_file"){
    //             return res.send("Please fill in all the fields!")
    //         }
    //     }

    //     let fileId

    //     if(req.files.length != 0){ 

    //     const fileChef = {
    //         filename: req.files.filename,
    //         path: req.files.path
    //     }

    //     let results = await File.create(fileChef)
    //     fileId = results.rows[0].id

    //     const { name, id, removed_file } = req.body

    //     await Chef.update(name, fileId, id)

    //     if (removed_file) {

    //         const removedFile = req.body.removed_file.split(",")    //aqui ele transformar em array [1,2,3,]
    //         const lastIndex = removedFile.length - 1                
    //         removedFile.splice(lastIndex, 1)                        //aqui fica desse jeito [1,2,3]

    //         await File.delete(removedFile[0]) 

    //     }

    //     return res.redirect(`/admin/chefs/${id}`);

    //     }

    // },

    //ORIGINAL
    async put(req, res) {

        const keys = Object.keys(req.body)          //Aqui eu pego todos os campos(keys) do formulário de chefs

        for (key of keys) {                           //verificando se cada key está preenchidas
            if (req.body[key] == "") {                //é o mesmo que fazer req.body.(cada item do vetor) == ""
                return res.send("Por favor, preencha todos os campos!")
            }
        }

        // // Lógica para Excluir as imagens do BD
        if (req.body.removed_file) {
            //Ex: o campo envia 1,2,3
            const removedFile = req.body.removed_file.split(",")    //aqui ele transformar em array [1,2,3,]
            const lastIndex = removedFile.length - 1
            removedFile.splice(lastIndex, 1)                        //aqui fica desse jeito [1,2,3]

            await File.delete(removedFile[0])

            // const removedFilePromises = removedFile.map(id => File.delete(id))
            // Promise.all(removedFilePromises)
        }

        // Lógica para SALVAR as novas imagens carregadas durante a Atualização
        const { name, id } = req.body

        if (req.files.length == 0) {
            return res.send('Please, send at least one image')
        }

        const fileChef = {
            filename: req.files.filename,
            path: req.files.path
        }

        let results = await File.create(fileChef)
        let fileId = results.rows[0].id    // (Fix-5.13) ajustar pois necessitamos mudar a foto caso for alterar o nome do chf

        // const newFilesPromise = req.file.map(file => File.create({...file})) 
        // results = await Promise.all(newFilesPromise)

        await Chef.update(id, name, file_id)
        return res.redirect(`/admin/chefs/${id}`)

    },

    //Função para APAGAR
    async delete(req, res) {

        const { id } = req.body

        const chef = await Chef.findChef(id)
        const fileId = chef.rows[0].file_id     //Pega o file_id, que refere se ao indice da imagem do Chef

        if (chef.rows[0].total_recipes >= 1) {
            return res.send('Chefs que possuem receitas não podem ser apagados')
        }

        await File.delete(fileId)   //Apaga a imagem do chef
        await Chef.delete(id)       //Apaga o chef

        return res.redirect(`/admin/chefs`)

    }

}


// try {
//     const { filename, path } = req.file[0]
//     const fileId = await File.create({ name: filename, path })

//     const { name } = req.body
//     const chefId = await Chef.create({ name, fileId })

//     //tem que passar a data tb
//     return res.redirect(`/admin/chefs/${chefId}`)

// } catch (error) {
//     console.error(error)
//     return res.render('admin/chefs/index', {
//         error: "Houve um erro na criação do Chef, tente novamente"
//     })
// }