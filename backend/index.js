const express = require('express');
const fetch = require('node-fetch');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const creds = require('./config');

const port = process.env.PORT || 3001;

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`Running on ${port}`));

app.get('/weather/fore/:z', async (req, res) => {
  const zip = req.params.z;
  const foreApiUrl = `http://api.weatherunlocked.com/api/forecast/us.${zip}?app_id=${creds.APP_ID}&app_key=${creds.API_KEY}`;
  const fetchFore = await fetch(foreApiUrl);
  const json = await fetchFore.json();
  res.json(json);
});

app.get('/weather/cur/:z', async (req, res) => {
  const zip = req.params.z;
  const curApiUrl = `http://api.weatherunlocked.com/api/current/us.${zip}?app_id=${creds.APP_ID}&app_key=${creds.API_KEY}`;
  const fetchCur = await fetch(curApiUrl);
  const json = await fetchCur.json();
  res.json(json);
});

module.exports = app;
