/* eslint-disable no-undef */
import { useState } from 'react'

const useWeatherData = () => {

    const [weatherData, setWeatherData] = useState([]);
    const [error, setError] = useState();

    const fetchData = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=sp,es&appid=${process.env.VITE_WEATHER_APP_API_KEY}&units=metric`)
            const data = await response.json();
            setWeatherData(data);
        } catch (e) {
            setError(e);
        }
    }


    return {
        fetchData,
        weatherData: weatherData || [],
        error,
    }
}

export default useWeatherData;