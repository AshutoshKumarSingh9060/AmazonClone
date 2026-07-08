import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOption } from "../../data/deliveryoptions.js";
// let productName;

export function renderOrderSummary() {
  let cartsummaryHTML = "";
  cart.forEach((cartItems) => {
    const productId = cartItems.productId;
    let productName;
    products.forEach((productItem) => {
      if (productId === productItem.id) {
        productName = productItem;
      }
    });

    if (!productName) {
      return;
    }
    const matchingOption =
      deliveryOption.find(
        (option) => option.id === cartItems.deliveryOptionId,
      ) || deliveryOption[0];

    const today = dayjs();
    const deliveryDate = today.add(matchingOption.deliveryDate, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartsummaryHTML += `
          <div class="cart-item-container js-container 
            js-cart-item-container-${productName.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src=${productName.image}>

                <div class="cart-item-details">
                  <div class="product-name">
                    ${productName.name}
                  </div>
                  <div class="product-price">
                      $${formatCurrency(productName.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartItems.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete " data-product-id="${productName.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionHTML(productId, cartItems)}
                    
                </div>
              </div>
          </div>
  `;
  });

  function deliveryOptionHTML(productId, cartItems) {
    let deliveryHTML = "";
    deliveryOption.forEach((items) => {
      const today = dayjs();
      const deliver = today.add(items.deliveryDate, "days");
      const date = deliver.format("dddd, MMMM D");

      const price =
        items.priceCents === 0
          ? "Free"
          : `$${formatCurrency(items.priceCents)}`;
      const isChecked = cartItems.deliveryOptionId === items.id;
      deliveryHTML += `
                <div class="delivery-option js-delivery-option" 
                  data-product-id="${productId}"
                  data-delivery-option-id="${items.id}">
                    <input type="radio"
                      ${isChecked ? "checked" : ""}
                      class="delivery-option-input"
                      name="${productId}">
                    <div>
                      <div class="delivery-option-date">
                        ${date}
                      </div>
                      <div class="delivery-option-price">
                        ${price}- Shipping
                      </div>
                    </div>
                  </div>
            `;
    });
    return deliveryHTML;
  }

  document.querySelector(".js-container").innerHTML = cartsummaryHTML;

  document.querySelectorAll(".js-delete").forEach((item) => {
    item.addEventListener("click", () => {
      const productId = item.dataset.productId;
      removeFromCart(productId);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`,
      );
      container.remove();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderPaymentSummary();
      renderOrderSummary();
    });
  });
}
