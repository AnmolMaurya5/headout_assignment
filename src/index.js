import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import path from 'path';

dotenv.config({
  path: './.env',
});

const app = express();
app.get('/tmp/data', (req, res) => {
  console.log(req.query);
  const n = parseInt(req.query.n) || 1;
  const m = parseInt(req.query.m);

  const fileName = path.join('src', '..', 'tmp/data', `${n}.txt`);

  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).send(`Error: File '${fileName}' not found.`);
    }

    const lines = data.split('\n');
    if (m && m <= lines.length) {
      res.send(lines[m - 1]);
    } else {
      res.send(data);
    }
  });
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`App is listening on Port: ${process.env.PORT || 8000}`);
});
