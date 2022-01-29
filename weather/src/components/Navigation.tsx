import styled from 'styled-components';
import { NavLink, Outlet } from 'react-router-dom';

const Container = styled.nav`
  margin: 0 auto;
  width: fit-content;
`;

const Navigation = () => {
  return (
    <Container>
      <NavLink to='cities'>Список городов</NavLink>
      <Outlet />
    </Container>
  );
};

export { Navigation };
