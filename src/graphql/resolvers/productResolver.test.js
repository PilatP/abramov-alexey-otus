import { productResolver } from './productResolver';

const productList = [
  { id: '5e21f337-549c-411e-b290-3d1174e929fc', name: 'Ручка', price: 54.3 },
  { id: '756ab417-cb7e-459c-8d5a-49e7b7ad9dfe', name: 'Стол', price: 5764.23 },
  { id: '1b176348-3491-44fb-8964-6c0af7b4999f', name: 'Кетчуп', price: 55 },
  { id: '1d0cbe2d-e7cd-4421-8279-6ea7b32a1abd', name: 'Сахар', price: 63 },
  { id: 'd39a8f7a-30b0-45bd-8ebd-a09ad449e296', name: 'Хлеб', price: 523 },
  { id: 'bc3c3ab1-65a8-47ef-8caa-f33c11acf095', name: 'Стул', price: 43 },
  { id: '1bd07394-748a-4fdc-8a36-dbcc6f984f5a', name: 'Кружка', price: 24 },
  { id: '73f05673-aac2-47f6-9a09-45a86c430213', name: 'Краб', price: 2323 },
];

const newProduct = {
  name: 'РучкаНовая',
  price: 54.3,
};
const existingProduct = {
  name: 'Ручка',
  price: 54.3,
};
describe('productResolver', () => {
  describe('getProducts', () => {
    it('should return empty list', () => {
      const products = productResolver().getProducts();

      expect(products).toHaveLength(0);
    });

    it('should return fake products', () => {
      const products = productResolver(productList).getProducts();

      expect(products).toHaveLength(8);
    });
  });

  describe('addProduct', () => {
    it('should add new product', () => {
      const resolver = productResolver(productList);
      const product = resolver.addProduct({ product: newProduct });
      const products = resolver.getProducts();

      expect(products).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'РучкаНовая',
            id: product.id,
          }),
        ])
      );
    });

    it('should not add new product if it already exists', () => {
      const resolver = productResolver();
      const product1 = resolver.addProduct({ product: existingProduct });
      const product2 = resolver.addProduct({ product: existingProduct });
      const products = resolver.getProducts();

      expect(products).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'Ручка',
            id: product1.id,
          }),
        ])
      );
      expect(product2).toBeNull();
      expect(products).toHaveLength(1);
    });
  });

  describe('removeProduct', () => {
    it('should remove product', () => {
      const resolver = productResolver();
      const product = resolver.addProduct({ product: newProduct });
      const products = resolver.getProducts();

      expect(products).toHaveLength(1);

      const removeResult = resolver.removeProduct({ id: product.id });
      const updatedProducts = resolver.getProducts();

      expect(removeResult).toBeTruthy();
      expect(updatedProducts).toHaveLength(0);
    });
  });
});
