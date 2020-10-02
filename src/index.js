const express = require('express')

require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app =express()
const port = 3000 || process.env.PORT

/* app.use((req,res,next) => {

  //console.log(req.method,req.path)
  if(req.method === 'GET')
  {
    res.send('GET requests are disabled')

  }
  else{
    next()
  }
  
  
})
 */

// app.use((req, res, next) =>  res.status(503).send('Site is down, check back later!'))


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port '+port)

})

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
/*   const task = await Task.findById('5f7743119ca05f04a0151313')
  await task.populate('owner').execPopulate()
  console.log(task.owner) */
  
  const user = await User.findById('5f77422c477e660b04dda221')
  await user.populate('tasks').execPopulate()
  console.log(user.tasks) 
}
main()
/* const pet = {
  name: 'hal'
}
pet.toJSON = function() {
  //console.log(this)
  return {}
}
console.log(JSON.stringify(pet)) */