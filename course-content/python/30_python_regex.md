## 30. Python RegEx

## 📘 Introduction
Regular expressions (regex) are sequences of characters that define search patterns for string matching and manipulation. Python's `re` module provides full support for regular expressions, allowing you to search, match, replace, and split strings based on complex patterns. Regex is a powerful tool for text processing — it can validate email addresses, extract phone numbers from documents, parse log files, find patterns in DNA sequences, and much more. The `re` module includes functions like `re.match()` (match at the beginning of a string), `re.search()` (search anywhere in a string), `re.findall()` (find all matches), `re.sub()` (replace matches), and `re.split()` (split string by pattern). Regex patterns use metacharacters (`. ^ $ * + ? {} [] \ | ()`) and special sequences (`\d`, `\w`, `\s`) to define flexible search criteria. While regex syntax can be intimidating at first, mastering it opens up a world of text processing capabilities.

## 🧠 Key Concepts

- **`re.match(pattern, string)`** — Checks if the pattern matches at the beginning of the string
- **`re.search(pattern, string)`** — Searches for the first occurrence of the pattern anywhere
- **`re.findall(pattern, string)`** — Returns all non-overlapping matches as a list of strings
- **`re.sub(pattern, replacement, string)`** — Replaces all occurrences of the pattern
- **`re.split(pattern, string)`** — Splits string at each occurrence of the pattern
- **Metacharacters:** `.` (any char), `^` (start), `$` (end), `*` (0 or more), `+` (1 or more), `?` (0 or 1), `{}` (exact count), `[]` (character class), `\` (escape), `|` (OR), `()` (group)
- **Character classes:** `[abc]` (a, b, or c), `[a-z]` (range), `[^abc]` (not a, b, c)
- **Predefined classes:** `\d` (digit), `\D` (non-digit), `\w` (word char), `\W` (non-word), `\s` (whitespace), `\S` (non-whitespace)
- **Groups:** `(pattern)` captures matched text; `\1`, `\2` backreferences
- **Anchors:** `^` (start of string/line), `$` (end of string/line), `\b` (word boundary)
- **Flags:** `re.IGNORECASE` / `re.I` (case-insensitive), `re.MULTILINE` / `re.M` (^ and $ match lines), `re.DOTALL` / `re.S` (`.` matches newline), `re.VERBOSE` / `re.X` (allow comments)
- **Raw strings** — Always use `r"pattern"` to avoid escaping backslashes
- **`re.compile(pattern, flags)`** — Precompiles a pattern for reuse

## 💻 Syntax

```python
import re

# Basic matching
text = "The price is $25.99 and $10.50"
match = re.search(r"\$\d+\.\d{2}", text)
if match:
    print(match.group())  # $25.99

# Find all matches
prices = re.findall(r"\$\d+\.\d{2}", text)
print(prices)  # ['$25.99', '$10.50']

# Substitution
cleaned = re.sub(r"\$", "", text)
print(cleaned)  # The price is 25.99 and 10.50

# Splitting
parts = re.split(r"\s+", text)
print(parts)  # ['The', 'price', 'is', '$25.99', 'and', '$10.50']

# Match at beginning
if re.match(r"The", text):
    print("Starts with 'The'")  # matches

# Using groups
phone = "Call me at (555) 123-4567"
pattern = r"\((\d{3})\)\s(\d{3})-(\d{4})"
m = re.search(pattern, phone)
if m:
    print(f"Area: {m.group(1)}, Prefix: {m.group(2)}, Line: {m.group(3)}")

# Using flags
print(re.findall(r"the", text, re.IGNORECASE))  # ['The', 'the']

# Compile for reuse
email_pattern = re.compile(r"\b[\w.-]+@[\w.-]+\.\w+\b")
```

**Line-by-line explanation:**
- `r"\$\d+\.\d{2}"` — raw string: `\$` (literal $), `\d+` (one or more digits), `\.` (literal dot), `\d{2}` (exactly 2 digits)
- `re.search()` returns a match object or `None`; `match.group()` gets the matched text
- `re.findall()` returns a list of all matches as strings
- `re.sub(r"\$", "", text)` replaces all `$` with empty string
- `re.split(r"\s+", text)` splits on one or more whitespace characters
- `re.match(r"The", text)` only matches if the pattern is at the start of the string
- Group references: `m.group(1)` gets the first captured group; groups are numbered by opening `(`
- `re.IGNORECASE` makes the pattern case-insensitive

## ✅ Example 1 - Basic

**Problem:** Validate email addresses and extract their components (username, domain, TLD) from a list of strings.

**Code:**
```python
import re

def analyze_email(email):
    """Validate an email and extract components."""
    pattern = r"^([\w.+-]+)@([\w-]+)\.([a-zA-Z]{2,})$"
    match = re.match(pattern, email)

    if match:
        username = match.group(1)
        domain = match.group(2)
        tld = match.group(3)

        print(f"✓ Valid: {email}")
        print(f"  Username: {username}")
        print(f"  Domain:   {domain}")
        print(f"  TLD:      {tld}")
        return True
    else:
        print(f"✗ Invalid: {email}")
        return False

# Test emails
emails = [
    "user@example.com",
    "john.doe+tag@gmail.com",
    "invalid-email@",
    "no-tld@domain",
    "user@sub.domain.co.uk",
]

print("=== Email Validation ===\n")
for e in emails:
    analyze_email(e)
    print()

# Extract all emails from a text
text = "Contact us at support@company.com or sales@company.org. For issues: help@my-site.io."
found_emails = re.findall(r"[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}", text)
print(f"\nAll emails found: {found_emails}")
```

**Output:**
```
=== Email Validation ===

✓ Valid: user@example.com
  Username: user
  Domain:   example
  TLD:      com

✓ Valid: john.doe+tag@gmail.com
  Username: john.doe+tag
  Domain:   gmail
  TLD:      com

✗ Invalid: invalid-email@

✗ Invalid: no-tld@domain

✓ Valid: user@sub.domain.co.uk
  Username: user
  Domain:   sub.domain.co
  TLD:      uk

All emails found: ['support@company.com', 'sales@company.org', 'help@my-site.io']
```

**Explanation:**
- `^` and `$` anchors ensure the entire string must match (full validation)
- `([\w.+-]+)` captures the username — word chars, dots, plus, or hyphens
- `@` matches the literal at-sign
- `([\w-]+)` captures the domain — word chars and hyphens
- `\.` matches the literal dot before the TLD
- `([a-zA-Z]{2,})` captures the TLD — at least 2 letters (most restrictive part)
- `re.match()` anchors at start implicitly (same as `^` at beginning)
- `re.findall()` extracts all emails from a larger text block

## 🚀 Example 2 - Intermediate

**Problem:** Parse a server log file (multi-line) to extract timestamp, log level, and error message. Use groups, flags, and substitution to anonymize IP addresses.

**Code:**
```python
import re

log_data = """
[2026-06-23 10:15:30] ERROR  192.168.1.100 - User authentication failed for 'admin'
[2026-06-23 10:16:45] WARNING 10.0.0.5 - Disk space at 85%
[2026-06-23 10:17:00] INFO   192.168.1.200 - Health check passed
[2026-06-23 10:18:22] ERROR  172.16.0.10 - Connection timeout to database
[2026-06-23 10:19:00] INFO   192.168.1.100 - Logout successful
"""

# Pattern to parse log entries
log_pattern = re.compile(
    r"\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\]\s+"  # timestamp
    r"(ERROR|WARNING|INFO)\s+"                            # log level
    r"(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\s+-\s+"      # IP address
    r"(.+)",                                              # message
    re.MULTILINE
)

print("=== Parsed Log Entries ===")
for match in log_pattern.finditer(log_data):
    timestamp = match.group(1)
    level = match.group(2)
    ip = match.group(3)
    message = match.group(4)

    print(f"[{timestamp}] [{level:<7}] {ip} -> {message}")

# Count errors vs warnings vs info
levels = re.findall(r"(ERROR|WARNING|INFO)", log_data)
print(f"\n=== Level Counts ===")
for level in ["ERROR", "WARNING", "INFO"]:
    print(f"{level}: {levels.count(level)}")

# Anonymize IP addresses (replace last octet with XXX)
anonymized = re.sub(
    r"(\d{1,3}\.\d{1,3}\.\d{1,3})\.\d{1,3}",
    r"\1.XXX",
    log_data
)
print(f"\n=== Anonymized Log ===")
print(anonymized)

# Extract ERROR messages with multiline
error_pattern = re.compile(r"ERROR.*", re.MULTILINE | re.IGNORECASE)
errors = error_pattern.findall(log_data)
print(f"\n=== Error Messages ===")
for e in errors:
    print(e.strip())
```

**Output:**
```
=== Parsed Log Entries ===
[2026-06-23 10:15:30] [ERROR  ] 192.168.1.100 -> User authentication failed for 'admin'
[2026-06-23 10:16:45] [WARNING] 10.0.0.5 -> Disk space at 85%
[2026-06-23 10:17:00] [INFO   ] 192.168.1.200 -> Health check passed
[2026-06-23 10:18:22] [ERROR  ] 172.16.0.10 -> Connection timeout to database
[2026-06-23 10:19:00] [INFO   ] 192.168.1.100 -> Logout successful

=== Level Counts ===
ERROR: 2
WARNING: 1
INFO: 2

=== Anonymized Log ===

[2026-06-23 10:15:30] ERROR  192.168.1.XXX - User authentication failed for 'admin'
[2026-06-23 10:16:45] WARNING 10.0.0.XXX - Disk space at 85%
[2026-06-23 10:17:00] INFO   192.168.1.XXX - Health check passed
[2026-06-23 10:18:22] ERROR  172.16.0.XXX - Connection timeout to database
[2026-06-23 10:19:00] INFO   192.168.1.XXX - Logout successful
```

**Explanation:**
- A multi-line pattern is compiled with `re.MULTILINE` so `^` and `$` match line boundaries
- `re.compile()` precompiles the pattern for performance when used multiple times
- `log_pattern.finditer()` yields match objects one at a time (memory-efficient)
- Groups capture timestamp, log level, IP, and message separately
- `re.findall(r"(ERROR|WARNING|INFO)", log_data)` extracts just the level keywords
- `re.sub()` with a backreference (`\1`) replaces the IP while preserving the first 3 octets
- `(\d{1,3}\.\d{1,3}\.\d{1,3})\.\d{1,3}` captures the first 3 octets in group 1, then matches the last octet
- `re.IGNORECASE` ensures we catch "error", "Error", "ERROR" etc.

## 🏢 Real World Use Case

**Company: GitHub** — GitHub uses regex extensively in their code search, syntax highlighting, and security scanning systems. When you search a repository for a pattern (like `TODO` or `FIXME`), GitHub uses `re.search()` and `re.findall()` to locate matches. Their secret scanning feature uses compiled regex patterns to detect accidentally committed API keys, tokens, and passwords in code — patterns like `r"(?i)(?:api[_-]?key|secret)[^=]*=[^a-z0-9]*([a-z0-9]{32,})"`. GitHub's language detection uses regex to identify file signatures. Their commit message linting uses `re.match()` to enforce conventional commit format (`^(feat|fix|docs|chore|BREAKING): .{1,72}$`). The `re.sub()` function is used in their markdown renderer to sanitize user input and prevent XSS attacks.

**Other uses:** Data validation (email, phone, credit card), log analysis (Splunk, ELK stack), web scraping (BeautifulSoup regex filters), NLP (tokenization, pattern extraction), and code linting (ESLint, Pylint use regex for pattern detection).

## 🎯 Interview Questions

**1. What is the difference between `re.match()` and `re.search()`?**

`re.match()` checks for a match only at the beginning of the string (implicitly anchored at `^`). `re.search()` scans the entire string for the first occurrence of the pattern. If the pattern is not at the start, `re.match()` returns `None` while `re.search()` finds it further in the string.

**2. Explain the difference between `re.findall()` and `re.finditer()`.**

Both find all non-overlapping matches. `re.findall()` returns a list of strings (or tuples if there are groups). `re.finditer()` returns an iterator yielding match objects, which is more memory-efficient for large texts and gives access to match object methods like `.group()`, `.start()`, `.end()`.

**3. What are raw strings and why are they important in regex?**

Raw strings (`r"pattern"`) prevent Python from interpreting backslashes as escape sequences. In a normal string, `\n` is a newline; in a raw string, it's a literal backslash followed by `n`. Since regex heavily uses backslashes (`\d`, `\w`, `\s`, `\.`), raw strings avoid confusion like writing `\\\\d` to match a digit.

**4. How do you make a regex case-insensitive?**

Use the `re.IGNORECASE` (or `re.I`) flag. This can be passed as a third argument to `re.match()`, `re.search()`, etc., or as a flag to `re.compile()`. For example: `re.findall(r"hello", text, re.IGNORECASE)` matches "hello", "Hello", "HELLO", etc.

**5. What is a greedy vs non-greedy match in regex?**

By default, quantifiers (`*`, `+`, `{}`) are greedy — they match as much text as possible. Adding `?` after them makes them non-greedy (lazy) — they match as little as possible. Example: in `<div>text</div><p>para</p>`, `r"<.+>"` matches the entire string (greedy), while `r"<.+?>"` matches only `<div>`, `</div>`, `<p>`, `</p>` individually.

## ⚠ Common Errors / Mistakes

**Error 1: Forgetting to use raw strings**
```python
import re

# BAD — \b in a normal string is a backspace character
text = "word boundary"
re.search(r"\bword\b", text)  # Works with raw string
# re.search("\bword\b", text)  # Matches backspace, not word boundary!

# FIX — always use raw strings
re.search(r"\bword\b", text)  # Correct
```

**Error 2: Not escaping special characters**
```python
# BAD — . matches ANY character, not a literal dot
text = "hello.world"
re.findall(r".", text)  # Matches every character, not just dots!

# FIX — escape the dot
re.findall(r"\.", text)  # Matches only dots: ['.']
```

**Error 3: Greedy matching when lazy is needed**
```python
text = "<h1>Title</h1><p>Body</p>"

# BAD — greedy * matches too much
re.search(r"<.*>", text).group()  # '<h1>Title</h1><p>Body</p>'

# FIX — lazy *?
re.search(r"<.*?>", text).group()  # '<h1>'
```

**Error 4: Using `re.match()` when `re.search()` is needed**
```python
# BAD — re.match only checks start
text = "The quick brown fox"
re.match(r"quick", text)  # None — "quick" is not at the start

# FIX — use re.search
re.search(r"quick", text)  # Match object found
```

**Error 5: Forgetting to capture groups with parentheses**
```python
# BAD — no parentheses, can't extract sub-parts
text = "Price: $45.99"
m = re.search(r"\$\d+\.\d{2}", text)
print(m.group())  # $45.99 — whole match only

# FIX — use groups
m = re.search(r"\$(\d+)\.(\d{2})", text)
print(f"Dollars: {m.group(1)}, Cents: {m.group(2)}")  # Dollars: 45, Cents: 99
```

## 📝 Practice Exercises

**Beginner:**
1. Write a regex pattern to find all phone numbers in the format `XXX-XXX-XXXX` from a block of text. Use `re.findall()`.
2. Create a function `is_valid_username(name)` that returns `True` if the username is 3-16 characters long and contains only letters, digits, and underscores.
3. Write a program that replaces all occurrences of "cat" with "dog" in a sentence, case-insensitively.

**Intermediate:**
4. Write a regex that matches dates in both formats `YYYY-MM-DD` and `DD/MM/YYYY`. Extract the year, month, and day using groups.
5. Create a log file parser that reads a multi-line log, extracts all IP addresses, counts unique IPs, and prints the count per IP.
6. Write a function `password_strength(password)` that uses individual regex patterns to check: minimum 8 chars, at least 1 uppercase, 1 lowercase, 1 digit, 1 special char. Return a score out of 5.

**Advanced:**
7. Implement a simple template engine: write a function `render(template, data)` that replaces `{{ variable_name }}` placeholders in a string with values from a dictionary using `re.sub()`. Support nested keys like `{{ user.name }}`.
8. Create a CSV validator using regex: write a program that validates that each line in a CSV file has the correct number of fields (specified by the header), accounting for quoted fields that may contain commas and newlines.
