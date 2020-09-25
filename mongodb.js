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

//UPDATE

     db.collection('users').updateOne({
        _id: new ObjectID("5f6dfbcc84ef5105149ed837")
    }, {
        $inc: {
            age: -7
        }

    }).then((result) =>{
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    db.collection('tasks').updateMany({completed: false},{
        $set: {
            completed: true
        }
    }).then((result) =>
    {
        console.log(result.modifiedCount)

    }).catch((error) => {
        console.log(error)

    })

}) 