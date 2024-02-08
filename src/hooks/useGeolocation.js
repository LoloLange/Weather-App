import { useEffect, useState } from "react";
import tzlookup from "tz-lookup";
import { useNavigate } from "react-router-dom";

const useGeolocation = () => {
    const [lat, setLat] = useState();
    const [lon, setLon] = useState();
    const navigate = useNavigate();
    let city;

    const handleLocationClick = () => {
        const successCallback = (position) => {
            setLat(position?.coords?.latitude);
            setLon(position?.coords?.longitude);
        };
        
        
        const errorCallback = (error) => {
            console.log(error);
        };
        
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }
    
    useEffect(() => {
        if(lat < 0 && lon < 0) {
            const zonaHoraria = tzlookup(lat, lon);
            city = zonaHoraria.split('/').pop(-1).replace('_', '%20');
            console.log(city)
            navigate(`/weather/${city}`);
            location.reload();
        }
    }, [lat, lon])
    

    return {
        handleLocationClick,
        city,
    }
}

export default useGeolocation;