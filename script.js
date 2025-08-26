// Simple cart simulation
let cart = [];

function addToCart(item, price) {
  cart.push({ item, price });
  alert(item + " added to cart! 🛒");
  console.log("Cart:", cart);
}

// "Show More" button
document.querySelector(".show-more").addEventListener("click", () => {
  alert("Loading more items...");
});
