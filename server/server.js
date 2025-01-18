require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express();
const router = require('./routers/router')
const connection = require('./db')

const corsOptions = {
  origin: 'https://shadi-frontend.vercel.app', // Replace with your allowed origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
};

app.use(cors(corsOptions));
app.use(express.json())
app.use('/', router)

connection().then(() => {

    app.listen(process.env.PORT, () => {
        console.log('Server Connected');
    })
})

module.exports=app
