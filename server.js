const express = require("express");
const app = express();

let port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static('./public'));

app.get("/*", (req, res) => {
    res.render("index");
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running at port: ${port}`);
});