import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useWeather } from '../api';

const Container = styled.div`
  display: flex;
`;
const CityText = styled.p``;

const WeatherList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
const WeatherContainer = styled.li`
  display: flex;
  flex-flow: column;
  flex: 0 1 200px;
  align-items: center;
  justify-content: space-between;
  height: 250px;
  &:not(:last-child) {
    margin: 0 8px 16px 0;
  }
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.7);
`;
const DateText = styled.p`
  font-weight: bold;
`;
const TempText = styled.p``;
const WeatherDescriptionText = styled.p`
  text-align: center;
`;

const WeatherIcon = styled.img``;
const WindIcon = styled.i`
  font-size: 24px;
  margin-right: 4px;
`;
const WindText = styled.p``;

const CityLayout = () => {
  const { cityId = '' } = useParams<{ cityId: string }>();

  const { data, loading } = useWeather(cityId);
  if (loading) return <Container>weather is loading</Container>;
  if (!data) return <Container>weather is not found</Container>;
  const { weatherList, city } = data;

  return (
    <Container>
      <CityText>{city.name}</CityText>
      <WeatherList>
        {weatherList.map(({ date, temp, icon, description, windText }) => (
          <WeatherContainer key={date.getTime().toString()}>
            <DateText>{date.toLocaleDateString()}</DateText>
            <TempText>{temp} &deg;</TempText>
            <WindText>
              <WindIcon className='fas fa-wind' />
              {windText}
            </WindText>
            <WeatherDescriptionText>{description}</WeatherDescriptionText>
            <WeatherIcon src={icon} alt='weather icon' />
          </WeatherContainer>
        ))}
      </WeatherList>
    </Container>
  );
};

export { CityLayout };
