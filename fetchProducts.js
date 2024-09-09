export async function fetchProducts(productsLink) {
  const promise = await fetch(productsLink);
  const productsData = await promise.json();
  console.log(productsData);
  return productsData.map(product => product);
}
