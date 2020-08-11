const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors= require('cors')
const MOVIES = require('./movies-data.json')

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

app.use(function validateBearerToken(req, res, next) {
    const token = process.env.token
    const authMethod = req.get('Authorization')

    if (!authMethod || !authMethod.toLowerCase().startsWith("bearer ")) {
        res.status(401).json({ error: 'Unauthorized access, please provide proper authentication'})
    }
    next()
})

app.get('/movie', (req, res) => {
    const {genre, country, avg_vote} = req.query
    res.json(MOVIES)
})

const server = app.listen(8080, () => {
    console.log(`Port ${server.address().port} is an avocado`)
})
// Users can search for Movies by genre, country or avg_vote
// The endpoint is GET /movie
// The search options for genre, country, and/or average vote are provided in query string parameters.
// When searching by genre, users are searching for whether the Movie's genre includes a specified string. The search should be case insensitive.
// When searching by country, users are searching for whether the Movie's country includes a specified string. The search should be case insensitive.
// When searching by average vote, users are searching for Movies with an avg_vote that is greater than or equal to the supplied number.
// The API responds with an array of full movie entries for the search results
// The endpoint only responds when given a valid Authorization header with a Bearer API token value.
// The endpoint should have general security in place such as best practice headers and support for CORS.