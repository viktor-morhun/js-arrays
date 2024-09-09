import { cart } from "./cart.js";
import { product } from "./product.js";
import { FETCH_BASE_URL } from "./constansts.js";
import { fetchProducts } from "./fetchProducts.js";

const productCart = new cart();

class domApp {
  constructor(listId, cartId, totalPriceId, headerTotalPriceId) {
    this.listId = listId;
    this.cartId = cartId;
    this.totalPriceId = totalPriceId;
    this.headerTotalPriceId = headerTotalPriceId;
    this.productsData = [];
  }

  setProductsData = async () => {
    if (localStorage.getItem('productsData') === null) {
      const productsData = await fetchProducts(FETCH_BASE_URL);
      this.productsData = productsData;
      localStorage.setItem('productsData', JSON.stringify(productsData));
    } else {
      this.productsData = JSON.parse(localStorage.getItem('productsData'));
    }
    this.renderProductsList();
  }

  renderProductsList(productsList = this.productsData) {
    const listElement = document.getElementById(this.listId);
    listElement.innerHTML = productsList
    .map(this.renderProduct).join('');
    this.addEventListeners();
  }

  renderCart() {
    const cartElement = document.getElementById(this.cartId);
    const productsPriceElement = document.getElementById(this.totalPriceId);
    cartElement.innerHTML = productCart.data
    .map(this.renderCartProduct).join('');
    productCart.calculatePrice();
    productsPriceElement.innerHTML = productCart.calculatePrice().price.toFixed(2);
  }

  renderProduct({id, title, price, image}) {
    let productName = title;
    if (productName.length > 35) {
      productName = productName.split(' ').slice(0, 4).join(' ') + '...';
    }
    return `<li class="catalog__item">
          <h2 class="catalog__item-name">${productName}</h2>
          <img class="catalog__item-img" src="${image}">
          <div>
          <p class="catalog__item-price">${price}</p>
          <button data-id="${id}" class="catalog__item-add-to-cart">Add to Cart</button>
          </div>
      </li>`;
  }

  renderCartProduct(product) {
    return `<li class="cart-modal__item">
                <span class="cart-modal__item-name">${product.title}</span>
                <div class="cart-modal__item-quantity-control">
                    <button class="cart-modal__item-decrement">-</button>
                    <input type="number" class="cart-modal__item-quantity" value="${product.quantity}" min="1">
                    <button class="cart-modal__item-increment">+</button>
                </div>
                <span class="cart-modal__item-price">${product.price * product.quantity}</span>
                <button class="cart-modal__item-remove">Remove</button>
            </li>`;
  }

  productsSortBy() {
    if (event.target.value === 'name'){
      const sortedProductsData = this.productsData
      .toSorted((a, b) => {
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();

        if (nameA > nameB) {
          return 1;
        }
        if (nameA < nameB) {
          return -1;
        }
        return 0;
      })
      document.removeEventListener('click', this.handler);
      this.renderProductsList(sortedProductsData);
    } else if(event.target.value === 'price'){
      const sortedProductsData = this.productsData
      .toSorted((a, b) => {
        return a.price - b.price;
      })
      document.removeEventListener('click', this.handler);
      this.renderProductsList(sortedProductsData);
    } else {
      document.removeEventListener('click', this.handler);
      this.renderProductsList();
    }
    
  }

  handler = (event) => {
    if(event.target.className === 'catalog__item-add-to-cart') {
      const elementId = Number(event.target.dataset.id);
      const productToCart = this.productsData.find(({id}) => id === elementId);
      productCart.addProduct(productToCart);
      const headerTotalPriceElement = document.getElementById(this.headerTotalPriceId);
      const cartQuantityElement = document.getElementById('cart-quantity-header');
      headerTotalPriceElement.innerHTML = productCart.calculatePrice().price.toFixed(2);
      cartQuantityElement.innerHTML = productCart.calculatePrice().quantity;
    }
  }

  addEventListeners() {
    const cartIconElement = document.getElementById('product-cart-icon');
    const closeCartElement = document.getElementById('close-cart-button');
    const cartElement = document.getElementById('product-cart');
    closeCartElement.addEventListener('click', () => cartElement.classList.add('hidden-element'));
    
    cartIconElement.addEventListener('click', () => {
      this.renderCart();
      cartElement.classList.remove('hidden-element');
    });



    document.addEventListener('click', this.handler);

    const sortByElement = document.getElementById('sort-select');
    sortByElement.addEventListener('change', (event) => this.productsSortBy(event));
  }

}

const shop = new domApp('catalog__list', 'product-cart-list', 'cart-total', 'cart-total-header');

shop.setProductsData();




