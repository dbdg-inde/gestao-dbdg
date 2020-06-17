const mongoose = require('mongoose')

mongoose.connect(process.env.CONEXAODB,{ useNewUrlParser: true, useUnifiedTopology: true });