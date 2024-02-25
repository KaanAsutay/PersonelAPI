"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require('express')
const app = express()

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env
require('dotenv').config()
const PORT = process.env?.PORT || 8000

// asyncErrors to errorHandler:
require('express-async-errors')

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

/* ------------------------------------------------------- */
// Middlewares:

// Logging:
// npm i morgan

const morgan = require('morgan')
// console.log(morgan)
// app.use(morgan('combined'))
// app.use(morgan('IP:remote-addr TIME:[:date[clf]] REQ:":method :url HTTP/:http-version" RES::status :res[content-length] APP:":user-agent"'))

// //? Write logs to file:
// const fs = require('node:fs')
// app.use(morgan('combined', {
//     stream: fs.createWriteStream('./access.log', { flags: 'a' })
// }))

//? Write logs to file - day by day:
const fs = require('node:fs')
const now = new Date()
const today = now.toISOString().split('T')[0]

app.use(morgan('combined', {
    stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a' })
}))

// Accept JSON:
app.use(express.json())

// SessionCookies:
app.use(require('cookie-session')({ secret: process.env.SECRET_KEY }))

// res.getModelList():
app.use(require('./src/middlewares/findSearchSortPage'))

// Cookie: Login/Logout Control Middleware
// app.use(async (req, res, next) => {
    

//     const Personnel = require('./src/models/personnel.model')

//     req.isLogin = false

//     if (req.session?.id) {

//         const user = Personnel.findOne({ _id: req.session?.id })

//         // if (user.password == req.session.password) {
//         //     req.isLogin = true
//         // }
//         req.isLogin = user.password == req.session.password
//     }

//     next()
// })

//* Moved -> middlewares/authentication.js

app.use(require('./src/middlewares/authentication'))

/* ------------------------------------------------------- */
// Routes:

// HomePath:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to PERSONEL API',
        // session: req.session,
        isLogin: req.isLogin,
        user: req.user
    })
})

// /auth
app.use('/auth', require('./src/routes/auth.router'))
// /departments
app.use('/departments', require('./src/routes/department.router'))
// / personnels
app.use('/personnels', require('./src/routes/personnel.router'))

/* ------------------------------------------------------- */

// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()