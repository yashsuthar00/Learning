const asyncHandler = require('express-async-handler');
const Note = require('../models/noteModel');

//@desc Get all notes
//@route GET /api/notes
//@access public

const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({});
    res.status(200).json(notes);
});

//@desc create new note
//@route POST /api/notes
//@access public

const createNote = asyncHandler(async (req, res) => {
    const {text, completed} = req.body;
    if (!text) {
        res.status(400);
        throw new Error("All fields are mandatory") 
    }
    const note = await Note.create({
        text, 
        completed
    }); 
    res.status(201).json(note);
});

//@desc Update note
//@route PUT /api/notes/:id
//@access public

const updateNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (!note) {
        res.status(404);
        throw new Error("Note not found");
    }

    const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedNote);
});

//@desc delete note
//@route DELETE /api/notes/:id
//@access public

const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (!note) {
        res.status(404);
        throw new Error("Note not found");
    }
    await note.deleteOne();

    res.status(200).json(note);
});


module.exports = {getNotes, createNote, updateNote, deleteNote};