## 39. HTML URL Encode
## 📘 Introduction
URL encoding (percent-encoding) converts characters in a URL into a format that can be transmitted safely over the internet. Special characters, spaces, and non-ASCII characters are replaced with a `%` followed by two hexadecimal digits representing their ASCII or UTF-8 byte value.

## 🧠 Key Concepts
- Only ASCII characters (A-Z, a-z, 0-9, and `-._~`) are unreserved and safe in URLs
- Spaces are encoded as `%20` (or `+` in query strings in application/x-www-form-urlencoded)
- Reserved characters (`:, /, ?, #, [, ], @, !, $, &, ', (, ), *, +, ,, ;, =`) have special meanings
- Non-ASCII characters are encoded as their UTF-8 byte sequences
- Query string parameters use key=value pairs separated by `&`
- JavaScript provides `encodeURIComponent()` and `encodeURI()` for encoding

## 💻 Syntax (HTML code)
```html
<!-- Space encoded -->
<a href="page.php?name=John%20Doe">Link</a>

<!-- Special characters encoded -->
<a href="search.php?q=HTML%26CSS%3ABasics">Search</a>

<!-- Multiple query parameters -->
<form action="process.php" method="GET">
    <input type="text" name="user" value="john%40example.com">
</form>
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Create a search link that passes a query with spaces and special characters.

**Code:**
```html
<!DOCTYPE html>
<html>
<body>
    <h2>Search Examples</h2>
    
    <p>Search for "HTML & CSS Basics":</p>
    <a href="search.php?q=HTML%20%26%20CSS%20Basics">
        HTML %26 CSS Basics
    </a>
    
    <p>Search for "100% Complete":</p>
    <a href="search.php?q=100%25%20Complete">
        100%25 Complete
    </a>
    
    <p>Category filter:</p>
    <a href="products.php?cat=Books&sort=price&order=asc">
        Books by Price
    </a>
</body>
</html>
```

**Output:** Three links where spaces become `%20`, `&` becomes `%26`, and `%` becomes `%25`. The third link shows multiple query parameters separated by `&`.

**Explanation:** Without encoding, spaces would break URLs and `&` would be interpreted as a query parameter separator. Encoding ensures the literal characters are transmitted safely to the server.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Build a query string encoder display that shows how different characters are encoded.

**Code:**
```html
<!DOCTYPE html>
<html>
<body>
    <h2>URL Encoding Reference</h2>
    
    <h3>Common Encodings</h3>
    <table border="1">
        <tr><th>Character</th><th>Encoded</th></tr>
        <tr><td>space</td><td>%20</td></tr>
        <tr><td>!</td><td>%21</td></tr>
        <tr><td>#</td><td>%23</td></tr>
        <tr><td>$</td><td>%24</td></tr>
        <tr><td>%</td><td>%25</td></tr>
        <tr><td>&</td><td>%26</td></tr>
        <tr><td>+</td><td>%2B</td></tr>
        <tr><td>/</td><td>%2F</td></tr>
        <tr><td>?</td><td>%3F</td></tr>
        <tr><td>@</td><td>%40</td></tr>
    </table>
    
    <h3>Form with encoded submission</h3>
    <form action="submit.php" method="GET">
        <label>Name: <input type="text" name="name" value="John Doe"></label>
        <label>Message: <input type="text" name="msg" value="50% off & more!"></label>
        <button type="submit">Submit</button>
    </form>
    <p>URL will encode: spaces as %20 or +, & as %26, % as %25</p>
</body>
</html>
```

**Output:** A reference table showing URL encodings for common special characters, plus a form whose GET submission automatically encodes values in the query string.

**Explanation:** Browsers automatically encode form data submitted via GET. The `method="GET"` appends encoded key=value pairs to the URL. The server decodes them back to original values.

## 🏢 Real World Use Case
Search engines encode user queries with `%20` for spaces; API endpoints encode JSON parameters in URLs; file download links encode filenames with special characters; e-commerce product URLs encode product names with spaces/accents; tracking pixels encode analytics data in query strings.

## 🎯 Interview Questions (5 with answers)
1. **Q:** What is the difference between `%20` and `+` in URL encoding?
   **A:** `%20` is the standard encoding for spaces in any URL. The `+` character is used for spaces only in the query string portion when using `application/x-www-form-urlencoded` content type.

2. **Q:** Why must the `&` character be encoded in a URL query string value?
   **A:** Because `&` is the delimiter between query parameters. Without encoding `&` as `%26`, the URL parser would interpret it as a new parameter separator.

3. **Q:** Which JavaScript function should you use to encode a full URL vs a query parameter?
   **A:** `encodeURI()` encodes a full URL but preserves characters that are part of the URL syntax. `encodeURIComponent()` encodes everything including URL-special characters, suitable for query parameter values.

4. **Q:** How are non-ASCII characters (like Chinese or Arabic) encoded in URLs?
   **A:** Non-ASCII characters are first encoded to UTF-8 bytes, then each byte is percent-encoded. For example, `你好` becomes `%E4%BD%A0%E5%A5%BD`.

5. **Q:** What characters are unreserved and never need encoding in URLs?
   **A:** Letters A-Z (both cases), digits 0-9, and the characters `-`, `_`, `.`, `~`. These are always safe and never need percent-encoding.

## ⚠ Common Errors / Mistakes
- Encoding the entire URL including the `https://` part (only encode the path, query, or fragment)
- Double-encoding (e.g., submitting `%2520` when `%20` was intended)
- Using `+` for spaces in URL paths (works only in query strings)
- Forgetting to encode `#` which would be interpreted as a fragment identifier
- Not encoding user-generated input in URLs, leading to broken links or injection vulnerabilities

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Create a link to `search.php?query=html basics` that properly encodes the space.
2. Build a simple form with method="GET" containing three text fields and observe the URL after submission.
3. Write an anchor tag that links to a page with a filename containing spaces (e.g., "my file.pdf").

**Intermediate:**
4. Create a reference table showing URL-encoded forms of at least 15 special characters.
5. Build a product filter page with multiple GET parameters (category, price range, sort order, page number) using properly encoded links.
6. Write a URL with a query parameter value containing `&`, `%`, `#`, and spaces — encode each properly.

**Advanced:**
7. Build a query string encoder/decoder simulation page that takes user input, shows the unencoded string and its percent-encoded form including multi-byte characters (e.g., Japanese or emoji).
8. Create a full URL builder that takes separate inputs (protocol, domain, path, query params as key-value pairs) and constructs a valid encoded URL, displaying both the raw and encoded versions.
