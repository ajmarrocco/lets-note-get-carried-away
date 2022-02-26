// initialize express
const express = require('express');
// gives exact destination on the host
const PORT = process.env.PORT || 3001;
// instantiate the server
const app = express();
// initalizes note constant
const { notes } = require('./Develop/db/db');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// returns the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

//makes server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
