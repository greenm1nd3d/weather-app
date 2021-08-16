import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import axios from 'axios';

function Home() {
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [city, setCity] = useState('Manila');
    const [days, setDays] = useState('3');

    const handleCity = (e) => {
        setCity(e.target.value);
    }

    const handleDays = (e) => {
        setDays(e.target.value);
    }

    useEffect(() => {
        setLoading(true);
        axios.get(`https://cors-anywhere.herokuapp.com/http://api.weatherapi.com/v1/forecast.json?key=2e00c87a08354d84822111056211408&q=${city}&days=${days}&aqi=no&alerts=no`)
        .then(function(res) {
            console.log(res);
            setLocation(res.data.location);
            setForecast(res.data.forecast.forecastday);
            setLoading(false);
        })
        .catch(function(res) {
            console.log(res);
            setLoading(false);
        });
    }, [city, days]);

    return (
        <React.Fragment>
            <div className="weather-div container mx-auto px-4">
                <div className="flex flex-row">
                    <div class="flex-1">
                        <p>Select a City</p>
                        <select id="city" onChange={handleCity}>
                            <option value="Manila">Manila</option>
                            <option value="Cairo">Cairo</option>
                            <option value="Bangkok">Bangkok</option>
                            <option value="Denver">Denver</option>
                            <option value="Dubai">Dubai</option>
                            <option value="Helsinki">Helsinki</option>
                            <option value="London">London</option>
                            <option value="Madrid">Madrid</option>
                            <option value="Miami">Miami</option>
                            <option value="Moscow">Moscow</option>
                            <option value="Paris">Paris</option>
                            <option value="Rome">Rome</option>
                            <option value="Seattle">Seattle</option>
                            <option value="Sydney">Sydney</option>
                            <option value="Tokyo">Tokyo</option>
                        </select>
                    </div>
                    <div class="flex-1">
                        <p>Select # of Days</p>
                        <select id="days" onChange={handleDays}>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                        </select>
                    </div>
                </div><br /><br />
                {loading && <div className="align-center"><Spinner animation="border" variant="primary" /></div>}
                <h3>{location.name}, {location.country}</h3>
                <table className="table-fixed">
                    <thead>
                        <tr>
                            <th className="w-1/5">Forecast Date</th>
                            <th className="w-1/5">Condition</th>
                            <th className="w-1/5">Avg. Humidity</th>
                            <th className="w-1/5">Avg. Temperature</th>
                            <th className="w-1/5">Chance of Rain</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        forecast.map(item => (
                            <tr key={item.date_epoch}>
                                <td>{item.date}</td>
                                <td>
                                    <img src={item.day.condition.icon} alt="Condition" />
                                    <p>{item.day.condition.text}</p>
                                </td>
                                <td>{item.day.avghumidity}</td>
                                <td>{item.day.avgtemp_c}&deg;C ({item.avgtemp_f}&deg;F)</td>
                                <td>{item.day.daily_chance_of_rain}%</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export default Home;