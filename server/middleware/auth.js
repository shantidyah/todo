const jwt = require('jsonwebtoken')

class Auth{
    static auth(req, res, next){
        let token = req.headers.token
        if(!token){
            res.status(401).json('Please login!')
        } else {
            next()
        }
    }
}

module.exports = Auth