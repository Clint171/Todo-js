const express = require("express");
const router = require("./lib/routers/router.js");

const app = express();

let port = process.env.PORT || 3500;

app.use(router);

app.listen(port , ()=>{
    console.log(`Server listening on port ${port}`);
});