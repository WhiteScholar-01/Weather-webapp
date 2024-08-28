import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "c85bb129275e2557853bbbd0ea998016";

function kelvinToCelsius(tempKelvin){
    const tempCelsius = (tempKelvin - 273.15).toFixed(2);
    return tempCelsius
}


function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    //
    const hours = a.getHours();
    const minutes = a.getMinutes();
    const seconds = a.getSeconds();
    //
    const hour = hours < 10 ? "0" + hours : hours;
    //
    const hourTime = hour > 12 ? hour - 12 : hour;
    //
    const minute = minutes < 10 ? "0" + minutes : minutes;
    const second = seconds < 10 ? "0" + seconds : seconds;
    //
    const ampm = hour < 12 ? "AM" : "PM";
    //
    const time = `${hourTime}:${minute}:${second} ${ampm}` ;
    return time;
  }

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    console.log("I am working fine");
    res.render("index.ejs" ,{wdata:""});
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
        console.log(result.data)
        const icon = result.data?.weather?.[0]?.icon || '../public/images/not_available.jpg'
        const icon_src = `https://openweathermap.org/img/wn/${icon}@2x.png`
        const temp_max = kelvinToCelsius(result.data.main.temp_max);
        const temp_min = kelvinToCelsius(result.data.main.temp_min);
        const avg_temp = kelvinToCelsius(result.data.main.temp);
        const sunset = timeConverter(result.data.sys.sunset);
        const sunrise = timeConverter(result.data.sys.sunrise);
        res.render("index.ejs", {wdata: result.data,
                                    icon_src: icon_src,
                                    temp_max: temp_max,
                                    temp_min: temp_min,
                                    temp: avg_temp,
                                    sunriseTime: sunrise,
                                    sunsetTime: sunset
                                });
        
        
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});