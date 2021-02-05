const mongoose = require('mongoose');
//const { db } = require('../models/ator');

mongoose.connect(process.env.CONEXAODB,{ useNewUrlParser: true, useUnifiedTopology: true });
/*console.log("MOOGOSEEEEEEEEEEEEEEEEEEEEEEEE")
db.on('open', function() {
    console.log('Connected to MongoDB')
})
db.on('error', function(err) {
    console.log(err)
})*/