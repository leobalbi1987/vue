const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const knex = require('knex');

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
const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'music_app',
    
  },
});

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



// connection.query('SELECT title, artist, frequency FROM musics', (err, results) => {
//   if (err) {
//     console.error('Erro ao buscar músicas no MySQL:', err);
//     res.status(500).send(err);
//   } else {
//     console.log('Músicas encontradas no MySQL:', results);

//     // Calcular a contagem para cada título
//     const titleCounts = {};
//     results.forEach((music) => {
//       titleCounts[music.title] = (titleCounts[music.title] || 0) + 1;
//     });

//     // Adicionar a contagem ao resultado
//     const musicDataWithCounts = results.map((music) => ({
//       ...music,
//       titleCount: titleCounts[music.title],
//     }));

//     res.status(200).send(musicDataWithCounts);
//   }
// });

