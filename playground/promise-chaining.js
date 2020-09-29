require('../src/db/mongoose')
const User = require('../src/models/user')

// 5f720c6a1d8d412294acb654
User.findByIdAndUpdate("5f720cef8dfca52704753155", {age: 1}).then((user) =>
{

    console.log(user)
    return User.countDocuments({age: 1})

}).then((result) => {
    console.log(result)
    
}).catch((e) => {
    console.log(e)

})