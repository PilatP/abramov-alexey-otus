import { v4 as uuid } from 'uuid';

export const fakeProducts = [
  { id: '5e21f337-549c-411e-b290-3d1174e929fc', name: 'Ручка', price: 54.3 },
  { id: '756ab417-cb7e-459c-8d5a-49e7b7ad9dfe', name: 'Стол', price: 5764.23 },
  { id: '1b176348-3491-44fb-8964-6c0af7b4999f', name: 'Кетчуп', price: 55 },
  { id: '1d0cbe2d-e7cd-4421-8279-6ea7b32a1abd', name: 'Сахар', price: 63 },
  { id: 'd39a8f7a-30b0-45bd-8ebd-a09ad449e296', name: 'Хлеб', price: 523 },
  { id: 'bc3c3ab1-65a8-47ef-8caa-f33c11acf095', name: 'Стул', price: 43 },
  { id: '1bd07394-748a-4fdc-8a36-dbcc6f984f5a', name: 'Кружка', price: 24 },
  { id: '73f05673-aac2-47f6-9a09-45a86c430213', name: 'Краб', price: 2323 },
];

export const fakeCart = {
  products: [
    {
      id: '5e21f337-549c-411e-b290-3d1174e929fc',
      name: 'Ручка',
      price: 54.3,
      quantity: 1,
    },
    {
      id: '1b176348-3491-44fb-8964-6c0af7b4999f',
      name: 'Кетчуп',
      price: 55,
      quantity: 3,
    },
    {
      id: '1bd07394-748a-4fdc-8a36-dbcc6f984f5a',
      name: 'Кружка',
      price: 24,
      quantity: 5,
    },
  ],
};

export const fakeOrders = [
  {
    id: '13f05673-aac2-47f6-9a09-45a86c430213',
    number: '87687766',
    products: [
      {
        id: '5e21f337-549c-411e-b290-3d1174e929fc',
        name: 'Ручка',
        price: 54.3,
        quantity: 1,
      },
      {
        id: '1b176348-3491-44fb-8964-6c0af7b4999f',
        name: 'Кетчуп',
        price: 55,
        quantity: 3,
      },
      {
        id: '1bd07394-748a-4fdc-8a36-dbcc6f984f5a',
        name: 'Кружка',
        price: 24,
        quantity: 5,
      },
    ],
    sum: 339.3,
    date: '2021-11-20T08:52:11.852Z',
  },
];
