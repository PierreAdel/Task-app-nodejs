const express = require('express')

require('./db/mongoose')
const Task = require('./models/task')
const User = require('./models/user')

const app =express()
const port = 3000 || process.env.PORT

app.use(express.json())


app.post('/users', (req,res) => {
    console.log(req.body)
     
    const user = new User(req.body)
    user.save().then(() => {
        res.status(201).send(user)

    }).catch((e) => {
        res.status(400).send(e)

    })
})


app.post('/tasks', (req,res) => {

    console.log(req.body)
    const myTask = new Task(req.body)
    myTask.save().then(() => {
        res.status(201).send(myTask)
    }).catch((e) => {
        res.status(400).send(e)

    })

})

app.get('/users', (req,res) => {

    // fetch all users
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send(e)

    }) 
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })
})


app.get("/tasks", (req,res) => {

    
    Task.find({}).then((tasks) => {

        res.send(tasks)

    }).catch((e) => {

        res.status(500).send(e)
    })

})


app.get("/tasks/:id", (req,res) => {

    const _id = req.params.id
    Task.findById(_id).then((task) => {
        if(!task)
        {
            return res.status(404).send("Task not found")
        }
        res.send(task)

    }).catch((e) => {

        res.status(500).send(e)
    })

})



app.listen(port, () => {
    console.log('Server is up on port '+port)

})