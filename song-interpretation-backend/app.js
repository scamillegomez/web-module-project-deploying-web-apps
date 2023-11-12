require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;
const Song = require('./models/song');
const Comment = require('./models/comment');
const cors = require('cors');

// adding middleware to parse the JSON request bodies
app.use(express.json());

// Enable CORS for all routes and origins
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));

app.get('/', (req,res)=> {
    res.send('Song Interpretation App');
});

app.get('/songs', async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (err) {
        console.error('Error retrieving songs', err);
        res.status(500).send('Error retrieving songs');
    }
});

// connection string for local instance of MongoDB

// mongoose.connect('mongodb://localhost:27017/SongInterpretations')
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch(err => console.error('Could not connect to MondoDB...', err));

// switched to a cloud version of MongoDB (atlas) on 11/12 and updating the connection string accordingly
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// route for retrieving a specific song by ID
app.get('/songs/:id',(req,res)=>{
    const songId = req.params.id;
    // logic to getch a specific song using songId
    res.send(`Details of song ${songId}`);
});

// route for adding a new song
app.post('/songs', async (req,res)=> {
    try {
        const newSong = new Song({
            title: req.body.title,
            artist: req.body.artist
        });
        const savedSong = await newSong.save();
        res.status(201).json(savedSong);
    } catch (err) {
        console.error('Error posting song:', err);
        res.status(500).send('Error posting song');
    }
});

// route for retrieving all comments (testing only)
app.get('/comments', async (req,res)=> {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        console.error('Error retrieving comments:', err);
        res.status(500).send('Error retrieving comments');
    }
});


// route for retrieving comments for a specific song
app.get('/songs/:id/comments', async (req,res)=> {
    try {
        const comments = await Comment.find({songId: req.params.id});
        res.json(comments);
    } catch (err) {
        console.error('Error retrieving comments:', err);
        res.status(500).send('Error retrieving comments');
    }
});

// route for posting comments to a specific song
app.post('/songs/:id/comments', async (req,res)=> {
    try {
        const newComment = new Comment({
            songId: req.params.id,
            username: req.body.username,
            comment: req.body.comment,
            timestamp: new Date()
        });
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (err) {
        console.error('Error posting comment:', err);
        res.status(500).send('Error posting comment');
    }
});

// error handling
app.use((err,req,res,next)=> {
    console.error(err.stack);
    res.status(500).send('something broke!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});