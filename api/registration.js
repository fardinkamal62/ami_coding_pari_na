const registration = module.exports

const utils = require('../utils')

const db = require('../db')

const collection = db.collection.list.USERS;


registration.createAccount = async (req, res) => {
    let timeNow = new Date().getTime()
    let password = await utils.bcrypt.hashPassword(req.body.password)

    const user = await db.calls.findOne(collection, {username: req.body.username});

    if (user) return res.status(401).json({error: 'Account already exist'});

    const userID = await db.calls.find(collection, {}, 1, 0, {createdAt: -1});

    const payload = {
        name: req.body.name,
        username: req.body.username,
        userID: userID[0].userID + 1,
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
