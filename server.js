// initialize express
const express = require('express');
// gives exact destination on the host
const PORT = process.env.PORT || 3001;
// instantiate the server
const app = express();
// initalizes note constant
const { notes } = require('./Develop/db/db.json');
const fs = require('fs');
const path = require('path');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('./Develop/public'));

function createNewNote(body, notes) {
    const newNote = body;
    notes.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
    return newNote;
}

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
    // res.send("hello")
});

app.get('/api/notes', (req, res) => {
    res.json(notes)
});

app.post('/api/notes', (req, res) => {
    // req.body is where our incoming content will be
    const note = createNewNote(req.body, notes);
    res.json(note);
    // console.log(req.body);
    // res.json(req.body);
});

// returns the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

//makes server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
