import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

app.get("/", (req, res) => {
    console.log("I am working fine");
    res.render("index.ejs");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})