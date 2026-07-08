import { cart } from "../../data/cart.js";
import { deliveryOption } from "../../data/deliveryoptions.js";
import { products } from "../../data/products.js";
import {formatCurrency} from "../utils/money.js";

export function renderPaymentSummary(){
  let price=0;
  let shippingcost = 0;
  cart.forEach((ele)=>{
    let product;
    products.forEach((item)=>{
        if(ele.productId === item.id){
          product =item;
          price +=product.priceCents*ele.quantity;
        }
    });

    deliveryOption.forEach((li)=>{
      let iteams
      if(li.id === ele.deliveryOptionId){
        iteams=li;
        shippingcost +=li.priceCents
      }
    }); 
   
  });
   const totalBefore= price + shippingcost;
   const estimTax =(totalBefore*10)/100;
   const totalPriceCents=totalBefore+estimTax;
   const html =`
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(price)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${formatCurrency(shippingcost)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBefore)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${estimTax}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalPriceCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>          
        `

        document.querySelector('.js-payment-list').innerHTML=html;
    
}