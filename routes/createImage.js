import express from 'express';
import {v4} from 'uuid'
import fs from 'fs';
import path from 'path';
import multer from 'multer';

const __dirname = path.resolve()
const router = express.Router();
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, path.join(__dirname, 'public/images'));
  },
  filename: (req, file, cb) =>{
    cb(null, v4() + file.originalname);
  }
});

const upload = multer({storage: storageConfig})
const dbPath = path.resolve(__dirname, './data/images.json')
const dbAuthorPath = path.resolve(__dirname, './data/authors.json')

router.get('/', (req, res) => {
      res.render('newImage')
    })

router.post('/create-image', upload.single('photo'), (req, res) => {
  if (req.body) {
    const image = {
      id: v4(),
      author: req.body.author || 'Anonymous',
      description: req.body.description,
      photo: req.file.filename || 'placeholder.jpg'
    }
    const newAuthor = {
      id: v4(),
      name: req.body.author || 'Anonymous',
      images: 1
    }
    fs.readFile(dbAuthorPath, (err, data) => {
      if (err) res.status(404).render('error', {error: err})
      const authorList = JSON.parse(data)
      const author = authorList.find(auth => auth.name === req.body.author)
      if (author) author.images++
      else authorList.push(newAuthor)

      fs.writeFile(dbAuthorPath, JSON.stringify(authorList), (err) => {
        if (err) res.status(400).render('error', {error: err})
      })
    })
    fs.readFile(dbPath, (err, data) => {
      if (err) res.status(404).render('error', {error: err})
      const imageList = JSON.parse(data)
      imageList.push(image)

      fs.writeFile(dbPath, JSON.stringify(imageList), (err) => {
        if (err) res.status(400).render('error', {error: err})
        res.render('thank', {thank: 'Thank you! The image was added!'})
      })
    })
  }
})

export default router