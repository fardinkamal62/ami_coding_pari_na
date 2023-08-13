const bcrypt = module.exports

const bc = require('bcrypt')

bcrypt.hashPassword = async (plaintextPassword) => {
    return await bc.hash(plaintextPassword, 10)
}

bcrypt.comparePassword = async (plaintextPassword, hash) => {
    return await bc.compare(plaintextPassword, hash)
}
