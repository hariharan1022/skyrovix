## 2. PHP Introduction

## 📘 Introduction
PHP is a server-side scripting language that executes on the web server before sending the result to the client. It can be embedded directly within HTML, making it easy to add dynamic functionality to static pages.

## 🧠 Key Concepts
- **How PHP Works**: A browser requests a `.php` file → web server (Apache/Nginx) passes it to the PHP interpreter → PHP executes and produces HTML → server sends HTML to browser.
- **PHP vs JavaScript**: PHP runs on the server (backend); JavaScript runs in the browser (frontend). PHP can access databases/files on the server; JS cannot (without server-side Node.js).
- **Embedding PHP in HTML**: You can mix `<?php ?>` tags with plain HTML anywhere in a `.php` file.
- **PHP Tags**: `<?php ... ?>` is the standard opening/closing tag. Short tags `<? ... ?>` exist but are discouraged.
- **echo vs print**: `echo` is slightly faster, can take multiple parameters, and has no return value. `print` returns 1 and takes a single argument.

## 💻 Syntax
```php
<?php
echo "This is PHP!";
?>
<p>This is plain HTML.</p>
<?php
print "Still PHP!";
?>
```

## ✅ Example 1 - Basic
**Problem**: Compare how the same output is rendered using PHP (server-side) vs JavaScript (client-side).

**Code** (`compare.php`):
```php
<!DOCTYPE html>
<html>
<body>
  <p>PHP time: <?php echo date('H:i:s'); ?></p>
  <p>JS time: <span id="js-time"></span></p>
  <script>
    document.getElementById('js-time').textContent = new Date().toLocaleTimeString();
  </script>
  <p>PHP says: <?php echo "Hello from server!"; ?></p>
  <script>document.write("JS says: Hello from browser!")</script>
</body>
</html>
```

**Output**: The PHP time shows the server's clock at request time. The JS time shows the client's clock (different if timezones differ). "Hello from server!" appears in the initial HTML; "Hello from browser!" is written by JavaScript after page load.

**Explanation**: PHP runs once on the server and its output is baked into the HTML. JavaScript runs in the browser after the page loads. The PHP date is static; the JS date updates live.

## 🚀 Example 2 - Intermediate
**Problem**: Demonstrate embedding PHP inside HTML attributes and conditional HTML blocks.

**Code** (`profile.php`):
```php
<?php
$loggedIn = true;
$username = "alice";
$role = "admin";
?>
<!DOCTYPE html>
<html>
<body>
  <div class="<?php echo $loggedIn ? 'online' : 'offline'; ?>">
    <h1>Welcome<?php if ($loggedIn): ?>, <?php echo $username; ?>!<?php endif; ?></h1>
    <?php if ($role === 'admin'): ?>
      <a href="/admin">Admin Panel</a>
    <?php elseif ($role === 'editor'): ?>
      <a href="/editor">Editor Dashboard</a>
    <?php else: ?>
      <a href="/profile">My Profile</a>
    <?php endif; ?>
  </div>
</body>
</html>
```

**Output**:
```html
<!DOCTYPE html>
<html>
<body>
  <div class="online">
    <h1>Welcome, alice!</h1>
    <a href="/admin">Admin Panel</a>
  </div>
</body>
</html>
```

**Explanation**: PHP conditionally generates HTML. The `class` attribute receives `online` because `$loggedIn` is true. The username is interpolated into the `<h1>`. The navigation link varies by role. The alternative colon syntax (`if: ... endif;`) is used for cleaner template files.

## 🏢 Real World Use Case
**Dynamic Navigation Menus**: Embedded PHP in HTML templates powers menu rendering in CMS platforms. Based on user roles (guest, subscriber, admin), different menu items are shown. The PHP runs once on page load, and the browser only sees the final menu HTML.

## 🎯 Interview Questions
**Q1:** What is the difference between server-side and client-side scripting?
**A:** Server-side scripting (PHP, Python, Node.js) runs on the server and produces output sent to the client. Client-side scripting (JavaScript) runs in the user's browser after the page is delivered.

**Q2:** How do you embed PHP code in an HTML file?
**A:** Use `<?php ... ?>` tags. The file must have a `.php` extension (or be configured via `.htaccess`) so the server knows to process it with the PHP interpreter.

**Q3:** Can PHP and JavaScript interact with each other?
**A:** Indirectly. PHP can generate JavaScript code within HTML. JavaScript can send HTTP requests (AJAX/fetch) to PHP scripts and receive responses (JSON, HTML). They cannot share variables directly.

**Q4:** What is the difference between `echo` and `print`?
**A:** `echo` has no return value and can accept multiple arguments (`echo $a, $b, $c;`). `print` returns 1 and accepts only one argument. `echo` is marginally faster.

**Q5:** Are short open tags `<? ?>` recommended?
**A:** No. They are discouraged because they can conflict with XML processing instructions and may be disabled in `php.ini` (`short_open_tag = Off`). Always use `<?php ?>`.

## ⚠ Common Errors / Mistakes
- **Running .php files directly in the browser**: PHP files need a server to interpret them. Opening `file.php` directly with `file://` shows raw code.
- **Forgetting the closing `?>` in include files**: Includes should not have closing tags to prevent accidental whitespace output.
- **Confusing `echo` and `return`**: `echo` outputs to the response; `return` sends a value back to the caller.

## 📝 Practice Exercises
**Beginner:**
1. Create a PHP page that uses `echo` to output a full HTML table with 3 rows and 3 columns.
2. Write a PHP page that embeds the current year inside a copyright footer using `<?php ?>` directly in the HTML.
3. Create a page that mixes HTML and PHP to display a bullet list of the days of the week using echo inside a loop.

**Intermediate:**
4. Build a PHP page that displays different content based on a `$isMobile` variable (simulate mobile detection by setting the variable manually).
5. Write a PHP script that generates a random color hex code and applies it as the background color of the page using embedded PHP in the style attribute.
6. Create a PHP template that checks `$userRole` and shows/hides three different sections of the page accordingly.

**Advanced:**
7. Build a PHP script that reads an array of products and generates a complete HTML product grid (4 columns, responsive) entirely from PHP, including images, prices, and "Add to Cart" buttons.
8. Create a PHP file that demonstrates interaction between PHP and JS: PHP generates a JSON array of 10 random numbers; JavaScript parses it and renders a bar chart using the Canvas API.
