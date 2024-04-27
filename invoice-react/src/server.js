

const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 5000;

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'DESKTOP-AU9O7S9\gioma',
  password: 'yourpassword',
  database: 'DESKTOP-AU9O7S9\SQLEXPRESS'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API endpoint to fetch data from the database
app.get('/data', (req, res) => {
  connection.query('SELECT * FROM your_table', (error, results) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
