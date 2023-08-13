const login = module.exports

const jwt = require('jsonwebtoken')

const db = require('../db');
const utils = require('../utils')

const collection = db.collection.list.USERS

login.signIn = async (req, res) => {
    try {
        const user = await db.calls.login(collection, {username: req.body.username});
        if (user.length < 1) {
            res.json({code:404, error: "User Not Found"})
        }

        const match = await utils.bcrypt.comparePassword(req.body.password, user[0]['password'])
        if (!match) {
            res.json({code:403, error: "Password Mismatch"})
            return;
        }

        const sign = jwt.sign({username: user[0].username}, process.env.TOKEN_SECRET)
        res.json({code:200, token: sign, name: user[0].name});
    } catch (e) {
        console.log(e)
    }
}
