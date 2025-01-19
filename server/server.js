require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express();
const router = require('./routers/router')
const cookieParser = require('cookie-parser');
const connection = require('./db')

const corsOptions = {
  origin: ['http://localhost:5173', 'https://shadi-frontend.vercel.app'], // Replace with your allowed origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedhallowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allowed methods
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json())
app.use('/', router)

connection().then(() => {

  app.listen(process.env.PORT, () => {
    console.log('Server Connected');
  })
})

module.exports = app
