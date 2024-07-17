const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Product = require('./models/Product');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/incentive-calculator', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.post('/api/products', async (req, res) => {
    const { tariffItem, description, rodtepRate, uqc, cap, price, weight } = req.body;
    const exchangeRate = 85;

    
    const rodtepIncentive = (price * (rodtepRate / 100)) * exchangeRate;
    
    const incentivePerWeight = rodtepIncentive / weight;
    
    const cappedIncentivePerWeight = Math.min(incentivePerWeight, cap);
    //  the total cap incentive
    const totalIncentive = cappedIncentivePerWeight * weight;

    const newProduct = new Product({
        tariffItem,
        description,
        rodtepRate,
        uqc,
        cap,
        price,
        weight,
        incentive: totalIncentive
    });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
