import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ICity } from '../models';

export interface ICitiesProps {
  cities: ICity[];
}

const Container = styled.ul``;
const CityItem = styled.li`
  list-style-type: none;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const Cities = ({ cities, ...rest }: ICitiesProps) => {
  return (
    <Container {...rest}>
      {cities.map(({ id, name }) => (
        <CityItem key={id}>
          <Link to={id}>{name}</Link>
        </CityItem>
      ))}
    </Container>
  );
};

export { Cities };
