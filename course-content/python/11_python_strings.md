# 11. Python Strings

## 📘 Introduction
Strings are one of the most fundamental data types in Python. They represent sequences of characters enclosed in single quotes (`'...'`), double quotes (`"..."`), triple single quotes (`'''...'''`), or triple double quotes (`"""..."""`). Python strings are **immutable** — once created, they cannot be changed. They support a rich set of operations including indexing (starting at 0), slicing, concatenation, and repetition. Python also provides a vast collection of built-in string methods for manipulation like `upper()`, `lower()`, `split()`, `join()`, `replace()`, `find()`, and `count()`. Escape sequences (`\n`, `\t`, `\\`) allow embedding special characters, while raw strings (`r"..."`) ignore escape sequences entirely. Strings are Unicode by default in Python 3, making them ideal for internationalized applications.

## 🧠 Key Concepts

- **String Creation**: Using `' '`, `" "`, `''' '''`, `""" """`, or `str()`
- **Indexing**: Zero-based. Negative indexes count from end. `s[0]` = first char, `s[-1]` = last char
- **Slicing**: `s[start:stop:step]` — extracts a substring. All three parameters are optional
- **Concatenation & Repetition**: `+` joins strings, `*` repeats a string
- **Escape Sequences**: `\n` (newline), `\t` (tab), `\\` (backslash), `\'` (single quote), `\"` (double quote)
- **Raw Strings**: Prefix `r` or `R` — `r"C:\new\folder"` treats backslashes literally
- **Immutability**: Strings cannot be modified in-place; operations return new strings
- **String Methods**: `upper()`, `lower()`, `strip()`, `split()`, `join()`, `replace()`, `find()`, `count()`, `startswith()`, `endswith()`, `isalpha()`, `isdigit()`, `isalnum()`
- **f-strings** (Python 3.6+): `f"Hello {name}"` for inline expression interpolation
- **Unicode Support**: Python 3 strings are Unicode by default; use `ord()` and `chr()` for code points

## 💻 Syntax

```python
# String creation
s1 = 'Hello'
s2 = "World"
s3 = '''Multi-line
string'''
s4 = str(42)           # "42"

# Indexing and slicing
text = "Python"
first = text[0]        # 'P'
last = text[-1]        # 'n'
sub = text[1:4]        # 'yth'
rev = text[::-1]       # 'nohtyP'

# Concatenation and repetition
greeting = "Hi " + "there"   # "Hi there"
laugh = "ha" * 3             # "hahaha"

# Escape sequences and raw strings
escaped = "Line1\nLine2"
raw = r"Line1\nLine2"        # prints \n literally
path = r"C:\Users\Name"

# Common methods
msg = "  hello world  "
msg.upper()                  # "  HELLO WORLD  "
msg.strip()                  # "hello world"
msg.split()                  # ["hello", "world"]
"-".join(["a", "b", "c"])   # "a-b-c"
msg.replace("world", "there") # "  hello there  "
msg.find("world")            # 8
msg.count("l")               # 3
```

## ✅ Example 1 - Basic

**Problem**: Write a program that takes a user's full name as input and prints the initials.

**Code**:
```python
full_name = input("Enter your full name: ")
parts = full_name.strip().split()
initials = ".".join(p[0].upper() + "." for p in parts)
print(f"Initials: {initials}")
```

**Output**:
```
Enter your full name:  john michael doe
Initials: J.M.D.
```

**Explanation**: The input is stripped of extra spaces and split into a list of words. A generator expression extracts the first character of each word, converts it to uppercase, and appends a dot. `join()` assembles the initials with dots between them.

## 🚀 Example 2 - Intermediate

**Problem**: Check if a given string is a palindrome (ignoring case, spaces, and punctuation).

**Code**:
```python
import string

def is_palindrome(s: str) -> bool:
    cleaned = "".join(ch.lower() for ch in s if ch.isalnum())
    return cleaned == cleaned[::-1]

test_strs = ["Racecar", "A man, a plan, a canal: Panama", "Hello"]
for t in test_strs:
    print(f"'{t}' -> {is_palindrome(t)}")
```

**Output**:
```
'Racecar' -> True
'A man, a plan, a canal: Panama' -> True
'Hello' -> False
```

**Explanation**: The function filters out non-alphanumeric characters using `isalnum()`, converts to lowercase, and compares the resulting string with its reverse via slicing `[::-1]`. This handles spaces, punctuation, and case differences.

## 🏢 Real World Use Case

**Company**: Slack / Discord

**Scenario**: Chat platforms use string methods extensively for message validation, filtering, and formatting. User input is stripped of leading/trailing whitespace, checked for profanity (using `replace()` or pattern matching), split into tokens for command parsing, and joined back for display. Raw strings are used to handle regex patterns for link detection. f-strings format notification messages with user names and channel names dynamically. String `find()` and `count()` are used in search functionality to locate and highlight keywords in message history.

## 🎯 Interview Questions

**1. What is the difference between `str.find()` and `str.index()`?**
Both return the lowest index of a substring. `find()` returns `-1` if not found; `index()` raises a `ValueError`.

**2. Why are strings immutable in Python?**
Immutability makes strings hashable (usable as dictionary keys), thread-safe, and enables internal optimizations like interning (reusing small strings for memory efficiency).

**3. How does Python handle Unicode strings internally?**
Python 3 stores strings as sequences of Unicode code points. Internally, Python uses either 1-byte, 2-byte, or 4-byte representation per character (compact ASCII, compact, or legacy) based on the largest code point in the string, optimizing memory usage.

**4. What is the difference between `isinstance(s, str)` and `type(s) == str`?**
`isinstance()` supports inheritance — it returns `True` for subclasses of `str`. `type() == str` is strict and only matches the exact `str` type. `isinstance()` is preferred for flexible code.

**5. Explain the output of `"abcdef".find("")` and `"abcdef".index("")`.**
Both return `0`. An empty string is always considered to be found at position 0 (the start) of any string. `find("")` will never return `-1` for a valid string.

## ⚠ Common Errors / Mistakes

**Error**: `TypeError: 'str' object does not support item assignment`
```python
s = "hello"
s[0] = "H"  # Error!
```
**Fix**: Strings are immutable; create a new one: `s = "H" + s[1:]`

**Error**: `IndexError: string index out of range`
```python
s = "abc"
s[5]  # Error!
```
**Fix**: Check length first: `if len(s) > 5: print(s[5])`

**Error**: Confusing `str` with a variable name
```python
str = "test"     # shadows built-in str()
value = str(42)  # TypeError: 'str' object is not callable
```
**Fix**: Never name variables `str`, `int`, `list`, etc.

**Error**: `AttributeError: 'int' object has no attribute 'upper'`
```python
num = 100
num.upper()  # Error! int has no such method
```
**Fix**: Convert to string first: `str(num).upper()`

**Error**: Using `==` vs `is` for string comparison
```python
a = "hello"
b = "".join(["h", "e", "l", "l", "o"])
a is b  # False (may be True due to interning, but unreliable)
```
**Fix**: Always use `==` for value comparison, not `is`.

## 📝 Practice Exercises

**Beginner:**

1. Write a program that asks the user for a sentence and prints the number of words in it.
2. Take a string input and print it in reverse order using slicing.
3. Ask the user for their email address and print only the username (part before `@`).

**Intermediate:**

4. Write a function `count_vowels(s)` that returns the count of vowels (a, e, i, o, u) case-insensitively.
5. Given a string like `"hello-world-python"`, replace all hyphens with spaces and convert to title case.
6. Write a function `remove_duplicates(s)` that returns a new string with consecutive duplicate characters removed (e.g., `"aaabbcddd"` → `"abcd"`).

**Advanced:**

7. Write a function `compress_string(s)` that compresses a string using counts of repeated characters (e.g., `"aabcccccaaa"` → `"a2b1c5a3"`). If the compressed string is not shorter than the original, return the original.
8. Implement a simple text search that finds all starting indices of a pattern in a given text, handling overlapping matches correctly.
