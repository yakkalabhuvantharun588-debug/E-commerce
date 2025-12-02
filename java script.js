let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addtocart(name, price) {
    let user = localStorage.getItem("loginUser");
  if(!user){
    alert("please login first!");
    window.location.href = "login.html";
    return;
  }
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added!");
}

function showCart() {
  let box = document.getElementById("cart items");
  if (!box) return;

  let total = 0;
  box.innerHTML = "";
  for (let i of cart) {
   box.innerHTML += `<p>${i.name} - $${i.price}</p>`;
    total += i.price;
  }
  document.getElementById("total").innerText = "Total: $" + total;
}
showCart();

// Add item
function AddToCart(name, price) {
  let user = localStorage.getItem("loginUser");
  if(!user){
    alert("please login first!");
    window.location.href = "login.html";
    return;
  }
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added!");
}

// Show items in cart
function showCart() {
    let box = document.getElementById("cart items");
    if (!box) return;

    let total = 0;
    box.innerHTML = "";

    cart.forEach((i, index) => {
        box.innerHTML += `
                ${i.name} - $${i.price}
                <button onclick="removeFromCart(${index})">Remove</button>
            </p>
        `;
        total += i.price;
    });

    document.getElementById("total").innerText = "Total: $" + total;
}

// Remove item
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
}

showCart();

// Set initial activity time
sessionStorage.setItem("lastActivity", Date.now());

// Update activity time on user actions
function updateActivity() {
  sessionStorage.setItem("lastActivity", Date.now());
}
updateActivity();

window.addEventListener("mousemove", updateActivity);
window.addEventListener("keypress", updateActivity);
window.addEventListener("click", updateActivity);
window.addEventListener("scroll", updateActivity);

// Check inactivity every 5 seconds
setInterval(() => {
  let lastActivity = parseInt(sessionStorage.getItem("lastActivity"), 10);
  if (lastActivity) {
    let now = Date.now();
    let diff = now - lastActivity;

    if (diff > 5 * 1000) { // 5 seconds
      alert("You have been logged out due to inactivity.");
      localStorage.removeItem("loginUser"); // clear login
      sessionStorage.clear(); // clear session data
      window.location.href = "login.html"; // redirect
    }
  }
}, 5000); // check every 5 seconds