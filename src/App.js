import { useState } from 'react';
import axios from 'axios';
import { api_key } from './lib/api';
import City from './components/City';

const App = () => {
  const [cityName, setCityName] = useState('');
  const [cities, setCities] = useState([]);

  const handleChange = event => {
    // TODO: validation , check empty...
    // TODO: show error
    event.preventDefault();
    setCityName(event.target.value);
  };

  const handleClick = () => {
    axios
      .get(
        `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${api_key}&q=${cityName}`
      )
      .then(response => {
        setCities(response.data);
      });
  };

  return (
    <div>
      <div>Weather Forecast</div>

      <input
        type="text"
        id="name"
        placeholder="Enter the name of the city"
        onChange={handleChange}
        value={cityName}
      />

      <button onClick={handleClick} disabled={!cityName}>
        Show Weather info
      </button>

      <div>
        {cities?.map(city => {
          return <City key={city.Key} city={city} />;
        })}
      </div>
    </div>
  );
};

export default App;
