## 48. Java Wrapper Classes

## 📘 Introduction
Wrapper classes provide object representations for Java's primitive types. They enable primitives to be used in collections, generics, and other contexts that require objects. Java 5 introduced autoboxing/unboxing for seamless conversion.

## 🧠 Key Concepts
- **Wrapper classes** — `Integer`, `Double`, `Character`, `Boolean`, `Byte`, `Short`, `Long`, `Float`
- **Autoboxing** — Automatic conversion of primitive to wrapper: `Integer i = 5;`
- **Unboxing** — Automatic conversion of wrapper to primitive: `int n = i;`
- **valueOf()** — Returns a cached wrapper instance (preferred over constructors)
- **parseInt() / parseDouble()** — Parse strings to primitives
- **toString()** — Convert primitive/wrapper to string
- **compareTo()** — Compare wrapper objects
- **Constants** — `MAX_VALUE`, `MIN_VALUE`, `SIZE`, `BYTES`, `TYPE`

## 💻 Syntax
```java
// Autoboxing and unboxing
Integer boxed = 42;          // autoboxing: int → Integer
int unboxed = boxed;         // unboxing: Integer → int

// valueOf() — preferred over constructor
Integer i = Integer.valueOf(42);
Integer i2 = Integer.valueOf("42");

// Parsing
int num = Integer.parseInt("123");
double d = Double.parseDouble("3.14");

// toString
String s = Integer.toString(456);
String hex = Integer.toHexString(255);  // "ff"

// Constants
System.out.println(Integer.MAX_VALUE);  // 2147483647
System.out.println(Integer.SIZE);       // 32 (bits)
System.out.println(Double.MIN_VALUE);   // 4.9E-324

// Comparison
Integer a = 100;
Integer b = 200;
int cmp = a.compareTo(b);  // negative, zero, or positive
```

## ✅ Example 1 - Basic

**Problem:** Demonstrate autoboxing/unboxing, `valueOf()`, `parseInt()`, `toString()`, and wrapper class constants.

**Code:**
```java
public class Main {
    public static void main(String[] args) {
        // Autoboxing and unboxing
        Integer boxed = 100;                    // autobox
        int unboxed = boxed;                    // unbox
        System.out.println("Boxed: " + boxed + ", Unboxed: " + unboxed);

        // valueOf() — caching
        Integer a = Integer.valueOf(127);
        Integer b = Integer.valueOf(127);
        Integer c = Integer.valueOf(200);
        Integer d = Integer.valueOf(200);

        System.out.println("a == b (127 cached): " + (a == b));     // true
        System.out.println("c == d (200 not cached): " + (c == d)); // false
        System.out.println("c.equals(d): " + c.equals(d));          // true — always use equals()

        // Parsing
        int parsed = Integer.parseInt("42");
        double pi = Double.parseDouble("3.14159");
        boolean flag = Boolean.parseBoolean("true");
        System.out.println("Parsed int: " + parsed + ", double: " + pi + ", bool: " + flag);

        // toString
        System.out.println("Hex of 255: " + Integer.toHexString(255));
        System.out.println("Binary of 10: " + Integer.toBinaryString(10));

        // Constants
        System.out.println("Integer.MAX_VALUE: " + Integer.MAX_VALUE);
        System.out.println("Double.SIZE: " + Double.SIZE + " bits");
        System.out.println("Character.MIN_VALUE: " + (int) Character.MIN_VALUE);
        System.out.println("Boolean.TRUE: " + Boolean.TRUE);
    }
}
```

**Output:**
```
Boxed: 100, Unboxed: 100
a == b (127 cached): true
c == d (200 not cached): false
c.equals(d): true
Parsed int: 42, double: 3.14159, bool: true
Hex of 255: ff
Binary of 10: 1010
Integer.MAX_VALUE: 2147483647
Double.SIZE: 64 bits
Character.MIN_VALUE: 0
Boolean.TRUE: true
```

**Explanation:** `valueOf()` caches values in a range (typically -128 to 127 for Integer). Always use `.equals()` for wrapper comparison, not `==`. Wrapper constants like `MAX_VALUE` provide type bounds.

## 🚀 Example 2 - Intermediate

**Problem:** Use wrapper classes with collections and generics. Demonstrate `compareTo()`, sorting, and utility methods.

**Code:**
```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Wrappers in collections (require objects)
        List<Integer> scores = new ArrayList<>();
        scores.add(95);            // autoboxing
        scores.add(87);
        scores.add(100);
        scores.add(72);

        // Sorting using wrapper's Comparable
        Collections.sort(scores);
        System.out.println("Sorted scores: " + scores);

        // compareTo
        Integer high = 100;
        Integer low = 50;
        System.out.println("100 vs 50: " + high.compareTo(low));   // 1
        System.out.println("50 vs 100: " + low.compareTo(high));   // -1
        System.out.println("50 vs 50: " + low.compareTo(50));      // 0

        // Using wrapper methods in streams
        OptionalDouble avg = scores.stream()
            .mapToInt(Integer::intValue)   // unbox via method reference
            .average();
        System.out.println("Average: " + avg.orElse(0));

        // Conversion between types
        String numStr = "FF";
        int hexVal = Integer.parseInt(numStr, 16);  // radix 16
        System.out.println("Hex FF = " + hexVal);

        // Double utility methods
        Double nan = Double.NaN;
        Double inf = Double.POSITIVE_INFINITY;
        System.out.println("Is NaN: " + nan.isNaN());
        System.out.println("Is Infinite: " + inf.isInfinite());
        System.out.println("Double max decimal digits: " + Double.MAX_EXPONENT);

        // Character utilities
        System.out.println("Is digit '5': " + Character.isDigit('5'));
        System.out.println("Is letter 'A': " + Character.isLetter('A'));
        System.out.println("To upper 'a': " + Character.toUpperCase('a'));
    }
}
```

**Output:**
```
Sorted scores: [72, 87, 95, 100]
100 vs 50: 1
50 vs 100: -1
50 vs 50: 0
Average: 88.5
Hex FF = 255
Is NaN: true
Is Infinite: true
Double max decimal digits: 1023
Is digit '5': true
Is letter 'A': true
To upper 'a': A
```

**Explanation:** Wrappers enable primitives in collections. `compareTo()` returns positive, negative, or zero. Wrappers provide conversion, parsing, and utility methods (`isDigit`, `isNaN`, `parseInt` with radix).

## 🏢 Real World Use Case
A financial trading application uses `Double` for prices (null-safe "not set" state), `Integer` for quantities in `HashMap` caches, `Long` for timestamps in `Comparator`, and `Character` utilities for input validation in a trading terminal.

## 🎯 Interview Questions

**1. Why does Integer.valueOf(127) == Integer.valueOf(127) return true but 200 returns false?**
`Integer.valueOf()` caches instances for values between -128 and 127 (configurable). For 200, new instances are created, so `==` (reference equality) returns false. Always use `.equals()`.

**2. What is autoboxing and unboxing?**
Autoboxing is the automatic conversion of a primitive to its wrapper type (e.g., `int → Integer`). Unboxing is the reverse. Java 5+ performs these conversions automatically in assignments, method calls, and arithmetic.

**3. Can a wrapper object be null?**
Yes. This can cause `NullPointerException` during unboxing. Always null-check wrapper objects before unboxing.

**4. What is the difference between parseInt() and valueOf()?**
`Integer.parseInt()` returns a primitive `int`. `Integer.valueOf()` returns an `Integer` object (potentially cached). Similar distinction applies to `Double.parseDouble()` vs `Double.valueOf()`.

**5. What is the purpose of wrapper class constants like Integer.MAX_VALUE?**
They define the range limits of primitive types, useful for validation (e.g., checking if a value overflows). `SIZE` gives the bit width, `BYTES` gives byte width, and `TYPE` returns the `Class` object.

## ⚠ Common Errors / Mistakes
- Comparing wrapper objects with `==` instead of `.equals()` — breaks for values outside the cache range
- Auto-unboxing a null wrapper — throws `NullPointerException`
- Using wrapper constructors (deprecated since Java 9) — use `valueOf()` instead
- Assuming `Double.NaN == Double.NaN` is true — it's false; use `Double.isNaN()`
- Integer overflow when parsing — `Integer.parseInt("99999999999")` throws `NumberFormatException`

## 📝 Practice Exercises

**Beginner:**
1. Write a program that uses autoboxing to create a list of integers from 1 to 10, then sums them using unboxing.
2. Parse the string "3.14159" to a double using `Double.parseDouble()` and print it.
3. Convert the integer 255 to binary, hex, and octal strings using `Integer` utility methods.

**Intermediate:**
4. Write a method that accepts a list of `Integer` objects, filters out nulls, and returns the average using streams.
5. Create a frequency counter using `HashMap<Character, Integer>` that counts character occurrences in a string.
6. Write a program that reads comma-separated numbers from a string (e.g., "10,20,30,40"), parses them with `Integer.parseInt()`, and sorts them.

**Advanced:**
7. Implement a generic `NumericRange<T extends Number & Comparable<T>>` class that validates values against min/max bounds using wrapper constants (`MIN_VALUE`, `MAX_VALUE`) and type-safe comparison.
8. Build a high-performance object pool for wrapper objects using `WeakHashMap<Integer, SoftReference<Integer>>` to demonstrate understanding of wrapper caching, memory management, and reference types.
