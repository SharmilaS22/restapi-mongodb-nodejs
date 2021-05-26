require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// mongodb connect
mongoose
.connect(
    process.env.MONGODB_URI, 
    {useNewUrlParser: true, useUnifiedTopology: true}
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// apis
app.use('/api/book', require('./routes/api/book'));


app.get('/', (req, res) => {
    res.send("hello world");
});


app.listen(PORT, () => console.log("Server running at " + PORT));