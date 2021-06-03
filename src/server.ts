import express from 'express';
import routes from './routes';
import cors from 'cors';
import path from 'path';
import errorMiddleware from './error/ErrorMiddleware';
const cron = require('node-cron');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(routes);
app.use(errorMiddleware);

const port = process.env.PORT || 4001;

//if(process.env.NODE_ENV === 'production') {
  app.use(express.static('swagger/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
//}

app.listen(port, () =>  console.log(`Server started on port ${port}`));
