import { useState } from "react";
import styles from './search.module.css'
import { useNavigate } from "react-router-dom";
import useGeolocation from "../../hooks/useGeolocation";

const Search = () => {
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();
    const { handleLocationClick } = useGeolocation();

    const handleInputKeyDown = (e) => {
        if(e.code === "Enter" || e.code === "NumpadEnter") {
            navigate(`/weather/${searchInput}`);
        }
    }

    let containerStyle;
    if(window.location.pathname == '/') {
        containerStyle = {
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
        }
    } else {
        containerStyle = {
            display: 'flex',
            marginTop: '20px',
            justifyContent: 'center',
        } 
    }



    return (
        <div style={containerStyle}>
            <div className={styles.group}>
                <svg className={styles.icon} aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                <input 
                    placeholder="Search for cities" 
                    type="search" 
                    className={styles.input} 
                    onKeyDown={handleInputKeyDown}
                    onChange={(e) => setSearchInput(e.target.value)}
                    required
                />
                <svg className={styles.locationIcon} onClick={handleLocationClick} xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
            </div>
        </div>
    )

}


export default Search;