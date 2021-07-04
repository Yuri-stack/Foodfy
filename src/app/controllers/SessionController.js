module.exports = {
    loginForm(req,res){
        return res.render('admin/session/login')  
    },
    login(req,res){
        req.session.userId = req.user.id
        req.session.isAdmin = req.user.is_admin;
        return res.redirect("/admin/profile")
    },
    logout(req,res){
        req.session.destroy()
        return res.render('admin/session/login')
    },
    forgotForm(req,res){
        return res.render('admin/session/forgot-password')
    },
    resetForm(req,res){
        return res.render('admin/session/password-reset')
    }
}