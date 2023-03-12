const express = require('express');
const connectToMongo = require('./db.js');
const cors = require('cors');

connectToMongo();


const port = 5000;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/restapi/user',require('./routes/user'))
app.use('/restapi/list',require('./routes/lists'))

app.listen(port,()=>{
console.log(`To do List app live at http://localhost:${port}`)
})