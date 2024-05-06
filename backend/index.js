
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import studentRoutes from './routes/students.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/students', studentRoutes);
app.use('/generated-pdf', express.static(path.join(__dirname, 'generated-pdf')));

const CONNECTION_URL = 'mongodb+srv://arvindthakur9211:mIXoMq18IQAkKoWu@edulab.1lnd4kt.mongodb.net/eduLab?retryWrites=true&w=majority&appName=eduLab';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL).then(()=>{
    app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))
}).catch((error) => console.log(`${error} did not connect`));
