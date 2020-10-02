const mongoose = require("mongoose")
const validator = require('validator')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Task = require('../models/task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age:{
        type: Number,
        default: 0,
        validate(value) {
            if(value<0)
            {
                throw new Error('Age must be a positive number')
            }
        }
    },
    email: {
        type: String,
        unique:true,
        required: true,
        trim: true,
        lowercase:true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error("Email is invalid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim:true,
        minlength:7,
        validate(value)
        {
            if(value.toLowerCase().includes('password'))
            {
                throw new Error("Password can't contain 'Password'")
            }
        }

    },
    tokens: [{
        token: {
            type: String,
            required: true
        }


    }]

})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// hash the plain test password
userSchema.pre('save', async function(next) {
    const user = this 
    console.log("before saving")

    if(user.isModified('password'))
    {
        user.password = await bycrypt.hash(user.password, 8)
        
    }

    next()
})

userSchema.pre('remove', async function(next)  {

    const user = this
    await Task.deleteMany({owner: user._id})
    next()
})






// static
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user)
    {
        throw new Error("Incorrect email/password!")
    }
    

    const isMatch = await bycrypt.compare(password, user.password)
    
    if(!isMatch)
    {
        
        throw new Error("Incorrect email/password!")
    }

    return user
}

//inistance
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = await jwt.sign({_id: user._id.toString()}, 'thisisatest')
   
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}
const User = mongoose.model('User', userSchema)


 module.exports = User

 /*  const me = new User({
   name:'   mike       ',
   email: "   PIERREadel@gmail.com   ",
   password:"pierreadelkamel123"

})
me.save().then((me) => {
        console.log(me)
}).catch((error) => {
    console.log(error)
}) 

 */