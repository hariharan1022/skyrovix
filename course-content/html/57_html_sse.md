# 57. HTML SSE (Server-Sent Events)

## 📘 Introduction
Server-Sent Events (SSE) allow web servers to push real-time updates to the browser over a single HTTP connection. Unlike WebSockets (full-duplex, bidirectional), SSE is unidirectional — the server sends data to the client only. SSE is ideal for live feeds, notifications, stock tickers, and any scenario requiring server-to-client streaming over standard HTTP.

## 🧠 Key Concepts
- **EventSource API**: JavaScript interface for receiving SSE; `new EventSource(url)` opens a persistent connection
- **Server Event Stream Format**: Text-based protocol with `Content-Type: text/event-stream`; each event is a series of field lines followed by blank lines
- **onmessage**: Fires when the server sends a message with no specified `event` field (default "message" event)
- **onerror**: Fires when the connection fails, including network errors and server errors
- **Auto-reconnection**: The browser automatically attempts to reconnect after a connection loss; the server can control delay via `retry` field
- **Event Fields**:
  - `data:` — The message payload (multiple `data:` lines are concatenated with newlines)
  - `event:` — Custom event type (triggers addEventListener on the client)
  - `id:` — Last event ID; sent on reconnection via `Last-Event-ID` header for resuming
  - `retry:` — Reconnection delay in milliseconds
- **VS WebSockets**: SSE is simpler, unidirectional, works over standard HTTP/2, has automatic reconnection, but cannot send data from client to server (use regular fetch/XHR for that)

## 💻 Syntax
```javascript
// Client-side (JavaScript)
const eventSource = new EventSource('/events');

// Listen for unnamed (default) messages
eventSource.onmessage = function(e) {
  console.log('Message:', e.data);
};

// Listen for named events
eventSource.addEventListener('update', function(e) {
  console.log('Update:', e.data);
});

// Error handling
eventSource.onerror = function(e) {
  console.error('SSE error:', e);
};

// Close connection
eventSource.close();
```

```
// Server-side event stream format (text/event-stream)
data: Hello, world!\n\n

data: {"message": "live update"}\n\n

event: update\ndata: New version available\n\n

id: 42\ndata: Event with ID\n\n

retry: 5000\ndata: Set reconnection delay to 5s\n\n

event: custom\ndata: Line 1\ndata: Line 2\n\n
```

## ✅ Example 1 - Basic (Live Clock from Server)

**Problem:** Display a live server-sent clock that updates every second without polling.

**server.php (simple SSE endpoint):**
```php
<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');

while (true) {
  $time = date('H:i:s');
  echo "data: {\"time\": \"$time\"}\n\n";
  ob_flush();
  flush();
  sleep(1);
}
?>
```

**client.html:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>SSE Live Clock</title>
</head>
<body>
  <h1>Live Server Clock</h1>
  <p>Server time: <strong id="clock">Waiting...</strong></p>
  <p id="status">Connecting...</p>
  <button onclick="closeConnection()">Disconnect</button>

  <script>
    let eventSource = null;

    function connectSSE() {
      eventSource = new EventSource('server.php');
      document.getElementById('status').textContent = 'Connected';

      eventSource.onmessage = function(e) {
        const data = JSON.parse(e.data);
        document.getElementById('clock').textContent = data.time;
      };

      eventSource.onerror = function(e) {
        document.getElementById('status').textContent =
          'Connection error. Reconnecting...';
        if (eventSource.readyState === EventSource.CLOSED) {
          document.getElementById('status').textContent = 'Disconnected';
        }
      };
    }

    function closeConnection() {
      if (eventSource) {
        eventSource.close();
        document.getElementById('status').textContent = 'Disconnected';
      }
    }

    connectSSE();
  </script>
</body>
</html>
```

**Output:** The page displays the server's current time, updating every second automatically. The connection status shows "Connected" or "Disconnected". The browser auto-reconnects if the connection drops.

**Explanation:** `EventSource` opens a persistent HTTP connection. The server sends `data:` lines at 1-second intervals. `onmessage` parses the JSON payload and updates the clock. The browser automatically reconnects on error with no additional code needed.

## 🚀 Example 2 - Intermediate (Multi-Event Stock Ticker)

**Problem:** Build a live stock ticker that handles multiple event types (price update, news alert, market status change).

**server.php:**
```php
<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$stocks = [
  ['symbol' => 'AAPL', 'price' => 175.30],
  ['symbol' => 'GOOGL', 'price' => 140.50],
  ['symbol' => 'MSFT', 'price' => 378.20]
];

$eventId = 0;

while (true) {
  $eventId++;
  $index = array_rand($stocks);
  $stock = $stocks[$index];
  $change = round((rand(-200, 200) / 100), 2);
  $stock['price'] = round($stock['price'] + $change, 2);
  $stocks[$index]['price'] = $stock['price'];

  // Send price update
  echo "id: $eventId\n";
  echo "event: price\n";
  echo "data: " . json_encode($stock) . "\n\n";

  // Random news alert (every ~10th event)
  if ($eventId % 10 === 0) {
    echo "event: news\n";
    echo "data: " . json_encode([
      'symbol' => $stock['symbol'],
      'headline' => $stock['symbol'] . ' announces record quarterly earnings'
    ]) . "\n\n";
  }

  // Market status change (every ~30th event)
  if ($eventId % 30 === 0) {
    $status = $eventId % 60 === 0 ? 'closed' : 'open';
    echo "event: market\n";
    echo "data: {\"status\": \"$status\"}\n\n";
  }

  ob_flush();
  flush();
  sleep(2);
}
?>
```

**client.html:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Live Stock Ticker</title>
  <style>
    body { font-family: Arial; padding: 20px; }
    .ticker { display: flex; gap: 20px; margin: 20px 0; }
    .stock { padding: 15px; border: 1px solid #ddd; border-radius: 8px; min-width: 120px; }
    .stock.up { border-left: 4px solid green; }
    .stock.down { border-left: 4px solid red; }
    #news { margin-top: 20px; padding: 10px; background: #fff3cd; border-radius: 8px; }
    #marketStatus { font-weight: bold; }
    .connected { color: green; }
    .disconnected { color: red; }
  </style>
</head>
<body>
  <h1>📈 Live Stock Ticker</h1>
  <p>Market: <span id="marketStatus" class="connected">Open</span></p>
  <div class="ticker" id="ticker"></div>
  <div id="news"><em>No news alerts</em></div>

  <script>
    const eventSource = new EventSource('server.php');
    const stocksContainer = document.getElementById('ticker');
    const newsContainer = document.getElementById('news');
    const marketStatus = document.getElementById('marketStatus');

    // Initialize ticker display
    const stockElements = {};
    ['AAPL', 'GOOGL', 'MSFT'].forEach(sym => {
      const el = document.createElement('div');
      el.className = 'stock';
      el.id = sym;
      el.innerHTML = `<strong>${sym}</strong><br><span id="${sym}-price">--</span>`;
      stocksContainer.appendChild(el);
      stockElements[sym] = el;
    });

    // Handle price updates
    eventSource.addEventListener('price', function(e) {
      const { symbol, price } = JSON.parse(e.data);
      const el = document.getElementById(symbol);
      const priceSpan = document.getElementById(`${symbol}-price`);
      const oldPrice = parseFloat(priceSpan.textContent) || price;
      priceSpan.textContent = `$${price.toFixed(2)}`;
      el.className = `stock ${price >= oldPrice ? 'up' : 'down'}`;
    });

    // Handle news alerts
    eventSource.addEventListener('news', function(e) {
      const { symbol, headline } = JSON.parse(e.data);
      newsContainer.innerHTML =
        `<strong>${symbol}:</strong> ${headline}`;
      newsContainer.style.background = '#fff3cd';
      setTimeout(() => {
        newsContainer.style.background = 'none';
      }, 5000);
    });

    // Handle market status
    eventSource.addEventListener('market', function(e) {
      const { status } = JSON.parse(e.data);
      marketStatus.textContent = status === 'open' ? 'Open' : 'Closed';
      marketStatus.className = status === 'open' ? 'connected' : 'disconnected';
    });

    // Connection error
    eventSource.onerror = function() {
      marketStatus.textContent = 'Reconnecting...';
      marketStatus.className = 'disconnected';
    };
  </script>
</body>
</html>
```

**Output:** Three stock cards (AAPL, GOOGL, MSFT) update in real time with green/red borders indicating price direction. Sporadic news alerts appear at the bottom. Market status indicator changes between Open (green) and Closed (red).

**Explanation:** 
- The server uses `event:` field to name different event types: `price`, `news`, `market`
- The client uses `eventSource.addEventListener('price', ...)` for typed events
- `id:` field enables automatic resumption — if the connection drops, the browser sends `Last-Event-ID` header so the server can replay missed events
- `onerror` handles disconnection; the browser auto-reconnects per the `retry` field (defaults to a few seconds)

## 🏢 Real World Use Case
**Live Sports Score Dashboard:** A sports website uses SSE to push real-time match scores, player statistics, and game events to viewers. The server sends typed events: `goal` (with scorer, assist, minute), `card` (player, card type), `substitution` (player in/out), `halftime` (score update). The `id` field allows the client to resume missed events after a network interruption. A separate `chat` connection uses WebSocket for bidirectional commentary interaction — combining SSE (server push) with WebSocket (bidirectional) is a common pattern.

## 🎯 Interview Questions
1. **Q:** How do SSE and WebSockets differ?  
   **A:** SSE is unidirectional (server to client), uses standard HTTP, has built-in auto-reconnection, and is simpler to implement. WebSockets are bidirectional (full-duplex), require a dedicated protocol (ws://), and are more complex. SSE is best for live feeds/notifications; WebSockets are best for real-time games/chat apps.

2. **Q:** What is the purpose of the `id` field in SSE?  
   **A:** The `id` field sets the last event ID. On reconnection, the browser sends `Last-Event-ID` header with this value, enabling the server to replay missed events since that ID, ensuring no data loss.

3. **Q:** How does the `retry` field work in the SSE event stream?  
   **A:** `retry:` specifies the reconnection delay in milliseconds. If the connection drops, the browser waits this long before attempting to reconnect. If omitted, the browser's default (typically 1-3 seconds) is used.

4. **Q:** What MIME type is required for SSE endpoints?  
   **A:** The server must set `Content-Type: text/event-stream`. This tells the browser to treat the response as an SSE stream rather than normal HTTP content.

5. **Q:** Can SSE send binary data?  
   **A:** No. SSE only supports UTF-8 text. For binary data, encode as Base64 or use WebSockets. The `data:` field is always a text string.

## ⚠ Common Errors / Mistakes
- Server not setting `Content-Type: text/event-stream` (the browser treats it as regular HTTP)
- Missing blank line (`\n\n`) between events (the parser doesn't recognize new events)
- Using `\r\n` vs `\n` incorrectly — SSE requires `\n` endings (some servers use `\r\n` which may cause issues)
- Forgetting to flush output buffers on the server (data gets buffered and never reaches the client)
- Sending events too fast without considering browser limits (some browsers limit to ~6 connections per domain)
- Creating multiple `EventSource` connections to the same URL (each opens a separate HTTP connection)
- Not calling `eventSource.close()` when leaving the page (resource leak)
- Trying to send data from client to server over the SSE connection (use regular `fetch` or `XMLHttpRequest` for upstream data)

## 📝 Practice Exercises

**Beginner:**
1. Create a simple SSE page that receives a counter from the server that increments every 3 seconds. Display the counter value.
2. Build an SSE-powered notification bar: the server sends a random message every 5 seconds that appears as a sliding notification at the top of the page.
3. Create a page that connects to an SSE endpoint and displays the connection state (Connecting/Connected/Disconnected) with colored indicators.

**Intermediate:**
4. Build a live Twitter-like feed where the server sends new "tweets" as SSE events every few seconds. Display them in reverse chronological order with timestamps. Add an event type for "delete" that removes a tweet from the feed.
5. Create a real-time system monitor dashboard that receives CPU/memory/disk usage data from a server endpoint via SSE. Display the data as updating gauges or progress bars. Show last-updated timestamps for each metric.
6. Build a collaborative counter: the server maintains a count that increments when any connected client clicks a button. The server broadcasts the updated count to all connected clients via SSE. Use `fetch` to send the increment action.

**Advanced:**
7. Implement a fallback mechanism for SSE: if `EventSource` is not supported, fall back to long-polling using `fetch` with a streaming parser. Ensure the same event handling code works for both SSE and the polling fallback.
8. Build a real-time multiplayer quiz game using SSE: the server sends questions to all clients simultaneously, each client submits answers via `fetch`, the server scores answers and broadcasts leaderboard updates via SSE. Handle reconnection mid-game using `Last-Event-ID` to replay missed questions. Include a countdown timer pushed from the server.
