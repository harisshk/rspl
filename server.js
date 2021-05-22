const express = require('express');
const app = express();

//import routes
const a = require('./routes/a');


//cors



//middleware 
app.use(express.json());
app.use("",a)



app.listen(4000,()=>console.log("Server running @ 4000"))