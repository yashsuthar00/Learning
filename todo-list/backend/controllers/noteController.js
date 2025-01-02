const asyncHandler = require('express-async-handler');
const Note = require('../models/noteModel');

//@desc Get all notes
//@route GET /api/notes
//@access private

const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({user_id: req.user.id});
    res.status(200).json(notes);
});

//@desc create new note
//@route POST /api/notes
//@access private

const createNote = asyncHandler(async (req, res) => {
    const {text, completed} = req.body;
    if (!text) {
        res.status(400);
        throw new Error("All fields are mandatory") 
    }
    const note = await Note.create({
        text, 
        completed,
        user_id: req.user.id,
    }); 
    res.status(201).json(note);
});

//@desc Update note
//@route PUT /api/notes/:id
//@access private

const updateNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (!note) {
        res.status(404);
        throw new Error("Note not found");
    }

    if(note.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You are not authorized to update this note");
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
//@access private

const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (!note) {
        res.status(404);
        throw new Error("Note not found");
    }

    if(note.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You are not authorized to delete this note");
    }

    await note.deleteOne();

    res.status(200).json(note);
});


module.exports = {getNotes, createNote, updateNote, deleteNote};