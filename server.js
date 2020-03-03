// All Node Packages.
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

// REQUIRE ROUTING PATHS ------------------------------------

// Root Route (Renders Homepage).
const routeHome = require('./routes/home');

// Excel Macro Collections:

// Renders Macro Collections.
const route_m2020 = require('./routes/excel-macros/m-2020');

// Instance of Express Application.
const app = express();

// Define the PORT We Want to Open For This Application.
const PORT = process.env.PORT || 3000;

// Set Handlebars View Engine Template Directory.
const hbs = exphbs.create({
  partialsDir: __dirname + '/views/partials'
});

// Define and Set View Engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// Serve Static Files to the '/public' Folder.
app.use(express.static(path.resolve(__dirname, 'public')));

// SET ROUTER METHODS ------------------------------------

// Root Route (Renders Homepage).
app.get('/', (req, res) => routeHome(req, res));

// Renders Macro Collections.
app.get('/m-2020', (req, res) => route_m2020(req, res));

// Start the Server.
app.listen(process.env.PORT || PORT, () => console.log(`Express server listening on port ${process.env.PORT || PORT}!`));