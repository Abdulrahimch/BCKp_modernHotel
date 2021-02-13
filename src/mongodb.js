const { MongoClient, ObjectID } = require('mongodb')
const id = new ObjectID()
console.log(id)
console.log(` Timestamp is ${id.getTimestamp()}`)

//const connectionURL = 'mongodb://mongo:27017'
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'test-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error){
        return console.log('unable to connect!')
    }
//    Create fields inside the collection in database

//    const db = client.db(databaseName)
//    db.collection('users').insertMany([{
//        name: 'Sarah',
//        nickname: 'Shiha'
//    },
//    {
//        name: 'Rawan',
//        nickname: 'Al-Wardah'
//    }
//    ], (error, result) =>{
//        if (error){
//            return console.log('Unable to connect!')
//        }
//        console.log(result.ops)
//    })

// Get info from a database.

//    const db = client.db(databaseName)
//    db.collection('users').findOne({ _id: new ObjectID('5f78adde8c4d684939a0311b')}, (error, result) => {
//        if (error){
//            return console.log(`Unable to find the User`)
//        }
//        console.log(result)
//    })

// Update a field
//    const db = client.db(databaseName)
//    const updatePromise = db.collection('users').updateOne({_id: new ObjectID('5f78ae29602cc649536bdecf')}, {$set: {name: 'new Audrey'}})
//    updatePromise.then((result) => {
//        console.log(`the result is ${result}`)
//    }).catch((error) => {
//        console.log(error)
//    })

// Delete fields

//    const db = client.db(databaseName)
//    db.collection('users').deleteOne({nickname: 'Audoush'})
//    .then((result) => {
//        console.log(result)
//    }).catch((error) => {
//        console.log(error)
//    })
//
//})
//
