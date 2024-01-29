const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// const knex = require('knex');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configurar conexão com o MySQL
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // Deixe em branco, a menos que você tenha definido uma senha no MySQL
  database: 'music_app',
  port: 3306,
});

// Definir a tabela no MySQL
// const db = knex({
//   client: 'mysql2',
//   connection: {
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'music_app',
    
//   },
// });


        // banco de dados

db.schema.hasTable('musics').then((exists) => {
  if (!exists) {
    return db.schema.createTable('musics', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('artist').notNullable();
      table.string('frequency').notNullable();
      table.dateTime('date').defaultTo(db.fn.now());
    });
  }
})
.then(() => console.log('Tabela criada no MySQL!'))
.catch((err) => console.error('Erro ao criar tabela no MySQL:', err));



// Rotas 


app.post('/api/addMusic', async (req, res) => {
  console.log('Recebendo solicitação para adicionar música:', req.body);

  const { title, artist, frequency } = req.body;

  try {
    await db('musics').insert({
      title,
      artist,
      frequency,
    });

    console.log('Música adicionada no MySQL!');
    res.status(200).send({ message: 'Música adicionada com sucesso' });
  } catch (err) {
    console.error('Erro ao adicionar música no MySQL:', err);
    res.status(500).send(err);
  }
});

app.get('/api/getMusics', async (req, res) => {
  try {
    const musics = await db('musics').select('*');
    console.log('Músicas encontradas no MySQL!');
    res.status(200).send(musics);
  } catch (err) {
    console.error('Erro ao buscar músicas no MySQL:', err);
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// Definir a tabela no MySQL para selectedMusic


db.schema.createTable('selectedMusic', (table) => {
  table.increments('id').primary();
  table.string('title').notNullable();
  table.string('artist').notNullable();
  table.string('frequency').notNullable();
  table.dateTime('date').defaultTo(db.fn.now());
})
  .then(() => console.log('Tabela selectedMusic criada no MySQL!'))
  .catch((err) => console.error('Erro ao criar tabela selectedMusic no MySQL:', err));


// Rotas

// Adicionar música à tabela selectedMusic

app.post('/api/addSelectedMusic', async (req, res) => {
  console.log('Recebendo solicitação para adicionar música selecionada:', req.body);

  const { title, artist, frequency } = req.body;

  try {
    await db('selectedMusic').insert({
      title,
      artist,
      frequency,
    });

    console.log('Música adicionada na tabela selectedMusic!');
    res.status(200).send({ message: 'Música adicionada com sucesso na tabela selectedMusic' });
  } catch (err) {
    console.error('Erro ao adicionar música na tabela selectedMusic:', err);
    res.status(500).send(err);
  }
});

// Obter músicas da tabela selectedMusic
app.get('/api/getSelectedMusics', async (req, res) => {
  try {
    const selectedMusic = await db('selectedMusic').select('*');
    console.log('Músicas encontradas na tabela selectedMusic!');
    res.status(200).send(selectedMusic);  // Corrigido para usar a variável correta
  } catch (err) {
    console.error('Erro ao buscar músicas na tabela selectedMusic:', err);
    res.status(500).send(err);
  }
});
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});


