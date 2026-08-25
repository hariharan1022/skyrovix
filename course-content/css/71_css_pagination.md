## 71. CSS Pagination
## 📘 Introduction
Pagination breaks large sets of content (search results, blog posts, product listings) across multiple pages. Well-styled pagination improves navigation usability with clear active states, hover feedback, and accessible markup. CSS handles all visual aspects—layout, spacing, hover effects, disabled states, and responsiveness.

## 🧠 Key Concepts
- **Page link styling** – Styling `<a>` tags as page numbers with consistent sizing
- **Active page** – `.active` class highlights the current page (e.g., colored background)
- **Hover effects** – Background change, underline, or scale on hover
- **Disabled links** – `.disabled` class with muted opacity and `pointer-events: none`
- **Pagination sizing** – Modifier classes for small/large pagination
- **Centered pagination** – `display: flex; justify-content: center` on the container
- **Breadcrumb navigation** – Separator-based navigation showing hierarchy (related pattern)
- **Gap / spacing** – `gap` on flex container for even spacing between items

## 💻 Syntax
```css
.pagination {
  display: flex;
  list-style: none;
  padding: 0;
  gap: 4px;
}

.pagination a {
  display: block;
  padding: 8px 14px;
  text-decoration: none;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: background 0.2s;
}

.pagination a:hover {
  background: #eee;
}

.pagination a.active {
  background: #007bff;
  color: #fff;
  border-color: #007bff;
}

.pagination a.disabled {
  color: #aaa;
  pointer-events: none;
  opacity: 0.6;
}
```

## ✅ Example 1 - Basic
**Problem:** Create a centered pagination bar with active page highlighting, hover effects, and disabled prev/next states.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; padding: 60px; }

  .pagination {
    display: flex;
    justify-content: center;
    list-style: none;
    gap: 6px;
    flex-wrap: wrap;
  }

  .pagination li {
    margin: 0;
  }

  .pagination a {
    display: block;
    padding: 10px 16px;
    font-size: 1rem;
    text-decoration: none;
    color: #007bff;
    background: #fff;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .pagination a:hover:not(.active):not(.disabled) {
    background: #e9ecef;
    border-color: #adb5bd;
  }

  .pagination a.active {
    background: #007bff;
    color: #fff;
    border-color: #007bff;
    font-weight: 600;
  }

  .pagination a.disabled {
    color: #adb5bd;
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
  }
</style>
</head>
<body>
  <ul class="pagination">
    <li><a href="#" class="disabled">&laquo; Prev</a></li>
    <li><a href="#" class="active">1</a></li>
    <li><a href="#">2</a></li>
    <li><a href="#">3</a></li>
    <li><a href="#">4</a></li>
    <li><a href="#">5</a></li>
    <li><a href="#">Next &raquo;</a></li>
  </ul>

  <ul class="pagination" style="margin-top:40px;">
    <li><a href="#">&laquo; Prev</a></li>
    <li><a href="#">1</a></li>
    <li><a href="#">2</a></li>
    <li><a href="#">3</a></li>
    <li><a href="#" class="active">4</a></li>
    <li><a href="#">5</a></li>
    <li><a href="#">Next &raquo;</a></li>
  </ul>
</body>
</html>
```

**Output:** Two pagination bars with page numbers, prev/next links, active page highlighted in blue, muted disabled state, and hover effects on non-active links.

**Explanation:** Flexbox with `justify-content: center` centers the pagination. The `.active` class changes background to blue with white text. `.disabled` reduces opacity and removes pointer events. `&laquo;` and `&raquo;` are HTML entities for double angle quotes.

## 🚀 Example 2 - Intermediate
**Problem:** Build a pagination component with size variants, rounded pill style, breadcrumb navigation, and ellipsis for large page sets.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; padding: 40px; background: #f8f9fa; }

  .container { max-width: 800px; margin: 0 auto; }

  h2 { margin-bottom: 16px; margin-top: 30px; color: #333; }

  /* Pagination base */
  .pagination {
    display: flex;
    list-style: none;
    gap: 4px;
    flex-wrap: wrap;
    margin-bottom: 30px;
  }

  .pagination li a {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    height: 40px;
    padding: 0 12px;
    text-decoration: none;
    color: #495057;
    background: #fff;
    border: 1px solid #dee2e6;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.2s ease;
    cursor: pointer;
    border-radius: 4px;
  }

  .pagination li a:hover:not(.active):not(.disabled) {
    background: #e9ecef;
    border-color: #ced4da;
  }

  .pagination li a.active {
    background: #007bff;
    color: #fff;
    border-color: #007bff;
  }

  .pagination li a.disabled {
    color: #adb5bd;
    pointer-events: none;
    opacity: 0.5;
  }

  .pagination li a.ellipsis {
    border: none;
    pointer-events: none;
    min-width: auto;
    padding: 0 4px;
  }

  /* Sizes */
  .pagination-sm li a {
    min-width: 32px;
    height: 32px;
    padding: 0 10px;
    font-size: 0.8rem;
  }

  .pagination-lg li a {
    min-width: 48px;
    height: 48px;
    padding: 0 18px;
    font-size: 1.1rem;
  }

  /* Pill style */
  .pagination-pill li a {
    border-radius: 20px;
  }

  /* Breadcrumb */
  .breadcrumb {
    display: flex;
    list-style: none;
    gap: 8px;
    flex-wrap: wrap;
    padding: 12px 16px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }

  .breadcrumb li {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .breadcrumb li + li::before {
    content: "/";
    color: #adb5bd;
  }

  .breadcrumb a {
    text-decoration: none;
    color: #007bff;
  }
  .breadcrumb a:hover { text-decoration: underline; }

  .breadcrumb .active {
    color: #6c757d;
    font-weight: 600;
  }
</style>
</head>
<body>
  <div class="container">
    <h2>Default Pagination</h2>
    <ul class="pagination">
      <li><a href="#" class="disabled">&laquo;</a></li>
      <li><a href="#">1</a></li>
      <li><a href="#" class="active">2</a></li>
      <li><a href="#">3</a></li>
      <li><a href="#" class="ellipsis">...</a></li>
      <li><a href="#">9</a></li>
      <li><a href="#">10</a></li>
      <li><a href="#">&raquo;</a></li>
    </ul>

    <h2>Small + Pill Style</h2>
    <ul class="pagination pagination-sm pagination-pill">
      <li><a href="#" class="disabled">&laquo;</a></li>
      <li><a href="#" class="active">1</a></li>
      <li><a href="#">2</a></li>
      <li><a href="#">3</a></li>
      <li><a href="#">4</a></li>
      <li><a href="#">5</a></li>
      <li><a href="#">&raquo;</a></li>
    </ul>

    <h2>Large Pagination</h2>
    <ul class="pagination pagination-lg">
      <li><a href="#" class="disabled">&laquo; Prev</a></li>
      <li><a href="#">1</a></li>
      <li><a href="#">2</a></li>
      <li><a href="#" class="active">3</a></li>
      <li><a href="#">4</a></li>
      <li><a href="#">5</a></li>
      <li><a href="#">Next &raquo;</a></li>
    </ul>

    <h2>Breadcrumb Navigation</h2>
    <ul class="breadcrumb">
      <li><a href="#">Home</a></li>
      <li><a href="#">Category</a></li>
      <li><a href="#">Subcategory</a></li>
      <li class="active">Current Page</li>
    </ul>
  </div>
</body>
</html>
```

**Output:** Three pagination bars (default, small pill, large) showing size variants, ellipsis for large ranges, and a breadcrumb trail with `/` separators.

**Explanation:** Size variants use modifier classes to adjust `min-width`, `height`, `padding`, and `font-size`. `.pagination-pill` sets `border-radius: 20px` for pill shapes. The `.ellipsis` class removes borders and interaction. Breadcrumbs use `li + li::before` with `content: "/"` for automatic separators between items.

## 🏢 Real World Use Case
E-commerce product listings, blog archives, search engine results pages (SERP), forum threads, admin dashboard tables, and documentation sites all use pagination or breadcrumb navigation.

## 🎯 Interview Questions
1. **Q:** How do you center a pagination bar?  
   **A:** Use `display: flex; justify-content: center` on the `<ul>` container.

2. **Q:** How do you style a disabled pagination link?  
   **A:** Add a `.disabled` class with `color: #aaa`, `pointer-events: none`, and `opacity: 0.6`.

3. **Q:** How do you create breadcrumb separators without extra HTML?  
   **A:** Use `li + li::before { content: "/"; }` to automatically add a separator between list items.

4. **Q:** How do you handle large page counts with ellipsis?  
   **A:** Replace middle page numbers with a `<li><span class="ellipsis">...</span></li>` that is not clickable.

5. **Q:** How would you make pagination responsive on small screens?  
   **A:** Use `flex-wrap: wrap`, reduce item size, hide some page numbers, and show only prev/next with `@media` queries.

## ⚠ Common Errors / Mistakes
- Using `<a>` elements without `href="#"` for non-JavaScript pagination, making them unfocusable
- Forgetting `pointer-events: none` on disabled links, allowing clicks through the visual state
- Not wrapping pagination in `<nav>` or using `aria-label="pagination"` for accessibility
- Setting fixed widths on page links that break with larger numbers (two-digit or three-digit pages)
- Using `display: inline-block` items without removing whitespace gaps (flexbox with `gap` is cleaner)

## 📝 Practice Exercises
**Beginner:**
1. Create a pagination bar with 5 page links and prev/next buttons centered on the page.
2. Highlight the active page with a blue background and white text.
3. Add a hover effect that changes the background of non-active links to light gray.

**Intermediate:**
4. Add a disabled style to the "Prev" button when on the first page using a `.disabled` class.
5. Create pagination with ellipsis between page 3 and page 10.
6. Build a breadcrumb navigation with `Home / Category / Subcategory / Current` using `::before` separators.

**Advanced:**
7. Build a fully responsive pagination component that hides page numbers on small screens and shows only prev/next buttons with "Page X of Y" text.
8. Create a pagination with interactive page size selector (e.g., "Show 10 / 20 / 50 per page") styled as inline button group.
