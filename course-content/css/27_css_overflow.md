## 27. CSS Overflow

## 📘 Introduction
The `overflow` property controls what happens when content exceeds the boundaries of its container. It is essential for creating scrollable areas, handling long text, cropping images, and building custom scrollable components like chat boxes, code editors, and data tables.

## 🧠 Key Concepts
- **`visible`**(default): Content overflows the container and renders outside its bounds
- **`hidden`**: Overflowing content is clipped (cut off) and not scrollable
- **`scroll`**: Scrollbars are always shown regardless of whether content overflows
- **`auto`**: Scrollbars appear only when content overflows
- **`overflow-x` / `overflow-y`**: Control overflow independently for horizontal and vertical axes
- **`text-overflow`**: Adds ellipsis (`...`) when text overflows; requires `overflow: hidden`, `white-space: nowrap`, and a defined width
- **Scrollbar styling**: Pseudo-elements like `::-webkit-scrollbar` allow custom scrollbar styling (WebKit browsers)
- **`overflow: clip`**: Like `hidden` but prevents programmatic scrolling — the content is truly locked in place

## 💻 Syntax

```css
/* Scrollable container */
.scroll-box {
  height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
}

/* Text truncation with ellipsis */
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px;
}

/* Clip both axes */
.crop {
  overflow: hidden;
  width: 300px;
  height: 200px;
}

/* Custom scrollbar (WebKit) */
.custom-scroll::-webkit-scrollbar {
  width: 8px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}
```

## ✅ Example 1 - Basic (Text Truncation with Ellipsis)

**Problem:** Display a long product title in a fixed-width card, truncating with an ellipsis when the text is too long.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html>
<head>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    padding: 40px;
    font-family: Arial;
    background: #f0f0f0;
  }
  .card {
    width: 250px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  .card h3 {
    font-size: 1em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #2c3e50;
    margin-bottom: 10px;
  }
  .card p {
    color: #666;
    font-size: 0.85em;
    line-height: 1.5;
  }
</style>
</head>
<body>
  <div class="card">
    <h3>Premium Cotton Blend Ultra-Comfortable Hooded Sweatshirt with Zipper</h3>
    <p>This product's title above is truncated with an ellipsis if it exceeds the card width.</p>
  </div>
</body>
</html>
```

**Output:** A card with a long title that is cut off at the end with "..." instead of wrapping or overflowing.

**Explanation:** `white-space: nowrap` prevents text wrapping. `overflow: hidden` clips the excess. `text-overflow: ellipsis` adds the "..." indicator at the point where text is clipped. All three properties are required for the ellipsis effect to work.

## 🚀 Example 2 - Intermediate (Scrollable Chat Panel with Custom Scrollbar)

**Problem:** Build a fixed-height chat message panel that scrolls vertically, with a custom-styled scrollbar.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html>
<head>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    padding: 40px;
    font-family: Arial;
    background: #ecf0f1;
    display: flex;
    justify-content: center;
  }
  .chat-box {
    width: 350px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    overflow: hidden;
  }
  .chat-header {
    background: #2c3e50;
    color: white;
    padding: 15px 20px;
    font-weight: bold;
  }
  .chat-messages {
    height: 350px;
    overflow-y: auto;
    padding: 15px 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  /* Custom scrollbar */
  .chat-messages::-webkit-scrollbar {
    width: 6px;
  }
  .chat-messages::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  .chat-messages::-webkit-scrollbar-thumb {
    background: #bdc3c7;
    border-radius: 3px;
  }
  .chat-messages::-webkit-scrollbar-thumb:hover {
    background: #95a5a6;
  }
  .message {
    padding: 10px 14px;
    border-radius: 12px;
    max-width: 85%;
    word-wrap: break-word;
  }
  .message.received {
    background: #ecf0f1;
    align-self: flex-start;
    border-bottom-left-radius: 4px;
  }
  .message.sent {
    background: #3498db;
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
  }
  .message small {
    display: block;
    font-size: 0.7em;
    opacity: 0.7;
    margin-top: 4px;
  }
  .chat-input {
    display: flex;
    border-top: 1px solid #eee;
  }
  .chat-input input {
    flex: 1;
    border: none;
    padding: 12px 15px;
    outline: none;
    font-size: 0.9em;
  }
  .chat-input button {
    background: #3498db;
    color: white;
    border: none;
    padding: 0 20px;
    cursor: pointer;
    font-weight: bold;
  }
</style>
</head>
<body>
  <div class="chat-box">
    <div class="chat-header">💬 Live Chat</div>
    <div class="chat-messages">
      <div class="message received">Hi! How can I help you? <small>10:32 AM</small></div>
      <div class="message sent">I need help with my order <small>10:33 AM</small></div>
      <div class="message received">Sure! What's your order ID? <small>10:33 AM</small></div>
      <div class="message sent">#ORD-2026-0042 <small>10:34 AM</small></div>
      <div class="message received">Let me check that for you... <small>10:34 AM</small></div>
      <div class="message received">Your order is on the way! 📦 <small>10:35 AM</small></div>
      <div class="message sent">Thank you! <small>10:35 AM</small></div>
    </div>
    <div class="chat-input">
      <input type="text" placeholder="Type a message...">
      <button>Send</button>
    </div>
  </div>
</body>
</html>
```

**Output:** A chat interface with a scrollable message area. The scrollbar is thin, rounded, and styled with muted colors instead of the default thick gray scrollbar.

**Explanation:** `.chat-messages` has a fixed `height: 350px` and `overflow-y: auto` — scrollbars appear only when content exceeds the height. `::-webkit-scrollbar` pseudo-elements customize the scrollbar appearance. `word-wrap: break-word` prevents long words from breaking the layout.

## 🏢 Real World Use Case
Chat applications, code editors, social media feeds, product listing pages with "show more" collapsible sections, data tables with horizontal scrolling, and article previews all use overflow properties to manage content boundaries.

## 🎯 Interview Questions

1. **What is the difference between `overflow: hidden` and `overflow: clip`?**
   *Both clip overflowing content, but `overflow: hidden` still allows programmatic scrolling (via JavaScript scroll methods), while `overflow: clip` completely locks the content — no scrolling is possible by any means.*

2. **Which three properties are required for `text-overflow: ellipsis` to work?**
   *`overflow: hidden` (or non-visible), `white-space: nowrap`, and a constrained `width` (or `max-width`).*

3. **How do you enable horizontal scrolling for a wide table on a small screen?**
   *Wrap the `<table>` in a `<div>` and apply `overflow-x: auto` to the div. Set `min-width` on the table to be wider than the viewport to trigger the scroll.*

4. **What is the default value of `overflow`?**
   *`visible` — content is not clipped and may render outside the element's box.*

5. **How can you style scrollbars across different browsers?**
   *WebKit browsers support `::-webkit-scrollbar` and related pseudo-elements. Firefox supports `scrollbar-width` and `scrollbar-color` CSS properties. There is no single cross-browser standard yet.*

## ⚠ Common Errors / Mistakes

- **Applying `overflow-x` and `overflow-y` with different visible values**: If one axis is `visible` and the other is `scroll`/`auto`/`hidden`, the `visible` value is treated as `auto` — this is a CSS spec requirement
- **Using `overflow: hidden` on a parent without considering absolute children**: Absolutely positioned descendants can still overflow unless clipped at the right container level
- **Forgetting `white-space: nowrap` for ellipsis**: Without it, text wraps and never overflows horizontally
- **Setting `overflow: auto` on both axes when only one is needed**: Horizontal scrollbars may appear unexpectedly if content is slightly wider than the container
- **Not accounting for scrollbar width in layout calculations**: A scrollbar takes 15–20px of width, which can cause content to shift when scrollbars appear

## 📝 Practice Exercises

### Beginner
1. Create a 200px-tall `<div>` with `overflow-y: auto` and fill it with enough text to trigger scrolling.
2. Create a fixed-width `<p>` with `text-overflow: ellipsis` that truncates a long sentence on a single line.
3. Use `overflow-x: scroll` to create a horizontally scrollable row of 5 square divs (150px each) inside a 400px-wide container.

### Intermediate
4. Build a "read more" expandable card where content is clipped with `overflow: hidden` and a fixed height, then expands on button click (use `:target` or checkbox hack).
5. Create a news ticker using `overflow: hidden` on a container and animating the content's `transform: translateX()` to scroll automatically.
6. Design a custom scrollbar for a sidebar using `::-webkit-scrollbar` with a transparent track, a dark thumb, and hover effects.

### Advanced
7. Build an image comparison slider: two images side by side in a single container where one clips with `overflow: hidden` and a resizable divider controls the visible width.
8. Create a modal with `overflow: hidden` on `<body>` (preventing background scroll) while the modal content itself scrolls internally with `overflow-y: auto`. Ensure focus trapping and keyboard navigation work correctly.
