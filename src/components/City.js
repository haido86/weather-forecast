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
    <div style={{ padding: '5px', marginTop: '5px' }}>
      <div>City </div>

      <div>
        {city.EnglishName}
        {city.AdministrativeArea.EnglishName}
        {city.Country.EnglishName}
        {!forecasts ? (
          <button onClick={handleClick}>Show Weather Detail</button>
        ) : (
          forecasts.DailyForecasts.map((forecast, index) => {
            return (
              <div key={index}>
                <div>{forecast.Temperature.Maximum.Value}</div>
                <img
                  alt="weather-icon"
                  src={`https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${forecast.Day.Icon}-s.png`}
                />
                <div>
                  {forecast.Day.PrecipitationIntensity}
                  {forecast.Day.PrecipitationType}
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
