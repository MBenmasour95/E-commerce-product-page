/*=== Product Data ===*/
const product = {
  company_name: "SNEAKER COMPANY",
  title: "Fall Limited Edition Sneakers",
  description: `These low-profile sneakers are your perfect casual wear companion.
  Featuring a durable rubber outer sole, they’ll withstand everything
  the weather can offer.`,
  price: {
    new_price: 125,
    old_price: 250,
    discount: 50,
  },
  images: {
    large_images: [
      "./images/image-product-1.jpg",
      "./images/image-product-2.jpg",
      "./images/image-product-3.jpg",
      "./images/image-product-4.jpg",
    ],
    thumbnail_images: [
      "./images/image-product-1-thumbnail.jpg",
      "./images/image-product-2-thumbnail.jpg",
      "./images/image-product-3-thumbnail.jpg",
      "./images/image-product-4-thumbnail.jpg",
    ],
  },
};

/*=== DOM Elements ===*/
const navbar = document.getElementById("navbar");
const navLinks = document.getElementById("nav-links");
const cartBtn = document.getElementById("cart-btn");
const cartItems = document.getElementById("cart-items");
const amountEl = document.getElementById("amount");
const cartBody = document.getElementById("cart-body");
const productWrapper = document.getElementById("product-wrapper");
const lightBoxGalleryWrapper = document.getElementById("lightbox-gallery");

/*=== Variables ===*/
let currentSlide = 0;
let amount = 0;

/*=== EventListeners ===*/
navbar.addEventListener("click", toggleMenu);
cartBtn.addEventListener("click", () => cartItems.classList.toggle("show"));
productWrapper.addEventListener("click", (e) => {
  if (e.currentTarget && cartItems.classList.contains("show")) {
    cartItems.classList.remove("show");
  }
});
document.addEventListener("DOMContentLoaded", displayProduct);

/*=== Functions ===*/
// Show / Hide Menu
function toggleMenu(e) {
  if (e.target.classList.contains("menu-btn")) {
    navLinks.classList.add("show");
    document.body.style.overflow = "hidden";
  } else if (e.target.classList.contains("close-btn")) {
    navLinks.classList.remove("show");
    document.body.style.overflow = "visible";
  }
}

// Display Product
function displayProduct() {
  const { company_name, title, description, price, images } = product;
  const { new_price, old_price, discount } = price;
  const { large_images, thumbnail_images } = images;

  const image = large_images
    .map((img) => {
      return `
      <img src=${img} class="slide" alt="product-image" />
    `;
    })
    .join(" ");

  const thumbnail = thumbnail_images
    .map((img) => {
      return `
      <div class="thumbnail">
        <img src="${img}" alt="thumbnail" />
      </div>
      `;
    })
    .join(" ");

  productWrapper.innerHTML = `
    <div class="product-images d-flex">
      <div class="slides">
        ${image}
        <button class="previous-btn">
          <img
            src="./images/icon-previous.svg"
            class="p-absolute-center"
            alt="previous"
          />
        </button>
        <button class="next-btn">
          <img
            src="./images/icon-next.svg"
            class="p-absolute-center"
            alt="next"
          />
        </button>
      </div>
      <div class="thumbnails d-flex">
        ${thumbnail}
      </div>
    </div>
    <div class="product-info">
      <h5 class="company-name">${company_name}</h5>
      <h1 class="product-title">${title}</h1>
      <div class="desc">
        <p>${description}</p>
      </div>
      <div class="price-wrapper d-flex">
        <h2 class="new-price">$${new_price.toFixed(2)}</h2>
        <span class="discount">-${discount}%</span>
        <span class="old-price">$${old_price.toFixed(2)}</span>
      </div>
      <div class="product-bottom d-flex">
        <div class="quantity-wrapper d-flex">
          <button class="minus-btn">
            <img src="./images/icon-minus.svg" alt="minus" />
          </button>
          <span class="quantity">${amount}</span>
          <button class="plus-btn">
            <img src="./images/icon-plus.svg" alt="plus" />
          </button>
        </div>
        <button class="add-btn">
          <img src="./images/icon-cart.svg" alt="cart" />
          add to cart
        </button>
      </div>
    </div>
  `;

  const slides = productWrapper.querySelectorAll(".slide");
  const thumbnails = productWrapper.querySelectorAll(".thumbnail");
  const previousBtn = productWrapper.querySelector(".previous-btn");
  const nextBtn = productWrapper.querySelector(".next-btn");
  const buttons = productWrapper.querySelectorAll(".quantity-wrapper button");
  const addBtn = productWrapper.querySelector(".add-btn");

  initSlider(slides, thumbnails);

  slides[currentSlide].addEventListener("click", () => {
    currentSlide = 0;

    openLightboxGallery(image, thumbnail, currentSlide);
  });

  thumbnails.forEach((element, index) => {
    element.addEventListener("click", () => {
      currentSlide = index;

      openLightboxGallery(image, thumbnail);
    });
  });

  previousBtn.addEventListener("click", () => {
    previousSlide(slides, thumbnails);
  });

  nextBtn.addEventListener("click", () => {
    nextSlide(slides, thumbnails);
  });

  buttons.forEach((button) => {
    button.addEventListener("click", updateAmount);
  });

  addBtn.addEventListener("click", addItemToCart);
}

// Open Lightbox Gallery
function openLightboxGallery(image, thumbnail) {
  lightBoxGalleryWrapper.classList.add("show");
  lightBoxGalleryWrapper.innerHTML = `
    <div class="product-images d-flex p-absolute-center">
      <button class="close-btn">
        <img src="./images/icon-close.svg" alt="close" />
      </button>
      <div class="slides">
        ${image}
        <button class="previous-btn">
          <img
            src="./images/icon-previous.svg"
            class="p-absolute-center"
            alt="previous"
          />
        </button>
        <button class="next-btn">
          <img
            src="./images/icon-next.svg"
            class="p-absolute-center"
            alt="next"
          />
        </button>
      </div>

      <div class="thumbnails d-flex">
        ${thumbnail}
      </div>
    </div>
  `;

  const slides = lightBoxGalleryWrapper.querySelectorAll(".slide");
  const thumbnails = lightBoxGalleryWrapper.querySelectorAll(".thumbnail");
  const closeBtn = lightBoxGalleryWrapper.querySelector(".close-btn");
  const previousBtn = lightBoxGalleryWrapper.querySelector(".previous-btn");
  const nextBtn = lightBoxGalleryWrapper.querySelector(".next-btn");

  initSlider(slides, thumbnails);

  closeBtn.addEventListener("click", (e) =>
    e.currentTarget.closest(".lightbox-gallery").classList.remove("show")
  );

  previousBtn.addEventListener("click", () => {
    previousSlide(slides, thumbnails);
  });

  nextBtn.addEventListener("click", () => {
    nextSlide(slides, thumbnails);
  });

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      thumbnailclicked(slides, thumbnails, index);
    });
  });
}

// Initial slider
function initSlider(slides, thumbnails) {
  slides.forEach((slide) => slide.classList.remove("active-slide"));
  thumbnails.forEach((thumbnail) =>
    thumbnail.classList.remove("active-thumbnail")
  );

  slides[currentSlide].classList.add("active-slide");
  thumbnails[currentSlide].classList.add("active-thumbnail");
}

// Previous Slide
function previousSlide(slides, thumbnails) {
  if (currentSlide > 0) {
    currentSlide--;
  } else {
    currentSlide = slides.length - 1;
  }

  initSlider(slides, thumbnails);
}

// next Slide
function nextSlide(slides, thumbnails) {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
  } else {
    currentSlide = 0;
  }

  initSlider(slides, thumbnails);
}

// thumbnail Clicked
function thumbnailclicked(slides, thumbnails, index) {
  currentSlide = index;

  initSlider(slides, thumbnails);
}

// Update amount
function updateAmount(e) {
  const quantity = e.currentTarget.parentElement.querySelector(".quantity");

  if (e.currentTarget.classList.contains("minus-btn")) {
    if (amount > 0) {
      amount--;
    } else return false;
  } else if (e.currentTarget.classList.contains("plus-btn")) {
    amount++;
  }

  quantity.textContent = amount;
  amountEl.textContent = quantity.textContent;

  const addBtn = productWrapper.querySelector(".add-btn");

  if (addBtn.disabled) {
    const price = cartBody
      .querySelector(".price")
      .textContent.replace(/\$/g, " ");
    const cartAmount = cartBody.querySelector(".amount");
    const total = cartBody.querySelector(".total-price");

    cartAmount.textContent = amountEl.textContent;
    total.textContent = `$${(+price * +cartAmount.textContent).toFixed(2)}`;
  }
}

// Add Item To Cart
function addItemToCart(e) {
  if (amount === 0) {
    return;
  } else {
    e.currentTarget.innerHTML = `
      <img src="./images/icon-cart.svg" alt="cart" />
      In Cart
    `;
    e.currentTarget.classList.add("disabled");
    e.currentTarget.disabled = true;

    amountEl.classList.add("show-amount");
    cartBody.innerHTML = `
      <div class="product">
      <div class="product-img">
        <img
          src="${product.images.large_images[0]}"
          alt="product"
        />
      </div>
      <div class="product-info">
        <span class="title">${product.title}</span>
        <span class="price">$${product.price.new_price.toFixed(2)}</span>
        <span>x</span>
        <span class="amount">${amountEl.textContent}</span>
        <span class="total-price">$${(product.price.new_price * amount).toFixed(
          2
        )}</span>
      </div>
      <button class="delete-btn">
        <img src="./images/icon-delete.svg" alt="icon" />
      </button>
      </div>
      <button class="checkout-btn">Checkout</button>
    `;

    const deleteBtn = cartBody.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItemFromCart);
  }
}

// Delete item from cart
function deleteItemFromCart() {
  const quantity = productWrapper.querySelector(".quantity");
  const addBtn = productWrapper.querySelector(".add-btn");
  amount = 0;

  cartItems.classList.remove("show");
  cartBody.innerHTML = "<p>Your cart is empty.</p>";
  quantity.textContent = amount;

  amountEl.textContent = amount;
  amountEl.classList.remove("show-amount");

  addBtn.disabled = false;
  addBtn.innerHTML = `
    <img src="./images/icon-cart.svg" alt="cart" />
    add to cart
  `;
  addBtn.classList.remove("disabled");
}
