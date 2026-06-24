## 11. Java Strings

## 📘 Introduction

`String` is one of the most used classes in Java. Strings are **immutable** — once created, their value cannot change. Java optimizes string memory with the **String pool** (intern pool), where string literals are reused. For mutable strings, use `StringBuilder` (not thread-safe) or `StringBuffer` (thread-safe).

## 🧠 Key Concepts

| Concept | Description |
|---------|-------------|
| Immutability | String content cannot change — any "modification" creates a new String |
| String pool | A JVM-managed pool of unique string literals for memory efficiency |
| Literal vs `new` | `"hello"` uses pool; `new String("hello")` creates a new heap object |
| StringBuilder | Mutable, not synchronized — faster for single-threaded |
| StringBuffer | Mutable, synchronized — thread-safe but slower |

**Common Methods:**
| Method | Description |
|--------|-------------|
| `length()` | Returns number of characters |
| `charAt(i)` | Returns character at index i |
| `substring(start, end)` | Extracts substring |
| `indexOf(str)` | First occurrence index (-1 if not found) |
| `equals(str)` | Compares content (use `==` for references) |
| `split(regex)` | Splits string into array |
| `replace(old, new)` | Replaces all occurrences |
| `trim()` | Removes leading/trailing whitespace |
| `toUpperCase()` / `toLowerCase()` | Changes case |
| `concat(str)` | Concatenation (same as `+`) |

## 💻 Syntax

```java
public class StringDemo {
    public static void main(String[] args) {
        // Literal vs new
        String s1 = "hello";
        String s2 = "hello";
        String s3 = new String("hello");

        System.out.println("s1 == s2: " + (s1 == s2));        // true (same pool ref)
        System.out.println("s1 == s3: " + (s1 == s3));        // false (heap object)
        System.out.println("s1.equals(s3): " + s1.equals(s3)); // true (same content)

        // StringBuilder
        StringBuilder sb = new StringBuilder();
        sb.append("Hello").append(" ").append("World");
        System.out.println(sb.toString());
    }
}
```

## ✅ Example 1 - Basic

**Problem:** Use common String methods to process a user input.

**Code:**
```java
public class StringMethods {
    public static void main(String[] args) {
        String text = "  Java Programming is Fun!  ";
        
        System.out.println("Original: '" + text + "'");
        System.out.println("Length: " + text.length());
        System.out.println("Trimmed: '" + text.trim() + "'");
        System.out.println("Uppercase: " + text.toUpperCase());
        System.out.println("Char at 3: " + text.charAt(3));
        System.out.println("Substring (2,6): '" + text.substring(2, 6) + "'");
        System.out.println("Replace 'a' with 'o': " + text.replace('a', 'o'));
        System.out.println("Contains 'Java': " + text.contains("Java"));
        System.out.println("Index of 'Fun': " + text.indexOf("Fun"));
    }
}
```

**Output:**
```
Original: '  Java Programming is Fun!  '
Length: 27
Trimmed: 'Java Programming is Fun!'
Uppercase:   JAVA PROGRAMMING IS FUN!  
Char at 3: v
Substring (2,6): 'ava '
Replace 'a' with 'o':   Java Progromming is Fun!  
Contains 'Java': true
Index of 'Fun': 20
```

**Explanation:** `trim()` removes whitespace. `substring(2,6)` extracts characters from index 2 (inclusive) to 6 (exclusive). `replace` creates a new string. Strings are immutable — each method returns a new String.

## 🚀 Example 2 - Intermediate

**Problem:** Compare String concatenation performance: `+` vs `StringBuilder`.

**Code:**
```java
public class ConcatPerformance {
    public static void main(String[] args) {
        int n = 100_000;

        // String + concatenation (slow — creates n intermediate strings)
        long start1 = System.currentTimeMillis();
        String result1 = "";
        for (int i = 0; i < n; i++) {
            result1 += "a";
        }
        long end1 = System.currentTimeMillis();
        System.out.println("String '+' time: " + (end1 - start1) + "ms");

        // StringBuilder (fast — mutable buffer)
        long start2 = System.currentTimeMillis();
        StringBuilder sb = new StringBuilder(n);
        for (int i = 0; i < n; i++) {
            sb.append("a");
        }
        String result2 = sb.toString();
        long end2 = System.currentTimeMillis();
        System.out.println("StringBuilder time: " + (end2 - start2) + "ms");

        // Demonstrate split and join
        String csv = "apple,banana,grape,orange";
        String[] fruits = csv.split(",");
        String joined = String.join(" | ", fruits);
        System.out.println("\nSplit: " + java.util.Arrays.toString(fruits));
        System.out.println("Joined: " + joined);
    }
}
```

**Output:**
```
String '+' time: 4523ms
StringBuilder time: 3ms

Split: [apple, banana, grape, orange]
Joined: apple | banana | grape | orange
```

**Explanation:** `String +` creates a new object each iteration — O(n^2) time. `StringBuilder` modifies a mutable buffer — O(n) time. `split()` and `String.join()` handle CSV-like data efficiently.

## 🏢 Real World Use Case

**Log Message Builder:** A high-throughput server builds log messages in a multi-threaded environment. Each request thread uses its own `StringBuilder` to assemble structured log entries (timestamp, level, message, context). Using `+` would create excessive garbage. `StringBuffer` is used only for shared log buffers accessed by multiple threads.

## 🎯 Interview Questions

**1. Why are Strings immutable in Java?**  
For security (no modification of sensitive strings like DB URLs), caching (String pool), thread-safety, and hash code caching (String's hashCode is computed once and cached).

**2. What is the String pool?**  
A JVM-managed collection of unique string literals. When a literal like `"hello"` is used, the JVM checks the pool first — if found, the reference is reused; otherwise, a new String is added to the pool.

**3. What is the difference between `String`, `StringBuilder`, and `StringBuffer`?**  
`String` is immutable. `StringBuilder` is mutable and not synchronized (faster). `StringBuffer` is mutable and synchronized (thread-safe, slower).

**4. How do you reverse a String in Java?**  
`new StringBuilder("hello").reverse().toString()` — returns `"olleh"`.

**5. What is the difference between `equals()` and `==` for Strings?**  
`equals()` compares the character content. `==` compares memory references. Two strings with the same content using `new String("x")` will be `==`-unequal but `equals()`-equal.

## ⚠ Common Errors / Mistakes

- **Using `==` to compare strings** — Compares references, not content. Always use `.equals()`
- **Concatenating in loops with `+`** — Creates many intermediate strings; use `StringBuilder`
- **Forgetting Strings are immutable** — `s.toUpperCase()` does NOT change `s` — it returns a new string
- **IndexOutOfBoundsException** — `charAt(length)` is invalid; valid indices are `0` to `length()-1`
- **Null pointer on method calls** — Calling `s.length()` when `s` is null throws NPE

## 📝 Practice Exercises

**Beginner**
1. Write a program that takes a full name (first and last), trims it, converts to uppercase, and prints the length.
2. Extract the domain name from an email string using `substring` and `indexOf('@')`.
3. Replace all spaces in a sentence with hyphens and print the result.

**Intermediate**
4. Write a program that checks if a string is a palindrome (reads same forwards/backwards) using `StringBuilder.reverse()`.
5. Create a program that counts the frequency of each character in a string using `charAt()` and a HashMap.
6. Build a CSV parser: split a comma-separated string, trim each field, and rejoin with pipes using `String.join()`.

**Advanced**
7. Implement a simple template engine: given a template `"Hello {{name}}, your balance is {{balance}}"` and a `Map<String, String>`, replace all `{{key}}` placeholders with values.
8. Write a program that reads a large text file line by line, using `StringBuilder` to assemble the entire content, then finds the longest word using `split()` and a custom comparator.
