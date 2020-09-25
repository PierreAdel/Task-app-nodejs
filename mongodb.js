//CRUD 
 //init
/* const mongodb =require('mongodb')
const MongoClient =mongodb.MongoClient
const ObjectID = mongodb.ObjectID
 */
const {MongoClient, ObjectID} = require('mongodb')

const connectionURL ='mongodb://127.0.0.1:27017'
const databaseName='task-manager'



MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true }, (error, client) =>
{
    if(error)
    {return console.log('Unable to connect to database!')}

    const db = client.db(databaseName)

//DELETE

    db.collection('users').deleteMany({
        age: 23
    }).then((result) =>{
        console.log(result)
    }).catch((error) =>{
        console.log(error)
    })

    db.collection('tasks').deleteOne({
        description: 'wake up'
    }).then((result) =>{
        console.log(result)
    }).catch((error) =>{
        console.log(error)
    })

}) 