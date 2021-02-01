const mongoose = require('mongoose')

res = mongoose.connect(process.env.CONEXAODB,{ useNewUrlParser: true, useUnifiedTopology: true });
console.log("MOOGOSEEEEEEEEEEEEEEEEEEEEEEEE")
console.log(res)