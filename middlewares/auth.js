const auth = module.exports

const jwt = require('jsonwebtoken')

auth.authenticate = (req, res, next) => {
    try {
        const header = req.cookies['token'];
        const token = header && header.split(' ')[0]
        if (token === undefined) {
            res.json({code: 401, message: 'Unauthorised'})
        }
        return jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log(err)
                res.json({code: 403, message: 'Mismatch'})
            }
            req.user = user
            next()
        })
    } catch (e) {
        console.log(e)
        res.json({data: "Please Contact Admin", code: 500})
    }
}
