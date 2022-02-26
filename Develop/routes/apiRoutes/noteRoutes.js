// initialize variables
const router = require('express').Router();
const { findById, createNewNote } = require('../../lib/notes');
const { notes } = require('../../db/db.json');
const uuid = require('../../helpers/uuid.js');

// reads db.json and returns all saved notes
router.get('/notes', (req, res) => {
    res.json(notes)
});

// creates new ID number from uuid and calls on createNewNote
router.post('/notes', (req, res) => {
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
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
        if (result) {
            res.json(result);
        } else {
            res.send(404);
        }
});

// exports router
module.exports = router;