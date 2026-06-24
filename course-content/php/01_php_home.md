## 1. PHP HOME

## 📘 Introduction
PHP (Hypertext Preprocessor) is a widely-used open-source server-side scripting language designed for web development. It can be embedded directly into HTML and executes on the server, sending only the resulting HTML to the client's browser.

## 🧠 Key Concepts
- **Server-Side Scripting**: PHP code runs on the web server, not in the browser. The server processes PHP and returns pure HTML.
- **Dynamic Websites**: PHP generates dynamic page content, handles form data, manages sessions, and interacts with databases.
- **PHP History**: Created by Rasmus Lerdorf in 1994. Originally stood for "Personal Home Page." PHP 8.x is the latest major version with JIT compilation.
- **What You Can Build**: Content management systems (WordPress), e-commerce sites (Magento), REST APIs, web applications (Laravel), dynamic forms, login systems, and more.

## 💻 Syntax
```php
<?php
echo "Hello, World!";
?>
```

## ✅ Example 1 - Basic
**Problem**: Create a simple PHP page that displays "Hello, World!" using server-side scripting.

**Code** (`index.php`):
```php
<!DOCTYPE html>
<html>
<body>
  <h1><?php echo "Hello, World!"; ?></h1>
  <p>Today is <?php echo date("l"); ?>.</p>
</body>
</html>
```

**Output**:
```html
<!DOCTYPE html>
<html>
<body>
  <h1>Hello, World!</h1>
  <p>Today is Monday.</p>
</body>
</html>
```

**Explanation**: PHP code blocks `<?php ... ?>` are evaluated on the server. The `echo` statement outputs text, and `date()` returns the current day. The browser receives only the resulting HTML.

## 🚀 Example 2 - Intermediate
**Problem**: Build a simple page that reads a user's name from the URL query string and greets them, falling back to "Guest" if no name is provided.

**Code** (`greet.php`):
```php
<?php
$name = $_GET['name'] ?? 'Guest';
$hour = (int)date('G');
$greeting = $hour < 12 ? 'Good morning' : ($hour < 18 ? 'Good afternoon' : 'Good evening');
?>
<!DOCTYPE html>
<html>
<body>
  <h1><?php echo "$greeting, $name!"; ?></h1>
  <p>Server time: <?php echo date('h:i A'); ?></p>
</body>
</html>
```

**Output** (visiting `greet.php?name=John` at 2:30 PM):
```html
<!DOCTYPE html>
<html>
<body>
  <h1>Good afternoon, John!</h1>
  <p>Server time: 02:30 PM</p>
</body>
</html>
```

**Explanation**: `$_GET` captures query string parameters. The null coalescing operator `??` provides a default. Ternary operators determine the greeting based on the server hour. PHP variables inside double-quoted strings are interpolated.

## 🏢 Real World Use Case
**WordPress**: The most popular CMS powers over 40% of all websites. WordPress core, themes, and plugins are written in PHP. It handles content management, user authentication, database operations, and dynamic page rendering entirely on the server.

## 🎯 Interview Questions
**Q1:** What does PHP stand for, and what type of language is it?
**A:** PHP originally stood for "Personal Home Page" but now recursively stands for "PHP: Hypertext Preprocessor." It is a server-side scripting language.

**Q2:** How is PHP different from JavaScript?
**A:** PHP runs on the server (backend) and generates HTML sent to the client. JavaScript runs in the browser (frontend). PHP handles databases, sessions, and file operations; JS handles UI interactivity.

**Q3:** Can you run PHP code on a client's browser?
**A:** No. PHP code is executed on the server. The browser only receives the output (usually HTML). Users cannot view the PHP source code via "View Source."

**Q4:** What major versions of PHP exist, and what was new in PHP 8?
**A:** Major versions include PHP 4, 5, 7, and 8. PHP 8 introduced JIT (Just-In-Time) compilation, named arguments, attributes, match expression, and union types.

**Q5:** Name three popular PHP frameworks.
**A:** Laravel, Symfony, and CodeIgniter. Others include CakePHP, Yii, and Zend Framework.

## ⚠ Common Errors / Mistakes
- **Forgetting `<?php` tag**: Raw PHP code without the opening tag is output as plain text.
- **White screen of death**: Often caused by a syntax error with `display_errors` disabled. Always develop with error reporting on.
- **Mixing client and server logic**: Trying to use PHP to update the page after it's already loaded (requires AJAX instead).

## 📝 Practice Exercises
**Beginner:**
1. Create a PHP page that displays your name, age, and favorite color using echo statements.
2. Write a PHP script that displays the current date, time, and timezone of the server.
3. Create a simple PHP page that calculates and displays the result of 15 + 27 * 3.

**Intermediate:**
4. Build a PHP page that reads a `?theme=dark` or `?theme=light` parameter from the URL and outputs a corresponding CSS class on the body tag.
5. Write a PHP script that displays a different greeting based on the current hour (early morning, morning, afternoon, evening, night).
6. Create a page that reads two numbers from query string parameters (`a` and `b`) and displays their sum, difference, product, and quotient.

**Advanced:**
7. Build a mini-access-log system: each time a page is loaded, append the visitor's IP, browser user agent, and timestamp to a `visits.log` file.
8. Create a PHP script that parses a URL parameter `?page=home|about|contact` and loads the corresponding include file (`home.php`, `about.php`, `contact.php`) securely, rejecting invalid page names.
