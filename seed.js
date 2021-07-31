const faker = require('faker')
const { hash } = require('bcryptjs')
const { generatePassword } = require('./src/lib/utils')

const Chef = require('./src/app/models/Chef')
const Recipe = require('./src/app/models/Recipe')
const File = require('./src/app/models/File')
const User = require('./src/app/models/User')

let chefsId, recipesId, usersId = []

function createFiles(num, placeholder){
    const files = []

    while(files.length < num){
        files.push({
            name: faker.image.image(),
            path: `public/images/${placeholder}.jpg`
        })
    }

    return files
}

async function createUsers(){
    const users = []
    let userPassword = generatePassword()
    const password = await hash(userPassword, 8)

    while(users.length < 5){
        users.push({
            name: faker.name.firstName(),
            email: faker.internet.email().toLowerCase(),
            password,
            is_admin: Math.round(Math.random())
        })
    }

    const usersPromise = users.map(user => User.create(user))
    usersId = await Promise.all(usersPromise)
}

async function createChefs(){
    const chefs = []

    const files = createFiles(5,'chef_nameFaker')
    const filesPromise = files.map(file => File.create(file))
    const filesId = await Promise.all(filesPromise)

    for(let indexFile = 0; chefs.length < 5; indexFile++){
        chefs.push({
            name: faker.name.firstName(),
            file_id: filesId[indexFile]
        })
    }

    const chefsPromise = chefs.map(chef => Chef.create(chef))
    chefsId = await Promise.all(chefsPromise)
}

async function createRecipes(){
    const recipes = []
    const ingredients = []
    const preparation = []

    for(let index = 0; index < 5; index++){
        ingredients.push(faker.lorem.words(Math.ceil(Math.random() * 6)))
        preparation.push(faker.lorem.words(Math.ceil(Math.random() * 6)))
    }

    while(recipes.length < 10){
        recipes.push({
            title: faker.commerce.productName(),
            ingredients,
            preparation,
            information: faker.lorem.paragraph(Math.ceil(Math.random() * 10)),
            chef_id: chefsId[Math.floor(Math.random() * 5)],
            user_id: usersId[Math.floor(Math.random() * 5)]
        })
    }

    const recipesPromise = recipes.map(recipe => Recipe.create(recipe))
    recipesId = await Promise.all(recipesPromise)

    const files = createFiles(10,'recipe_nameFaker')
    const filesPromise = files.map(file => File.create(file))
    const filesId = await Promise.all(filesPromise)

    const recipeFiles = []
    let indexFile = 0, indexRecipe = 10 - 1, recipeImgLimit = 5

    while(recipeFiles.length < 10){
        for(let index = 0; index < recipeImgLimit; index++){
            recipeFiles.push({
                recipe_id: recipesId[indexRecipe],
                file_id: filesId[indexFile]
            })
            indexFile++
        }
        indexRecipe--
    }

    const recipesFilesPromise = recipeFiles.map(file => 
        Recipe.createImageRecipe(file.recipe_id, file.file_id)
    )
    await Promise.all(recipesFilesPromise);
}

async function init() {
    await createUsers();
    await createChefs();
    await createRecipes();
}

init();