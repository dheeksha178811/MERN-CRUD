const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Compass connection
mongoose.connect('mongodb://127.0.0.1:27017/postdb')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
const postRoutes = require('./routes/posts');
app.use('/posts', postRoutes);

app.listen(4000, () => console.log("Server running on port 4000"));
