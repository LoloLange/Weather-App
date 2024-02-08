import styles from './forecast.module.css'

const Forecast = ({ forecastData, modifyTemp, src, dailyData, UnixtoUTC, lat, lon }) => {
    return (
        <div className={styles.container}>
            <p className={styles.title}>Daily forecast</p>
            <div className={styles.forecastContainer}>
                {
                    dailyData?.map((data) => (
                        <div key={data.dt} className={styles.dailyData}>
                            <div className={styles.imageContainer}>
                                <img className={styles.img} src={src(data?.weather?.[0]?.id)} alt="" />
                            </div>
                            <div>
                                <p className={styles.forecastDay}>{UnixtoUTC(data?.dt, lat, lon)?.split(',')[0]}</p>
                                <p className={styles.forecastTemp}>{modifyTemp(data?.main?.temp.toString())}°</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


export default Forecast;