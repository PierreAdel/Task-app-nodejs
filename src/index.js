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

app.listen(port, () => {
    console.log('Server is up on port '+port)

})