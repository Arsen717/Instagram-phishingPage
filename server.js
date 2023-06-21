const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql')
const bodyParser = require('body-parser')


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user-data',
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));


app.post('/login', (req, res) => {
  const login = req.body.username;
  const password = req.body.password;

  const sql = 'INSERT INTO users (login, password) VALUES (?, ?)';
    db.query(sql, [login, password], (error, result) => {
      if (error) {
        console.error('Error saving data to the database:', error);
        // Display an error message if there is an issue with the database
        res.send('<p class="error-message">An error occurred. Please try again later.</p>');
      } else {
        // Display a success message if the data is saved successfully
        res.send(`
          <div class="login-container">
            <p class="success-message">Login successful!</p>
          </div>
        `);
      }
    });
})


const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

