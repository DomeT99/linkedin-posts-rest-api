const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const linkedinPosts = require("./routes/linkedinPost");



app.use("/posts", linkedinPosts);

app.listen(port);
