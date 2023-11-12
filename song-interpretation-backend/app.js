require('dotenv').config();
console.log('MongoDB URI:',process.env.MONGODB_URI);
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// MongoDB URI and Client setup
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
    serverApi: ServerApiVersion.v1
});

// adding middleware to parse the JSON request bodies
app.use(express.json());
// Enable CORS for all routes and origins
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));

app.get('/', (req, res) => {
    res.send('Song Interpretation App');
});

// connect to MongoDB and start server
async function startServer() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        await client.db("SongInterpretation").command({ping:1});
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const songCollection = client.db("SongInterpretation").collection("Songs");
        const commentCollection = client.db("SongInterpretation").collection("Comments");

        app.get('/songs', async (req, res) => {
            try {
                const songs = await songCollection.find().toArray();
                res.json(songs);
            } catch (err) {
                console.error('Error retrieving songs', err);
                res.status(500).send('Error retrieving songs');
            }
        });

        // route for retrieving a specific song by ID
        app.get('/songs/:id', async (req, res) => {
            try {
                const songId = new ObjectId(req.params.id);
                const song = await songCollection.findOne({ _id: songId });
                if (!song) {
                    res.status(404).send('Song not found');
                } else {
                    res.json(song);
                }
            } catch (err) {
                console.error('Error retrieving song:', err);
                res.status(500).send('Error retrieving song');
            }
        });

        // route for adding a new song
        app.post('/songs', async (req, res) => {
            try {
                const newSong = {
                    title: req.body.title,
                    artist: req.body.artist
                };
                const result = await songCollection.insertOne(newSong);
                res.status(201).json(result.ops[0]);
            } catch (err) {
                console.error('Error posting song:', err);
                res.status(500).send('Error posting song');
            }
        });

        // route for retrieving comments for a specific song
        app.get('/songs/:id/comments', async (req, res) => {
            try {
                const songId = new ObjectId(req.params.id);
                const comments = await commentCollection.find({ songId: songId }).toArray();
                res.json(comments);
            } catch (err) {
                console.error('Error retrieving comments:', err);
                res.status(500).send('Error retrieving comments');
            }
        });

        // route for posting comments to a specific song
        app.post('/songs/:id/comments', async (req, res) => {
            try {
                const newComment = {
                    songId: new ObjectId(req.params.id),
                    username: req.body.username,
                    comment: req.body.comment,
                    timestamp: new Date()
                };
                const result = await commentCollection.insertOne(newComment);
                res.status(201).json(result.ops[0]);
            } catch (err) {
                console.error('Error posting comment:', err);
                res.status(500).send('Error posting comment');
            }
        });

        // error handling
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('something broke!');
        });

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

    } catch (err) {
        console.error('Could not connect to MongoDB:', err);
    }
}
startServer();
