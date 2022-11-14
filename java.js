const menuArray = [
  {
    name: "Pizza",
    ingredients: ["pepperoni", "mushrom", "mozarella"],
    id: 0,
    price: 14,
    emoji: "🍕",
  },
  {
    name: "Hamburger",
    ingredients: ["beef", "cheese", "lettuce"],
    price: 12,
    emoji: "🍔",
    id: 1,
  },
  {
    name: "Beer",
    ingredients: ["grain, hops, yeast, water"],
    price: 12,
    emoji: "🍺",
    id: 2,
  },
];

let selectedArray = [];

const itemsWrapper = document.getElementById("items-wrapper");
const footerWrappwer = document.getElementById("footer-wrappwer");
const footer = document.getElementById("footer");
const module = document.querySelector(".module");

function render() {
  let htmlTag = "";
  menuArray.forEach(function (item) {
    htmlTag += `
    <div class="item" id="item" >
        <div class="icons" id="icons">
        <div class="emoji">${item.emoji}</div>
        </div>
        <div class="decription">
          <div class="item-name">${item.name}</div>
          <div class="item-ingredient">${item.ingredients}</div>
          <div class="item-price">£${item.price}</div>
        </div>
        <div class="plus-icon" id="plus-icon" >
          <img src="./Images/add-btn.png" data-plus = ${item.id} />
        </div>
      </div>`;
  });
  return htmlTag;
}

itemsWrapper.innerHTML = render();
footer.classList.add("hidden");
const plus = document.getElementById("plus-icon");

document.addEventListener("click", function (e) {
  if (e.target.dataset.plus) {
    footer.classList.remove("hidden");
    handleLikeClick(e.target.dataset.plus);
  } else if (e.target.dataset.remove) {
    handleRemoveBtn(e.target.dataset.remove);
  } else if (e.target.id === "check-out") {
    module.classList.remove("hidden");
    window.scrollTo(0, 0);
  } else if (e.target.id === "close") {
    module.classList.add("hidden");
  }
});

let total = 0;

function handleLikeClick(id) {
  const targetObj = menuArray.filter(function (item) {
    return item.id.toString() === id;
  })[0];
  selectedArray.push(targetObj);
  footerWrappwer.innerHTML = renderfooter();
  const totalPice = document.getElementById("total-price");
  total += targetObj.price;
  totalPice.textContent = "£" + total;
}

function renderfooter() {
  let footerHtml = "";
  selectedArray.forEach(function (item) {
    footerHtml += `
      <div class="selected-items">
            <div class="item-name">${item.name}</div>
            <label class="item-ingredient flex-space" data-remove=${item.id}>remove</label>
            <div class="item-price">${item.price}</div>
            </div>`;
  });
  return footerHtml;
}

function handleRemoveBtn(id) {
  const targetObj = selectedArray.filter(function (item) {
    return item.id.toString() != id;
  });

  selectedArray = targetObj;
  if (selectedArray.length === 0) {
    footer.classList.add("hidden");
  }

  footerWrappwer.innerHTML = renderfooter();
  const totalPice = document.getElementById("total-price");
  total += selectedArray.price;
  totalPice.textContent = "£" + total;
}
