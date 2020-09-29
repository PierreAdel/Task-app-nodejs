require('../src/db/mongoose')
const Task = require('../src/models/task')

/* 
Task.findByIdAndDelete("5f720d7faeddfb0bd8ca3f44").then((task) => {
    console.log("task removed. Title: "+task.description )
    return Task.countDocuments({completed: false})
}).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})  */

const deleteTaskAndCount= async(id) => {

    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count

} 

deleteTaskAndCount("5f720dc5eee3d11978f4297f").then((count) =>{
    console.log(count)
}).catch((e) => {
    console.log(e)

})