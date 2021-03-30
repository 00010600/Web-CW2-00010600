import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const __dirname = path.resolve()
const dbPath = path.resolve(__dirname, './data/images.json')

router.get('/:id', (req, res) => {
  const id = req.params.id
  if (id) {
    fs.readFile(dbPath, (err, data) => {
      if (err) res.status(404).render('error', {error: err})
      const imageList = JSON.parse(data)
      const image = imageList.find(image => image.id === id)
      if(image) res.render('imageDetails', {image: image})
      else res.status(404).render('error', {error: 'Requested image is not found!'})
    })
  } else {
    res.status(400).render('error', {error: 'You have not selected image yet!'})
  }
})

export default router