# 58. HTML WebSockets

## 📘 Introduction
WebSockets provide full-duplex, bidirectional communication between a web browser and a server over a single, persistent TCP connection. Unlike HTTP request-response or SSE (unidirectional), WebSockets enable real-time, low-latency data exchange in both directions simultaneously, making them essential for live chat, multiplayer games, collaborative editing, and real-time financial trading platforms.

## 🧠 Key Concepts
- **WebSocket Protocol**: Uses `ws://` (unencrypted) or `wss://` (encrypted, recommended) scheme
- **Full-Duplex**: Both client and server can send messages independently at any time
- **Persistent Connection**: Single TCP connection stays open, avoiding HTTP handshake overhead for each message
- **WebSocket Constructor**: `new WebSocket(url)` — initiates the WebSocket handshake
- **onopen**: Fired when the connection is successfully established
- **onmessage**: Fired when a message is received from the server (`event.data` contains payload)
- **onclose**: Fired when the connection is closed (with code and reason)
- **onerror**: Fired when an error occurs
- **send()**: Sends data to the server (string, ArrayBuffer, Blob, or typed array)
- **close()**: Closes the connection (optional code and reason)
- **readyState**: Connection state — `CONNECTING` (0), `OPEN` (1), `CLOSING` (2), `CLOSED` (3)
- **vs SSE**: WebSockets are bidirectional; SSE is unidirectional (server→client). WebSockets require dedicated protocol; SSE uses HTTP. WebSockets have no auto-reconnection; SSE auto-reconnects. WebSockets handle binary natively; SSE is text-only.

## 💻 Syntax
```html
<!DOCTYPE html>
<html>
<head>
  <title>WebSocket Demo</title>
</head>
<body>
  <script>
    // Client-side WebSocket
    const socket = new WebSocket('wss://echo.websocket.org');

    socket.onopen = function(e) {
      console.log('Connected');
      socket.send('Hello Server!');
    };

    socket.onmessage = function(e) {
      console.log('Received:', e.data);
    };

    socket.onclose = function(e) {
      console.log(`Closed: ${e.code} - ${e.reason}`);
    };

    socket.onerror = function(e) {
      console.error('WebSocket error');
    };

    // Send data
    socket.send('Plain text message');
    socket.send(JSON.stringify({ type: 'chat', text: 'Hello' }));
    socket.send(new ArrayBuffer(8)); // Binary data

    // Close connection
    socket.close(1000, 'Session ended');
  </script>
</body>
</html>
```

## ✅ Example 1 - Basic (Echo Chat Client)

**Problem:** Build a simple chat interface that sends messages to a WebSocket echo server and displays responses.

```html
<!DOCTYPE html>
<html>
<head>
  <title>WebSocket Echo Chat</title>
  <style>
    body { font-family: Arial; padding: 20px; }
    #chat { width: 400px; height: 300px; border: 1px solid #ccc;
            overflow-y: scroll; padding: 10px; margin-bottom: 10px;
            background: #f9f9f9; }
    .sent { text-align: right; color: blue; margin: 5px 0; }
    .received { text-align: left; color: green; margin: 5px 0; }
    #status { font-size: 14px; margin: 5px 0; }
    input[type="text"] { width: 300px; padding: 8px; }
    button { padding: 8px 16px; }
  </style>
</head>
<body>
  <h1>WebSocket Echo Chat</h1>
  <p id="status">⏳ Connecting...</p>
  <div id="chat"></div>
  <input type="text" id="messageInput" placeholder="Type a message..." disabled>
  <button id="sendBtn" disabled>Send</button>
  <button id="closeBtn" disabled>Disconnect</button>

  <script>
    const chat = document.getElementById('chat');
    const status = document.getElementById('status');
    const input = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const closeBtn = document.getElementById('closeBtn');

    let socket = null;

    function connect() {
      socket = new WebSocket('wss://echo.websocket.org');

      socket.onopen = function() {
        status.textContent = '✅ Connected';
        status.style.color = 'green';
        input.disabled = false;
        sendBtn.disabled = false;
        closeBtn.disabled = false;
        addMessage('Connected to server', 'received');
      };

      socket.onmessage = function(e) {
        addMessage(`Server: ${e.data}`, 'received');
      };

      socket.onclose = function(e) {
        status.textContent = `❌ Disconnected (code: ${e.code})`;
        status.style.color = 'red';
        input.disabled = true;
        sendBtn.disabled = true;
        closeBtn.disabled = true;
        addMessage(`Disconnected (${e.reason || 'No reason'})`, 'received');
      };

      socket.onerror = function() {
        status.textContent = '❌ Connection error';
        status.style.color = 'red';
      };
    }

    function addMessage(text, type) {
      const div = document.createElement('div');
      div.className = type;
      div.textContent = text;
      chat.appendChild(div);
      chat.scrollTop = chat.scrollHeight;
    }

    function sendMessage() {
      const text = input.value.trim();
      if (!text || !socket || socket.readyState !== WebSocket.OPEN) return;
      socket.send(text);
      addMessage(`You: ${text}`, 'sent');
      input.value = '';
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') sendMessage();
    });

    closeBtn.addEventListener('click', function() {
      if (socket) socket.close(1000, 'User disconnected');
    });

    connect();
  </script>
</body>
</html>
```

**Output:** A chat interface that connects to a public echo server. User messages are displayed in blue (right-aligned) and server echoes in green (left-aligned). Connection status indicator shows real-time state.

**Explanation:** `WebSocket` constructor initiates the handshake. `send()` transmits messages as strings. `onmessage` captures echo responses. `onclose` and `onerror` handle disconnection. The `readyState` check (`WebSocket.OPEN`) ensures messages are only sent when connected.

## 🚀 Example 2 - Intermediate (Multi-User Chat Room)

**Problem:** Build a multi-user chat room using WebSockets with username registration, typing indicators, and online user list.

**client.html:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>WebSocket Chat Room</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: Arial; padding: 20px; max-width: 800px; margin: auto; }
    #container { display: flex; gap: 20px; }
    #sidebar { width: 200px; border: 1px solid #ddd; border-radius: 8px; padding: 10px; }
    #main { flex: 1; }
    #messages { height: 350px; border: 1px solid #ddd; border-radius: 8px;
                padding: 10px; overflow-y: scroll; margin-bottom: 10px; background: #fafafa; }
    .msg { margin: 8px 0; padding: 5px; border-radius: 4px; }
    .msg .author { font-weight: bold; color: #333; }
    .msg .time { font-size: 11px; color: #888; float: right; }
    .system { color: #888; font-style: italic; font-size: 13px; }
    #typing { font-style: italic; color: #888; height: 20px; font-size: 13px; }
    #users { list-style: none; padding: 0; }
    #users li { padding: 5px 0; border-bottom: 1px solid #eee; }
    #usernameInput { width: 100%; padding: 8px; margin-bottom: 10px; }
    #messageInput { width: calc(100% - 80px); padding: 8px; }
    button { padding: 8px 16px; cursor: pointer; }
  </style>
</head>
<body>
  <h1>💬 Chat Room</h1>
  <div id="container">
    <div id="sidebar">
      <h3>Online (<span id="userCount">0</span>)</h3>
      <ul id="users"></ul>
    </div>
    <div id="main">
      <div id="messages"></div>
      <p id="typing"></p>
      <input type="text" id="messageInput" placeholder="Type a message..." disabled>
      <button id="sendBtn" disabled>Send</button>
    </div>
  </div>

  <script>
    const socket = new WebSocket('wss://your-server.com/chat');
    let username = '';

    const messages = document.getElementById('messages');
    const users = document.getElementById('users');
    const userCount = document.getElementById('userCount');
    const typing = document.getElementById('typing');
    const input = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');

    function addMessage(author, text, time, isSystem) {
      const div = document.createElement('div');
      if (isSystem) {
        div.className = 'system';
        div.textContent = text;
      } else {
        div.className = 'msg';
        div.innerHTML = `<span class="author">${author}</span> ${text}
                         <span class="time">${time}</span>`;
      }
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }

    function updateUsers(userList) {
      users.innerHTML = userList.map(u => `<li>${u}</li>`).join('');
      userCount.textContent = userList.length;
    }

    socket.onopen = function() {
      username = prompt('Enter your username:') || 'Anonymous';
      socket.send(JSON.stringify({ type: 'join', username }));
      input.disabled = false;
      sendBtn.disabled = false;
    };

    socket.onmessage = function(e) {
      const data = JSON.parse(e.data);

      switch (data.type) {
        case 'message':
          addMessage(data.username, data.text, data.time);
          break;
        case 'system':
          addMessage(null, data.text, null, true);
          break;
        case 'users':
          updateUsers(data.list);
          break;
        case 'typing':
          typing.textContent =
            data.username !== username ? `${data.username} is typing...` : '';
          break;
      }
    };

    socket.onclose = function() {
      addMessage(null, 'Disconnected from server. Refresh to reconnect.', null, true);
    };

    function sendMessage() {
      const text = input.value.trim();
      if (!text) return;
      socket.send(JSON.stringify({ type: 'message', text }));
      input.value = '';
    }

    let typingTimer = null;
    input.addEventListener('input', function() {
      clearTimeout(typingTimer);
      socket.send(JSON.stringify({ type: 'typing', typing: true }));
      typingTimer = setTimeout(() => {
        socket.send(JSON.stringify({ type: 'typing', typing: false }));
      }, 1000);
    });

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') sendMessage();
    });
  </script>
</body>
</html>
```

**(Server-side WebSocket handler - Node.js example for context):**
```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const clients = new Map();

wss.on('connection', function(ws) {
  let username = null;

  ws.on('message', function(data) {
    const msg = JSON.parse(data);

    switch (msg.type) {
      case 'join':
        username = msg.username;
        clients.set(ws, username);
        broadcast({ type: 'system', text: `${username} joined the chat` });
        broadcastUsers();
        break;
      case 'message':
        broadcast({ type: 'message', username, text: msg.text, time: new Date().toLocaleTimeString() });
        break;
      case 'typing':
        broadcast({ type: 'typing', username, typing: msg.typing });
        break;
    }
  });

  ws.on('close', function() {
    clients.delete(ws);
    if (username) {
      broadcast({ type: 'system', text: `${username} left the chat` });
      broadcastUsers();
    }
  });

  function broadcast(data) {
    const payload = JSON.stringify(data);
    clients.forEach(function(_, client) {
      if (client.readyState === WebSocket.OPEN) client.send(payload);
    });
  }

  function broadcastUsers() {
    broadcast({ type: 'users', list: Array.from(clients.values()) });
  }
});
```

**Output:** A multi-user chat interface with a sidebar showing online users, real-time message display with timestamps, typing indicators, and system join/leave notifications.

**Explanation:** The client sends JSON-formatted messages with a `type` field (`join`, `message`, `typing`). The server broadcasts to all connected clients. The sidebar updates via the `users` event type. Typing indicators use debouncing to avoid excessive messages. System messages show joins/leaves without an author name.

## 🏢 Real World Use Case
**Real-Time Collaborative Document Editor (Google Docs-style):** A collaborative editor uses WebSockets to synchronize changes between multiple users editing the same document. Each keystroke is sent as an operation (insert/delete with position) via `socket.send()` as JSON. The server applies Operational Transformation (OT) or CRDT to resolve conflicts and broadcasts the result. Cursor positions and selection highlights are shared as separate WebSocket message types. The `onclose` event triggers automatic reconnection with state recovery.

## 🎯 Interview Questions
1. **Q:** What are the key differences between WebSockets and HTTP polling?  
   **A:** WebSockets maintain a persistent connection with minimal overhead (2 bytes per message after handshake). HTTP polling creates a new connection per request with full headers, higher latency, and server load. WebSockets enable true real-time bidirectional communication.

2. **Q:** How does WebSocket security work? Why use `wss://` over `ws://`?  
   **A:** `wss://` (WebSocket Secure) encrypts data using TLS, preventing man-in-the-middle attacks. It uses the same certificate infrastructure as HTTPS. `ws://` transmits data in plain text. Browsers may block `ws://` from secure (HTTPS) pages.

3. **Q:** What are the `readyState` values of a WebSocket connection?  
   **A:** `CONNECTING` (0) — handshake in progress; `OPEN` (1) — ready to send/receive; `CLOSING` (2) — close handshake in progress; `CLOSED` (3) — connection closed.

4. **Q:** How do you handle WebSocket reconnection when the connection drops?  
   **A:** Implement manual reconnection: listen for `onclose`, implement exponential backoff with `setTimeout`, attempt to reconnect with `new WebSocket(url)`, and restore state (subscribe to channels, replay missed messages using sequence numbers).

5. **Q:** What types of data can be sent via WebSocket `send()`?  
   **A:** Strings (text), `ArrayBuffer` (binary), `Blob` (binary), `TypedArray` (e.g., Uint8Array), and `DataView`. The `binaryType` property controls whether received binary data is delivered as `Blob` or `ArrayBuffer`.

## ⚠ Common Errors / Mistakes
- Sending messages before the `onopen` event fires (socket is still in `CONNECTING` state)
- Not handling the `onclose` event and attempting to `send()` after disconnection
- Forgetting to use `wss://` on HTTPS pages (mixed content blocked)
- Not validating/sanitizing WebSocket messages on the server (security vulnerability)
- Sending too many messages per second without rate limiting (flooding the connection)
- Not implementing reconnection logic (WebSockets don't auto-reconnect like SSE)
- Creating a new WebSocket connection on every page navigation without closing the old one
- Sending JavaScript objects directly (must serialize with `JSON.stringify`)

## 📝 Practice Exercises

**Beginner:**
1. Create a WebSocket connection to a public echo server and send 3 different messages. Display each server response in a list on the page.
2. Build a "Connection Monitor" page that shows the WebSocket `readyState` changes (0→1→3) with colored indicators and logs state change timestamps.
3. Create a simple page that connects to a WebSocket, sends a button click count every time the user clicks, and displays the count.

**Intermediate:**
4. Build a collaborative drawing board: multiple users connect via WebSocket. Each user's mouse drag events (coordinates) are sent to the server and broadcast to all clients. Draw lines on a shared canvas based on received coordinates.
5. Create a real-time auction page where the server broadcasts current bid amounts. Implement a "Place Bid" button that increments the bid and sends it via WebSocket. Show a countdown timer pushed by the server.
6. Build a chat application with emoji reactions: messages can have a "react" button. Send reaction events via WebSocket. Display emoji counts below each message. Include a `/nick` command to change username without reconnecting.

**Advanced:**
7. Implement a WebSocket-based multiplayer tic-tac-toe game with: matchmaking (waiting room), game state synchronization (board positions), turn management, win detection, and spectator mode. Handle disconnection and reconnection mid-game with state recovery.
8. Build a real-time dashboard system with WebSocket multiplexing: create a single WebSocket connection that handles multiple channels (prices, orders, notifications, system health). Implement a lightweight protocol with message types, sequence numbers, and ACK-based reliability. Support dynamic channel subscribe/unsubscribe and reconnection with stateful replay.
