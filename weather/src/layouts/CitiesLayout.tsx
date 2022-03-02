import React from 'react';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useCities } from '../api';
import { Cities } from '../components/Cities';

const Container = styled.div``;

const FilterText = styled.input``;

const CitiesLayout = () => {
  const { data: cities } = useCities();
  const [filter, setFilter] = useState('');

  const onFilter = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.currentTarget.value);
  }, []);

  return (
    <Container>
      <FilterText placeholder='filter' value={filter} onChange={onFilter} />
      <Cities
        cities={cities
          .filter((c) => c.name.toLowerCase().includes(filter.toLowerCase()))
          .slice(0, 50)}
      />
    </Container>
  );
};

export { CitiesLayout };
