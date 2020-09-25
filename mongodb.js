//CRUD 
 //init
const mongodb =require('mongodb')
const MongoClient =mongodb.MongoClient


const connectionURL ='mongodb://127.0.0.1:27017'
const databaseName='task-manager'


MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true }, (error, client) =>
{
    if(error)
    {return console.log('Unable to connect to database!')}

    const db = client.db(databaseName)
//CREATE
     

    db.collection('users').insertOne({
        name: 'Pierre',
        age: 21
    }, (error, result) =>
    {
        if(error){
            return console.log("Unable to inser user")
        }
        console.log(result.insertedCount)
    }) 
 
    db.collection('users').insertMany([{
            name:'perper',
            age:29
        },{

            name:'parpar',
            age:23
        }], (error, result) => 
        {
            if(error){
                return console.log("Unable to inser docs")
            }
            console.log(result.ops)

        })

    db.collection('tasks').insertMany([
        {
        description: "wake up", 
        completed: true},
        {
        description: "have breakfast", 
        completed: false
        },{
        description: "get dressed", 
        completed: false
        }], (error, result) =>{
            if (error)
            {
                return console.log(error)
            }
            console.log(result.ops)
        })

})