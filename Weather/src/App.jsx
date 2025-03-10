import { useEffect, useState } from "react";
import "./App.css";
import WeatherEffect from "./WeatherEffect";
import SearchIcon from "./assets/search.png";
import ClearIcon from "./assets/Clear.png";
import CloudIcon from "./assets/cloud.png";
import DrizzleIcon from "./assets/drizzle.png";
import RainIcon from "./assets/Rain.png";
import WindIcon from "./assets/wind.png";
import SnowIcon from "./assets/snow.png";
import HumidityIcon from "./assets/Humidity.png";



const WeatherDetails = ({ icon, Temp, City, Country, Lat, Lon, Humidity, Wind }) => {
  return (
    <>
      <div className="images">
        <img src={icon} alt="Weather" />
      </div>
      <div className="Temp">{Temp}°C</div>
      <div className="Location">{City}</div>
      <div className="Country">{Country}</div>
      <div className="Cord">
        <div>
          <span className="Lat">Latitude</span>
          <span>{Lat}</span>
        </div>
        <div>
          <span className="Lon">Longitude</span>
          <span>{Lon}</span>
        </div>
      </div>
      <div className="Data-Container">
        <div className="Elements">
          <img src={HumidityIcon} alt="Humidity" className="icon" />
          <div className="Humidity-percentage">{Humidity}%</div>
          <div className="Text">Humidity</div>
        </div>
        <div className="Elements">
          <img src={WindIcon} alt="Wind" className="icon" />
          <div className="Wind-percentage">{Wind} km/h</div>
          <div className="Text">Wind Speed</div>
        </div>
      </div>
    </>
  );
};

function App() {
  const api_Key = "f02ed0939fdbd121464177782462f6fa";
  
  const [Text, SetText] = useState("Salem");
  const [icon, setIcon] = useState(SnowIcon);
  const [Temp, setTemp] = useState(0);
  const [City, setCity] = useState("London");
  const [Country, setCountry] = useState("GB");
  const [Lat, setLat] = useState(0);
  const [Lon, setLon] = useState(0);
  const [Humidity, setHumidity] = useState(0);
  const [Wind, setWind] = useState(0);
  const [Loading, setLoading] = useState(false);
  const [CityNotFound, setCityNotFound] = useState(false);

  const weatherIconMap = {
    "01d": ClearIcon,
    "01n": ClearIcon,
    "02d": CloudIcon,
    "02n": CloudIcon,
    "03d": DrizzleIcon,
    "03n": DrizzleIcon,
    "04d": DrizzleIcon,
    "04n": DrizzleIcon,
    "09d": RainIcon,
    "09n": RainIcon,
    "10d": RainIcon,
    "10n": RainIcon,
    "13d": SnowIcon,
    "13n": SnowIcon,
  };

  const search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${Text}&appid=${api_Key}&units=Metric`;

    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404") {
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLon(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || ClearIcon);
      setCityNotFound(false);
    } catch (error) {
      console.error("Error fetching data: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => SetText(e.target.value);
  const handleKeyDown = (e) => { if (e.key === "Enter") search(); };

  useEffect(() => { search(); }, []);

  return (
    <div className="container">
      <WeatherEffect type={icon === SnowIcon ? "snow" : "rain"} />
      <div className="input-container">
        <input type="text" className="cityInput" placeholder="Search City" onChange={handleCity} value={Text} onKeyDown={handleKeyDown} />
        <div className="search-icon" onClick={search}><img src={SearchIcon} alt="Search" /></div>
      </div>
      <WeatherDetails icon={icon} Temp={Temp} City={City} Country={Country} Lat={Lat} Lon={Lon} Humidity={Humidity} Wind={Wind} />
      <p className="CopyRight">Designed by <span>Abishek Balraj</span></p>
    </div>
  );
}

export default App;
