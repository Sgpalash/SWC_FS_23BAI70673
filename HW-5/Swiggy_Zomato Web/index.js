const restaurantData = [
  {
    id: 1,
    name: "The Red Oven",
    category: "Pizza",
    cuisines: ["Italian", "Pizza", "Continental"],
    rating: 4.8,
    deliveryTime: 25,
    priceForTwo: 600,
    distance: 1.2,
    offer: "50% OFF",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Curry House",
    category: "Indian",
    cuisines: ["North Indian", "Mughlai", "Biryani"],
    rating: 4.6,
    deliveryTime: 35,
    priceForTwo: 450,
    distance: 2.4,
    offer: "FREE DELIVERY",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Burger District",
    category: "Burgers",
    cuisines: ["Burgers", "American", "Beverages"],
    rating: 4.5,
    deliveryTime: 20,
    priceForTwo: 350,
    distance: 0.8,
    offer: "20% OFF",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Bombay Biryani Co.",
    category: "Indian",
    cuisines: ["Biryani", "Hyderabadi", "Kebabs"],
    rating: 4.7,
    deliveryTime: 30,
    priceForTwo: 500,
    distance: 1.8,
    offer: "30% OFF",
    image:
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Wok This Way",
    category: "Asian",
    cuisines: ["Chinese", "Thai", "Asian"],
    rating: 4.4,
    deliveryTime: 28,
    priceForTwo: 550,
    distance: 2.1,
    offer: "₹125 OFF",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Sweet Truth",
    category: "Desserts",
    cuisines: ["Desserts", "Bakery", "Ice Cream"],
    rating: 4.3,
    deliveryTime: 22,
    priceForTwo: 300,
    distance: 1.5,
    offer: "BUY 1 GET 1",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    name: "South Spice",
    category: "Indian",
    cuisines: ["South Indian", "Dosa", "Breakfast"],
    rating: 4.6,
    deliveryTime: 18,
    priceForTwo: 280,
    distance: 0.9,
    offer: "15% OFF",
    image:
      "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    name: "Napoli Pizzeria",
    category: "Pizza",
    cuisines: ["Pizza", "Italian", "Pasta"],
    rating: 4.7,
    deliveryTime: 32,
    priceForTwo: 700,
    distance: 3.1,
    offer: "25% OFF",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 9,
    name: "Green Bowl",
    category: "Healthy",
    cuisines: ["Healthy Food", "Salads", "Juices"],
    rating: 4.5,
    deliveryTime: 24,
    priceForTwo: 420,
    distance: 1.7,
    offer: "FREE DELIVERY",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
  },
];

// Kept globally accessible so the data array can be inspected or reused.
window.restaurantData = restaurantData;

document.addEventListener("DOMContentLoaded", () => {
  const restaurantGrid = document.querySelector(".restaurant-grid");
  const restaurantSection = document.querySelector("#restaurants .container");
  const sectionHeading = document.querySelector(
    "#restaurants .section-heading"
  );
  const searchForm = document.querySelector(".search-bar");
  const searchInput = document.querySelector("#restaurant-search");
  const popularSearches = document.querySelectorAll(".quick-search a");
  const viewAllLink = document.querySelector(".view-all");

  if (!restaurantGrid || !restaurantSection || !sectionHeading || !searchInput) {
    return;
  }

  let selectedCategory = "All";
  let searchTerm = "";
  const favoriteIds = new Set();

  const categories = [
    "All",
    ...new Set(restaurantData.map((restaurant) => restaurant.category)),
  ];

  injectInteractiveStyles();

  const controls = document.createElement("div");
  controls.className = "restaurant-controls";
  controls.setAttribute("aria-label", "Restaurant category filters");

  const filterList = document.createElement("div");
  filterList.className = "category-filters";

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-filter";
    button.dataset.category = category;
    button.textContent = category;
    button.setAttribute("aria-pressed", String(category === "All"));

    if (category === "All") {
      button.classList.add("active");
    }

    filterList.appendChild(button);
  });

  const resultStatus = document.createElement("p");
  resultStatus.className = "restaurant-results";
  resultStatus.setAttribute("role", "status");
  resultStatus.setAttribute("aria-live", "polite");

  controls.append(filterList, resultStatus);
  sectionHeading.insertAdjacentElement("afterend", controls);

  function createRestaurantCard(restaurant) {
    const card = document.createElement("article");
    card.className = "restaurant-card";
    card.dataset.restaurantId = restaurant.id;

    const image = document.createElement("div");
    image.className = "restaurant-image";
    image.style.backgroundImage = `url("${restaurant.image}")`;

    const discount = document.createElement("span");
    discount.className = "discount";
    discount.textContent = restaurant.offer;

    const favoriteButton = document.createElement("button");
    favoriteButton.type = "button";
    favoriteButton.className = "favorite";
    favoriteButton.dataset.favoriteId = restaurant.id;
    favoriteButton.setAttribute(
      "aria-label",
      `Add ${restaurant.name} to favorites`
    );
    favoriteButton.setAttribute("aria-pressed", "false");
    favoriteButton.textContent = "♡";

    const deliveryTime = document.createElement("span");
    deliveryTime.className = "delivery-time";
    deliveryTime.textContent = `${restaurant.deliveryTime} min`;

    image.append(discount, favoriteButton, deliveryTime);

    const info = document.createElement("div");
    info.className = "restaurant-info";

    const titleRow = document.createElement("div");
    titleRow.className = "restaurant-title";

    const title = document.createElement("h3");
    title.textContent = restaurant.name;

    const rating = document.createElement("span");
    rating.className = "rating";
    rating.textContent = `${restaurant.rating.toFixed(1)} ★`;

    titleRow.append(title, rating);

    const cuisine = document.createElement("p");
    cuisine.textContent = restaurant.cuisines.join(", ");

    const meta = document.createElement("div");
    meta.className = "restaurant-meta";

    const price = document.createElement("span");
    price.textContent = `₹${restaurant.priceForTwo} for two`;

    const dot = document.createElement("span");
    dot.className = "dot";

    const distance = document.createElement("span");
    distance.textContent = `${restaurant.distance} km`;

    meta.append(price, dot, distance);
    info.append(titleRow, cuisine, meta);
    card.append(image, info);

    return card;
  }

  function getFilteredRestaurants() {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return restaurantData.filter((restaurant) => {
      const matchesCategory =
        selectedCategory === "All" ||
        restaurant.category === selectedCategory;

      const searchableText = [
        restaurant.name,
        restaurant.category,
        ...restaurant.cuisines,
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesCategory &&
        (!normalizedSearch || searchableText.includes(normalizedSearch))
      );
    });
  }

  function renderRestaurants() {
    const filteredRestaurants = getFilteredRestaurants();
    restaurantGrid.replaceChildren();

    filteredRestaurants.forEach((restaurant) => {
      const card = createRestaurantCard(restaurant);
      const favoriteButton = card.querySelector(".favorite");

      if (favoriteIds.has(restaurant.id)) {
        favoriteButton.classList.add("is-favorite");
        favoriteButton.setAttribute("aria-pressed", "true");
        favoriteButton.textContent = "♥";
      }

      restaurantGrid.appendChild(card);
    });

    if (filteredRestaurants.length === 0) {
      const emptyState = document.createElement("div");
      emptyState.className = "restaurant-empty";

      const emptyTitle = document.createElement("h3");
      emptyTitle.textContent = "No restaurants found";

      const emptyText = document.createElement("p");
      emptyText.textContent =
        "Try another restaurant, cuisine, or category.";

      const resetButton = document.createElement("button");
      resetButton.type = "button";
      resetButton.className = "reset-filters";
      resetButton.textContent = "Clear filters";

      emptyState.append(emptyTitle, emptyText, resetButton);
      restaurantGrid.appendChild(emptyState);
    }

    const label =
      filteredRestaurants.length === 1 ? "restaurant" : "restaurants";
    resultStatus.textContent = `${filteredRestaurants.length} ${label} found`;
  }

  function setCategory(category) {
    selectedCategory = category;

    filterList.querySelectorAll(".category-filter").forEach((button) => {
      const isActive = button.dataset.category === category;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    renderRestaurants();
  }

  function resetFilters() {
    searchTerm = "";
    searchInput.value = "";
    setCategory("All");
  }

  filterList.addEventListener("click", (event) => {
    const button = event.target.closest(".category-filter");

    if (!button) {
      return;
    }

    setCategory(button.dataset.category);
  });

  searchInput.addEventListener("input", () => {
    searchTerm = searchInput.value;
    renderRestaurants();
  });

  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      searchTerm = searchInput.value;
      renderRestaurants();
      restaurantSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  popularSearches.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      searchTerm = link.textContent.trim();
      searchInput.value = searchTerm;
      setCategory("All");
      restaurantSection.scrollIntoView({ behavior: "smooth" });
    });
  });

  if (viewAllLink) {
    viewAllLink.addEventListener("click", (event) => {
      event.preventDefault();
      resetFilters();
      restaurantSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  restaurantGrid.addEventListener("click", (event) => {
    const favoriteButton = event.target.closest("[data-favorite-id]");
    const resetButton = event.target.closest(".reset-filters");

    if (resetButton) {
      resetFilters();
      return;
    }

    if (!favoriteButton) {
      return;
    }

    const restaurantId = Number(favoriteButton.dataset.favoriteId);
    const restaurant = restaurantData.find(
      (item) => item.id === restaurantId
    );

    if (favoriteIds.has(restaurantId)) {
      favoriteIds.delete(restaurantId);
      favoriteButton.classList.remove("is-favorite");
      favoriteButton.setAttribute("aria-pressed", "false");
      favoriteButton.textContent = "♡";
      favoriteButton.setAttribute(
        "aria-label",
        `Add ${restaurant.name} to favorites`
      );
    } else {
      favoriteIds.add(restaurantId);
      favoriteButton.classList.add("is-favorite");
      favoriteButton.setAttribute("aria-pressed", "true");
      favoriteButton.textContent = "♥";
      favoriteButton.setAttribute(
        "aria-label",
        `Remove ${restaurant.name} from favorites`
      );
    }
  });

  renderRestaurants();
});

function injectInteractiveStyles() {
  if (document.querySelector("#restaurant-interactive-styles")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "restaurant-interactive-styles";
  style.textContent = `
    .restaurant-controls {
      display: flex;
      gap: 20px;
      align-items: center;
      justify-content: space-between;
      margin: -18px 0 30px;
    }

    .category-filters {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      padding: 4px 2px 8px;
      scrollbar-width: thin;
    }

    .category-filter,
    .reset-filters {
      padding: 9px 16px;
      color: #5f5f5f;
      background: #ffffff;
      border: 1px solid #e2d9d7;
      border-radius: 999px;
      font-weight: 700;
      white-space: nowrap;
      transition: 0.2s ease;
    }

    .category-filter:hover,
    .category-filter.active,
    .reset-filters:hover {
      color: #ffffff;
      background: #e23744;
      border-color: #e23744;
    }

    .restaurant-results {
      color: #777777;
      font-size: 0.8rem;
      font-weight: 700;
      white-space: nowrap;
    }

    .restaurant-empty {
      grid-column: 1 / -1;
      padding: 70px 24px;
      background: #ffffff;
      border: 1px dashed #e3cfca;
      border-radius: 18px;
      text-align: center;
    }

    .restaurant-empty h3 {
      font-family: Georgia, serif;
      font-size: 1.6rem;
    }

    .restaurant-empty p {
      margin: 8px 0 20px;
      color: #777777;
    }

    .favorite.is-favorite {
      color: #e23744;
      background: #fff1f2;
    }

    @media (max-width: 760px) {
      .restaurant-controls {
        align-items: flex-start;
        flex-direction: column;
        gap: 8px;
        margin-top: -10px;
      }

      .category-filters {
        width: 100%;
      }
    }
  `;

  document.head.appendChild(style);
}
