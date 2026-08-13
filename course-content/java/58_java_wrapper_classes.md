## 58. Java Wrapper Classes (Detailed)

## 📘 Introduction
Wrapper classes (`Boolean`, `Byte`, `Short`, `Character`, `Integer`, `Long`, `Float`, `Double`) encapsulate primitive values as objects. They enable primitives to be used in collections, generics, and with methods that require objects. Understanding auto-boxing internals, caching, and performance implications is critical for writing efficient Java code.

## 🧠 Key Concepts
- **Auto-boxing / Unboxing**: Compiler automatically converts primitives to wrappers (`Integer i = 42`) and vice versa (`int x = i`)
- **Integer caching**: `Integer.valueOf(n)` caches values from -128 to 127 (configurable via `-XX:AutoBoxCacheMax`). `new Integer(n)` always creates a new object
- **valueOf vs new Integer()**: Prefer `Integer.valueOf()` or auto-boxing over `new Integer()` (deprecated since Java 9)
- **parseInt vs valueOf**: `Integer.parseInt(s)` returns primitive `int`. `Integer.valueOf(s)` returns `Integer` object (uses cache)
- **Converting between primitives and wrappers**: Auto-boxing/unboxing, or explicit `.intValue()`, `.doubleValue()`
- **Performance considerations**: Boxing creates objects — excessive boxing in loops causes GC pressure
- **Null safety with wrappers**: Unboxing a `null` wrapper throws `NullPointerException`
- **Utility methods**: `Integer.toBinaryString()`, `Double.isNaN()`, `Character.isDigit()`, `Boolean.parseBoolean()`
- **Comparison**: Use `.equals()` for wrapper objects, not `==` (except for cached range)

## 💻 Syntax

```java
// Explicit boxing/unboxing (pre-auto-box era)
Integer obj = Integer.valueOf(42);   // prefer this
int val = obj.intValue();

// Auto-boxing/unboxing
Integer wrapped = 42;    // auto-box: Integer.valueOf(42)
int primitive = wrapped; // auto-unbox: wrapped.intValue()

// Parsing
int p = Integer.parseInt("123");     // returns int
Integer v = Integer.valueOf("123");  // returns Integer (cached)

// Caching
Integer a = 127; Integer b = 127;   // same object
Integer c = 128; Integer d = 128;   // different objects!

// Null safety warning
Integer n = null;
// int x = n; // NullPointerException!

// Utility methods
String bin = Integer.toBinaryString(255);   // "11111111"
boolean isDigit = Character.isDigit('5');    // true
boolean nan = Double.isNaN(0.0 / 0.0);       // true
```

## ✅ Example 1 - Basic
**Problem**: Demonstrate auto-boxing, unboxing, Integer caching, parsing, and common utility methods.

```java
import java.util.*;

public class WrapperBasics {
    public static void main(String[] args) {
        // Auto-boxing and unboxing
        Integer age = 25;                     // auto-box: Integer.valueOf(25)
        int nextAge = age + 1;               // unbox, add, auto-box
        System.out.println("Next age: " + nextAge);

        // Integer caching
        Integer i1 = 100;
        Integer i2 = 100;
        Integer i3 = 200;
        Integer i4 = 200;

        System.out.println("100 == 100: " + (i1 == i2));    // true (cached)
        System.out.println("200 == 200: " + (i3 == i4));    // false (not cached)
        System.out.println("200 equals 200: " + i3.equals(i4)); // true

        // parseInt vs valueOf
        int primitive = Integer.parseInt("456");
        Integer wrapper = Integer.valueOf("456");
        System.out.println("Primitive: " + primitive + ", Wrapper: " + wrapper);

        // Utility methods
        System.out.println("Binary of 42: " + Integer.toBinaryString(42));
        System.out.println("Is '7' a digit? " + Character.isDigit('7'));
        System.out.println("Max double: " + Double.MAX_VALUE);
    }
}
```

**Output:**
```
Next age: 26
100 == 100: true
200 == 200: false
200 equals 200: true
Primitive: 456, Wrapper: 456
Binary of 42: 101010
Is '7' a digit? true
Max double: 1.7976931348623157E308
```

**Explanation:** Auto-boxing uses `valueOf()`, which caches Integer values in [-128, 127]. `==` compares references (true for cached, false for non-cached). Always use `.equals()` for wrapper comparison. `parseInt` returns a primitive; `valueOf` returns a cached wrapper.

## 🚀 Example 2 - Intermediate
**Problem**: Demonstrate performance impact of boxing in loops, null safety, and conversion between primitive types.

```java
import java.util.*;

public class WrapperAdvanced {
    public static void main(String[] args) {
        // Performance: boxing in loops
        long t1 = System.nanoTime();
        Integer sum = 0;
        for (int i = 0; i < 10_000_000; i++) sum += i;  // unbox -> add -> box each iteration
        long t2 = System.nanoTime();
        System.out.println("Boxed sum time: " + (t2 - t1) / 1e6 + " ms");

        long t3 = System.nanoTime();
        int sumPrim = 0;
        for (int i = 0; i < 10_000_000; i++) sumPrim += i;  // primitive only
        long t4 = System.nanoTime();
        System.out.println("Primitive sum time: " + (t4 - t3) / 1e6 + " ms");

        // Null safety
        Integer nullable = getValue(false);
        // int val = nullable; // NullPointerException!
        if (nullable != null) {
            System.out.println("Nullable: " + nullable);
        }

        // Conversion between types
        String num = "3.14";
        double d = Double.parseDouble(num);
        int truncated = (int) d;
        Integer wrapped = Integer.valueOf(truncated);
        System.out.println("String -> double -> int -> Integer: " + wrapped);

        // Boolean parsing (lenient: "true" -> true, anything else -> false)
        System.out.println("Boolean.parseBoolean('TRUE'): " + Boolean.parseBoolean("TRUE"));
        System.out.println("Boolean.parseBoolean('yes'): " + Boolean.parseBoolean("yes"));
    }

    static Integer getValue(boolean flag) {
        return flag ? 42 : null;
    }
}
```

**Output:**
```
Boxed sum time: 185.3 ms
Primitive sum time: 18.7 ms
Nullable: null (or skipped)
String -> double -> int -> Integer: 3
Boolean.parseBoolean('TRUE'): true
Boolean.parseBoolean('yes'): false
```

**Explanation:** Boxing in loops creates millions of intermediate `Integer` objects — ~10x slower. Always use primitives in performance-sensitive code. Unboxing a null wrapper throws `NullPointerException`. `Boolean.parseBoolean` is lenient only for `"true"` (case-insensitive).

## 🏢 Real World Use Case
**Configuration properties system**: A properties file stores values as strings. `Integer.parseInt()` and `Double.parseDouble()` convert them to primitives. `Boolean.parseBoolean("true")` parses feature flags. Nullable `Integer` fields in POJOs represent optional numeric data (e.g., discount percentage). Cached Integer values (-128 to 127) benefit small counters. JDBC result sets use `getInt()` (primitive) for non-nullable columns and `getInteger()` (wrapper) for nullable columns.

## 🎯 Interview Questions

1. **Q: What is the Integer cache range? Can it be changed?**
   A: The default range is -128 to 127. It can be extended using the JVM flag `-XX:AutoBoxCacheMax=<size>`. Values outside this range create new objects.

2. **Q: What is the difference between `Integer.parseInt(s)` and `Integer.valueOf(s)`?**
   A: `parseInt(s)` returns a primitive `int`. `valueOf(s)` returns an `Integer` object (from cache if within range). `valueOf` internally calls `parseInt` and then caches.

3. **Q: Why is `new Integer(42)` deprecated since Java 9?**
   A: Because `Integer.valueOf(42)` provides better memory efficiency through caching. `new Integer(42)` always creates a new object. All wrapper constructors are deprecated in favor of `valueOf`.

4. **Q: What happens when you unbox a null wrapper?**
   A: The JVM calls `wrapper.intValue()` (or `.doubleValue()`, etc.) on a null reference, throwing `NullPointerException`.

5. **Q: Are wrapper classes immutable?**
   A: Yes — all wrapper classes (`Integer`, `Double`, `Boolean`, etc.) are immutable. Their values cannot be changed after construction. Each "modification" creates a new object.

## ⚠ Common Errors / Mistakes
- Using `==` to compare wrapper objects outside the cached range — always use `.equals()`
- Unboxing null wrappers without a null check — causes `NullPointerException`
- Excessive auto-boxing in hot loops — degrades performance significantly
- Using `new Integer(n)` or `new Boolean(b)` — always prefer `valueOf()` or auto-boxing
- Assuming `Double.NaN == Double.NaN` is true — NaN is not equal to itself; use `Double.isNaN()`

## 📝 Practice Exercises

**Beginner:**
1. Write a program that converts a `String` to `int`, `double`, and `boolean` using wrapper class parse methods.
2. Demonstrate Integer caching by comparing references of values 100 vs 200 using `==`.
3. Create an `ArrayList<Integer>`, add 5 numbers using auto-boxing, and compute the sum using unboxing.

**Intermediate:**
4. Measure the performance difference between summing 1 million integers using `int` vs `Integer` (auto-boxing). Report the ratio.
5. Write a method that safely converts a `String` to `Integer` and returns `Optional<Integer>` instead of throwing on invalid input.
6. Implement a generic utility that converts a `Map<String, String>` to a `Map<String, Integer>` using `Integer.parseInt`, handling parse errors gracefully.

**Advanced:**
7. Implement a custom numeric cache similar to Integer's `valueOf` for a `PersonId` wrapper class that caches IDs 1-10000.
8. Write a benchmarking program using `System.nanoTime()` that compares the performance of `int[]` vs `Integer[]` for sorting, searching, and summing 1 million elements.
