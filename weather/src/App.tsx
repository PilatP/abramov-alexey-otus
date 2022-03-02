import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { CitiesLayout } from './layouts/CitiesLayout';
import { CityLayout } from './layouts/CityLayout';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route path='cities' element={<CitiesLayout />} />
          <Route path='cities/:cityId' element={<CityLayout />} />
          <Route path='*' element={<div>not found</div>} />
        </Route>
      </Routes>
    </>
  );
};

export { App };
