const User = require('../models/User')

module.exports = {

    redirectCreate(req, res){
        return res.render('admin/users/create.njk')
    },

    list(req, res){},

    edit(req, res){},

    async post(req, res){

        
        
    },

    put(req, res){},

    delete(req, res){}

}