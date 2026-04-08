// Mock Data
const PRODUCTS = [
  {
    id: 1,
    name: "Lumina Pro Keyboard",
    price: 129,
    category: "Teclados",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop",
    colors: ["Blanco", "Negro"],
    sizes: ["TKL", "Full"],
    salesCount: 150,
  },
  {
    id: 2,
    name: "Ergo Mouse M1",
    price: 79,
    category: "Ratones",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop",
    colors: ["Negro", "Gris"],
    sizes: ["Estándar"],
    salesCount: 320,
  },
  {
    id: 3,
    name: "Desk Mat Premium",
    price: 35,
    category: "Accesorios",
    image: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=800&auto=format&fit=crop",
    colors: ["Negro", "Azul", "Gris"],
    sizes: ["M", "L", "XL"],
    salesCount: 500,
  },
  {
    id: 4,
    name: "Monitor Stand Hub",
    price: 89,
    category: "Accesorios",
    image: "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?q=80&w=800&auto=format&fit=crop",
    colors: ["Plata", "Gris Espacial"],
    sizes: ["Estándar"],
    salesCount: 85,
  },
  {
    id: 5,
    name: "Lumina Studio Mic",
    price: 149,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
    colors: ["Negro"],
    sizes: ["Estándar"],
    salesCount: 210,
  },
  {
    id: 6,
    name: "Wireless Charger Pad",
    price: 45,
    category: "Accesorios",
    image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?q=80&w=800&auto=format&fit=crop",
    colors: ["Blanco", "Negro"],
    sizes: ["Estándar"],
    salesCount: 430,
  },
];

const CATEGORIES = ["Todos", "Teclados", "Ratones", "Audio", "Accesorios"];
const COLORS = ["Blanco", "Negro", "Gris", "Plata", "Gris Espacial", "Azul"];
const SIZES = ["TKL", "Full", "Estándar", "M", "L", "XL"];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Carlos R.",
    role: "Diseñador UI",
    text: "El teclado Lumina Pro ha cambiado por completo mi flujo de trabajo. La calidad de construcción es increíble y el diseño minimalista encaja perfecto en mi setup.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Elena M.",
    role: "Desarrolladora Frontend",
    text: "Buscaba accesorios que no solo funcionaran bien, sino que se vieran elegantes. Lumina superó mis expectativas. El envío fue súper rápido.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "David S.",
    role: "Creador de Contenido",
    text: "El micrófono tiene una calidad de estudio real. Mis seguidores notaron la diferencia inmediatamente. 100% recomendado para podcasters.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  }
];

// State
let cart = JSON.parse(localStorage.getItem('lumina_cart')) || [];
let selectedCategory = "Todos";
let sortOrder = "featured";
let maxPrice = 200;
let selectedColors = [];
let selectedSizes = [];

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalEl = document.getElementById('cart-total');
const cartBadge = document.getElementById('cart-badge');
const cartFooter = document.getElementById('cart-footer');
const desktopFilters = document.getElementById('desktop-filters');
const mobileFilters = document.getElementById('mobile-filters');
const categoryPills = document.getElementById('category-pills');
const categoriesGrid = document.getElementById('categories-grid');
const testimonialsGrid = document.getElementById('testimonials-grid');

// Initialize
function init() {
  renderCategories();
  renderTestimonials();
  renderFilters(desktopFilters);
  renderFilters(mobileFilters);
  renderCategoryPills();
  renderProducts();
  renderCart();
  setupEventListeners();
  
  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Render Functions
function renderCategories() {
  const cats = [
    { name: "Teclados", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600&auto=format&fit=crop" },
    { name: "Ratones", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=600&auto=format&fit=crop" },
    { name: "Audio", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&auto=format&fit=crop" }
  ];
  
  categoriesGrid.innerHTML = cats.map(c => `
    <a href="#tienda" onclick="setCategory('${c.name}')" class="group relative h-80 rounded-[2rem] overflow-hidden block">
      <img src="${c.image}" alt="${c.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerpolicy="no-referrer" />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
      <div class="absolute bottom-8 left-8">
        <h3 class="text-2xl font-bold text-white mb-2">${c.name}</h3>
        <span class="text-white/80 text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
          Explorar <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </span>
      </div>
    </a>
  `).join('');
}

function renderTestimonials() {
  testimonialsGrid.innerHTML = TESTIMONIALS.map(t => `
    <div class="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 text-left">
      <div class="flex gap-1 text-amber-400 mb-6">
        ${Array(5).fill('<i data-lucide="star" class="w-5 h-5 fill-current"></i>').join('')}
      </div>
      <p class="text-slate-700 mb-8 leading-relaxed">"${t.text}"</p>
      <div class="flex items-center gap-4">
        <img src="${t.avatar}" alt="${t.name}" class="w-12 h-12 rounded-full object-cover" referrerpolicy="no-referrer" />
        <div>
          <h4 class="font-bold text-slate-900">${t.name}</h4>
          <p class="text-sm text-slate-500">${t.role}</p>
        </div>
      </div>
    </div>
  `).join('');
}

function renderFilters(container) {
  container.innerHTML = `
    <!-- Price Filter -->
    <div class="mb-8">
      <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Precio Máximo</h3>
      <div class="flex items-center gap-4">
        <input type="range" min="0" max="200" value="${maxPrice}" class="w-full accent-blue-600 price-slider" />
        <span class="text-sm font-bold text-slate-900 min-w-[3rem] price-display">$${maxPrice}</span>
      </div>
    </div>

    <!-- Color Filter -->
    <div class="mb-8">
      <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Color</h3>
      <div class="flex flex-wrap gap-2">
        ${COLORS.map(color => `
          <button class="color-btn px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${selectedColors.includes(color) ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}" data-color="${color}">
            ${color}
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Size Filter -->
    <div class="mb-8">
      <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Tamaño</h3>
      <div class="flex flex-wrap gap-2">
        ${SIZES.map(size => `
          <button class="size-btn px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${selectedSizes.includes(size) ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}" data-size="${size}">
            ${size}
          </button>
        `).join('')}
      </div>
    </div>

    <button class="reset-filters-btn w-full py-3 bg-slate-50 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-colors text-sm">
      Limpiar Filtros
    </button>
  `;
}

function renderCategoryPills() {
  categoryPills.innerHTML = CATEGORIES.map(cat => `
    <button class="category-pill px-5 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}" data-category="${cat}">
      ${cat}
    </button>
  `).join('');
}

function renderProducts() {
  let filtered = PRODUCTS.filter(p => {
    const matchCategory = selectedCategory === "Todos" || p.category === selectedCategory;
    const matchPrice = p.price <= maxPrice;
    const matchColor = selectedColors.length === 0 || p.colors.some(c => selectedColors.includes(c));
    const matchSize = selectedSizes.length === 0 || p.sizes.some(s => selectedSizes.includes(s));
    return matchCategory && matchPrice && matchColor && matchSize;
  });

  filtered.sort((a, b) => {
    if (sortOrder === 'low-to-high') return a.price - b.price;
    if (sortOrder === 'high-to-low') return b.price - a.price;
    if (sortOrder === 'best-sellers') return b.salesCount - a.salesCount;
    return 0; // featured
  });

  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div class="col-span-full py-20 text-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
        <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-slate-400">
          <i data-lucide="search-x" class="w-8 h-8"></i>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-2">No hay resultados</h3>
        <p class="text-slate-500 mb-6">No encontramos productos que coincidan con tus filtros.</p>
        <button class="reset-filters-btn px-6 py-3 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-all">
          Limpiar filtros
        </button>
      </div>
    `;
  } else {
    productsGrid.innerHTML = filtered.map(p => `
      <div class="group bg-white rounded-3xl overflow-hidden border border-slate-100 transition-all hover:shadow-2xl hover:-translate-y-2 duration-500">
        <div class="relative aspect-[4/3] overflow-hidden bg-slate-50">
          <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerpolicy="no-referrer" />
          <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
          <button class="add-to-cart-btn absolute bottom-4 left-4 right-4 py-3.5 bg-white/95 backdrop-blur-md text-slate-900 font-bold rounded-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg" data-id="${p.id}">
            Añadir al carrito
          </button>
        </div>
        <div class="p-6">
          <div class="flex justify-between items-start mb-2">
            <p class="text-xs text-slate-400 font-bold uppercase tracking-wider">${p.category}</p>
            <p class="text-lg font-black text-slate-900">$${p.price}</p>
          </div>
          <h3 class="text-lg font-bold text-slate-800 mb-3">${p.name}</h3>
          <div class="flex items-center gap-2">
            <div class="flex -space-x-1">
              ${p.colors.slice(0, 3).map(c => `
                <div class="w-4 h-4 rounded-full border-2 border-white shadow-sm" style="background-color: ${getColorHex(c)}" title="${c}"></div>
              `).join('')}
            </div>
            <span class="text-xs text-slate-400 font-medium">+${p.sizes.length} tamaños</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  if (window.lucide) lucide.createIcons();
}

function getColorHex(colorName) {
  const map = {
    "Blanco": "#ffffff",
    "Negro": "#0f172a",
    "Gris": "#94a3b8",
    "Plata": "#e2e8f0",
    "Gris Espacial": "#475569",
    "Azul": "#2563eb"
  };
  return map[colorName] || "#cbd5e1";
}

function renderCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (totalItems > 0) {
    cartBadge.textContent = totalItems;
    cartBadge.classList.remove('hidden');
    cartFooter.classList.remove('hidden');
  } else {
    cartBadge.classList.add('hidden');
    cartFooter.classList.add('hidden');
  }

  cartTotalEl.textContent = `$${totalPrice}`;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="h-full flex flex-col items-center justify-center text-center space-y-4">
        <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
          <i data-lucide="shopping-bag" class="w-10 h-10"></i>
        </div>
        <p class="text-slate-500 font-medium">Tu carrito está vacío</p>
        <button class="close-cart-btn px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all">
          Explorar productos
        </button>
      </div>
    `;
  } else {
    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="flex gap-4 mb-6 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-xl bg-slate-50" referrerpolicy="no-referrer" />
        <div class="flex-1 flex flex-col justify-between">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-bold text-slate-900 leading-tight">${item.name}</h3>
              <p class="text-sm text-slate-500 mt-1">$${item.price}</p>
            </div>
            <button class="remove-item-btn text-slate-400 hover:text-red-500 transition-colors p-1" data-id="${item.id}">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
          <div class="flex items-center gap-3 bg-slate-50 w-fit rounded-lg p-1">
            <button class="update-qty-btn w-7 h-7 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all text-slate-600" data-id="${item.id}" data-delta="-1">
              <i data-lucide="minus" class="w-3 h-3"></i>
            </button>
            <span class="text-sm font-bold text-slate-900 w-4 text-center">${item.quantity}</span>
            <button class="update-qty-btn w-7 h-7 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all text-slate-600" data-id="${item.id}" data-delta="1">
              <i data-lucide="plus" class="w-3 h-3"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  if (window.lucide) lucide.createIcons();
  localStorage.setItem('lumina_cart', JSON.stringify(cart));
}

// Actions
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  renderCart();
  openCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  renderCart();
}

function updateQuantity(productId, delta) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    const newQty = item.quantity + delta;
    if (newQty > 0) {
      item.quantity = newQty;
    } else {
      removeFromCart(productId);
      return;
    }
  }
  renderCart();
}

function openCart() {
  cartOverlay.classList.remove('opacity-0', 'pointer-events-none');
  cartDrawer.classList.remove('translate-x-full');
}

function closeCart() {
  cartOverlay.classList.add('opacity-0', 'pointer-events-none');
  cartDrawer.classList.add('translate-x-full');
}

window.setCategory = function(cat) {
  selectedCategory = cat;
  renderCategoryPills();
  renderProducts();
}

// Event Listeners Setup
function setupEventListeners() {
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 20) {
      nav.classList.add('bg-white/80', 'backdrop-blur-md', 'shadow-sm', 'py-4');
      nav.classList.remove('bg-transparent', 'py-6');
    } else {
      nav.classList.remove('bg-white/80', 'backdrop-blur-md', 'shadow-sm', 'py-4');
      nav.classList.add('bg-transparent', 'py-6');
    }
  });

  // User Dropdown
  const userBtn = document.getElementById('user-btn');
  const userDropdown = document.getElementById('user-dropdown');
  
  userBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle('opacity-0');
    userDropdown.classList.toggle('pointer-events-none');
    userDropdown.classList.toggle('translate-y-2');
  });

  document.addEventListener('click', (e) => {
    if (!userBtn.contains(e.target) && !userDropdown.contains(e.target)) {
      userDropdown.classList.add('opacity-0', 'pointer-events-none', 'translate-y-2');
    }
  });

  // Cart Toggles
  document.getElementById('cart-btn').addEventListener('click', openCart);
  document.getElementById('close-cart-btn').addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  // Mobile Menu
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('opacity-0');
    mobileMenu.classList.toggle('pointer-events-none');
    mobileMenu.classList.toggle('-translate-y-4');
  });

  // Mobile Filters
  const mobileFilterBtn = document.getElementById('mobile-filter-btn');
  const closeMobileFilterBtn = document.getElementById('close-mobile-filter-btn');
  const applyFiltersBtn = document.getElementById('apply-filters-btn');
  const mobileFilterOverlay = document.getElementById('mobile-filter-overlay');
  const mobileFilterDrawer = document.getElementById('mobile-filter-drawer');

  function openMobileFilters() {
    mobileFilterOverlay.classList.remove('opacity-0', 'pointer-events-none');
    mobileFilterDrawer.classList.remove('translate-y-full');
  }

  function closeMobileFilters() {
    mobileFilterOverlay.classList.add('opacity-0', 'pointer-events-none');
    mobileFilterDrawer.classList.add('translate-y-full');
  }

  mobileFilterBtn.addEventListener('click', openMobileFilters);
  closeMobileFilterBtn.addEventListener('click', closeMobileFilters);
  applyFiltersBtn.addEventListener('click', closeMobileFilters);
  mobileFilterOverlay.addEventListener('click', closeMobileFilters);

  // Sort Select
  document.getElementById('sort-select').addEventListener('change', (e) => {
    sortOrder = e.target.value;
    renderProducts();
  });

  // Event Delegation for dynamic elements
  document.addEventListener('click', (e) => {
    // Add to cart
    const addBtn = e.target.closest('.add-to-cart-btn');
    if (addBtn) {
      addToCart(parseInt(addBtn.dataset.id));
    }

    // Remove from cart
    const removeBtn = e.target.closest('.remove-item-btn');
    if (removeBtn) {
      removeFromCart(parseInt(removeBtn.dataset.id));
    }

    // Update quantity
    const updateBtn = e.target.closest('.update-qty-btn');
    if (updateBtn) {
      updateQuantity(parseInt(updateBtn.dataset.id), parseInt(updateBtn.dataset.delta));
    }

    // Close cart from empty state
    const closeCartBtn = e.target.closest('.close-cart-btn');
    if (closeCartBtn) {
      closeCart();
    }

    // Category Pills
    const catPill = e.target.closest('.category-pill');
    if (catPill) {
      selectedCategory = catPill.dataset.category;
      renderCategoryPills();
      renderProducts();
    }

    // Color Filters
    const colorBtn = e.target.closest('.color-btn');
    if (colorBtn) {
      const color = colorBtn.dataset.color;
      if (selectedColors.includes(color)) {
        selectedColors = selectedColors.filter(c => c !== color);
      } else {
        selectedColors.push(color);
      }
      renderFilters(desktopFilters);
      renderFilters(mobileFilters);
      renderProducts();
    }

    // Size Filters
    const sizeBtn = e.target.closest('.size-btn');
    if (sizeBtn) {
      const size = sizeBtn.dataset.size;
      if (selectedSizes.includes(size)) {
        selectedSizes = selectedSizes.filter(s => s !== size);
      } else {
        selectedSizes.push(size);
      }
      renderFilters(desktopFilters);
      renderFilters(mobileFilters);
      renderProducts();
    }

    // Reset Filters
    const resetBtn = e.target.closest('.reset-filters-btn');
    if (resetBtn) {
      selectedCategory = "Todos";
      maxPrice = 200;
      selectedColors = [];
      selectedSizes = [];
      renderCategoryPills();
      renderFilters(desktopFilters);
      renderFilters(mobileFilters);
      renderProducts();
    }
  });

  // Event Delegation for input ranges
  document.addEventListener('input', (e) => {
    if (e.target.classList.contains('price-slider')) {
      maxPrice = parseInt(e.target.value);
      // Update all price displays
      document.querySelectorAll('.price-display').forEach(el => el.textContent = `$${maxPrice}`);
      // Sync all sliders
      document.querySelectorAll('.price-slider').forEach(el => {
        if (el !== e.target) el.value = maxPrice;
      });
      renderProducts();
    }
  });
}

// Start app
init();
