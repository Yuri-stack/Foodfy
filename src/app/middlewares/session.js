function onlyUsers(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/admin/login')
    }
    next()
}

function isLoggedRedirectToProfile(req, res, next) {
    if (req.session.userId) {
        return res.redirect('/admin/profile')
    }
    next()
}

function isAdmin(req, res, next) {
    if (!req.session.isAdmin) {
        return res.redirect('/admin/profile')
    }
    next()
}

module.exports = { onlyUsers, isLoggedRedirectToProfile, isAdmin }