const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

// App & Database Configuration
const app = express();
const port = 3000;
const url = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
let db;

MongoClient.connect(url)
    .then(client => {
        console.log('Connected to Database');
        db = client.db(dbName);
    })
    .catch(error => console.error(error));

// Routes

// Get all passwords
app.get('/', async (req, res) => {
    try {
        const collection = db.collection('passwords');
        const findResult = await collection.find({}).toArray();
        res.json(findResult);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

// Save a password
app.post('/', async (req, res) => {
    try {
        const password = req.body;
        const collection = db.collection('passwords');
        const insertResult = await collection.insertOne(password);
        res.send({ success: true, result: insertResult });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

// Delete a password by id
app.delete('/', async (req, res) => {
    try {
        const password = req.body;
        const collection = db.collection('passwords');
        const deleteResult = await collection.deleteOne(password);
        res.send({ success: true, result: deleteResult });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
