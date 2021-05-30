const express = require('express')
const corst = require('cors'); // requiring cors
const path = require('path')
const fs = require('fs')
const allSavedNotes = require('./db/db.json');

const PORT =  process.env.PORT || 4200;;

const app = express()

// Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//to serve CSS and JavaScript files in public directory:
app.use(express.static('public'));

app.use(corst()) // adding cors middleware to allow request from other domains

app.get('/', (req, res) => {(req, res) => res.sendFile(path.join(__dirname , './public/index.html')) });

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname , './public/notes.html')) );

// If no matching route is found default to home

app.get('/api/notes', (req, res) => {
  console.log("inside api notes");
  var copy =  Object.assign([], allSavedNotes);
  res.json(copy);
})

app.post('/api/notes', (req, res) => {
        
      var copy =  Object.assign([], allSavedNotes)
      var newNote = {};
      newNote = req.body;
      newNote.id = allSavedNotes.length;
      copy.push(newNote);
      const data = JSON.stringify(copy);
   
      fs.writeFile(path.join(__dirname, './db/db.json'), data, (err) =>{
        if (err) throw err;
      });  

    res.json(copy)
})
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

