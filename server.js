const express = require('express');
const app = express();

//import routes
const a = require('./routes/a');


//cors



//middleware 
app.use(express.json());
app.use("",a)



const PORT = process.env.PORT || 5050;

//Server listen's to the PORT
app.listen(PORT, () => console.log(`Server is running at PORT:${PORT}`));