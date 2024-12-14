const express = require('express');
const axios = require('axios');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'spprvv', // Replace with your database password
  database: 'omdb_favourites', // Ensure this database exists
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

// OMDB API Key
const API_KEY = '7b276fd4';

// Root Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'search.html')); // Serve the main search page
});

// Search Movies/Series via OMDB API
app.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
    if (response.data.Response === "True") {
      res.json(response.data.Search);
    } else {
      res.status(404).json({ error: response.data.Error });
    }
  } catch (error) {
    console.error('Error fetching data from OMDB API:', error);
    res.status(500).json({ error: 'Error fetching data from OMDB API.' });
  }
});

// Save a Favourite Movie/Series
app.post('/favourites', (req, res) => {
  const { omdb_id, title, year, type, poster } = req.body;

  // SQL query to insert the favorite into the database
  const query = `INSERT INTO favourites (omdb_id, title, year, type, poster) VALUES (?, ?, ?, ?, ?)`;

  db.query(query, [omdb_id, title, year, type, poster], (err) => {
    if (err) {
      console.error('Error saving favourite to the database:', err);
      res.status(500).json({ error: 'Error saving favourite to the database.' });
    } else {
      res.status(200).json({ message: 'Favourite saved successfully!' });
    }
  });
});

// Get All Favourites
app.get('/favourites', (req, res) => {
  // SQL query to retrieve all favourites from the database
  const query = `SELECT * FROM favourites`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching favourites from the database:', err);
      res.status(500).json({ error: 'Error fetching favourites from the database.' });
    } else {
      res.json(results);
    }
  });
});

// Server Listener
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
