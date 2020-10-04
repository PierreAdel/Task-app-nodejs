const express = require('express')
const User = require ('../models/user')
const auth = require('../middleware/auth') 
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancelEmail } =  require('../emails/account')
const router = new express.Router()


router.post('/users', async (req,res) => {
    console.log(req.body)
     
    const user = new User(req.body)
   

    try{
        await user.save()
        sendWelcomeEmail(user.email,user.name)
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

/* router.get('/users/:id', async (req, res) => {
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
 */


router.patch('/users/me', auth, async (req,res)=>{
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

        const user = req.user
        updates.forEach((update) => user[update] = req.body[update]) // bracket notation

        await user.save() // to user pre function

        res.send(user)
    }
    catch(e)
    {
        res.status(400).send(e)
    }

})

router.delete('/users/me', auth, async (req,res)=>{

    const _id = req.user._id
    try {
/*         const user = await User.findByIdAndDelete(_id)
        if(!user)
        {
            return res.status(404).send()
        } */
        await req.user.remove()
        sendCancelEmail(req.user.email,req.user.name)
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

//multer options
const upload = multer({
    //dest : 'avatars',
    limits: {
        fileSize: 1000000
    },

    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
        {
            return cb(new Error('File must be .jpg, .jpeg, or .png'))
        }
        cb(undefined,true)
    }
  
})
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res) => {
   // no dest then file is accesible here
   
   
   const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
   req.user.avatar = buffer

   await req.user.save()
    res.send()
}, (error,req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req,res) => {

    try {
        req.user.avatar = undefined
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.get('/users/:id/avatar', async (req,res) =>{

    try {
        const _id = req.params.id
        const user = await User.findById(_id)
        if(!user || !user.avatar)
        {
            throw new Error()
        }

        res.set('Content-Type','image/png') //by default it is set to application/json  i think
        res.send(user.avatar)

    } catch (e) {
        res.status(404).send()
    }

})

module.exports = router