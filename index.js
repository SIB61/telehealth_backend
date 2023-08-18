import express from 'express'
import bodyParser from 'body-parser';
import { configureFolderRouter } from 'express-folder-router';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
configureFolderRouter(app)
app.listen(3000, () => console.log('server is listening, port 3000'));
