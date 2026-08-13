# 22. PHP RegEx

## 📘 Introduction
Regular Expressions (RegEx) are patterns used to match character combinations in strings. PHP provides PCRE (Perl Compatible Regular Expression) functions including `preg_match`, `preg_match_all`, `preg_replace`, and `preg_split` for powerful text processing and validation.

## 🧠 Key Concepts
- **`preg_match`**: Returns 1 if the pattern matches, 0 otherwise. Stops at first match.
- **`preg_match_all`**: Finds all matches and stores them in a referenced array.
- **`preg_replace`**: Searches and replaces using a pattern.
- **`preg_split`**: Splits a string by a pattern (like `explode` on steroids).
- **Pattern delimiters**: Patterns must be wrapped in delimiters (commonly `/`).
- **Modifiers**: Flags like `i` (case-insensitive), `m` (multiline), `u` (UTF-8).
- **Common patterns**: Email validation, phone number, URL, date formats.

## 💻 Syntax
```php
// preg_match
if (preg_match("/pattern/i", $subject)) {
    echo "Match found!";
}

// preg_match_all — captures all matches into $matches
preg_match_all("/\d+/", "Item 1: $10, Item 2: $25", $matches);

// preg_replace
$result = preg_replace("/\s+/", "-", "hello world");

// preg_split
$parts = preg_split("/[\s,]+/", "apple, banana orange");
```

## ✅ Example 1 - Basic

**Problem:** Validate a simple email address format using regex.

**Code:**
```php
<?php
$email = "user@example.com";
$pattern = "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/";

if (preg_match($pattern, $email)) {
    echo "$email is valid.";
} else {
    echo "$email is invalid.";
}
?>
```

**Output:**
```
user@example.com is valid.
```

**Explanation:** The pattern ensures the email has a local part, an `@`, a domain name, and a TLD of at least 2 letters. `^` and `$` anchor the match to the full string.

## 🚀 Example 2 - Intermediate

**Problem:** Parse a block of text and extract all phone numbers in US format (e.g., 123-456-7890 or (123) 456-7890). Then replace them with a masked version.

**Code:**
```php
<?php
$text = "Contact us at (555) 123-4567 or 888-999-0000. Old: 111-222-3333.";

// Extract all phone numbers
$phonePattern = "/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/";
preg_match_all($phonePattern, $text, $matches);
echo "Found phones:\n";
print_r($matches[0]);

// Mask — replace digits with X except last 4
$masked = preg_replace("/\d(?=\d{4})/", "X", $text);
echo "\nMasked:\n$masked";
?>
```

**Output:**
```
Found phones:
Array
(
    [0] => (555) 123-4567
    [1] => 888-999-0000
    [2] => 111-222-3333
)
Masked:
Contact us at (XXX) XXX-4567 or XXX-XXX-0000. Old: XXX-XXX-3333.
```

**Explanation:** `preg_match_all` extracts all matches. `preg_replace` uses a lookahead `(?=\d{4})` to keep the last 4 digits unmasked while replacing preceding digits with `X`.

## 🏢 Real World Use Case
**Log File Parser:** Parse an Apache access log to extract IP addresses, timestamps, and request URIs for analytics and anomaly detection.

```php
<?php
$logLine = '192.168.1.1 - - [23/Jun/2026:14:30:15 +0000] "GET /api/users HTTP/1.1" 200 1234';
$pattern = '/^(\S+) .+ \[(.+)\] "(\S+) (\S+) \S+" (\d+) (\d+)$/';

if (preg_match($pattern, $logLine, $m)) {
    echo "IP: {$m[1]}, Date: {$m[2]}, Method: {$m[3]}, Path: {$m[4]}, Status: {$m[5]}";
}
?>
```

## 🎯 Interview Questions

**1. What is the difference between `preg_match` and `preg_match_all`?**  
`preg_match` stops after the first match; `preg_match_all` finds all non-overlapping matches.

**2. What do the `^` and `$` anchors mean?**  
`^` asserts start of string; `$` asserts end of string. Without them, the pattern can match anywhere in the string.

**3. What is a backreference in regex?**  
A backreference like `\1` refers to the text captured by the first capturing group `(...)`. Useful for matching repeated words or paired tags.

**4. How do you make a pattern case-insensitive?**  
Add the `i` modifier after the closing delimiter: `/pattern/i`.

**5. What is the `u` modifier used for?**  
The `u` modifier enables UTF-8 mode, allowing correct matching of multibyte characters like Unicode letters and emoji.

## ⚠ Common Errors / Mistakes
- **Forgetting delimiters**: Patterns must start and end with a delimiter like `/pattern/`.
- **Unescaped special characters**: Characters like `.`, `*`, `?`, `+`, `(`, `)`, `[`, `]` have special meaning and must be escaped with `\` to match literally.
- **Greedy vs lazy matching**: `.*` is greedy (matches as much as possible). Use `.*?` for lazy matching.
- **Not using `^` and `$` in validation**: Without them, the pattern can match a substring and incorrectly pass validation.

## 📝 Practice Exercises

**Beginner**
1. Write a regex pattern and `preg_match` to check if a string contains only letters (a-z, A-Z).
2. Use `preg_replace` to replace all spaces in a string with underscores.
3. Use `preg_split` to split a comma-separated string into an array, ignoring whitespace around commas.

**Intermediate**
4. Validate a 10-digit phone number in the format XXX-XXX-XXXX using regex.
5. Extract all URLs (http/https) from a block of text using `preg_match_all`.
6. Use regex to check if a password has at least 8 characters, one uppercase, one lowercase, one digit, and one special character.

**Advanced**
7. Write a regex that validates a date in YYYY-MM-DD format, ensuring month is 01-12 and day is valid for the month.
8. Build a template engine that finds `{{ variable_name }}` patterns in a string and replaces them with values from an associative array using `preg_replace_callback`.
