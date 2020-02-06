const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const port = process.env.PORT || 3001;

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.listen(port, () => console.log(`Running on ${port}`));

app.get('/weather/fore/:z', async (req, res) => {
  const zip = req.params.z;
  const app_id = process.env.APP_ID;
  const api_key = process.env.API_KEY;
  const foreApiUrl = `http://api.weatherunlocked.com/api/forecast/us.${zip}?app_id=${app_id}&app_key=${creds.API_KEY}`;
  const fetchFore = await fetch(foreApiUrl);
  const data = await fetchFore.json();
  res.json(data);
});

app.get('/weather/cur/:z', async (req, res) => {
  const zip = req.params.z;
  const app_id = process.env.APP_ID;
  const api_key = process.env.API_KEY;
  const curApiUrl = `http://api.weatherunlocked.com/api/current/us.${zip}?app_id=${app_id}&app_key=${api_key}`;
  const fetchCur = await fetch(curApiUrl);
  const data = await fetchCur.json();
  res.json(data);
});


module.exports = app;
