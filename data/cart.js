import { products } from "./products.js";

export let cart=JSON.parse(localStorage.getItem('cart')) ;
 
if(!cart){
    cart=[{
        productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:1,
        deliveryOptionId:'1'
    },{
        productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:1,
        deliveryOptionId:'2'
  },{
        productId:"83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        quantity:1,
        deliveryOptionId:'3'
  },
];
}


function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}



export function addcart(productId){
  let matchingItem;
      cart.forEach((iteams)=>{
        if(iteams.productId === productId){
           matchingItem=iteams;
        }
      });
      if(matchingItem){
        matchingItem.quantity +=1;
      }
      else{
        cart.push({
            productId:productId,
            quantity:1,
            deliveryOptionId:'1'
        });
      }
}

export function count(){
  let count=0;
      cart.forEach((items)=>{
          count += items.quantity;
        });
   document.querySelector('.js-cart').innerHTML=count;
   saveToStorage();
}





export function removeFromCart(productId){
    const newCart=[];
    cart.forEach((ele)=>{
       if(ele.productId !== productId){
            newCart.push(ele);
       }
           
    });

    cart=newCart;
    saveToStorage();
}
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }
}
