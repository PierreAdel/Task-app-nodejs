const express = require('express')
const User = require ('../models/user')
const auth = require('../middleware/auth') 
const router = new express.Router()


router.post('/users', async (req,res) => {
    console.log(req.body)
     
    const user = new User(req.body)
   

    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    }catch(e){
        res.status(400).send(e)
    }

    /* user.save().then(() => {
        res.status(201).send(user)

    }).catch((e) => {
        res.status(400).send(e)

    })  */

})

router.post('/users/login', async (req,res) => {

    try {
        const email = req.body.email
        const password = req.body.password
        const user = await User.findByCredentials(email, password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {     
        res.status(400).send(e)
    }


})

router.post('/users/logout', auth, async(req, res)=> {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
  
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req,res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.send(500).send()
    }
})


router.get('/users/me', auth, async (req,res) => {

    res.send(req.user)
    // fetch all users
 /*    try{
        const users = await User.find({})
        res.send(users)
    }
    catch(e){
        res.status(500).send(e)
    } */

})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id


    try{
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    }
    catch(e){
        res.status(500).send(e)
    }

})

router.patch('/users/:id', async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates= ['name','email','password','age']

    const isValidOp = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOp)
    {
        return res.status(400).send({error: "Invalid update(s)!"})
    }
    try{

        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update]) // bracket notation

        await user.save() // to user pre function

        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new :true, runValidators: true})
        if(!user)
        {
            return res.status(404).send()
        }
        res.send(user)
    }
    catch(e)
    {
        res.status(400).send(e)
    }

})

router.delete('/users/:id', async (req,res)=>{

    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        if(!user)
        {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router