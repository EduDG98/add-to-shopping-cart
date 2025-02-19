const url = "./assets/data/food.json";
const mainFoodTemplate = document.querySelector("[main-food-template]");
const mainCardsContainer = document.querySelector("[main-cards-container]");
const cartContainer = document.querySelector(".shopping-cart-container");
// const buyButton = document.querySelector("[buy-cart-button]");
const totalPriceDiv = document.querySelector(".total-price");

let totalPrice;
const cart = {};

const increaseQuantity = (e) => {
  const cartItem = e.currentTarget.closest(".cart-card");
  const plate = cartItem.querySelector(".product-name").textContent;
  const quantity = cartItem.querySelector(`.quantity-data-${plate}`);
  console.log(cartItem);
  quantity.textContent = quantity.textContent * 1 + 1;
  addToCart(cart);
  showTotalPrice(getTotalPrice());
  console.log(quantity);
};

const addToCart = (cart) => {
  cartContainer.innerHTML = "";
  Object.entries(cart).forEach((selectedMeal) => {
    let cartItem = document.querySelector(`[data-plate="${selectedMeal}"]`);
    if (!cartItem) {
      cartItem = document.createElement("div");
      cartItem.classList = "cart-card";
      cartItem.setAttribute("data-plate", selectedMeal[0]);
      cartItem.innerHTML = `
      <img src="/assets/img/${selectedMeal[0]}.jpg" alt="">
        <div class="product-name">${selectedMeal[0]}</div>
        <div class="quantity">
        <button class="plus-botton-${selectedMeal[0]}">➕</button>
        <span class="quantity-data-${selectedMeal[0]}">${selectedMeal[1].quantity}</span>
        <button class="minus-botton-${selectedMeal[0]}">➖</button>
        </div>
        <div class="price">${selectedMeal[1].price * selectedMeal[1].quantity} €</div>
        `;
      cartContainer.appendChild(cartItem);
    } else {
      cartItem.querySelector(".quantity").textContent = selectedMeal[1];
    }
    const plusBotton = cartItem.querySelector(`.plus-botton-${selectedMeal[0]}`);
    console.log(plusBotton);
    plusBotton.addEventListener("click", increaseQuantity);
  });
};

const getTotalPrice = () => {
  totalPrice = 0;
  Object.entries(cart).forEach(plate => {
    totalPrice = totalPrice + (plate[1].quantity * parseFloat(plate[1].price).toFixed(2));
  });
  return totalPrice;
};

const showTotalPrice = (price) => {
  totalPriceDiv.innerHTML = `
    <span>${price.toFixed(2)}</span>
  `;
};

const savePlate = e => {
  const clickedItem = e.currentTarget;
  const name = clickedItem.querySelector("[main-food-name]").textContent.toLowerCase();
  const price = clickedItem.querySelector("[main-food-price]").textContent.split(" ")[0];
  if (!cart[name]) {
    cart[name] = { quantity: 0, price };
  }
  cart[name].quantity++;
  addToCart(cart);
  showTotalPrice(getTotalPrice());
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
