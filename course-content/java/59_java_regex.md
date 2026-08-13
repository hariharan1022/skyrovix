## 59. Java RegEx

## 📘 Introduction
Java provides the `java.util.regex` package with `Pattern` and `Matcher` classes for regular expression operations. Regex allows pattern-based searching, matching, replacing, and splitting of strings. Java's regex engine supports Perl-like syntax with additional flags.

## 🧠 Key Concepts
- **Pattern.compile(String regex)**: Compiles a regex into a Pattern object (immutable, thread-safe)
- **Pattern.compile(String regex, int flags)**: Compile with flags (CASE_INSENSITIVE, MULTILINE, DOTALL, UNIX_LINES)
- **matcher.find()**: Scans for the next subsequence matching the pattern (can be called multiple times)
- **matcher.matches()**: Attempts to match the ENTIRE input string against the pattern
- **matcher.group()**: Returns the matched subsequence; `group(n)` returns captured group
- **matcher.groupCount()**: Number of capturing groups
- **replaceAll(String replacement)**: Replace every match with replacement string
- **replaceFirst(String replacement)**: Replace only the first match
- **split(CharSequence input)**: Split input around matches of this pattern
- **Regex metacharacters**: `. ^ $ * + ? { } [ ] \ | ( )`
- **Common patterns**: `\d` digit, `\w` word char, `\s` whitespace, `\b` word boundary, `[abc]` character class
- **Flags**: `Pattern.CASE_INSENSITIVE` (i), `Pattern.MULTILINE` (m), `Pattern.DOTALL` (s), `Pattern.COMMENTS` (x)

## 💻 Syntax

```java
// Compile and match
Pattern p = Pattern.compile("\\d+");
Matcher m = p.matcher("abc123def456");

while (m.find()) {
    System.out.println(m.group());       // 123, 456
    System.out.println(m.start() + "-" + m.end()); // positions
}

// matches() requires full string match
boolean isMatch = Pattern.matches("\\d+", "123");     // true (entire string)
boolean isMatch2 = Pattern.matches("\\d+", "abc123");  // false

// replaceAll / replaceFirst
String result = "abc123def456".replaceAll("\\d+", "#"); // "abc#def#"

// split
String[] parts = "a,b;c|d".split("[,;|]");             // [a, b, c, d]

// Flags
Pattern p2 = Pattern.compile("java", Pattern.CASE_INSENSITIVE);
boolean hasJava = p2.matcher("I love Java").find();      // true
```

## ✅ Example 1 - Basic
**Problem**: Extract all phone numbers (format: XXX-XXX-XXXX) from a text, validate an email, and replace digits.

```java
import java.util.regex.*;

public class RegexBasics {
    public static void main(String[] args) {
        String text = "Contact: 555-123-4567 or 888-987-6543. Also 111-222-3333 is invalid";

        // Extract phone numbers
        Pattern phonePattern = Pattern.compile("\\d{3}-\\d{3}-\\d{4}");
        Matcher phoneMatcher = phonePattern.matcher(text);

        System.out.print("Phone numbers found: ");
        while (phoneMatcher.find()) {
            System.out.print(phoneMatcher.group() + " ");
        }
        System.out.println();

        // Validate email
        String email = "user@example.com";
        Pattern emailPattern = Pattern.compile("^[\\w.-]+@[\\w.-]+\\.\\w{2,}$");
        Matcher emailMatcher = emailPattern.matcher(email);
        System.out.println("Email valid: " + emailMatcher.matches());

        // Replace
        String clean = text.replaceAll("\\d{3}-\\d{3}-\\d{4}", "[REDACTED]");
        System.out.println("Clean: " + clean);

        // Split
        String csv = "apple,banana;grape|orange";
        String[] fruits = csv.split("[,;|]");
        System.out.println("Split: " + java.util.Arrays.toString(fruits));
    }
}
```

**Output:**
```
Phone numbers found: 555-123-4567 888-987-6543
Email valid: true
Clean: Contact: [REDACTED] or [REDACTED]. Also [REDACTED] is invalid
Split: [apple, banana, grape, orange]
```

**Explanation:** `\d{3}-\d{3}-\d{4}` matches phone numbers. `find()` locates each match sequentially. `matches()` requires the entire string to match the pattern. `replaceAll` substitutes all matches. `split` uses the regex as a delimiter.

## 🚀 Example 2 - Intermediate
**Problem**: Use capturing groups to extract structured data, demonstrate flags and performance with compiled patterns.

```java
import java.util.regex.*;

public class RegexAdvanced {
    public static void main(String[] args) {
        // Capturing groups: extract name and age from "Name: Alice, Age: 30"
        String data = "Name: Alice, Age: 30; Name: Bob, Age: 25";
        Pattern personPattern = Pattern.compile("Name: (\\w+), Age: (\\d+)");
        Matcher matcher = personPattern.matcher(data);

        while (matcher.find()) {
            String name = matcher.group(1);
            String age = matcher.group(2);
            System.out.println(name + " is " + age + " years old");
        }

        // Flags: CASE_INSENSITIVE and MULTILINE
        String multiline = "First Line\nsecond line\nTHIRD LINE";
        Pattern p = Pattern.compile("^\\w+", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE);
        Matcher m = p.matcher(multiline);
        System.out.print("First words (multiline): ");
        while (m.find()) System.out.print(m.group() + " ");
        System.out.println();

        // DOTALL: make . match newlines
        Pattern dotall = Pattern.compile("First.*Line", Pattern.DOTALL);
        System.out.println("DOTALL match: " + dotall.matcher(multiline).find());

        // Pre-compile pattern for reuse in loop (performance)
        Pattern emailPattern = Pattern.compile("[\\w.-]+@[\\w.-]+");
        String[] emails = {"a@b.com", "invalid", "x@y.org"};
        for (String e : emails) {
            System.out.println(e + ": " + emailPattern.matcher(e).matches());
        }

        // Back-references: find doubled words
        Pattern doubled = Pattern.compile("\\b(\\w+)\\s+\\1\\b");
        Matcher d = doubled.matcher("this this is a test test");
        while (d.find()) System.out.println("Doubled: " + d.group());
    }
}
```

**Output:**
```
Alice is 30 years old
Bob is 25 years old
First words (multiline): First second THIRD
DOTALL match: true
a@b.com: true
invalid: false
x@y.org: true
Doubled: this this
Doubled: test test
```

**Explanation:** Capturing groups `(\\w+)` and `(\\d+)` extract named portions. `MULTILINE` makes `^`/`$` match line boundaries. `DOTALL` makes `.` match `\n`. The `\1` back-reference matches the previously captured word (doubled word detection).

## 🏢 Real World Use Case
**Log parsing and validation**: A server log analyzer uses `Pattern.compile("(\\d{4}-\\d{2}-\\d{2}) (\\d{2}:\\d{2}:\\d{2}) (\\w+) (.*)")` with `find()` to parse 10 million log lines per minute. Input validation uses `Pattern.matches` for email, phone, SSN, and credit card formats. `replaceAll` sanitizes sensitive data (PII redaction) before output. `split` with regex `"\\s+"` tokenizes log entries.

## 🎯 Interview Questions

1. **Q: What is the difference between `matcher.find()` and `matcher.matches()`?**
   A: `find()` looks for a subsequence matching the pattern anywhere in the input. `matches()` tries to match the entire input against the pattern (implicit `^` and `$` anchors).

2. **Q: What are the common Pattern flags and what do they do?**
   A: `CASE_INSENSITIVE` (i) — ignore case. `MULTILINE` (m) — `^`/`$` match line boundaries. `DOTALL` (s) — `.` matches newlines. `UNIX_LINES` — only `\n` is a newline. `COMMENTS` (x) — allow whitespace and comments in pattern.

3. **Q: What is a capturing group and how do you refer to it?**
   A: A capturing group is a portion of the pattern enclosed in parentheses `(...)`. Groups are numbered 1-based by opening parenthesis. Use `matcher.group(n)` to retrieve, and `\1` in the pattern or `$1` in replacement strings.

4. **Q: What is the difference between `String.replaceAll()` and `String.replaceFirst()`?**
   A: `replaceAll()` replaces every non-overlapping match. `replaceFirst()` replaces only the first occurrence. Both accept a regex.

5. **Q: How do you make regex matching case-insensitive without using Pattern.CASE_INSENSITIVE?**
   A: Use the embedded flag expression `(?i)` at the start of the pattern: `Pattern.compile("(?i)java")` matches "Java", "JAVA", "java", etc.

## ⚠ Common Errors / Mistakes
- Forgetting to escape backslashes in Java strings: `\d` must be written as `"\\d"`
- Using `matches()` when `find()` is intended (matches requires full-string match)
- Not compiling the Pattern once and reusing it — `Pattern.matches(regex, str)` compiles every call
- Catastrophic backtracking with nested quantifiers like `(a+)+b` on non-matching strings
- Assuming `.split()` returns an empty array for an empty string (it returns `[""]`)

## 📝 Practice Exercises

**Beginner:**
1. Write a regex that matches a valid US ZIP code (5 digits, optionally followed by - and 4 digits).
2. Extract all hashtags from a tweet text (e.g., "#java #regex").
3. Validate a date in the format `YYYY-MM-DD` using regex.

**Intermediate:**
4. Write a program that reads a text file and replaces all occurrences of "color" (or "colour") with "colour".
5. Extract all URLs (starting with http:// or https://) from a block of text using regex and capturing groups.
6. Split a comma-separated values (CSV) line into fields, handling quoted fields that may contain commas.

**Advanced:**
7. Implement a template engine that replaces `{{variableName}}` placeholders in a string using regex and a `Map<String, String>` of values.
8. Write a lexer/tokenizer that splits Java source code into tokens (keywords, identifiers, operators, literals, comments) using multiple compiled Pattern objects.
