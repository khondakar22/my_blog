const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoos = require('mongoose');
const postsRouters = require('./routes/posts');
const userRouters = require('./routes/user')
const app = express();

mongoos
.connect('mongodb+srv://riyad:'+ process.env.MONGO_ATLAS_PW+'@my-blog-qput3.mongodb.net/my_blog_mean?retryWrites=true&w=majority').then(()=>{
  console.log('Connected to database!')
}).catch(()=>{
  console.log('Connection Failed');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static(path.join('images')))
app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/posts/', postsRouters);
app.use('/api/user', userRouters);

module.exports = app;
