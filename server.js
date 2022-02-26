// initialize express
const express = require('express');
// gives exact destination on the host
const PORT = process.env.PORT || 3001;
// instantiate the server
const app = express();
// initialize api and HTML routes
const apiRoutes = require('./Develop/routes/apiRoutes');
const htmlRoutes = require('./Develop/routes/htmlRoutes');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// allows styling to be static files
app.use(express.static('./Develop/public'));

// Use apiRoutes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//makes server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
