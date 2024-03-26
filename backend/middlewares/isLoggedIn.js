const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl
        // req.flash('failure', 'You must be logged in')
        console.log(req.session.redirectUrl)
        return res.send('You must be logged in')
    }
    return next()
}

module.exports = isLoggedIn
