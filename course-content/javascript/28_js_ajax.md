## 28. JS AJAX
## 📘 Introduction
AJAX (Asynchronous JavaScript and XML) enables web pages to request data from a server and update the UI without a full page reload. Modern JavaScript uses the **`fetch` API** (Promise-based) over the older `XMLHttpRequest`. This topic covers both GET/POST requests, JSON handling, error handling, and request cancellation.

## 🧠 Key Concepts
- **`XMLHttpRequest` (XHR)** — legacy API, callback-based, verbose
- **`fetch(url, options)`** — modern, Promise-based API for HTTP requests
- **HTTP Methods**: `GET` (retrieve), `POST` (create), `PUT` (update), `DELETE` (remove), `PATCH` (partial update)
- **Request headers**: `Content-Type`, `Authorization`, `Accept`, etc.
- **Response handling**: `res.json()`, `res.text()`, `res.blob()`, `res.status`, `res.ok`
- **Error handling**: `fetch` only rejects on network errors (not HTTP 4xx/5xx) — check `res.ok`
- **JSON parsing**: `JSON.parse` / `res.json()` (automatically parses)
- **`AbortController`** — cancels an in-flight fetch request
- **async/await with fetch** — clean, readable syntax

## 💻 Syntax
```javascript
// GET
fetch('https://api.example.com/users')
  .then(res => res.json())
  .then(data => console.log(data));

// POST
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice' })
});

// Async/Await
async function getData() {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```

## ✅ Example 1 - Basic (Fetch GET with Async/Await)
**Problem:** Fetch user data from JSONPlaceholder and log names.

**Code:**
```javascript
async function fetchUsers() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const users = await res.json();
    users.forEach(u => console.log(u.name));
  } catch (err) {
    console.error('Failed to fetch users:', err.message);
  }
}

fetchUsers();
```

**Output:**
```
Leanne Graham
Ervin Howell
Clementine Bauch
Patricia Lebsack
Chelsey Dietrich
Mrs. Dennis Schulist
Kurtis Weissnat
Nicholas Runolfsdottir V
Glenna Reichert
Clementina DuBuque
```

**Explanation:** `fetch` makes the GET request. `res.ok` is `false` for 4xx/5xx — checked manually. `res.json()` parses the JSON body. Errors are caught and logged.

## 🚀 Example 2 - Intermediate (POST with AbortController)
**Problem:** Submit a new post and cancel the request if it takes too long.

**Code:**
```javascript
async function createPost(data, timeoutMs = 3000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const result = await res.json();
    console.log('Created:', result);
    return result;
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('Request timed out');
    } else {
      console.error('Request failed:', err.message);
    }
  } finally {
    clearTimeout(timeout);
  }
}

createPost({ title: 'Hello', body: 'World', userId: 1 });
```

**Output:**
```
Created: { title: 'Hello', body: 'World', userId: 1, id: 101 }
```

**Explanation:** `AbortController` provides a `signal` passed to `fetch`. Calling `controller.abort()` rejects the promise with `AbortError`. The timeout cleanup happens in `finally`.

## 🏢 Real World Use Case
A React dashboard that fetches user analytics on page load: `useEffect` with `fetch` and `AbortController` for cleanup, `res.ok` checks, loading spinners, and retry logic. POST requests for form submissions with `Content-Type: application/json`. File uploads use `FormData` as the body.

## 🎯 Interview Questions
1. **What is the difference between `XMLHttpRequest` and `fetch`?** — `fetch` is Promise-based, simpler API, streams responses, built-in request/response objects. XHR is callback-based, more verbose, supports progress events.
2. **Does `fetch` reject on HTTP errors like 404 or 500?** — No. `fetch` only rejects on network errors (DNS failure, no connection). HTTP errors (4xx/5xx) are resolved — check `res.ok` or `res.status`.
3. **How do you cancel a fetch request?** — Use `AbortController` — create a controller, pass `signal` to fetch options, call `controller.abort()` to cancel.
4. **How do you send JSON in a POST request?** — Set `Content-Type: application/json` header and `body: JSON.stringify(data)`.
5. **What does `res.json()` return?** — A Promise that resolves to the parsed JavaScript object/array from the JSON response body.

## ⚠ Common Errors / Mistakes
- Forgetting to `await` or `.then()` on `res.json()` — gets a pending Promise
- Not checking `res.ok` — treating 404/500 as successful responses
- Using `JSON.parse` on a response that already called `.json()` — double-parsing
- Not catching network errors — unhandled Promise rejections
- Forgetting to stringify the body for POST requests (sends `[object Object]`)

## 📝 Practice Exercises
**Beginner**
1. Use `fetch` with async/await to GET data from `https://jsonplaceholder.typicode.com/todos/1` and log the result.
2. Make a POST request to `https://jsonplaceholder.typicode.com/posts` with a new post object and log the response.
3. Handle a 404 error gracefully — fetch a non-existent resource and log "Not found" instead of crashing.

**Intermediate**
4. Implement a `fetchJSON` utility that wraps `fetch` with automatic JSON parsing, `res.ok` check, and typed error class (`HttpError`).
5. Build a function `fetchWithRetry(url, options, maxRetries)` that retries on network errors with exponential backoff.
6. Create a `fetchTimeout(url, ms)` that rejects if the response doesn't arrive within N milliseconds.

**Advanced**
7. Implement a simple REST client class with methods `.get()`, `.post()`, `.put()`, `.delete()`, base URL, custom headers, and request/response interceptors.
8. Build a "sequential fetch queue" that processes an array of URLs one at a time with concurrency of 3, reports progress, and supports pause/resume.
