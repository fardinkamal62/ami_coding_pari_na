const registration = module.exports

const utils = require('../utils')

const db = require('../db')

const collection = db.collection.list.USERS;


registration.createAccount = async (req, res) => {
    let timeNow = new Date().getTime()
    let password = await utils.bcrypt.hashPassword(req.body.password)

    const user = await db.calls.find(collection, {username: req.body.username});

    if (user.length > 0) return res.status(401).json({error: 'Account already exist'})

    const payload = {
        name: req.body.name,
        username: req.body.username,
        password,
        createdAt: timeNow,
    }

    try {
        const resp = await db.calls.insert(collection, payload)
        res.status(200).json(resp)
    } catch (e) {
        res.status(500).json({error: e})
    }
}
