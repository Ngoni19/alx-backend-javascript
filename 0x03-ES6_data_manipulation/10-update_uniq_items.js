export default function updateUniqueItems(products) {
  if (!(products instanceof Map)) {
    throw new Error('Cannot process');
  }
  for (const [key, value] of products) {
    if (value === 1) {
      products.set(key, 100);
    }
  }
  return products;
}
