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

const jwt = require('jsonwebtoken')

const func = async () => {
  const token = jwt.sign({_id: 'abc'}, 'thisisatest', {expiresIn: '7 days'})
  console.log(token)

  const token2 =  jwt.verify(token, 'thisisatest')
  console.log(token2)
}
func()