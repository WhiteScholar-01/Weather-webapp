import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "c85bb129275e2557853bbbd0ea998016";

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    console.log("I am working fine");
    res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
    const thecityname = req.body.cname ;
    const parameter = {
        q: thecityname,
        appId: API_KEY,
    };
    try {
        const result = await axios.get(API_URL, {params:parameter});
        console.log("HI I am good")
        res.render("index.ejs", {wdata: result.data});
        
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});