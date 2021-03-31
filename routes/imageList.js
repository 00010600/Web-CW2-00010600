import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const __dirname = path.resolve()
const dbPath = path.resolve(__dirname, './data/images.json')
const dbAuthorPath = path.resolve(__dirname, './data/authors.json')

router.get('/', (req, res) => {
  fs.readFile(dbPath, (err, data) => {
    if (err) res.status(404).render('error', {error: err})
    const imageList = JSON.parse(data)
    res.render('imageList', {images: imageList})
  })
})
router.get('/:author', (req, res) => {
  const authorName = req.params.author
  if (!authorName) return res.status(404).render('error', {error: err})
  fs.readFile(dbPath, (err, data) => {
    if (err) res.status(404).render('error', {error: err})
    const imageList = JSON.parse(data)
    const authorImages = imageList.filter(img => img.author === authorName)
    res.render('imageList', {images: authorImages, author: authorName})
  })
})
// Delete image
router.post('/:id', (req, res) => {
  const id = req.params.id
  if (id) {

    fs.readFile(dbPath, async (err, data) => {
      if (err) res.status(404).render('error', {error: err})
      const imageList = JSON.parse(data)
      const images = imageList.filter(image => image.id !== id)
      const image = imageList.find(image => image.id === id)
      console.log('1: ', image)

      await fs.readFile(dbAuthorPath, (err, data) => {
        if (err) return res.status(404).render('error', {error: err})
        const authorList = JSON.parse(data)
        const author = authorList.find(auth => auth.name === image.author)
        console.log('inside: ', author)
        if (author) {
          author.images--
          if (author.images <= 0) {
            const index = authorList.indexOf(author)
            authorList.splice(index, 1)
          }
        }
        console.log('inside end: ', authorList)

        fs.writeFile(dbAuthorPath, JSON.stringify(authorList), (err) => {
          if (err) res.status(400).render('error', {error: err})
        })
      })
      console.log('2: ', images)
      fs.writeFile(dbPath, JSON.stringify(images), (err) => {
        if (err) res.status(400).render('error', {error: err})
        res.render('thank', {thank: 'Thank you!'})
      })
    })
  }
})

export default router