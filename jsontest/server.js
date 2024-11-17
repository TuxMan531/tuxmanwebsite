const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.get('/bigdata.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'bigdata.json'));
});

app.post('/bigdata.json', (req, res) => {
    const newData = req.body;
    fs.writeFile(path.join(__dirname, 'bigdata.json'), JSON.stringify(newData, null, 2), (err) => {
        if (err) {
            res.status(500).send('Error writing to file');
        } else {
            res.status(200).send('File updated successfully');
        }
    });
});

app.use(express.static(__dirname));

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});