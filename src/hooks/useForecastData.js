import { useState } from 'react'

const useForecastData = () => {

    const [forecastData, setForecastData] = useState([]);
    const [error, setError] = useState();

    const fetchForecast = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=sp,es&&appid=${import.meta.env.VITE_WEATHER_APP_API_KEY}&units=metric`)
            const data = await response.json();
            setForecastData(data);
        } catch (e) {
            setError(e);
        }
    }


    return {
        fetchForecast,
        forecastData: forecastData || [],
        error,
    }
}

export default useForecastData;