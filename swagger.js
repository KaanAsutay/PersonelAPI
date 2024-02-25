"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000
/* ------------------------------------------------------- */
// npm i swagger-autogen

const swaggerAutogen = require('swagger-autogen')
const packageJson = require('./package.json')

const document = {
	// info: {
	// 	version: "1.0.0",
	// 	title: "Personnel API",
	// 	description: "Personnel Management API Service",
	// 	termsOfService: "http://www.clarusway.com",
	// 	contact: { name: "Clarusway", email: "qadir@clarusway.com" },
	// 	license: { name: "BSD License", },
	// },
    // host: `${HOST}:${PORT}`,
	// basePath: '/',
	// schemes: ['http', 'https'],
    info: {
		version: "packageJson.version",
		title: "packageJson.title",
		description: "packageJson.description",
		termsOfService: "http://www.clarusway.com",
		contact: { name: "packageJson.author", email: "qadir@clarusway.com" },
		license: { name: "packageJson.license" },
	},
    host: `${HOST}:${PORT}`,
	basePath: '/',
	schemes: ['http', 'https'],
    // JWT Settings:
	securityDefinitions: {
		JWT: {
			type: 'apiKey',
			in: 'header',
			name: 'Authorization',
			description: 'Entry Your AccessToken (JWT) for Login. Example: <b>Bearer <i>...token...<i></b>'
		}
	},
	security: [{ "JWT": true }],
}

const routes = ['./index.js']
const outputFile = './swagger.json'

// Create JSON file:
swaggerAutogen(outputFile, routes, document)