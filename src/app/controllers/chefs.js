const Chef = require('../models/Chef')
const File = require('../models/File')

module.exports = { 
 
    //Função para LISTAR os Chefs no Index da Administração
    async index(req, res){ 

        const results = await Chef.all()
        const chefs = results.rows

        async function getImage(chefId){
            let results = await Chef.chefFiles(chefId)
            const files = results.rows.map(file => 
                `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
            )
            return files[0]
        }

        const chefsPromises = chefs.map(async chef => {
            chef.src = await getImage(chef.id)
            return chef
        })

        const chefsAll = await Promise.all(chefsPromises)

        return res.render('admin/chefs/index', { chefs : chefsAll})

    },

    //Função para REDIRECIONAR para a página de criação
    redirectCreate(req, res){
        return res.render('admin/chefs/create.njk')
    },

    //Função para CADASTRAR um novo Chef 
    async post(req, res){

        const keys = Object.keys(req.body)          //Aqui eu pego todos os campos(keys) do formulário de chefs

        for(key of keys){                           //verificando se cada key está preenchidas
            if(req.body[key] == ""){                //é o mesmo que fazer req.body.(cada item do vetor) == ""
                return res.send("Por favor, preencha todos os campos!") 
            }
        }

        if(req.files.length == 0){
            return res.send('Please, send at least one image')
        }

        const filesPromise = req.files.map(file => File.create({...file}))
        let results = await Promise.all(filesPromise)

        const fileId = results[0].rows[0].id

        results = await Chef.create(req.body.name, fileId)
        const chefID = results.rows[0].id

        return res.redirect(`/admin/chefs/${ chefID }`)

    },

    //Função para MOSTRAR os detalhes de um Chef 
    async show(req, res){

        const { id } = req.params

        let results = await Chef.find(id)
        const chef = results.rows[0]

        if(!chef) return res.send("Chef not found / Chef não encontrado")

        results = await Chef.chefRecipes(id)
        const recipes = results.rows

        results = await Chef.chefFiles(id)
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
        }))

        return res.render('admin/chefs/details', { chef, recipes, files })
    },

    //Função para CARREGAR informações para editar - Precisa arrumar o bug de não reconhecer a img (Fix-5.13)
    async edit(req, res){

        const { id } = req.params

        let results = await Chef.find(id)
        const chef = results.rows[0]

        if(!chef) return res.send("Chef not found")

        //Carrega a imagem do Chef
        results = await Chef.chefFiles(id)
        let files = results.rows
        
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
        }))

        return res.render('admin/chefs/edit', { chef, files })

    },

    //Função para ATUALIZAR - Arrumar os multiplos arquivos enviados (Fix-5.14)
    async put(req, res){

        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == "" && key != "removed_file"){
                return res.send("Please fill in all the fields!")
            }
        }

        // Lógica para SALVAR as novas imagens carregadas durante a Atualização

        const newFilesPromise = req.files.map(file => File.create(file))
        results = await Promise.all(newFilesPromise)

        const fileId = results[0].rows[0].id    // (Fix-5.13) ajustar pois necessitamos mudar a foto caso for alterar o nome do chf
        const { name, id } = req.body

        await Chef.update(name, fileId, id)

        // Lógica para Excluir as imagens do BD
        if(req.body.removed_file){
                                                                    //Ex: o campo envia 1,2,3
            const removedFile = req.body.removed_file.split(",")    //aqui ele transformar em array [1,2,3,]
            const lastIndex = removedFile.length - 1                
            removedFile.splice(lastIndex, 1)                        //aqui fica desse jeito [1,2,3]

            const removedFilePromises = removedFile.map(id => File.delete(id))

            await Promise.all(removedFilePromises)
        }

        return res.redirect(`/admin/chefs/${id}`)

    },

    //Função para APAGAR
    async delete(req, res){

        const { id } = req.body

        const chef = await Chef.find(id)
        const fileId = chef.rows[0].file_id     //Pega o file_id, que refere se ao indice da imagem do Chef

        if(chef.rows[0].total_recipes >= 1){
            return res.send('Chefs que possuem receitas não podem ser apagados')
        }

        await Chef.delete(id)       //Apaga o chef
        await File.delete(fileId)   //Apaga a imagem do chef

        return res.redirect(`/admin/chefs`)
        
    }

}