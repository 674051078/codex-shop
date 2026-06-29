const cart = new Map();

const cartItems = document.querySelector("#cartItems");
const totalPrice = document.querySelector("#totalPrice");
const submitOrder = document.querySelector("#submitOrder");

function renderCart() {
  const items = [...cart.values()];
  const total = items.reduce((sum, item) => sum + item.price * item.count, 0);

  totalPrice.textContent = `¥${total}`;
  submitOrder.disabled = items.length === 0;

  if (items.length === 0) {
    cartItems.textContent = "还没有选择菜品";
    return;
  }

  cartItems.innerHTML = items
    .map(
      (item) => `
        <div class="cart-row">
          <span>${item.name} x ${item.count}</span>
          <strong>¥${item.price * item.count}</strong>
        </div>
      `,
    )
    .join("");
}

document.querySelectorAll(".dish button").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);
    const current = cart.get(name) || { name, price, count: 0 };

    current.count += 1;
    cart.set(name, current);
    renderCart();
  });
});

submitOrder.addEventListener("click", () => {
  const phone = document.querySelector("#phone").value.trim();

  if (!phone) {
    alert("请填写手机号");
    return;
  }

  alert("订单已提交，餐厅会尽快为您制作。");
  cart.clear();
  renderCart();
});

renderCart();
