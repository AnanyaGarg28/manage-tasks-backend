import express from 'express';
import { routes } from './routers/index';
import bodyParser from 'body-parser';
import { initializeDbConnection } from './db';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'
}));

//Add all the routes to the our Express server
//exported from routers/index.js
routes.forEach(route => {
    app[route.method](route.path, route.handler);
});

initializeDbConnection()
    .then(() => {
        app.listen(PORT, console.log('Server is up!'));
});

