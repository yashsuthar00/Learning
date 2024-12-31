const express = require('express');
const dotenv = require('dotenv').config();

const app = express(); 
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/notes", require("./routes/noteRoutes"))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});