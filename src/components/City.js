import axios from 'axios';
import { useState } from 'react';
import { api_key } from '../lib/api';

const City = ({ city }) => {
  const [forecasts, setForecasts] = useState(null);

  const handleClick = () => {
    axios
      .get(
        `https://dataservice.accuweather.com/forecasts/v1/daily/1day/${city.Key}?apikey=${api_key}&metric=true`
      )
      .then(response => {
        setForecasts(response.data);
      });
  };

  return (
    <div
      style={{
        width: '16rem',
        margin: '10px',
      }}
      className="card"
    >
      <div className="card-body">
        <span style={{ fontWeight: 'bold', fontSize: '24px' }}>
          {city.EnglishName}{' '}
        </span>
        <span>{city.AdministrativeArea.ID} </span>
        <span style={{ backgroundColor: 'orange' }}>{city.Country.ID}</span>
        {!forecasts ? (
          <button className="btn btn-primary" onClick={handleClick}>
            Show Weather Detail
          </button>
        ) : (
          forecasts.DailyForecasts.map((forecast, index) => {
            return (
              <div key={index}>
                <div>
                  <span style={{ fontWeight: 'bold', fontSize: '40px' }}>
                    {forecast.Temperature.Maximum.Value}
                  </span>
                  <span> °C</span>
                </div>
                <img
                  alt="weather-icon"
                  src={`https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${forecast.Day.Icon}-s.png`}
                />
                <div
                  style={{
                    margin: '10px',
                    fontWeight: 'bold',
                    color: 'grey',
                  }}
                >
                  <span>
                    {forecast.Day.PrecipitationIntensity.toUpperCase()}{' '}
                  </span>
                  <span>{forecast.Day.PrecipitationType.toUpperCase()}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default City;
