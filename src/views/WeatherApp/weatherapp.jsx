import { useEffect, useState } from "react";
import tzlookup from "tz-lookup";
import useWeatherData from "../../hooks/useWeatherData";
import useForecastData from "../../hooks/useForecastData";
import { useNavigate } from "react-router-dom";
import styles from "./weatherapp.module.css";
import Clouds from "../../assets/Clouds.png";
import Cloudy from "../../assets/Cloudy.png";
import Rain from "../../assets/Rain.png";
import Snow from "../../assets/Snow.png";
import Storm from "../../assets/Storm.png";
import Sun from "../../assets/Sun.png";
import Mist from "../../assets/Mist.png";
import Search from "../../components/Search/search";
import Forecast from "../../components/Forecast/forecast";
import Weather from "../../components/Weather/weather";
import Conditions from "../../components/Conditions/conditions";

const WeatherApp = () => {
  const { fetchData, weatherData } = useWeatherData();
  const { fetchForecast, forecastData } = useForecastData();
  const navigate = useNavigate();
  const [alertShown, setAlertShown] = useState(false);

  const city = window.location.pathname.split("/")[2];

  useEffect(() => {
    try {
      fetchData(city);
      fetchForecast(city);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const checkSpace = (city) => {
    return city.replace('%20', ' ')
  }

  useEffect(() => {
    if (weatherData.cod === "404" && !alertShown) {
      alert(
        `An error has ocurred while fetching data or "${checkSpace(city)}" doesn't exist. Please try again.`
      );
      navigate("/");
      setAlertShown(true);
    }
  }, [weatherData]);

  let newTemp;
  const modifyTemp = (t) => {
    const temp = t;

    if (temp) {
      const tempSplit = temp.split(".");
      if (tempSplit[1]?.length > 1) {
        if (tempSplit[1].slice(0, 1) == 0) {
          newTemp = tempSplit[0];
        } else {
          newTemp = tempSplit[0] + "." + tempSplit[1].slice(0, 1);
        }
        return newTemp;
      } else {
        return temp;
      }
    }
  };

  let src;
  const source = (id) => {
    if (id == 800) {
      src = Sun;
    } else if (id >= 200 && id <= 232) {
      src = Storm;
    } else if (id >= 600 && id <= 622) {
      src = Snow;
    } else if (id >= 701 && id <= 781) {
      src = Mist;
    } else if (id > 801 && id <= 804) {
      src = Clouds;
    } else if (id == 801) {
      src = Cloudy;
    } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
      src = Rain;
    }
    return src;
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      location.reload();
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const UnixtoUTC = (timestamp, latitud, longitud) => {
    try {
      const zonaHoraria = tzlookup(latitud, longitud);
      const fecha = new Date(timestamp * 1000);

      const opcionesFormato = {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: zonaHoraria,
      };

      const fechaUTC = new Intl.DateTimeFormat("en-US", opcionesFormato).format(
        fecha
      );

      return fechaUTC;
    } catch (error) {
      return null;
    }
  };

  const data = forecastData?.list;
  const dailyData = data?.filter((data) => data.dt_txt.includes("00:00:00"));

  return (
    <div>
      <div className={styles.header}>
        <svg
          className={styles.arrow}
          onClick={handleGoBack}
          xmlns="http://www.w3.org/2000/svg"
          height="30"
          width="25"
          viewBox="0 0 448 512"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>

        <div onKeyDown={handleKeyDown} className={styles.search}>
          <Search />
        </div>
      </div>

      <Weather
        weatherData={weatherData}
        src={source}
        modifyTemp={modifyTemp}
        UnixtoUTC={UnixtoUTC}
        lat={weatherData?.coord?.lat}
        lon={weatherData?.coord?.lon}
      />

      <Conditions
        weatherData={weatherData}
        modifyTemp={modifyTemp}
        UnixtoUTC={UnixtoUTC}
        lat={weatherData?.coord?.lat}
        lon={weatherData?.coord?.lon}
      />

      <Forecast
        forecastData={forecastData}
        modifyTemp={modifyTemp}
        src={source}
        dailyData={dailyData}
        UnixtoUTC={UnixtoUTC}
        lat={forecastData?.city?.coord?.lat}
        lon={forecastData?.city?.coord?.lon}
      />
    </div>
  );
};

export default WeatherApp;
