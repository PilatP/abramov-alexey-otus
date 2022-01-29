export interface ICity {
  id: string;
  name: string;
}

export interface IWeather {
  temp: number;
  description: string;
  icon: string;
  windText: string;
  date: Date;
}

export interface ICityWeather {
  city: ICity;
  weatherList: IWeather[];
}

export interface IOutletContext {
  cities: ICity[];
  currentCityId: string;
}
