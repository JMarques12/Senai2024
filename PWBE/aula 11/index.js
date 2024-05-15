const express = required('express');
const cors = require('cors');

const app = express();

const router = require('./src/routes');

app.use(cors);
app.use(router);

app.listen(3000, () =>{
    console.log("Running on 3000");
})

