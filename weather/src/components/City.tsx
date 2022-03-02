import styled from 'styled-components';
import { ICity } from '../models';

export interface ICityProps {
  city: ICity;
}

const Container = styled.li``;

const City = ({ city, ...rest }: ICityProps) => {
  const { name } = city;

  return <Container {...rest}>{name}</Container>;
};

export { City };
