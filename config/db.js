const mongoose = require('mongoose');

//connect to database
const connectingString = process.env.DATABASE_CONNECTION;

 const connectDB = async() => {
     try {
         await mongoose.connect(connectingString,{
            //  useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options.
            //   Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, 
            //  and useCreateIndex are true, and useFindAndModify is false. Please remove these options from your code.
            
            // useCreateIndex: true,            
            // useFindAndModify: false,
            useUnifiedTopology: true,
            useNewUrlParser: true,
         })
         console.log('mongodb connection SUCCESS');
     } catch (error) {
         console.log('mongodb connection FAIL');
         console.log(error);
         process.exit(1);
     }

}

module.exports = connectDB;