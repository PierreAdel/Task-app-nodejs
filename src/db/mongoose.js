const mongoose = require("mongoose")
 

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false
})






/* const myTask = new Task({
    description: '   wake up',
    })

myTask.save().then((myTask) => {
    console.log(myTask)
}).catch((error) => {
    console.log(error)
}) */