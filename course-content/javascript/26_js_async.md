## 26. JS Asynchronous
## 📘 Introduction
JavaScript is single-threaded but non-blocking. Asynchronous programming allows long-running operations (file I/O, network requests, timers) to execute without freezing the main thread. The progression from callbacks → Promises → async/await makes async code easier to read and maintain.

## 🧠 Key Concepts
- **Callbacks** — function passed as argument; runs after async operation (leads to "callback hell")
- **Timers** — `setTimeout(fn, ms)`, `setInterval(fn, ms)`, `clearTimeout`, `clearInterval`
- **Promises** — object representing eventual completion/failure:
  - `new Promise((resolve, reject) => ...)`
  - `.then(onFulfilled, onRejected)`
  - `.catch(onRejected)` — error handling
  - `.finally(onFinally)` — cleanup
  - **States**: pending → fulfilled | rejected
- **async/await** — syntactic sugar over Promises:
  - `async function` returns a Promise
  - `await promise` pauses execution until settled
  - `try/catch` for error handling
- **Promise combinators**:
  - `Promise.all([...])` — await all, fails fast on any rejection
  - `Promise.race([...])` — resolves/rejects with first settled
  - `Promise.allSettled([...])` — awaits all, never rejects, returns `{status, value/reason}`
  - `Promise.any([...])` — resolves with first fulfilled, rejects only if all reject

## 💻 Syntax
```javascript
// Callback
setTimeout(() => console.log('Done'), 1000);

// Promise
fetch('/api')
  .then(res => res.json())
  .catch(err => console.error(err))
  .finally(() => hideSpinner());

// Async/Await
async function loadData() {
  try {
    const res = await fetch('/api');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
```

## ✅ Example 1 - Basic (Callback → Promise → Async/Await Evolution)
**Problem:** Simulate fetching user data — show the progression from callback to async/await.

**Code:**
```javascript
function fetchUserCallback(id, cb) {
  setTimeout(() => cb({ id, name: 'Alice' }), 100);
}

function fetchUserPromise(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, name: 'Alice' }), 100);
  });
}

// Callback
fetchUserCallback(1, user => console.log('Callback:', user.name));

// Promise
fetchUserPromise(2).then(user => console.log('Promise:', user.name));

// Async/Await
async function showUser() {
  const user = await fetchUserPromise(3);
  console.log('Async/Await:', user.name);
}
showUser();
```

**Output:**
```
Callback: Alice
Promise: Alice
Async/Await: Alice
```

**Explanation:** The callback version passes a handler. The Promise version returns a Promise that resolves after 100ms. The async/await version `await`s it, looking synchronous while remaining non-blocking.

## 🚀 Example 2 - Intermediate (Promise.all + Error Handling)
**Problem:** Fetch data from 3 APIs in parallel and handle failure gracefully.

**Code:**
```javascript
async function loadDashboard() {
  const urls = [
    'https://api.example.com/users',
    'https://api.example.com/orders',
    'https://api.example.com/products'
  ];

  try {
    const results = await Promise.all(
      urls.map(url => fetch(url).then(r => r.json()))
    );
    const [users, orders, products] = results;
    console.log('Users:', users.length);
    console.log('Orders:', orders.length);
    console.log('Products:', products.length);
  } catch (err) {
    console.error('Dashboard load failed:', err.message);
  }
}

loadDashboard();
```

**Output (if successful):**
```
Users: 25
Orders: 142
Products: 37
```

**Output (if one fails):**
```
Dashboard load failed: Failed to fetch
```

**Explanation:** `Promise.all` starts all fetches concurrently. If **any** fails, the whole operation rejects immediately (fail-fast). The `catch` block handles the error. `Promise.allSettled` would be better if you want partial results.

## 🏢 Real World Use Case
An e-commerce checkout flow: validate cart (async), charge payment (async), update inventory (async), send confirmation email (async). Using `async/await` with `Promise.allSettled` for independent tasks and `await` in sequence for dependent steps. `setTimeout` for retry backoff, `clearTimeout` to cancel idle timeout.

## 🎯 Interview Questions
1. **What is the Event Loop?** — The mechanism that executes code, collects events, and processes queued microtasks (Promise `.then`) before rendering tasks (callbacks). It enables non-blocking I/O despite single-threaded JS.
2. **What is the difference between `Promise.all` and `Promise.allSettled`?** — `Promise.all` rejects immediately if any promise rejects (fail-fast). `Promise.allSettled` waits for all to settle and returns `[{status, value/reason}]`, never rejecting.
3. **Can you use `await` outside an `async` function?** — No, unless you're at the top level of a module (top-level await in ES2022+).
4. **What happens if you `await` a non-Promise value?** — It wraps the value in `Promise.resolve(val)`. No delay; it just passes through.
5. **How do you handle errors in async/await?** — Use `try/catch` blocks. Rejected Promises inside `async` functions throw, which `catch` (or a chained `.catch()`) can handle.

## ⚠ Common Errors / Mistakes
- Forgetting to `await` inside an `async` function — returns a Promise instead of the value
- Using `Promise.all` where `allSettled` is needed (failing fast when partial success is acceptable)
- Swallowing errors — using `try` without `catch`, or catching but not logging/re-throwing
- Mixing sync and async patterns (e.g. `forEach` with async callbacks — use `for...of` or `Promise.all`)
- Callback hell — deeply nested callbacks that are hard to read and maintain

## 📝 Practice Exercises
**Beginner**
1. Use `setTimeout` to log "Hello" after 2 seconds and "World" after 3 seconds.
2. Convert the following callback-based `readFile` to return a Promise: `readFile('path', (err, data) => {})`.
3. Write an async function `getUser(id)` that fetches from `https://jsonplaceholder.typicode.com/users/${id}` and logs the name.

**Intermediate**
4. Use `Promise.all` to fetch users 1, 2, and 3 from JSONPlaceholder in parallel and log all names.
5. Implement a `retry(fn, retries)` function that retries an async operation up to N times with a delay between attempts.
6. Write a function `timeout(fn, ms)` that rejects if the async function doesn't complete within `ms` milliseconds (use `Promise.race`).

**Advanced**
7. Implement a simple async `Mutex` (mutual exclusion) using Promises — only one async function can access a critical section at a time.
8. Build a `Queue` class that processes async tasks sequentially with concurrency control (max N parallel tasks) and events for `complete`, `drain`, and `error`.
