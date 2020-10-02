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


//Get /tasks?completed=true
//GET /tasks?limit=10&skip=0
//GET /tasks?sortBy=createdAt:desc
router.get("/tasks", auth, async (req,res) => {

    const isCompleted = req.query.completed

    const match = {}
    const sort = {}
    if(req.query.sortBy)
    {
        const parts = req.query.sortBy.split(':')
        const type = parts[0]
        const order = parts[1]
        sort[type] = order === 'desc' ? -1 : 1
    }
    if(isCompleted)
    {
        match.completed = isCompleted === 'true'
    }
    try {
       //const tasks = await Task.find({owner: req.user._id})
       // OR
       await req.user.populate({
           path: 'tasks',
           match,
           options: {
               limit: parseInt(req.query.limit),
               skip: parseInt(req.query.skip),
               sort
           }
       }).execPopulate()
     
       res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }

})

router.get("/tasks/:id", auth, async (req,res) => {

    const _id = req.params.id
    
    try {
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task)
        {
            return res.status(404).send()
        }
        res.send(task)

    } catch (e) {
        res.status(500).send(e)
    }
   
})

router.patch('/tasks/:id', auth, async (req,res)=> {
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
        const task = await Task.findOne({_id, owner: req.user._id})
        
        
        
        //const task = await Task.findByIdAndUpdate(_id, req.body, {new :true, runValidators:true}) 
        if(!task)
        {
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])

        task.save()
        res.send(task)
    }
    catch(e)
    {
        res.status(400).send()

    }
})

router.delete('/tasks/:id', auth, async (req,res)=>{

    const _id = req.params.id
    try {
        const task = await Task.findOneAndDelete({_id, owner: req.user._id})
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