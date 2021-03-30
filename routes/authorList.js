import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const __dirname = path.resolve()
const dbPath = path.resolve(__dirname, './data/authors.json')

router.get('/', (req, res) => {
  fs.readFile(dbPath, (err, data) => {
    if (err) res.status(404).render('error', {error: err})
    const authorList = JSON.parse(data)
    res.render('authorList', {authors: authorList})
  })
})

export default router