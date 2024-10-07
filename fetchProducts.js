export async function fetchProducts(productsLink) {
  try {
    const response = await fetch(productsLink);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const productsData = await response.json();

    return productsData;
  } catch (error) {
    console.error(`Failed to fetch products:`, error);
    return [];
  }
}
