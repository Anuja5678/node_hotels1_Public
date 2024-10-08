const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());  

app.get('/',function(req,res){
    res.send('Welcome to my hotel ...how can i help u')
})

const personRoutes1 = require('./routes/personRoutes1');
app.use('/person1',personRoutes1);

const MenuItemRoutes1 = require('./routes/MenuItemRoutes1');
app.use('/menuitem1',MenuItemRoutes1);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('listening on port 3000');
})