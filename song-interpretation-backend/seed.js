const mongoose = require('mongoose');
const Song = require('./models/song');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/songInterpretations', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected...');
    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
};

const seedSongs = [
    { title: 'Hotel California', artist: 'The Eagles', comments: [] },
    { title: 'Good Days', artist: 'SZA', comments: [] },
    { title: 'Paint the Town Red', artist: 'Doja Cat', comments: [] },
    { title: 'Maybe', artist: 'Janis Joplin', comments: [] },
    { title: 'Schism', artist: 'Schism', comments: [] },
];

const seedDatabase = async () => {
    await connectDB();

    try {
        await Song.insertMany(seedSongs);
        console.log('Database Seeded!');
        mongoose.disconnect();
    } catch (err) {
        console.error(err);
        mongoose.disconnect();
    }
};

seedDatabase();