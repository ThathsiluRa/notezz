const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/note-taking-app')
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch(err => console.error('Connection error', err)); 