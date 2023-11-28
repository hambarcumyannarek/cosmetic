const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();

app.set('view-engine', 'views');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const productsString = await fs.readFile(path.resolve('products.json'), 'utf-8');
    const products = JSON.parse(productsString);
    console.log(products);
    res.render('index.ejs', { products })
})

app.get('/home', (req, res) => {
    res.render('index.ejs', { products: [] })
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`localhost:${port}`)
})