import fetchData from "./network.js";

let data = [];

export default async function displayData() {
  try {
    data = await fetchData();
    if (data) {
      mydisplaycards(data);
    } else {
      console.log("Failed to fetch data");
    }
  } catch (er) {
    console.log(er);
  }

  document.getElementById("mybuttonsearch").addEventListener("click", () => {
    let searchTerm = document.getElementById("searchitems").value.toLowerCase();
    console.log("mysearchterm", searchTerm);
    searchData(searchTerm);
  });
}

const mydisplaycards = (products) => {
  const myContainer = document.getElementById("my-container");
  myContainer.innerHTML = ""; // Clear previous content

  // Apply grid styles to the container
  myContainer.classList.add(
    "grid",
    "lg:grid-cols-4",
    "md:grid-cols-3",
    "sm:grid-cols-2",
    "grid-cols-1",
    "gap-y-4",
    "h-40"
  );

  // Iterate over each product and create a card
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add(
      "min-w-md",
      "h-full",
      "w-full",
      "p-4",
      "border",
      "rounded",
      "shadow-lg",
      "h-32"
    );

    // Set the card's HTML content
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="w-40 h-32 object-cover mb-4"> 
      <div class="font-bold text-black-700 text-xl mb-2 text-center">${product.title}</div>
      <p class="text-gray-700 text-sm text-center">${product.description}</p>
      <div class="flex justify-center mt-2">
        <button class="add-to-cart mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          data-id="${product.id}"
          data-title="${product.title}"
          data-image="${product.image}">Add to Cart
        </button>
      </div>
    `;

    // Append the card to the container
    myContainer.appendChild(card);

    // Add event listener to the button inside the card
    const button = card.querySelector(".add-to-cart");
    button.addEventListener("click", addToCart);
  });
};

// Search operation
const searchData = (searchTerm) => {
  const filteredMovies = data.filter((item) => {
    return item.title.toLowerCase().includes(searchTerm);
  });

  if (filteredMovies.length > 0) {
    console.log(filteredMovies);
    mydisplaycards(filteredMovies);
  } else {
    alert("No Item matching your search.");
  }
};

// Add to cart starts here
function addToCart(event) {
  const button = event.target; // The clicked button
  const itemId = button.getAttribute("data-id");
  const itemTitle = button.getAttribute("data-title");
  const posterPath =
    button.getAttribute("data-image") || "https://example.com/placeholder.jpg";

  console.log("Adding to cart", itemId, itemTitle, posterPath);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.some((item) => item.id === itemId)) {
    alert(`${itemTitle} is already in your cart!`);
    return;
  }

  cart.push({ id: itemId, poster_path: posterPath, title: itemTitle });

  localStorage.setItem("cart", JSON.stringify(cart));

  // Display a success message
  alert(`${itemTitle} has been added to your cart!`);
}
