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
//Enable CORS for all routes and origins
const corsOptions = {
    origin: 'https://web-module-project-deploying-web-apps-eight-wine.vercel.app',
    optionsSuccessStatus: 200
};

// const corsOptions = {
//     origin: function (origin, callback) {
//       // Check if the origin is either a Vercel app subdomain or localhost:3000
//       if (!origin || /vercel\.app$/.test(origin) || origin === 'http://localhost:3000') {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     optionsSuccessStatus: 200
//   };
  
  app.use(cors(corsOptions));
  

app.use(cors(corsOptions));

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
                const addedSong = { _id: result.insertedId, ...newSong };
                res.status(201).json(addedSong);
            } catch (err) {
                console.error('Error posting song:', err);
                res.status(500).send(`Error posting song, ${err.message}`);
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
                const createdComment = {
                    _id: result.insertedId,
                    ...newComment
                };
                res.status(201).json(createdComment);
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
