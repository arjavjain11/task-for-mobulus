import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config'
import cronJobs from './cron/cron.js';
import routers from "./routes/index.js";

cronJobs();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/', routers);

mongoose.connect('mongodb://localhost:27017/news_feeds', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
