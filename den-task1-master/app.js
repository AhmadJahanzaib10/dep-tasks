const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const connection = require('./server/connection');
const port = 3000;

app.use(express.static("./public"))
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const query = 'SELECT * FROM products';
  connection.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching data:', err);
          return res.status(500).send('Error fetching data');
      }
      res.render('index', { products: results });
  });
})

app.post('/add', (req, res) => {
  const { productName, productDescription } = req.body;
  const createdAt = new Date().toISOString();
  const id = Math.floor(Math.random() * 1000000);
  const query = `INSERT INTO products (id,name, description, date) VALUES (?,?,?,?)`;
  connection.query(query, [id,productName, productDescription, createdAt], (err, results) => {
      if (err) {
          console.error('Error inserting data:', err);
          return res.status(500).send('Error inserting data');
      }
      res.redirect('/');
  });
})

app.delete('/deleteProduct/:id', (req, res) => {
  const productId = req.params.id;
  const query = 'DELETE FROM products WHERE id = ?';

  connection.query(query, [productId], (err, results) => {
      if (err) {
          console.error('Error deleting data:', err);
          return res.status(500).json({ success: false, error: 'Error deleting data' });
      }
      res.send({success: true});
  });
});

app.put('/updateProduct/:id', (req, res) => {
  const productId = req.params.id;
  const { name, description } = req.body;
  const query = 'UPDATE products SET name = ?, description = ? WHERE id = ?';

  connection.query(query, [name, description, productId], (err, results) => {
      if (err) {
          console.error('Error updating data:', err);
          return res.status(500).json({ success: false, error: 'Error updating data' });
      }
      res.json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})