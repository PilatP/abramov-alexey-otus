import { v4 as uuid } from 'uuid';

export const productResolver = (fakeProducts) => {
  let products = Array.isArray(fakeProducts) ? [...fakeProducts] : [];
  return {
    getProducts: () => {
      return products || [];
    },
    addProduct: ({ product }) => {
      if (!product) return null;
      if (products.some((p) => p.name === product.name)) return null;
      const id = uuid();
      products.push({ ...product, id });
      return { id };
    },
    removeProduct: ({ id }) => {
      const updatedProducts = products.filter((product) => product.id !== id);
      if (updatedProducts.length === products.length) return false;

      products = updatedProducts;

      return true;
    },
  };
};
