import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import keys from './config/keys.js';
import passport from './config/passport.js';

// routing
import auth from './routes/auth.routing.js';

const PORT = process.env.PORT || 8081;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());
app.use(morgan("tiny"));

mongoose.connect(keys.mongoURI, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once('open', () => {
    console.log("MongoDB", "Database was connected!");
})

// passport
app.use(passport.initialize());

// api
app.use("/api/v1/auth", auth);

app.listen(PORT, () => {
    console.log('Server', 'Development server is running!');
})