# 52. HTML Web APIs

## 📘 Introduction
Web APIs (Application Programming Interfaces) allow web applications to interact with browser features, device capabilities, and external services. They extend the functionality of JavaScript beyond simple page manipulation, enabling rich, native-like experiences in the browser.

## 🧠 Key Concepts
- **Web API**: A set of predefined functions and objects exposed by the browser or third-party services
- **Browser APIs**: Built-in APIs provided by the web browser (DOM API, Fetch API, Geolocation API, Web Storage API, Canvas API, History API)
- **Third-party APIs**: External services accessed via HTTP (Google Maps API, Twitter API, Stripe API, GitHub API)
- **Web Storage API**: `localStorage` and `sessionStorage` for client-side key-value data storage
- **Geolocation API**: Access user's geographic position via `navigator.geolocation`
- **Canvas API**: 2D drawing and graphics rendering on a `<canvas>` element
- **Fetch API**: Modern replacement for XMLHttpRequest for making HTTP requests
- **History API**: Manipulate browser session history (`pushState`, `popstate` event)
- **API Call**: Request made to a server endpoint, typically returning JSON data
- **Async/Await**: Modern JavaScript pattern for handling asynchronous API operations

## 💻 Syntax
```html
<!-- Basic HTML setup for API usage -->
<!DOCTYPE html>
<html>
<head>
  <title>Web APIs Demo</title>
</head>
<body>
  <script>
    // Fetch API - GET request
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));

    // Async/Await style
    async function getData() {
      try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  </script>
</body>
</html>
```

## ✅ Example 1 - Basic (Fetch API + Web Storage)

**Problem:** Fetch user data from a public API and cache it in localStorage to avoid repeated network requests.

```html
<!DOCTYPE html>
<html>
<head>
  <title>User Directory</title>
</head>
<body>
  <h1>User Directory</h1>
  <div id="users"></div>
  <button onclick="refreshUsers()">Refresh</button>

  <script>
    const USERS_KEY = 'cached_users';
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

    async function loadUsers() {
      const cached = localStorage.getItem(USERS_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          return displayUsers(data);
        }
      }
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        localStorage.setItem(USERS_KEY, JSON.stringify({ data: users, timestamp: Date.now() }));
        displayUsers(users);
      } catch (error) {
        document.getElementById('users').innerHTML = 'Failed to load users.';
      }
    }

    function displayUsers(users) {
      document.getElementById('users').innerHTML = users.map(u =>
        `<p><strong>${u.name}</strong> — ${u.email}</p>`
      ).join('');
    }

    function refreshUsers() {
      localStorage.removeItem(USERS_KEY);
      loadUsers();
    }

    loadUsers();
  </script>
</body>
</html>
```

**Output:** A page displaying a list of user names and emails, cached locally for 5 minutes. Clicking "Refresh" clears the cache and re-fetches.

**Explanation:** The Fetch API retrieves data from JSONPlaceholder. The response is converted to JSON and stored in localStorage with a timestamp. On subsequent loads, cached data is used if still fresh, reducing API calls.

## 🚀 Example 2 - Intermediate (Multiple APIs: Canvas + History + Fetch)

**Problem:** Build a single-page image gallery with Canvas-based color extraction and browser history navigation.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Canvas Gallery</title>
</head>
<body>
  <h1>Image Gallery</h1>
  <div id="gallery"></div>
  <canvas id="colorCanvas" width="300" height="50"></canvas>
  <p id="colorInfo"></p>

  <script>
    const images = [
      { id: 1, url: 'https://picsum.photos/id/1/400/300', title: 'Image 1' },
      { id: 2, url: 'https://picsum.photos/id/10/400/300', title: 'Image 2' },
      { id: 3, url: 'https://picsum.photos/id/100/400/300', title: 'Image 3' }
    ];

    function renderGallery() {
      const gallery = document.getElementById('gallery');
      gallery.innerHTML = images.map(img =>
        `<div style="display:inline-block; margin:10px; cursor:pointer;">
           <img src="${img.url}" alt="${img.title}" 
                onclick="viewImage(${img.id}, '${img.url}')" 
                width="200" height="150" style="object-fit:cover;">
           <p>${img.title}</p>
         </div>`
      ).join('');
    }

    function viewImage(id, url) {
      // Update History API
      history.pushState({ id, url }, `Image ${id}`, `?image=${id}`);

      // Load image onto canvas for color analysis
      const canvas = document.getElementById('colorCanvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = function() {
        ctx.drawImage(img, 0, 0, 300, 50);
        const imageData = ctx.getImageData(0, 0, 300, 50);
        const pixels = imageData.data;
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < pixels.length; i += 4) {
          r += pixels[i]; g += pixels[i+1]; b += pixels[i+2]; count++;
        }
        const avgColor = `rgb(${Math.round(r/count)},${Math.round(g/count)},${Math.round(b/count)})`;
        document.getElementById('colorInfo').textContent = `Average Color: ${avgColor}`;
        document.getElementById('colorInfo').style.color = avgColor;
      };
      img.src = url;
    }

    // Handle browser back/forward
    window.addEventListener('popstate', function(event) {
      if (event.state) {
        viewImage(event.state.id, event.state.url);
      } else {
        renderGallery();
        document.getElementById('colorInfo').textContent = '';
      }
    });

    renderGallery();
  </script>
</body>
</html>
```

**Output:** A gallery where clicking an image loads it into a canvas for color analysis, updates the URL via History API, and supports browser back/forward navigation.

**Explanation:** 
- **Canvas API**: Draws the selected image onto a canvas and samples pixel data to compute the average color
- **History API**: `pushState` updates the URL without page reload; `popstate` handles back/forward buttons
- **Fetch API** (not used here but available): Could be added to load more images dynamically

## 🏢 Real World Use Case
**E-commerce Dashboard:** A product management dashboard uses: **Fetch API** to sync inventory data with backend APIs, **Web Storage API** to cache user preferences and cart state, **Canvas API** to generate product image thumbnails and charts, **History API** to enable back/forward navigation across filter states, and **Geolocation API** to show nearby warehouses for shipping calculations.

## 🎯 Interview Questions
1. **Q:** What is the difference between Browser APIs and Third-party APIs?  
   **A:** Browser APIs are built into the browser (e.g., Fetch, DOM, Geolocation) and require no external libraries. Third-party APIs are hosted on external servers and accessed via HTTP requests (e.g., Google Maps, Twitter).

2. **Q:** How does the Fetch API differ from XMLHttpRequest?  
   **A:** Fetch uses Promises, is simpler to chain, supports async/await, handles JSON natively with `.json()`, and has a cleaner syntax. XMLHttpRequest is older, callback-based, and more verbose.

3. **Q:** What is CORS and how does it affect Web API calls?  
   **A:** CORS (Cross-Origin Resource Sharing) is a security policy that restricts API calls from a different origin. Servers must include appropriate CORS headers (`Access-Control-Allow-Origin`) for cross-origin requests to succeed.

4. **Q:** Explain the `popstate` event and how it relates to the History API.  
   **A:** `popstate` fires when the user clicks back/forward or when `history.back()`/`history.forward()` is called. It provides the state object pushed via `pushState`, enabling SPA navigation.

5. **Q:** What happens when a Canvas API context is obtained with `getContext('2d')`?  
   **A:** It returns a `CanvasRenderingContext2D` object that provides methods and properties for drawing shapes, text, images, and manipulating pixels on the canvas element.

## ⚠ Common Errors / Mistakes
- Forgetting to call `response.json()` after `fetch()` (response body isn't parsed automatically)
- Not handling network errors with `.catch()` or try/catch blocks
- Calling Canvas API methods before the image is fully loaded (use `img.onload`)
- Exceeding localStorage quota (5-10 MB depending on browser) without handling the QuotaExceededError
- Not considering CORS when making API requests to different domains
- Calling `history.pushState` without handling `popstate`, breaking back button
- Using synchronous `XMLHttpRequest` instead of Fetch API (blocks the main thread)

## 📝 Practice Exercises

**Beginner:**
1. Use the Fetch API to load data from `https://jsonplaceholder.typicode.com/posts/1` and display the title and body on the page.
2. Use localStorage to save a user's name and display a greeting message when they return (`localStorage.getItem('name')`).
3. Draw a simple red rectangle on a `<canvas>` element using `fillStyle` and `fillRect`.

**Intermediate:**
4. Build a currency converter that fetches live exchange rates from `https://api.exchangerate-api.com/v4/latest/USD`, caches the result for 30 minutes in localStorage, and converts user-input amounts.
5. Create a single-page navigation system using History API that shows/hides sections based on the URL hash without page reloads. Include at least 3 pages with proper back/forward support.
6. Build a Canvas-based drawing app with a color picker, brush size slider, and clear button. Use Fetch API to save drawings as base64 data to localStorage.

**Advanced:**
7. Implement a dashboard that combines Fetch API (real-time data), Canvas API (chart rendering), Web Storage (dashboard state persistence), and History API (filter state navigation). Include retry logic for failed API calls with exponential backoff.
8. Build a progressive web app (PWA) feature that uses the Cache API (a Browser API) to intercept Fetch requests, serve cached content offline, and sync data when connectivity is restored.
