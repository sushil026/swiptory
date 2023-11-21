const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('/', (req, res)=>{
  res.json('hello')
})

app.listen(4000)
