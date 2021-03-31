import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const __dirname = path.resolve()
const dbPath = path.resolve(__dirname, './data/images.json')
const dbAuthorPath = path.resolve(__dirname, './data/authors.json')

router.get('/get-images', (req, res) => {
  fs.readFile(dbPath, (err, data) => {
    if (err) res.status(404).render('error', {error: err})
    const imageList = JSON.parse(data)
    res.json(imageList)
  })
})
router.get('/get-images/:id', (req, res) => {
  fs.readFile(dbPath, (err, data) => {
    if (err) res.status(404).render('error', {error: err})
    const imageList = JSON.parse(data)
    const image = imageList.find(image => image.id === req.params.id)
    res.json(image)
  })
})
router.get('/get-authors', (req, res) => {
  fs.readFile(dbAuthorPath, (err, data) => {
    if (err) res.status(404).render('error', {error: err})
    const authorList = JSON.parse(data)
    res.json(authorList)
  })
})
router.get('/get-author/:id', (req, res) => {
  fs.readFile(dbAuthorPath, (err, data) => {
    if (err) res.status(404).render('error', {error: err})
    const authorList = JSON.parse(data)
    const author = authorList.find(auth => auth.id === req.params.id)
    res.json(author)
  })
})
export default router