// Built in module
import path from 'path'

// External module
import express from 'express'

// Local modules
import mainRouter from './routes/index.js'

// Variables
const PORT = process.env.PORT || 5000
const app = express()
const __dirname = path.resolve()

// Set up express
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/static', express.static(__dirname + '/public'))

// Set up of pug.
app.set('view engine', 'pug')
app.set('views', './views')

// Routes
app.use('/', mainRouter)


// Server starting port
app.listen(PORT, () => {
  console.log(`Server is on http://localhost:${PORT}`)
})