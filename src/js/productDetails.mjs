import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  //Because localStorage only deals with strings, and we have an object, we set getLocalStorage to default to an array, then push the product to the array. Same process repeated in cart.js
  const currCart = getLocalStorage("so-cart") || [];
  currCart.push(product);
  setLocalStorage("so-cart", currCart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}
export default async function productDetails(productId) {
  const productData = await findProductById(productId);
  document.getElementById("productName").innerText = productData.Brand.Name;
  document.getElementById("productNameWithoutBrand").innerText = productData.NameWithoutBrand;
  document.getElementById("productImage").src = productData.Image;
  document.getElementById("productImage").alt = `Name is ${productData.Name}`;
  document.getElementById("productFinalPrice").innerHTML = `<strong>$${productData.FinalPrice}</strong>`;
  document.getElementById("productColorName").innerText = productData.Colors[0].ColorName;
  document.getElementById("productDescriptionHtmlSimple").innerHTML = productData.DescriptionHtmlSimple;
  document.getElementById("addToCart").dataset.id = productData.Id;
  discount(productData.SuggestedRetailPrice, productData.FinalPrice); 
  document.querySelector("#tagImage").setAttribute("src", "/images/logos/price-tag.png")
}

document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

 function discount(SuggestedRetailPrice, FinalPrice) {
   const priceDifference = SuggestedRetailPrice - FinalPrice;
   const discPercentage = (priceDifference / SuggestedRetailPrice) * 100;
   document.querySelector(
     ".cart-card__discount"
   ).innerText = `${discPercentage.toFixed(0)}% Off`;
   
 } 