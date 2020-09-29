const express = require('express')

require('./db/mongoose')
const Task = require('./models/task')
const User = require('./models/user')

const app =express()
const port = 3000 || process.env.PORT

app.use(express.json())


app.post('/users', async (req,res) => {
    console.log(req.body)
     
    const user = new User(req.body)
   

    try{
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }

    /* user.save().then(() => {
        res.status(201).send(user)

    }).catch((e) => {
        res.status(400).send(e)

    })  */

})


app.post('/tasks', async (req,res) => {

    console.log(req.body)
    const myTask = new Task(req.body)


    try {
        await myTask.save()
        res.status(201).send(myTask)
    } catch (e) {
        res.status(400).send(e)
    }

})

app.get('/users', async (req,res) => {

    // fetch all users


    try{
        const users = await User.find({})
        res.send(users)
    }
    catch(e){
        res.status(500).send(e)
    }

})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id


    try{
        const user = User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    }
    catch(e){
        res.status(500).send(e)
    }

})


app.get("/tasks", async (req,res) => {


    try {
       const tasks = await Task.find({})
       res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }

})


app.get("/tasks/:id", async (req,res) => {

    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if(!task)
        {
            return res.status(404).send("Task not found")
        }
        res.send(task)

    } catch (e) {
        res.status(500).send(e)
    }
   
})



app.listen(port, () => {
    console.log('Server is up on port '+port)

})