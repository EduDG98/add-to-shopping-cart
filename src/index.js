const url = "./assets/data/food.json";
const mainFoodTemplate = document.querySelector("[main-food-template]");
const mainCardsContainer = document.querySelector("[main-cards-container]");
const cartContainer = document.querySelector(".shopping-cart-container");

const cart = {};

const addToCart = (cart) => {
  cartContainer.innerHTML = "";
  Object.entries(cart).forEach((selectedMeal) => {
    let cartItem = document.querySelector(`[data-plate="${selectedMeal}"]`);
    if (!cartItem) {
      cartItem = document.createElement("div");
      cartItem.classList = "cart-card";
      cartItem.setAttribute("data-plate", selectedMeal[0]);
      cartItem.innerHTML = `
        <img src="" alt="">
        <div class="product-name">${selectedMeal[0]}</div>
        <div class="quantity">${selectedMeal[1]}</div>
        <div class="price"></div>
      `;
      cartContainer.appendChild(cartItem);
    } else {
      cartItem.querySelector(".quantity").textContent = selectedMeal[1];
    }
  });
};

const savePlate = e => {
  const clickedItem = e.currentTarget;
  const name = clickedItem.querySelector("[main-food-name]").textContent.toLowerCase();
  if (!cart[name]) {
    cart[name] = 0;
  }
  cart[name]++;
  addToCart(cart);
};

fetch(url)
  .then(response => response.json())
  .then(data => {
    data.forEach(element => {
      const card = mainFoodTemplate.content.cloneNode(true).children[0];
      const image = card.querySelector("[main-food-image]");
      image.src = element.image;
      const name = card.querySelector("[main-food-name]");
      name.textContent = element.name;
      const price = card.querySelector("[main-food-price]");
      price.textContent = `${element.price} ${element.coin}`;
      mainCardsContainer.append(card);
      card.addEventListener("click", savePlate);
    });
  });
