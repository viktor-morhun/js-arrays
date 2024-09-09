'use strict';
/*

document.addEventListener('DOMContentLoaded', async () => {
  const productCart = [];

  const products = await fetchProducts();
  renderList(
    'catalog__list',
    products
  )});


async function fetchProducts() {
  const response = await fetch('products.json');
  const products = await response.json();
  return products.shop_catalogue.map(product => product);
}


function renderList(listId, productList) {
  document.getElementById(listId).innerHTML = productList.map(getListElement).join('');
  attachEventListeners();
}


function getListElement({product_name, price}) {
  return `<li class="catalog__item">
          <h2 class="catalog__item-name">${product_name}</h2>
          <p class="catalog__item-price">${price}</p>
          <button class="catalog__item-add-to-cart" id="catalog__item-add-to-cart">Add to Cart</button>
      </li>`;
}


function attachEventListeners() {
  const addToCartButtons = document.querySelectorAll('#catalog__item-add-to-cart');
  addToCartButtons.forEach(button => 
    button.addEventListener('click', addToCart)
  );

  const cartIconElement = document.getElementById('product-cart-icon');
  cartIconElement.addEventListener('click', openCart);
}



function openCart() {
  const cartElement = document.getElementById('product-cart');
  cartElement.classList.toggle('cart-modal-visibility');
}



//in progress

function addToCart() {
  productCart.push('_ _ _');
  console.log(productCart);
}

*/
