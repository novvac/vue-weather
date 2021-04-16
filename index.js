import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

// routing
import auth from './routes/auth.routing.js';

const PORT = process.env.PORT || 8081;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());
app.use(morgan("tiny"));

// api
app.use("/api/v1/auth", auth);

app.listen(PORT, () => {
    console.log('Server', 'Development server is running!');
})