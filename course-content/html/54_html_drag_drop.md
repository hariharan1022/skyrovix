# 54. HTML Drag and Drop

## 📘 Introduction
The HTML Drag and Drop API enables users to grab elements (or files) and move them to new positions within the page or between applications. It supports drag-and-drop interactions for reordering lists, uploading files, building kanban boards, and creating intuitive user interfaces without external libraries.

## 🧠 Key Concepts
- **draggable attribute**: Set to `true` on elements to make them draggable (`<div draggable="true">`)
- **dragstart**: Fired when the user starts dragging an element; provides the DataTransfer object
- **dragenter**: Fired when a dragged element enters a valid drop target
- **dragover**: Fired repeatedly while a dragged element is over a drop target (must call `preventDefault()` to allow dropping)
- **drop**: Fired when the dragged element is released over a valid drop target
- **dragend**: Fired when the drag operation ends (regardless of success or cancellation)
- **DataTransfer object**: Carries drag data between dragstart and drop events
- **setData() / getData()**: Store and retrieve drag data (format, data string)
- **Drag Feedback**: Custom drag image via `event.dataTransfer.setDragImage(element, x, y)`
- **File Drag and Drop**: Drop files from the OS onto the browser using `event.dataTransfer.files`

## 💻 Syntax
```html
<!DOCTYPE html>
<html>
<head>
  <title>Drag and Drop</title>
  <style>
    .drag-item {
      width: 100px; height: 100px; background: steelblue;
      color: white; display: flex; align-items: center;
      justify-content: center; margin: 10px; cursor: grab;
    }
    .drop-zone {
      width: 300px; height: 300px; border: 3px dashed #ccc;
      margin: 20px 0; display: flex; flex-wrap: wrap;
      align-items: center; justify-content: center;
    }
  </style>
</head>
<body>
  <div class="drag-item" draggable="true" id="item1">Drag me</div>
  <div class="drop-zone" id="dropZone">Drop here</div>

  <script>
    const item = document.getElementById('item1');
    const zone = document.getElementById('dropZone');

    item.addEventListener('dragstart', function(e) {
      e.dataTransfer.setData('text/plain', e.target.id);
      e.target.style.opacity = '0.5';
    });

    item.addEventListener('dragend', function(e) {
      e.target.style.opacity = '1';
    });

    zone.addEventListener('dragover', function(e) {
      e.preventDefault(); // Required for drop
      this.style.borderColor = 'steelblue';
    });

    zone.addEventListener('dragleave', function(e) {
      this.style.borderColor = '#ccc';
    });

    zone.addEventListener('drop', function(e) {
      e.preventDefault();
      const id = e.dataTransfer.getData('text/plain');
      const dragged = document.getElementById(id);
      this.appendChild(dragged);
      this.style.borderColor = '#ccc';
    });
  </script>
</body>
</html>
```

## ✅ Example 1 - Basic (Drag and Drop List Reordering)

**Problem:** Create a reorderable to-do list where items can be dragged to rearrange priority.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Reorderable To-Do List</title>
  <style>
    .list { width: 300px; padding: 0; list-style: none; }
    .list li {
      padding: 12px; margin: 4px 0; background: #f9f9f9;
      border: 1px solid #ddd; cursor: grab; border-radius: 4px;
    }
    .list li.dragging { opacity: 0.4; }
    .list li.drag-over { border-top: 2px solid steelblue; }
  </style>
</head>
<body>
  <h3>Drag to reorder your tasks</h3>
  <ul class="list" id="todoList">
    <li draggable="true">📌 Buy groceries</li>
    <li draggable="true">📌 Finish report</li>
    <li draggable="true">📌 Call dentist</li>
    <li draggable="true">📌 Water plants</li>
    <li draggable="true">📌 Read chapter 5</li>
  </ul>

  <script>
    const items = document.querySelectorAll('#todoList li');
    let dragSrc = null;

    items.forEach(item => {
      item.addEventListener('dragstart', function(e) {
        dragSrc = this;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', this.textContent);
      });

      item.addEventListener('dragenter', function(e) {
        e.preventDefault();
        if (this !== dragSrc) this.classList.add('drag-over');
      });

      item.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      });

      item.addEventListener('dragleave', function(e) {
        this.classList.remove('drag-over');
      });

      item.addEventListener('drop', function(e) {
        e.stopPropagation();
        if (dragSrc !== this) {
          dragSrc.parentNode.insertBefore(dragSrc, this.nextSibling);
        }
        this.classList.remove('drag-over');
      });

      item.addEventListener('dragend', function(e) {
        this.classList.remove('dragging');
        items.forEach(i => i.classList.remove('drag-over'));
      });
    });
  </script>
</body>
</html>
```

**Output:** A list of to-do items that can be rearranged by dragging. The item being dragged is semi-transparent, and a visual indicator (blue border) shows where the item will be placed.

**Explanation:** Each `<li>` has `draggable="true"`. `dragstart` stores the dragged element. `dragover` with `preventDefault()` enables the drop. `drop` moves the dragged element before the target's next sibling, effectively reordering. CSS classes provide visual feedback during drag.

## 🚀 Example 2 - Intermediate (File Drag and Drop Upload)

**Problem:** Build a drag-and-drop file upload zone that previews images before submission.

```html
<!DOCTYPE html>
<html>
<head>
  <title>File Upload Zone</title>
  <style>
    #dropZone {
      width: 100%; max-width: 500px; height: 200px;
      border: 3px dashed #aaa; border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      flex-direction: column; transition: all 0.3s;
      background: #fafafa; margin: 20px 0;
    }
    #dropZone.highlight {
      border-color: #4CAF50; background: #e8f5e9;
    }
    #gallery {
      display: flex; flex-wrap: wrap; gap: 10px;
      margin-top: 20px;
    }
    #gallery img {
      width: 120px; height: 120px; object-fit: cover;
      border-radius: 8px; border: 2px solid #ddd;
    }
    #gallery .file-info {
      text-align: center; font-size: 12px;
      width: 120px; word-break: break-all;
    }
  </style>
</head>
<body>
  <h1>Upload Images</h1>
  <div id="dropZone">
    <p>📁 Drag & drop images here</p>
    <p style="color:#888; font-size:14px;">or click to select files</p>
    <input type="file" id="fileInput" multiple accept="image/*" style="display:none;">
  </div>
  <div id="gallery"></div>

  <script>
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const gallery = document.getElementById('gallery');

    // Prevent default drag behaviors on the whole page
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
      document.addEventListener(event, e => e.preventDefault());
      document.addEventListener(event, e => e.stopPropagation());
    });

    // Highlight drop zone on drag over
    ['dragenter', 'dragover'].forEach(event => {
      dropZone.addEventListener(event, () => dropZone.classList.add('highlight'));
    });
    ['dragleave', 'drop'].forEach(event => {
      dropZone.addEventListener(event, () => dropZone.classList.remove('highlight'));
    });

    // Handle dropped files
    dropZone.addEventListener('drop', function(e) {
      const files = e.dataTransfer.files;
      handleFiles(files);
    });

    // Click to open file picker
    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', function(e) {
      handleFiles(this.files);
    });

    function handleFiles(files) {
      [...files].forEach(file => {
        if (!file.type.startsWith('image/')) {
          alert(`${file.name} is not an image.`);
          return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
          const container = document.createElement('div');
          container.style.display = 'inline-block';
          container.innerHTML = `
            <img src="${e.target.result}" alt="${file.name}">
            <div class="file-info">${file.name}<br>${(file.size / 1024).toFixed(1)} KB</div>
          `;
          gallery.appendChild(container);
        };
        reader.readAsDataURL(file);
      });
    }
  </script>
</body>
</html>
```

**Output:** A styled drop zone where users can drag image files from their desktop. The zone highlights green on drag-over. Dropped images are previewed as thumbnails with filenames and sizes. Clicking the zone also opens the file picker.

**Explanation:** 
- `e.dataTransfer.files` provides access to dropped files (from File API)
- `FileReader.readAsDataURL()` converts images to base64 for preview
- Event listeners on the document prevent the browser's default file-open behavior
- The `highlight` CSS class provides visual feedback
- File type validation ensures only images are accepted

## 🏢 Real World Use Case
**Kanban Project Management Board:** A Trello-like interface where task cards are draggable between columns (To Do, In Progress, Done). The `draggable` attribute makes cards movable. `dragstart` captures the task ID via `setData`. Each column listens for `dragover` (with `preventDefault`) and `drop` to move the card. `dragend` persists the new order to the server via Fetch API. Custom drag images show a miniature card during drag.

## 🎯 Interview Questions
1. **Q:** Why must you call `e.preventDefault()` inside a `dragover` event handler?  
   **A:** By default, elements do not accept drops. Calling `preventDefault()` on `dragover` indicates the element is a valid drop target, enabling the `drop` event to fire.

2. **Q:** What is the DataTransfer object and what methods are commonly used?  
   **A:** `DataTransfer` carries data between `dragstart` and `drop` events. Common methods: `setData(format, data)` to store data, `getData(format)` to retrieve it, `setDragImage(element, x, y)` for custom drag visuals, and `files` property for file drops.

3. **Q:** How do you handle dragging files from the operating system into the browser?  
   **A:** Set up drop zone event listeners. In the `drop` event, access `e.dataTransfer.files` (a FileList). Use `FileReader` API to read file contents. Prevent default on `dragover` and `drop` to override browser's file download behavior.

4. **Q:** What is the difference between `effectAllowed` and `dropEffect`?  
   **A:** `effectAllowed` (set in `dragstart`) restricts the type of drag operation (e.g., `move`, `copy`, `link`). `dropEffect` (set in `dragover`) specifies the desired effect based on modifier keys (e.g., Ctrl for copy).

5. **Q:** How can you customize the visual feedback (drag image) shown while dragging?  
   **A:** Use `e.dataTransfer.setDragImage(element, offsetX, offsetY)` within the `dragstart` event. `offsetX/Y` sets the cursor position relative to the image. If not set, the browser uses a clone of the dragged element.

## ⚠ Common Errors / Mistakes
- Forgetting `draggable="true"` on elements (they won't be draggable)
- Not calling `e.preventDefault()` in `dragover`, causing `drop` to never fire
- Forgetting `e.stopPropagation()` in `drop`, causing parent handlers to also receive the event
- Using `getData()` outside of `drop` or `dragend` (DataTransfer is only available during these events)
- Not preventing default behaviors on `dragenter` and `dragover` for file drops (browser opens the file)
- Assuming `files` property exists on non-file drag operations (it's only populated for file drops)
- Not cleaning up drag states in `dragend`, leaving elements visually stuck

## 📝 Practice Exercises

**Beginner:**
1. Create a page with a draggable red square and a green drop zone. When the square is dropped in the zone, change the square's background to green.
2. Build a drag-and-drop favorite items list where users can drag items from an "Available" list to a "Favorites" list.
3. Add a trash can icon where dragged items can be dropped to delete them (remove from DOM).

**Intermediate:**
4. Build a kanban board with 3 columns (To Do, In Progress, Done). Task cards should be draggable between columns. Persist the board state to localStorage on each drop.
5. Create a file upload zone with the following features: multiple file previews, progress bars using FileReader `onprogress`, file size limit validation (max 5MB), and clear button to remove all previews.
6. Implement a puzzle game where users drag and drop puzzle pieces onto a board to form a complete image. Validate correct placement.

**Advanced:**
7. Build a drag-and-drop page builder: users drag components (header, text block, image, button) from a sidebar onto a canvas area. Components can be reordered on the canvas. Export the layout as HTML/CSS/JSON. Use `setDragImage` for custom cursor feedback.
8. Implement cross-window drag and drop: allow users to drag items from one browser window/tab to another using the HTML5 Drag and Drop API combined with `BroadcastChannel` API for inter-tab communication.
