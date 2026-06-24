# 55. HTML Web Storage

## 📘 Introduction
The Web Storage API provides mechanisms for storing key-value pairs in the browser, persisting data across page reloads and even browser sessions. It offers larger storage capacity than cookies (5-10 MB per origin), better performance (synchronous access), and simpler APIs, making it ideal for caching, user preferences, and application state.

## 🧠 Key Concepts
- **localStorage**: Persistent storage that remains even after the browser is closed and reopened. Data persists until explicitly removed. Shared across all tabs/windows of the same origin.
- **sessionStorage**: Temporary storage scoped to the current browser tab/window. Data is cleared when the tab or window is closed. Isolated between tabs — even same-origin tabs don't share it.
- **setItem(key, value)**: Stores a key-value pair (both must be strings)
- **getItem(key)**: Retrieves the value for a given key, or `null` if key not found
- **removeItem(key)**: Removes a specific key-value pair
- **clear()**: Removes all key-value pairs for the origin
- **storage event**: Fired on other tabs/windows of the same origin when localStorage changes (not fired in the tab that made the change)
- **Storage Event Properties**: `key`, `oldValue`, `newValue`, `url`, `storageArea`
- **JSON.stringify/parse**: Convert JavaScript objects to strings for storage and back
- **Storage Limits**: Typically 5-10 MB per origin; exceeding throws `QuotaExceededError`

## 💻 Syntax
```html
<!DOCTYPE html>
<html>
<head>
  <title>Web Storage Demo</title>
</head>
<body>
  <script>
    // localStorage
    localStorage.setItem('theme', 'dark');
    localStorage.setItem('user', JSON.stringify({ name: 'Alice', age: 30 }));
    const theme = localStorage.getItem('theme');        // 'dark'
    const user = JSON.parse(localStorage.getItem('user')); // { name: 'Alice', age: 30 }
    localStorage.removeItem('theme');
    localStorage.clear();

    // sessionStorage
    sessionStorage.setItem('token', 'abc123');
    const token = sessionStorage.getItem('token');
    sessionStorage.removeItem('token');
    sessionStorage.clear();

    // Storage event listener (in other tabs)
    window.addEventListener('storage', function(e) {
      console.log(`Key: ${e.key}`);
      console.log(`Old: ${e.oldValue}`);
      console.log(`New: ${e.newValue}`);
      console.log(`URL: ${e.url}`);
    });
  </script>
</body>
</html>
```

## ✅ Example 1 - Basic (Theme Switcher with localStorage)

**Problem:** Build a dark/light mode toggle that persists between page visits.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Theme Switcher</title>
  <style>
    body { font-family: Arial; transition: all 0.3s; padding: 20px; }
    body.light { background: white; color: black; }
    body.dark { background: #222; color: white; }
    button { padding: 10px 20px; margin: 10px; cursor: pointer; }
  </style>
</head>
<body>
  <h1>Persistent Theme Switcher</h1>
  <p>Your theme preference is remembered across visits.</p>
  <button id="toggleBtn">Toggle Theme</button>

  <script>
    const STORAGE_KEY = 'site_theme';

    function loadTheme() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'dark') {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
      } else {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
      }
    }

    function toggleTheme() {
      const isDark = document.body.classList.contains('dark');
      if (isDark) {
        localStorage.setItem(STORAGE_KEY, 'light');
      } else {
        localStorage.setItem(STORAGE_KEY, 'dark');
      }
      loadTheme();
    }

    document.getElementById('toggleBtn').addEventListener('click', toggleTheme);
    loadTheme();
  </script>
</body>
</html>
```

**Output:** A page with a toggle button. Clicking it switches between dark and light themes. The choice is saved in localStorage, so when the user closes and reopens the browser, the theme persists.

**Explanation:** `localStorage.setItem()` stores the theme preference. `localStorage.getItem()` retrieves it on page load. The `loadTheme()` function applies the appropriate CSS class. Storage is persistent across browser restarts.

## 🚀 Example 2 - Intermediate (Shopping Cart with Cross-tab Sync)

**Problem:** Build a shopping cart that syncs across multiple tabs using the storage event.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Shopping Cart</title>
  <style>
    body { font-family: Arial; padding: 20px; }
    .product { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 8px; }
    .cart { border: 2px solid steelblue; padding: 15px; border-radius: 8px; min-height: 60px; }
    button { padding: 8px 16px; cursor: pointer; }
    .badge { background: red; color: white; border-radius: 50%;
             padding: 2px 8px; font-size: 12px; margin-left: 5px; }
  </style>
</head>
<body>
  <h1>Shopping Cart <span class="badge" id="cartCount">0</span></h1>

  <div class="cart" id="cartItems">Cart is empty</div>

  <h2>Products</h2>
  <div class="product">
    <strong>Wireless Mouse</strong> - $29.99
    <button onclick="addToCart(1, 'Wireless Mouse', 29.99)">Add to Cart</button>
  </div>
  <div class="product">
    <strong>Mechanical Keyboard</strong> - $89.99
    <button onclick="addToCart(2, 'Mechanical Keyboard', 89.99)">Add to Cart</button>
  </div>
  <div class="product">
    <strong>USB Hub</strong> - $19.99
    <button onclick="addToCart(3, 'USB Hub', 19.99)">Add to Cart</button>
  </div>

  <p><button onclick="clearCart()">Clear Cart</button></p>

  <script>
    const CART_KEY = 'shopping_cart';

    function getCart() {
      try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
      } catch {
        return [];
      }
    }

    function saveCart(cart) {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      renderCart();
    }

    function addToCart(id, name, price) {
      const cart = getCart();
      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ id, name, price, qty: 1 });
      }
      saveCart(cart);
    }

    function removeItem(id) {
      let cart = getCart();
      cart = cart.filter(item => item.id !== id);
      saveCart(cart);
    }

    function clearCart() {
      localStorage.removeItem(CART_KEY);
      renderCart();
    }

    function renderCart() {
      const cart = getCart();
      const container = document.getElementById('cartItems');
      const count = document.getElementById('cartCount');

      count.textContent = cart.reduce((sum, item) => sum + item.qty, 0);

      if (cart.length === 0) {
        container.innerHTML = 'Cart is empty';
        return;
      }

      container.innerHTML = cart.map(item =>
        `<div style="display:flex; justify-content:space-between; align-items:center; margin:5px 0;">
           <span>${item.name} x${item.qty} — $${(item.price * item.qty).toFixed(2)}</span>
           <button onclick="removeItem(${item.id})" style="background:#ff4444; color:white; border:none; border-radius:4px; padding:2px 8px;">✕</button>
         </div>`
      ).join('') +
      `<hr><strong>Total: $${cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2)}</strong>`;
    }

    // Listen for storage changes from other tabs
    window.addEventListener('storage', function(e) {
      if (e.key === CART_KEY) {
        renderCart();
      }
    });

    // Initial render
    renderCart();
  </script>
</body>
</html>
```

**Output:** A product listing with an interactive cart. Adding items updates the cart display and badge count. Opening the same page in another tab — changes in one tab are reflected in the other tab in real time.

**Explanation:** 
- `localStorage` stores the cart as a JSON array
- `JSON.stringify` serializes the cart object array; `JSON.parse` deserializes it
- The `storage` event fires in other tabs when localStorage changes, triggering `renderCart()` to re-render
- `removeItem` filters out the item; `clearCart` removes the entire key

## 🏢 Real World Use Case
**E-commerce Checkout Flow:** An online store uses `sessionStorage` to store the checkout progress (step 1: shipping, step 2: payment, step 3: review) so that refreshing the page doesn't lose the current step. `localStorage` stores the user's saved addresses and payment method preferences across sessions. The `storage` event syncs the cart count badge across open tabs. Objects are stored using `JSON.stringify`/`parse`. If the 5MB limit is approached, the app warns the user.

## 🎯 Interview Questions
1. **Q:** What are the key differences between localStorage and sessionStorage?  
   **A:** localStorage persists until explicitly deleted and is shared across all tabs/windows of the same origin. sessionStorage is cleared when the tab closes and is isolated per tab — even same-origin tabs don't share it.

2. **Q:** How do you store non-string data (objects, arrays) in Web Storage?  
   **A:** Use `JSON.stringify()` before storing and `JSON.parse()` when retrieving. Web Storage only supports strings, so serialization is required for complex data types.

3. **Q:** What is the storage event and when does it fire?  
   **A:** The `storage` event fires on other `window` objects of the same origin when localStorage changes. It does NOT fire in the tab/window that made the change. The event object has `key`, `oldValue`, `newValue`, `url`, and `storageArea` properties.

4. **Q:** What happens when you exceed the storage quota?  
   **A:** A `QuotaExceededError` (DOMException) is thrown. You should wrap `setItem` calls in try/catch blocks and handle the error gracefully (e.g., clear old data or notify the user).

5. **Q:** Can Web Storage be used across different subdomains?  
   **A:** No. Storage is per-origin (protocol + host + port). Data stored on `app.example.com` is not accessible on `admin.example.com`. For cross-subdomain storage, use cookies with `domain=example.com` or a postMessage-based solution.

## ⚠ Common Errors / Mistakes
- Forgetting to `JSON.parse()` when retrieving stored objects (getting a string instead)
- Not wrapping `JSON.parse()` in try/catch (corrupted data throws an error)
- Using `sessionStorage` when data should persist across sessions, or vice versa
- Assuming `getItem()` returns an empty string for missing keys (it returns `null`)
- Not handling `QuotaExceededError` (app silently fails to store data)
- Storing sensitive data (passwords, tokens) in localStorage (it's accessible via JavaScript and vulnerable to XSS)
- Expecting the `storage` event to fire in the same tab that made the change
- Storing too much data per key (each key-value pair has a size limit subject to the total quota)

## 📝 Practice Exercises

**Beginner:**
1. Build a simple note-taking app where users type a note into a textarea and click "Save". The note persists in localStorage across page reloads.
2. Create a page visit counter using localStorage that increments on each page load and displays "You have visited this page X times".
3. Build a form that auto-saves input fields (name, email, message) to localStorage on every keystroke, with a "Restore" button that fills them back.

**Intermediate:**
4. Build a tab-synced color picker: when a user picks a color in one tab, all other open tabs of the same page update their background to that color using the `storage` event.
5. Create a session-based form wizard with 3 steps (each step is a div). Use sessionStorage to persist the current step, form data, and validation state across page refreshes. Include "Back" and "Next" navigation.
6. Build a localStorage-backed task manager with add, delete, toggle-complete, and filter (All/Active/Completed). Use JSON serialization for the task array. Implement a "Clear Completed" button.

**Advanced:**
7. Implement a localStorage wrapper library with TTL (time-to-live) support, compression, error handling, and storage quota management. Include methods like `setWithExpiry(key, value, ttlMinutes)`, `getWithExpiry(key)`, auto-eviction of expired items, and a `quotaPercentage()` helper.
8. Build an offline-capable note editor that syncs to a remote server. Notes are stored in localStorage with sync status (pending/synced). On connectivity (navigator.onLine + online event), unsynced notes are pushed to the server via Fetch API. Handle conflicts with "last-write-wins" strategy.
