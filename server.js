const express = require('express')
const corst = require('cors'); // requiring cors
const path = require('path')
const fs = require('fs')
const allSavedNotes = require('./db/db.json');

const PORT =  4200;

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
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/api/notes', (req, res) => {
    res.json(allSavedNotes)
})

app.post('/api/notes', (req, res) => {
        
    //var notesArr = allSavedNotes.map();
    //console.log(notesArr)

     var notesArr = Object.keys(allSavedNotes).map(function(key) {
        return [key, allSavedNotes[key]];
      });

      console.log(notesArr)
     var valueToBeAdded = Object.keys(req.body).map(function(key) {
        return [key, req.body[key]];
      });
      
    //var valueToBeAdded = Object.entries(req.body)
   // notesArr.push(valueToBeAdded);
    //const data  = JSON.stringify(notesArr)

    //console.log(data);
    /*fs.writeFile(path.join(__dirname, './db/db.json'), data, (err) =>{
        if (err) throw err;
    });  

    res.json(notesArr) */
})
// Starts the server to begin listening
app.listen(PORT, 'localhost', () => console.log(`App listening on PORT ${PORT}`));

