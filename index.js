const cors = require('cors');
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: error.message });
});

app.listen(3002, () => console.log('Server is running'));
