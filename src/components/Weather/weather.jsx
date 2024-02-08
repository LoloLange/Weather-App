import styles from './weather.module.css'

const Weather = ({ weatherData, src, modifyTemp, UnixtoUTC, lat, lon }) => {

    return (
        <div className={styles.firstContainer}>
            <div className={styles.leftContainer}>
                <p className={styles.country}>{weatherData?.name}, {weatherData?.sys?.country}</p>
                <p className={styles.date}>{UnixtoUTC(weatherData?.dt, lat, lon)}</p>
                <p className={styles.temp}>{modifyTemp(weatherData?.main?.temp.toString())}°</p>
                <p className={styles.info}>{weatherData?.weather?.[0].description}</p>
            </div>
            <div className={styles.rightContainer}>
                <img className={styles.image} src={src(weatherData?.weather?.[0].id, )} alt="Img" />
            </div>
        </div>
    )
}

export default Weather;