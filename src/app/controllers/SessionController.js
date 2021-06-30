module.exports = {
    loginForm(req, res){
        return res.render('admin/session/login')  
    },
    forgotForm(req, res){
        return res.render('admin/session/forgot-password')
    }
}