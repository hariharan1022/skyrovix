## 38. HTML Charsets
## 📘 Introduction
A character set (charset) defines how bytes are mapped to characters in an HTML document. Declaring the correct charset ensures text displays properly across languages, preventing garbled content like mojibake. UTF-8 is the dominant standard for modern web development.

## 🧠 Key Concepts
- **ASCII:** 7-bit set covering 128 English characters (0-127), the foundation of text encoding
- **ISO-8859-1 (Latin-1):** 8-bit set with 256 characters, supports Western European languages
- **UTF-8:** Variable-length Unicode encoding (1-4 bytes), supports all languages and symbols
- **UTF-16:** Fixed 2-byte or 4-byte Unicode encoding
- The `<meta charset>` tag declares the encoding to the browser
- UTF-8 is the recommended charset for HTML5 documents

## 💻 Syntax (HTML code)
```html
<!-- HTML5 charset declaration -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body>

<!-- Legacy charset declaration (HTML4) -->
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Create a multilingual greeting page with proper UTF-8 encoding.

**Code:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Multilingual Greetings</title>
</head>
<body>
    <h1>Greetings Around the World</h1>
    <ul>
        <li>English: Hello</li>
        <li>French: Bonjour</li>
        <li>Japanese: こんにちは</li>
        <li>Arabic: مرحبا</li>
        <li>Russian: Здравствуйте</li>
        <li>Chinese: 你好</li>
        <li>Hindi: नमस्ते</li>
    </ul>
</body>
</html>
```

**Output:** Displays greetings in seven different scripts (Latin, Japanese, Arabic, Cyrillic, Chinese, Devanagari) correctly rendered side by side.

**Explanation:** UTF-8 encoding supports every character from every language. Without the `<meta charset="UTF-8">` tag, non-Latin characters would likely display as garbled symbols or question marks.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Compare UTF-8, ISO-8859-1, and ASCII behavior by showing characters each can or cannot represent.

**Code:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Charset Comparison</title>
</head>
<body>
    <h2>UTF-8 Supports:</h2>
    <p>Emojis: 😀 🚀 ❤️</p>
    <p>Symbols: ∑ Δ π ∞</p>
    <p>CJK: 漢字 ひらがな</p>
    <p>Math: ∀ ∃ ∈ ∉</p>
    
    <h2>ISO-8859-1 Supports:</h2>
    <p>Western European: À Á Â Ã Ä Å</p>
    <p>Punctuation: « » ¡ ¿</p>
    <p>Currency: ¢ £ ¥ ¤</p>
    
    <h2>ASCII (0-127):</h2>
    <p>A-Z, a-z, 0-9, basic punctuation</p>
</body>
</html>
```

**Output:** Shows the full range of UTF-8 (emojis, CJK, math symbols), ISO-8859-1 subset (Western European accents, specific punctuation), and ASCII's limited English-only set.

**Explanation:** ASCII covers only English; ISO-8859-1 adds Western European characters; UTF-8 encompasses every Unicode character, making it the only practical choice for global web content.

## 🏢 Real World Use Case
Global websites (Wikipedia, Google, Facebook) use UTF-8 to serve content in hundreds of languages; e-commerce platforms handle product names in multiple scripts; database connections specify UTF-8 to prevent data corruption; email systems declare charset for proper message rendering across clients.

## 🎯 Interview Questions (5 with answers)
1. **Q:** What is the default charset in HTML5?
   **A:** UTF-8. The HTML5 specification strongly recommends UTF-8 as the default and only required charset.

2. **Q:** What happens if you omit the charset declaration in HTML?
   **A:** The browser may fall back to a default encoding (often ISO-8859-1 or Windows-1252), potentially displaying non-ASCII characters incorrectly.

3. **Q:** How does UTF-8 differ from UTF-16?
   **A:** UTF-8 uses 1-4 bytes per character (space-efficient for ASCII) while UTF-16 uses 2 or 4 bytes. UTF-8 is dominant on the web due to backward compatibility with ASCII.

4. **Q:** What is the correct way to declare charset in HTML5 vs HTML4?
   **A:** HTML5: `<meta charset="UTF-8">`. HTML4: `<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">`.

5. **Q:** Why can't ASCII represent "café" correctly?
   **A:** ASCII only defines 128 characters. The character "é" has a code point (233) beyond ASCII's 7-bit range, requiring an extended charset like UTF-8 or ISO-8859-1.

## ⚠ Common Errors / Mistakes
- Omitting the charset meta tag entirely
- Placing the charset meta tag after content that uses non-ASCII characters
- Using ISO-8859-1 for pages containing emojis or non-European scripts
- Mismatch between declared charset and actual file encoding (saved as UTF-8 but declared as ISO-8859-1)
- Assuming the server's `Content-Type` header charset always matches the HTML meta tag

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Create an HTML page with your name in three different languages using UTF-8.
2. Write an HTML document that intentionally omits the charset tag and add non-ASCII characters — observe the behavior.
3. Build a page displaying all 26 English alphabet letters in both uppercase and lowercase using ASCII.

**Intermediate:**
4. Create a comparison page showing five characters that exist in ISO-8859-1 but not in ASCII, and five that exist in UTF-8 but not in ISO-8859-1.
5. Build a currency symbol showcase using UTF-8 that includes dollar, euro, pound, yen, rupee, won, ruble, and bitcoin symbols.
6. Write an HTML page with proper charset declaration that includes both emojis and technical symbols.

**Advanced:**
7. Create a comprehensive character encoding reference page showing at least 30 characters from each of three categories: ASCII, extended Latin, and Unicode-only (CJK, emoji, math symbols).
8. Build a multi-page website simulation where page1 uses UTF-8 and page2 uses ISO-8859-1, demonstrating the rendering differences for the same content.
