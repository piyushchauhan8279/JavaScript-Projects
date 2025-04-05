document.addEventListener("DOMContentLoaded", () => {
  // in this we will create products on the go

  // dynamically

  const products = [
    { name: "product1", id: 1, price: 19.99 },
    { name: "product2", id: 2, price: 29.99 },
    { name: "product3", id: 3, price: 39.99 },
    { name: "product4", id: 4, price: 49.99 },
  ];

  const cart = JSON.parse(localStorage.getItem("info")) || [];

  const product_list = document.getElementById("product-list");
  const cart_detail = document.getElementById("cart-detail");
  const cart_list = document.getElementById("cart-list");
  const total = document.getElementById("total");
  const total_Money = document.getElementById("total-money");
  const checkout_btn = document.getElementById("checkout");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
        <span>${product.name}-> $${product.price.toFixed(2)}</span>
        <button btn-id="${product.id}" class="btn" >Add to cart</button>
        `;
    product_list.appendChild(productDiv);
  });


  product_list.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("btn-id"));
      // on the base of productid we will get product

      const productName = products.find((product) => product.id === productId);

      addCart(productName);
    }
  });

  function addCart(productName) {
    cart.push(productName);
    save(productName)
    
    rendorCart();
  }

  function rendorCart() {
    cart_list.classList.remove("hidden");
    let totalPrice = 0;

    if (cart.length > 0) {
      cart_detail.classList.add("hidden");
      total.classList.remove("hidden");
      cart_list.innerHTML = "";

      cart.forEach((items) => {
        console.log(items);
        totalPrice += items.price;

        const cartInfo = document.createElement("div");

        cartInfo.style.marginBottom = "10px";
        cartInfo.innerHTML = `<span>${items.name} ->$ ${items.price}</span> <button class="btn" id="new-id">Remove</button>`;
        cart_list.appendChild(cartInfo);

        // remove on click

        cartInfo.addEventListener("click", (event) => {
          if (event.target.tagName === "BUTTON") {
            totalPrice -= items.price;

            total_Money.textContent = `Total:$${totalPrice.toFixed(2)}`;

            cartInfo.classList.add("hidden");

            const pId = parseInt(event.target.getAttribute("new-id"));

            const PName = cart.find((p) => items.id === pId);

            removeCart(PName);

            if (cart.length == 0) {
              total.classList.add("hidden");
              cart_detail.classList.remove("hidden");
              cart_list.classList.add("hidden");
            }
          }
        });
      });

      total_Money.textContent = `Total:$${totalPrice.toFixed(2)}`;
    } else {
      total.classList.add("hidden");
      cart_list.classList.add("hidden");
    }
  }

  checkout_btn.addEventListener("click", (e) => {
    e.preventDefault();
    cart.length = 0;
    alert("checkout Successfully");
    total_Money.textContent = `Total:$${0}`;
    cart_detail.classList.remove("hidden");
    save();
    rendorCart();
  });

  function removeCart(PName) {
    cart.pop(PName);
    rendorCart();
    save()
  }


  // method to add cart info into local storage
  function save(productName){
    localStorage.setItem("info",JSON.stringify(cart))
  }

    // Render cart from localStorage when page loads
    rendorCart();
  
  
});
