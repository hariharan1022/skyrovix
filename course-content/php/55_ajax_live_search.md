## 55. AJAX Live Search

## 📘 Introduction
AJAX (Asynchronous JavaScript and XML) allows web pages to send and receive data from a server without reloading the page. A live search feature displays search suggestions/results as the user types, using the `onkeyup` event to trigger AJAX requests to a PHP backend that queries a database with `LIKE` operator.

## 🧠 Key Concepts
- **AJAX** — asynchronous HTTP requests using `XMLHttpRequest` or `fetch()` API
- **PHP backend** — receives search term, queries database, returns results (JSON or HTML)
- **JavaScript `onkeyup` event** — fires after each keystroke to trigger search
- **`XMLHttpRequest`** — traditional AJAX object for making HTTP requests
- **`fetch()` API** — modern Promise-based alternative to `XMLHttpRequest`
- **Debouncing** — delays the AJAX call until the user stops typing (avoids excessive requests)
- **Dynamic result display** — inject results into the DOM using `innerHTML` or DOM methods
- **MySQL `LIKE` query** — `SELECT * FROM articles WHERE title LIKE '%search%'`
- **Security** — use prepared statements to prevent SQL injection

## 💻 Syntax

```html
<input type="text" id="searchBox" onkeyup="search(this.value)" placeholder="Search...">
<div id="results"></div>

<script>
function search(query) {
    if (query.length < 2) { document.getElementById('results').innerHTML = ''; return; }
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById('results').innerHTML = this.responseText;
        }
    };
    xhr.open('GET', 'search.php?q=' + encodeURIComponent(query), true);
    xhr.send();
}
</script>
```

```php
// PHP (search.php)
$q = $_GET['q'] ?? '';
$stmt = $pdo->prepare("SELECT title, url FROM articles WHERE title LIKE ? LIMIT 10");
$stmt->execute(["%$q%"]);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($results);
```

## ✅ Example 1 - Basic: Simple Live Search with XMLHttpRequest

**Problem:** Build a live search that searches a hardcoded PHP array and displays results dynamically.

**search.html:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Live Search</title>
    <style>
        #searchBox { padding: 8px; width: 300px; font-size: 16px; }
        #results { margin-top: 10px; width: 316px; }
        .result-item { padding: 8px; border: 1px solid #ddd; cursor: pointer; }
        .result-item:hover { background: #f0f0f0; }
    </style>
</head>
<body>
    <h2>Live Search Example</h2>
    <input type="text" id="searchBox" placeholder="Type to search..." autocomplete="off">
    <div id="results"></div>

    <script>
    function search(query) {
        const resultsDiv = document.getElementById('results');

        if (query.length < 2) {
            resultsDiv.innerHTML = '';
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const items = JSON.parse(xhr.responseText);
                if (items.length === 0) {
                    resultsDiv.innerHTML = '<div class="result-item">No results found</div>';
                    return;
                }
                let html = '';
                items.forEach(function(item) {
                    html += '<div class="result-item">' + item + '</div>';
                });
                resultsDiv.innerHTML = html;
            }
        };
        xhr.open('GET', 'search_backend.php?q=' + encodeURIComponent(query), true);
        xhr.send();
    }
    </script>
</body>
</html>
```

**search_backend.php:**
```php
<?php
$fruits = [
    "Apple", "Apricot", "Avocado", "Banana", "Blackberry", "Blueberry",
    "Cherry", "Coconut", "Cranberry", "Date", "Elderberry", "Fig",
    "Grape", "Grapefruit", "Guava", "Kiwi", "Lemon", "Lime", "Mango",
    "Melon", "Orange", "Papaya", "Peach", "Pear", "Pineapple", "Plum",
    "Pomegranate", "Raspberry", "Strawberry", "Watermelon"
];

$q = $_GET['q'] ?? '';
if (strlen($q) < 2) {
    echo json_encode([]);
    exit;
}

$results = array_values(array_filter($fruits, function($fruit) use ($q) {
    return stripos($fruit, $q) !== false;
}));

header('Content-Type: application/json');
echo json_encode(array_slice($results, 0, 10));
?>
```

**Output (when user types "ap"):**
```
["Apple","Apricot"]
```

The browser renders two result divs: "Apple" and "Apricot".

**Explanation:** The HTML input triggers `search()` on every keystroke (add `onkeyup="search(this.value)"` to the input). The PHP backend filters an array and returns JSON. JavaScript parses the JSON and populates the results div dynamically.

## 🚀 Example 2 - Intermediate: Live Search with Debouncing and MySQL

**Problem:** Build a live search with debouncing (300ms delay) that queries a MySQL `users` table using `LIKE` with prepared statements.

**search_debounced.html:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Debounced Live Search</title>
    <style>
        body { font-family: Arial; margin: 20px; }
        #searchBox { padding: 10px; width: 350px; font-size: 16px; border: 2px solid #3498db; border-radius: 4px; }
        #results { margin-top: 15px; width: 370px; }
        .user-card { padding: 10px; border-bottom: 1px solid #eee; }
        .user-card strong { color: #2c3e50; }
        .user-card small { color: #7f8c8d; }
    </style>
</head>
<body>
    <h2>Search Users</h2>
    <input type="text" id="searchBox" placeholder="Type name or email..." autocomplete="off">
    <div id="results"></div>

    <script>
    let debounceTimer;

    function search(query) {
        clearTimeout(debounceTimer);

        if (query.length < 2) {
            document.getElementById('results').innerHTML = '';
            return;
        }

        debounceTimer = setTimeout(function() {
            fetch('user_search.php?q=' + encodeURIComponent(query))
                .then(function(response) { return response.json(); })
                .then(function(data) {
                    const resultsDiv = document.getElementById('results');
                    if (data.length === 0) {
                        resultsDiv.innerHTML = '<div class="user-card">No users found</div>';
                        return;
                    }
                    let html = '';
                    data.forEach(function(user) {
                        html += '<div class="user-card"><strong>' + user.name +
                                '</strong><br><small>' + user.email + '</small></div>';
                    });
                    resultsDiv.innerHTML = html;
                })
                .catch(function(err) {
                    console.error('Search failed:', err);
                });
        }, 300);
    }
    </script>
</body>
</html>
```

**user_search.php:**
```php
<?php
header('Content-Type: application/json');

$q = $_GET['q'] ?? '';
if (strlen($q) < 2) {
    echo json_encode([]);
    exit;
}

// Simulate PDO database connection
$host = 'localhost';
$dbname = 'test';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("SELECT id, name, email FROM users WHERE name LIKE ? OR email LIKE ? LIMIT 10");
    $likePattern = "%{$q}%";
    $stmt->execute([$likePattern, $likePattern]);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($results);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}
?>
```

**Output (when user types "al" after 300ms pause):**
```json
[
  {"id":1,"name":"Alice Johnson","email":"alice@example.com"},
  {"id":3,"name":"Alex Smith","email":"alex@example.com"}
]
```

Users "Alice Johnson" and "Alex Smith" appear as styled cards below the search box.

**Explanation:** `clearTimeout(debounceTimer)` cancels any pending search, and the actual request fires only after the user stops typing for 300ms. This prevents overwhelming the server with requests on every keystroke. The `fetch()` API provides a cleaner Promise-based alternative to `XMLHttpRequest`. The PHP backend uses PDO prepared statements with `LIKE` to search both `name` and `email` columns safely.

## 🏢 Real World Use Case
E-commerce sites like Amazon use live search with AJAX to show product suggestions as users type. The frontend sends debounced requests (typically 200-400ms) to a PHP backend endpoint that queries Elasticsearch or MySQL fulltext indexes. Results appear in a dropdown overlay with product images, prices, and categories. Additional features include caching recent searches and highlighting matched text.

## 🎯 Interview Questions

**1. What is debouncing and why is it important in live search?**
Debouncing delays the execution of a function until after a specified period of inactivity. It prevents sending an AJAX request on every keystroke, reducing server load and avoiding unnecessary network traffic.

**2. How do you prevent SQL injection in an AJAX search endpoint?**
Use prepared statements with PDO or MySQLi. Never concatenate user input directly into SQL queries. Also validate/sanitize input on the server side.

**3. What is the difference between `XMLHttpRequest` and `fetch()`?**
`fetch()` is a modern Promise-based API with cleaner syntax and better error handling. `XMLHttpRequest` is the older callback-based API. `fetch()` uses `Response` objects and works well with `async/await`.

**4. How would you handle race conditions in live search?**
If a slow request returns after a faster one, older results could replace newer ones. Use a request counter or cancellation token (AbortController) to discard responses from stale requests.

**5. How do you display a loading indicator during AJAX requests?**
Show a spinner before the request (e.g., `resultsDiv.innerHTML = '<div class="loading">Searching...</div>'`) and replace it when the response arrives (in `onreadystatechange` or `.then()`).

## ⚠ Common Errors / Mistakes

- **Forgetting `encodeURIComponent()`** — special characters in the query break the URL or cause XSS.
- **No debouncing** — sends hundreds of requests for a single search phrase.
- **SQL injection** — concatenating `$_GET['q']` directly into SQL without prepared statements.
- **Ignoring minimum query length** — sending requests for 1-character queries produces too many results.
- **Not handling empty responses** — the results div should show a "No results" message gracefully.
- **Mixing up GET/POST** — search queries are typically GET (bookmarkable), not POST.

## 📝 Practice Exercises

**Beginner**
1. Create a simple AJAX search that fetches a list of countries (hardcoded PHP array) when the user types at least 3 characters. Display matches in a list.
2. Build a live character counter: as the user types in a textarea, AJAX sends the text to PHP, which returns the character count (simulating server-side validation).
3. Create an autocomplete for city names using `XMLHttpRequest` and a PHP array. Limit results to 5.

**Intermediate**
4. Implement a live search with debouncing (250ms) that fetches data from a MySQL table. Display results in a styled dropdown. Handle the case where a slow request returns after a faster one (race condition).
5. Build a live search with a loading spinner that appears during AJAX requests and disappears when results arrive. Show "No results" for empty responses.
6. Create a search that highlights the matched text in the results. For example, searching "app" shows "<strong>App</strong>le" and "<strong>App</strong>ricot".

**Advanced**
7. Build a full live search interface with: debouncing (300ms), minimum 2 characters, keyboard navigation (arrow keys to select items, Enter to submit), loading indicator, error handling, and highlighting of matched text. Use the `fetch()` API and PHP PDO with prepared statements.
8. Implement an AJAX search with pagination: the PHP endpoint returns total count and a page of results. Add "Load More" button at the bottom of results. The search query is re-sent with a page parameter. Handle this with both `XMLHttpRequest` and `fetch()` versions.
