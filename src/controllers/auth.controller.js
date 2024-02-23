"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// JWT
// npm i jsonwebtoken

const Personnel = require('../models/personnel.model')

module.exports = {

    login: async (req, res) => {

         const { username, password } = req.body

         if (username && password) {

            const user = await Personnel.findOne({ username, password })

            if (user) {

                if (user.isActive) {
                // Login OK

                    const accessData = {
                        _id: user._id,
                        departmentId: user.departmentId,
                        firstname: user.firstName,
                        lastname: user.lastName,
                        isActive: user.isActive,
                        islead: user.isLead
                    }

                    const refreshData = {
                        username: user.username,
                        password: user.password
                    }


                } else {
                    res.errorStatusCode = 401
                    throw new Error('This account is not active.')
                }

            } else {
                res.errorStatusCode = 401
                throw new Error('Wrong username or password.')
            }

         } else {
            res.errorStatusCode = 401
            throw new Error('Please entry username and password.')
         }
    },

    refresh: async (req, res) => {



    },

    logout: async (req, res) => {



    },

}