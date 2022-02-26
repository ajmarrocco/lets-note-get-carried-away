// initialize express
const express = require('express');
// gives exact destination on the host
const PORT = process.env.PORT || 3001;
// instantiate the server
const app = express();
// initalizes note constant
const { notes } = require('./Develop/db/db');
const path = require('path');
// const router = require('express').Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
    // res.send("hello")
});

app.get('/api/notes', (req, res) => {
    res.json(notes)
});

// returns the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

//makes server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
