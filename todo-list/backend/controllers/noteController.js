//@desc Get all notes
//@route GET /api/notes
//@access public

const getNotes = (req, res) => {
    res.status(200).json({messsage: "get Your notes"});
}

//@desc create new note
//@route POST /api/notes
//@access public

const createNote = (req, res) => {
    res.status(201).json({messsage: "create notes"});
}

//@desc Update note
//@route PUT /api/notes/:id
//@access public

const updateNote = (req, res) => {
    res.status(200).json({messsage: `Update notes for ${req.params.id}`});
}

//@desc delete note
//@route DELETE /api/notes/:id
//@access public

const deleteNote = (req, res) => {
    res.status(200).json({messsage: `Delete notes for ${req.params.id}`});
}


module.exports = {getNotes, createNote, updateNote, deleteNote};