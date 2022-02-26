// initialize variables
const path = require('path');
const router = require('express').Router();

// returns notes html
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// returns the index file
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// exports router
module.exports = router;