const express = require('express');
const router = express.Router();
const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/noteController');
const { protect } = require('../middleware/auth');

router.use(protect); // Protect all note routes

router.route('/')
    .get(getNotes)
    .post(createNote);

router.route('/:id')
    .put(updateNote)
    .delete(deleteNote);

module.exports = router; 