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

//method to get note by id number
function findById(id, notes) {
    const result = notes.filter(note => note.id === id)[0];
    return result;
}

//method to create new note
function createNewNote(body, notes) {
    const newNote = body;
    //pushes note to new array
    notes.push(newNote);
    //adds note to new file
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
    //returns file
    return newNote;
}

// returns notes html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

// reads db.json and returns all saved notes
app.get('/api/notes', (req, res) => {
    res.json(notes)
});

// creates new ID number from uuid and calls on createNewNote
app.post('/api/notes', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { title, text, id } = req.body;
    // Variable for the object we will save
    const newNote = {
        title,
        text,
        id: uuid()
    };
    
    // stores new note as constant
    const note = createNewNote(newNote, notes);
    // puts note in JSON format
    res.json(note);
});

// calls on the find note by ID number method
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
