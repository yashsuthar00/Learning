const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();

const app = express(); 
const PORT = process.env.PORT || 5000;

connectDb();
app.use(express.json());
app.use("/api/notes", require("./routes/noteRoutes"))
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});