# 56. HTML Web Workers

## 📘 Introduction
Web Workers allow JavaScript to run in background threads, separate from the main UI thread. This enables computationally intensive tasks (image processing, data parsing, encryption) to execute without blocking the user interface, keeping the page responsive. Workers communicate with the main thread via message passing.

## 🧠 Key Concepts
- **Web Worker**: A JavaScript script running in a background thread, isolated from the main thread
- **Dedicated Worker**: A worker tied to a single script/page; created with `new Worker('script.js')`
- **Worker Constructor**: `new Worker(filename)` — initiates a new worker thread
- **postMessage()**: Sends data from main thread to worker (or vice versa); data is copied (structured clone), not shared
- **onmessage**: Event handler receiving messages from the other thread
- **Worker Scope**: Workers have no access to DOM, `window`, `document`, `parent`; they have `self`, `importScripts()`, `setTimeout`, `fetch`, `XMLHttpRequest`, `IndexedDB`, `navigator`
- **Shared Worker**: Accessible from multiple scripts, tabs, or iframes (same origin); created with `new SharedWorker('script.js')`
- **terminate()**: Stops a worker from the main thread; `self.close()` stops from within the worker
- **importScripts()**: Loads external scripts into the worker scope (synchronous)

## 💻 Syntax
```html
<!DOCTYPE html>
<html>
<head>
  <title>Web Worker Demo</title>
</head>
<body>
  <h1>Fibonacci Calculator</h1>
  <p id="result"></p>

  <script>
    // Main thread
    const worker = new Worker('worker.js');

    worker.postMessage(40); // Send number to worker

    worker.onmessage = function(e) {
      document.getElementById('result').textContent = `Result: ${e.data}`;
    };

    worker.onerror = function(e) {
      console.error('Worker error:', e.message);
    };
  </script>
</body>
</html>
```
**worker.js** (separate file):
```javascript
// Worker thread
self.onmessage = function(e) {
  const n = e.data;
  function fib(x) {
    if (x <= 1) return x;
    return fib(x - 1) + fib(x - 2);
  }
  self.postMessage(fib(n));
};
```

## ✅ Example 1 - Basic (Prime Number Calculation)

**Problem:** Find all prime numbers up to 100,000 without freezing the browser UI.

**primes.html:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Prime Number Finder</title>
</head>
<body>
  <h1>Prime Number Finder</h1>
  <button onclick="startCalculation()">Find Primes up to 100,000</button>
  <button onclick="cancelCalculation()">Cancel</button>
  <p id="status">Ready</p>
  <p id="result"></p>

  <script>
    let worker = null;

    function startCalculation() {
      document.getElementById('status').textContent = 'Calculating...';
      document.getElementById('result').textContent = '';

      worker = new Worker('primes-worker.js');
      worker.postMessage({ limit: 100000, type: 'primes' });

      worker.onmessage = function(e) {
        if (e.data.type === 'progress') {
          document.getElementById('status').textContent =
            `Progress: ${e.data.percent}%`;
        } else if (e.data.type === 'result') {
          document.getElementById('result').textContent =
            `Found ${e.data.count} primes. Largest: ${e.data.largest}`;
          document.getElementById('status').textContent = 'Done!';
        }
      };

      worker.onerror = function(err) {
        document.getElementById('status').textContent =
          `Error: ${err.message}`;
      };
    }

    function cancelCalculation() {
      if (worker) {
        worker.terminate();
        worker = null;
        document.getElementById('status').textContent = 'Cancelled';
        document.getElementById('result').textContent = '';
      }
    }
  </script>
</body>
</html>
```

**primes-worker.js:**
```javascript
self.onmessage = function(e) {
  const { limit } = e.data;
  const primes = [];
  const total = limit - 2;
  let checked = 0;

  for (let i = 2; i <= limit; i++) {
    let isPrime = true;
    for (let j = 2; j <= Math.sqrt(i); j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(i);
    checked++;
    if (checked % 5000 === 0) {
      self.postMessage({
        type: 'progress',
        percent: Math.round((checked / total) * 100)
      });
    }
  }

  self.postMessage({
    type: 'result',
    count: primes.length,
    largest: primes[primes.length - 1]
  });
};
```

**Output:** Clicking "Find Primes" starts the calculation. The progress updates without the page freezing. The result shows the count and largest prime found. "Cancel" terminates the worker.

**Explanation:** The worker runs the CPU-intensive loop in a background thread. Progress messages are periodically sent back via `postMessage`. `worker.terminate()` stops execution immediately. The main thread remains fully responsive throughout.

## 🚀 Example 2 - Intermediate (Image Processing with Web Workers)

**Problem:** Apply a grayscale filter to a user-selected image without blocking the UI.

**image-processor.html:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Image Processor</title>
</head>
<body>
  <h1>Image to Grayscale</h1>
  <input type="file" id="fileInput" accept="image/*">
  <canvas id="original" width="400" height="300"></canvas>
  <canvas id="processed" width="400" height="300"></canvas>
  <p id="status">Select an image</p>

  <script>
    const fileInput = document.getElementById('fileInput');
    const original = document.getElementById('original');
    const processed = document.getElementById('processed');
    const status = document.getElementById('status');

    let worker = null;

    fileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(ev) {
        const img = new Image();
        img.onload = function() {
          original.getContext('2d').drawImage(img, 0, 0, 400, 300);
          processImage(original);
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });

    function processImage(canvas) {
      status.textContent = 'Processing...';

      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      worker = new Worker('grayscale-worker.js');
      worker.postMessage({ imageData: imageData.data, width: canvas.width, height: canvas.height });

      worker.onmessage = function(e) {
        const { data } = e.data;
        const processedImageData = new ImageData(
          new Uint8ClampedArray(data),
          canvas.width,
          canvas.height
        );
        processed.getContext('2d').putImageData(processedImageData, 0, 0);
        status.textContent = 'Done! Grayscale applied.';
        worker.terminate();
      };

      worker.onerror = function(err) {
        status.textContent = `Error: ${err.message}`;
      };
    }
  </script>
</body>
</html>
```

**grayscale-worker.js:**
```javascript
self.onmessage = function(e) {
  const { imageData, width, height } = e.data;
  const pixels = new Uint8ClampedArray(imageData);

  for (let i = 0; i < pixels.length; i += 4) {
    const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
    pixels[i] = avg;     // Red
    pixels[i + 1] = avg; // Green
    pixels[i + 2] = avg; // Blue
    // Alpha (i+3) remains unchanged
  }

  self.postMessage({ data: pixels.buffer }, [pixels.buffer]);
};
```

**Output:** The user selects an image, which is displayed in the "original" canvas. The worker processes the pixel data to produce a grayscale version displayed in the "processed" canvas. The UI remains responsive during processing.

**Explanation:** 
- `getImageData()` extracts raw pixel data from the source canvas
- The pixel array (Uint8ClampedArray) is sent to the worker via `postMessage` using transferable objects for zero-copy transfer
- The worker iterates over RGBA values, averaging RGB channels to create grayscale
- The processed buffer is transferred back and applied via `putImageData()`
- Transferable objects (`[pixels.buffer]`) avoid expensive data cloning

## 🏢 Real World Use Case
**Real-time Code Editor (like CodePen/JSFiddle):** A web-based code editor uses Web Workers to run user-submitted JavaScript code in an isolated background thread. This prevents infinite loops or heavy computations from freezing the editor UI. The worker communicates results and errors back via `postMessage`. `worker.terminate()` is called if the user stops execution. A shared worker could synchronize state across multiple editor tabs.

## 🎯 Interview Questions
1. **Q:** What are the limitations of Web Workers compared to the main thread?  
   **A:** Workers cannot access the DOM, `window`, `document`, `parent`, or `localStorage`. They can use `fetch`, `XMLHttpRequest`, `IndexedDB`, `setTimeout`, `importScripts`, and the `navigator` object.

2. **Q:** How does data transfer between the main thread and a worker work?  
   **A:** Data is copied via the structured clone algorithm. Both `postMessage` calls create a deep copy. For large data, use transferable objects (e.g., `ArrayBuffer`) by passing them in the transfer list: `postMessage(data, [transferable])` — this transfers ownership with zero-copy.

3. **Q:** What is the difference between Dedicated Workers and Shared Workers?  
   **A:** Dedicated Workers are linked to a single script/page. Shared Workers are accessible by multiple scripts, tabs, or iframes from the same origin. Shared Workers use `port` for communication (`port.postMessage`, `port.start()`).

4. **Q:** How can a worker load external scripts?  
   **A:** Use `importScripts('script1.js', 'script2.js')` inside the worker. This synchronously loads and executes scripts in the worker's global scope.

5. **Q:** How do you handle errors in Web Workers?  
   **A:** The main thread can listen to `worker.onerror` for unhandled errors. Inside the worker, use try/catch and `self.postMessage({ error: message })` to send errors back. `worker.onmessageerror` handles deserialization failures.

## ⚠ Common Errors / Mistakes
- Trying to access `document`, `window`, or DOM elements inside a worker (causes ReferenceError)
- Forgetting that workers must be served via HTTP(S) — `file://` protocol fails in many browsers
- Sending functions or DOM nodes via `postMessage` (structured clone doesn't support them)
- Not terminating workers when they're no longer needed (memory leaks)
- Using `importScripts` inside conditional blocks or after `postMessage` (it's synchronous and blocks)
- Assuming `onmessage` can return data synchronously (must use `postMessage`)
- Creating too many workers without limits (each worker consumes system resources)

## 📝 Practice Exercises

**Beginner:**
1. Create a worker that receives a number `n` and returns the sum of numbers from 1 to `n`. Call it from a simple HTML page with an input and button.
2. Build a page with a counter button that increments every 500ms (using `setInterval`), while a worker in the background calculates the 30th Fibonacci number and displays the result.
3. Create a worker that uses `importScripts` to load a math utility library, then performs a basic calculation (e.g., factorial) using that library.

**Intermediate:**
4. Build a Mandelbrot set renderer that uses a Web Worker to compute fractal pixel values. Divide the image into horizontal strips and send each strip to a separate worker. Display a progress bar as strips complete.
5. Create a CSV parser worker: accept a large CSV string, parse it row by row in the worker, and send back structured JSON objects. Include a progress indicator and cancel button using `worker.terminate()`.
6. Build a shared worker that synchronizes a counter across multiple tabs: increment in one tab, see the updated count in all other open tabs instantly.

**Advanced:**
7. Implement a parallel image filter pipeline: upload an image, and use 4 workers simultaneously to apply different filters (grayscale, sepia, blur, invert) to the same image. Display all 4 results side by side. Use transferable objects for efficient pixel data transfer.
8. Build a Web Worker-based reactive data processing pipeline: create a system where data flows through a chain of workers (fetch → parse → transform → aggregate → render). Each step is a dedicated worker. Implement backpressure handling, error propagation through the chain, and a dashboard showing each worker's throughput.
