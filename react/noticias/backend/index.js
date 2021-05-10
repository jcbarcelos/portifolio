const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const routePost = require('./routes/route')
require('dotenv/config')
const port = 3003;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/', routePost);

// mongoose.connect(process.env.DB_CONNECTION, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//         useCreateIndex: true
//     }, () => {
//         console.log('DB');
//     });


app.listen(port, () =>{
  console.log(`Server ${port}`);
})