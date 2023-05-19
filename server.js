const express = require('express');
const router = require('./routers');
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4001;
const { createUploadsFolder } = require('./utils/createUploadsFolder');

createUploadsFolder();

app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use('/', router);

app.listen(PORT, () => console.log('Server started...'));