let express = require("express");

let app = express();

const port = process.env.PORT || 3500;

app.use(express.static("./frontend"));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/" , (req , res)=>{
    res.sendFile("index");
});

app.listen(port , ()=>{

    console.log(`Server started on port ${port}`);

});