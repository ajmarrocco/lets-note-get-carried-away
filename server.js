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
// Helper method for generating unique ids
const uuid = require('./Develop/helpers/uuid.js');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('./Develop/public'));

function findById(id, notes) {
    const result = notes.filter(note => note.id === id)[0];
    return result;
}

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
    // Destructuring assignment for the items in req.body
    const { title, text, id } = req.body;
    // Variable for the object we will save
    const newNote = {
        title,
        text,
        id: uuid()
    };

    // const reviewNote = JSON.stringify(newNote);
    
    // req.body is where our incoming content will be
    const note = createNewNote(newNote, notes);
    res.json(note);
    // console.log(req.body);
    // res.json(req.body);
});

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
        if (result) {
            res.json(result);
        } else {
            res.send(404);
        }
});

// returns the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

//makes server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
