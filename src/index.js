const express = require('express');
require('dotenv').config();
const { formatInTimeZone } = require('date-fns-tz');
const { uk } = require('date-fns/locale');
const { db } = require('./db');
const { testTable } = require('./schema');

const app = express();
app.use(express.json());

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const records = await db.select().from(testTable);
  console.log(records);

  res.render('index', {
    dates: records.map(({ date }) =>
      formatInTimeZone(date, 'Europe/Kyiv', 'MMMM dd yyyy, HH:mm:ss', {
        locale: uk,
      })
    ),
  });
});

app.post('/', async (req, res) => {
  const { date } = req.body;
  console.log(date);

  const [newRecord] = await db
    .insert(testTable)
    .values({
      date,
    })
    .returning();

  res.json(newRecord);
});

app.listen(process.env.PORT, () => {
  console.log('Server has started');
});
