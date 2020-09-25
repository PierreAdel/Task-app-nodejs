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

//READ

     db.collection('users').findOne({ _id: new ObjectID("5f6dd0021a0c372d9c455f8f")},(error,user) =>{
        if(error)
        {
            return console.log("Unable to fetch")
        }
        console.log(user)
    })
    db.collection('users').find({age: 21}).toArray((error, users) =>
    {
        console.log(users)
    })
    db.collection('users').find({age: 21}).count((error, count) =>
    {
        console.log(count)
    })
 
    db.collection('tasks').findOne({_id: new ObjectID("5f6dfd6f5f6a9c3154510857")}, (error, task) =>
    {
        if(error){
           return console.log("Unable to fetch")
        }
        console.log(task)

    })

    db.collection('tasks').find({completed: false}).toArray((error, tasks) =>
    {
        if(error){
            return console.log("Unable to fetch")
         }
         console.log(tasks)

    })

})