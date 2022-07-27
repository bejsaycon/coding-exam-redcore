import express from 'express';
import config from 'config';
import multer from 'multer';
import path from 'path';
import bodyParser from 'body-parser';
import routes from './routes';
import connect from './utils/connect';

const port = config.get<number>('port');

const app = express();
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// You can Access the images that was uploaded thru localhost:8000/images/{filename}.jpg
app.use('/images', express.static(path.join(__dirname, '..', '/images')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage });

// You can upload images thru localhost:8000/ and it goes to images folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "upload.html"));
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  res.status(200).json('File has been uploaded');
});


app.listen(port, async () => {
    console.log('App is running');
    await connect();
    routes(app);
})