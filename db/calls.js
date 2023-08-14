const {MongoClient} = require('mongodb')

const calls = module.exports

const db = process.env.DB

const URI = process.env.URI
const client = new MongoClient(URI)

calls.listDB = async () => {
    await client.connect()
    const dbList = await client.db().admin().listDatabases()
    console.log(dbList)
}

calls.find = async (collection, query, limit, page, sort = {timestamp: - 1}) => {
    await client.connect()
    const response = await client.db(db).collection(collection).find(query).limit(parseInt(limit)).skip(parseInt(limit) * parseInt(page)).sort(sort).toArray();
    delete response?.[0]?.['password']
    return response
}

calls.findOne = async (collection, query) => {
    await client.connect()
    const response = await client.db(db).collection(collection).findOne(query)
    delete response?.[0]?.['password']
    return response
}

calls.login = async (collection, query) => {
    await client.connect()
    return await client.db(db).collection(collection).find(query).limit(1).toArray()
}

calls.insert = async (collection, data) => {
    await client.connect()
    return await client.db(db).collection(collection).insertOne(data)
}

calls.update = async (collection, query, newData) => {
    await client.connect()
    const response = await client.db(db).collection(collection).updateOne(query, {$set: newData})
    return response.acknowledged
}

calls.aggregate = async (collection, pipeline) => {
    await client.connect()
    return await client.db(db).collection(collection).aggregate(pipeline).toArray()
}