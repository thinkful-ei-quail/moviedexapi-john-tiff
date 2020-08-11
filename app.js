require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const MOVIES = require('./movies-data.json')

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

app.use(function validateBearerToken(req, res, next) {
    const token = process.env.token
    const authMethod = req.get('Authorization')

    if (!authMethod || !authMethod.toLowerCase().startsWith("bearer ") || authMethod.substring(7).trim() !== token) {
        res.status(401).json({ error: 'Unauthorized access, please provide proper authentication' })
    } else {
        next()
    }
})

app.get('/movie', (req, res) => {
    const { genre, country, avg_vote } = req.query
    let results = MOVIES

    if (avg_vote) {
        if (avg_vote > 0 && avg_vote < 9.6) {
            results = results.filter((movie) => movie.avg_vote >= avg_vote)
        } else {
            ('Sorry, please provide a rating between 0 and 9.5 :/')
        }
    }
    if (genre) {
        results = results.filter((movie) => movie.genre.toLowerCase().includes(genre.toLowerCase()))
    }
    if (country) {
        results = results.filter((movie) => movie.country.toLowerCase().includes(country.toLowerCase()))
    }
    res.json(results)
})

const server = app.listen(8080, () => {
    console.log(`Port ${server.address().port} is an avocado`)
})
