const express = require('express');
require('dotenv').config();
const { format } = require('date-fns');

const dates = [];

const app = express();
app.use(express.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {
    dates: dates.map((date) => format(date, 'MMMM dd yyyy, HH:mm:ss')),
  });
});

app.post('/', (req, res) => {
  const { date } = req.body;
  dates.push(date);
  res.json(dates);
});

app.listen(process.env.PORT, () => {
  console.log('Server has started');
});
