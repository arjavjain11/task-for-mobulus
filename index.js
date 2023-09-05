import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import 'dotenv/config'
import routers from "./routes/index.js";
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/', routers);

mongoose.connect('mongodb://localhost:27017/news_feed', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
