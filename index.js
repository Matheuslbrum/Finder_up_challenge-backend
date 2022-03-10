const express = require("express");
const routes = require("./src/routes");

const app = express ();

app.use(routes);

app.listen(3002, () => console.log('Server is running'))