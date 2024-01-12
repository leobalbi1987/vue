// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configurar conexão com o MongoDB (certifique-se de ter o MongoDB instalado e em execução)
mongoose.connect('mongodb://localhost:27017/musicApp', { useNewUrlParser: true, useUnifiedTopology: true });

// Definir o modelo do documento
const musicSchema = new mongoose.Schema({
  title: String,
  artist: String,
  frequency: String,
  date: Date,
});

const Music = mongoose.model('Music', musicSchema);

// Rotas
app.post('/api/addMusic', (req, res) => {
  const { title, artist, frequency } = req.body;
  const date = new Date();

  const newMusic = new Music({ title, artist, frequency, date });

  newMusic.save((err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Música cadastrada com sucesso!');
    }
  });
});

app.get('/api/getMusics', (req, res) => {
  Music.find({}, (err, musics) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(musics);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
