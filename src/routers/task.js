const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/tasks', auth, async (req,res) => {

    console.log(req.body)
    /* const myTask = new Task(req.body)
    myTask.owner = req.user._id */
    //OR
    const myTask = new Task({
        ...req.body,
        owner:req.user._id

    })

    try {
        await myTask.save()
        res.status(201).send(myTask)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.get("/tasks", async (req,res) => {


    try {
       const tasks = await Task.find({})
       res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }

})

router.get("/tasks/:id", async (req,res) => {

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

router.patch('/tasks/:id', async (req,res)=> {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']

    const validOp = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!validOp)
    {
        return res.status(400).send({error: "Invalid update(s)!"})
    }
    try{
        const _id = req.params.id
        const task = await Task.findById(_id)
        updates.forEach((update) => task[update] = req.body[update])

        task.save()
        
        
        //const task = await Task.findByIdAndUpdate(_id, req.body, {new :true, runValidators:true}) 
        if(!task)
        {
            return res.status(404).send()
        }
        res.send(task)
    }
    catch(e)
    {
        res.status(400).send()

    }
})

router.delete('/tasks/:id', async (req,res)=>{

    const _id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(_id)
        if(!task)
        {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router