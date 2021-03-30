// Built in module
import path from 'path'

// External module
import express from 'express'

// Local modules
import mainRouter from './routes/index.js'
import createRouter from './routes/createImage.js'
import authorRouter from './routes/authorList.js'
import detailsRouter from './routes/imageDetails.js'
import imagesRouter from './routes/imageList.js'

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
app.use('/create-image', createRouter)
app.use('/authors', authorRouter)
app.use('/images', imagesRouter)
app.use('/details', detailsRouter)


// Server starting port
app.listen(PORT, () => {
  console.log(`Server is on http://localhost:${PORT}`)
})