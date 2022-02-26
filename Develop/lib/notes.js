// initialize variables
const fs = require('fs');
const path = require('path');

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
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
    //returns file
    return newNote;
}

// export methods
module.exports = {
    findById,
    createNewNote
};
