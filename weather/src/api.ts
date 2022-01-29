import { useState, useEffect } from 'react';
import { ICity, ICityWeather, IWeather } from './models';

const apiKey = '96c699e5d1fc489db433d9069cb7f343';

const apiUrl = (cityId: string) =>
  `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityId}&units=M&lang=ru&key=${apiKey}`;

export const useWeather = (cityId: string) => {
  const [data, setData] = useState<ICityWeather>();
  const [loading, setLoading] = useState(true);
  const city = useCity(cityId);

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl(cityId))
      .then((response) => {
        if (
          !response?.ok ||
          !(response?.status >= 200 && response?.status <= 299)
        )
          throw Error(response?.statusText || 'The api request is failed');
        return response.json();
      })
      .then(transformWeather)
      .then((weather) => {
        setData({
          weatherList: weather,
          city: { id: city?.id || '', name: city?.name || '' },
        });
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};

interface IApiWeather {
  city_name: string;
  data: [
    {
      valid_date: string;
      temp: number;
      weather: { description: string; icon: string };
      wind_cdir_full: string;
      wind_cdir: string;
    }
  ];
}
const transformWeather = (weatherData: IApiWeather) => {
  return weatherData.data.map(
    ({ valid_date, temp, weather, wind_cdir }) =>
      ({
        date: new Date(valid_date),
        temp,
        description: weather.description,
        icon: `https://www.weatherbit.io/static/img/icons/${weather.icon}.png`,
        windText: wind_cdir,
      } as IWeather)
  );
};

const citiesUrl = 'https://countriesnow.space/api/v0.1/countries/cities';

const useCity = (cityId: string) => {
  const { data } = useCities();
  return data.find((d) => d.id === cityId);
};

export const useCities = () => {
  const [data, setData] = useState<ICity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const _cities = readFromLocalStorage();
    if (_cities.length > 0) {
      if (data.length === 0) setData(_cities);
      return;
    }

    setLoading(true);
    fetch(citiesUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: 'russia' }),
    })
      .then((response) => {
        if (
          !response?.ok ||
          !(response?.status >= 200 && response?.status <= 299)
        )
          throw Error(response?.statusText || 'The api request is failed');
        return response.json();
      })
      .then(transformCities)
      .then(writeToLocalStorage)
      .then(setData)
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};

interface IApiCitiesData {
  data: [];
}
const transformCities = (citiesData: IApiCitiesData) =>
  citiesData.data.map((c) => ({ id: c, name: c } as ICity));

const citiesKey = 'cities';

const writeToLocalStorage = (cities: ICity[]) => {
  localStorage.setItem(citiesKey, JSON.stringify(cities));
  return cities;
};

const readFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(citiesKey) || '[]') as ICity[];
};
