## 8. Java Data Types

## 📘 Introduction

Java has **8 primitive data types** built into the language. These are the most basic data types and are not objects. Each primitive has a fixed size and a default value. Java also provides **wrapper classes** for each primitive (e.g., `Integer` for `int`) that enable primitives to be used in collections and provide utility methods.

## 🧠 Key Concepts

**Primitive Types Summary:**
| Type | Size | Default | Range |
|------|------|---------|-------|
| `byte` | 8-bit | 0 | -128 to 127 |
| `short` | 16-bit | 0 | -32,768 to 32,767 |
| `int` | 32-bit | 0 | -2^31 to 2^31-1 |
| `long` | 64-bit | 0L | -2^63 to 2^63-1 |
| `float` | 32-bit | 0.0f | ±3.4e-38 to ±3.4e+38 |
| `double` | 64-bit | 0.0d | ±1.7e-308 to ±1.7e+308 |
| `char` | 16-bit | '\u0000' | 0 to 65,535 (Unicode) |
| `boolean` | JVM-dependent | false | true / false |

**Wrapper Classes:** `Byte`, `Short`, `Integer`, `Long`, `Float`, `Double`, `Character`, `Boolean`

**Autoboxing:** Automatic conversion of primitive to wrapper (e.g., `int` → `Integer`)  
**Unboxing:** Automatic conversion of wrapper to primitive (e.g., `Integer` → `int`)

## 💻 Syntax

```java
public class DataTypesDemo {
    public static void main(String[] args) {
        // Primitive declarations
        byte b = 100;
        short s = 10000;
        int i = 1_000_000;          // underscores for readability
        long l = 1_000_000_000_000L;
        float f = 3.14f;            // 'f' suffix required
        double d = 3.14159265358979;
        char c = 'A';
        boolean bool = true;

        // Autoboxing
        Integer wrapperInt = i;      // int → Integer automatically
        int backToPrimitive = wrapperInt;  // unboxing

        // Checking sizes
        System.out.println("int bytes: " + Integer.BYTES);
        System.out.println("int max: " + Integer.MAX_VALUE);
    }
}
```

## ✅ Example 1 - Basic

**Problem:** Declare all 8 primitive types, print their values and sizes.

**Code:**
```java
public class PrimitiveSizes {
    public static void main(String[] args) {
        byte b = 127;
        short s = 32000;
        int i = 2_000_000_000;
        long l = 9_000_000_000_000_000_000L;
        float f = 3.14f;
        double d = 3.14159265358979;
        char c = 'Z';
        boolean bool = true;

        System.out.println("byte: " + b + " (size: " + Byte.BYTES + " bytes)");
        System.out.println("short: " + s + " (size: " + Short.BYTES + " bytes)");
        System.out.println("int: " + i + " (size: " + Integer.BYTES + " bytes)");
        System.out.println("long: " + l + " (size: " + Long.BYTES + " bytes)");
        System.out.println("float: " + f + " (size: " + Float.BYTES + " bytes)");
        System.out.println("double: " + d + " (size: " + Double.BYTES + " bytes)");
        System.out.println("char: " + c + " (size: " + Character.BYTES + " bytes)");
        System.out.println("boolean: " + bool);
    }
}
```

**Output:**
```
byte: 127 (size: 1 bytes)
short: 32000 (size: 2 bytes)
int: 2000000000 (size: 4 bytes)
long: 9000000000000000000 (size: 8 bytes)
float: 3.14 (size: 4 bytes)
double: 3.14159265358979 (size: 8 bytes)
char: Z (size: 2 bytes)
boolean: true
```

**Explanation:** Each type stores a specific kind of data. Underscores in numeric literals improve readability. The `L`, `f` suffixes are required for `long` and `float`. `Boolean.BYTES` does not exist (JVM-dependent), so the size is not printed.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate autoboxing, unboxing, and wrapper class utilities.

**Code:**
```java
import java.util.ArrayList;

public class WrapperDemo {
    public static void main(String[] args) {
        // Autoboxing — primitives automatically converted to wrappers
        ArrayList<Integer> numbers = new ArrayList<>();
        numbers.add(10);    // autoboxing: int → Integer
        numbers.add(20);
        numbers.add(30);

        // Unboxing — wrapper automatically converted to primitive
        int sum = 0;
        for (Integer n : numbers) {
            sum += n;       // unboxing: Integer → int
        }
        System.out.println("Sum: " + sum);

        // Wrapper utility methods
        String numStr = "456";
        int parsed = Integer.parseInt(numStr);
        System.out.println("Parsed: " + parsed);

        System.out.println("Binary of 42: " + Integer.toBinaryString(42));
        System.out.println("Is '5' digit? " + Character.isDigit('5'));
        System.out.println("Double NaN? " + Double.isNaN(0.0 / 0.0));
    }
}
```

**Output:**
```
Sum: 60
Parsed: 456
Binary of 42: 101010
Is '5' digit? true
Double NaN? true
```

**Explanation:** `ArrayList<Integer>` only stores objects — autoboxing converts `int` to `Integer` automatically. The loop unboxes `Integer` to `int` for arithmetic. Wrapper classes provide parsing, conversion, and utility methods.

## 🏢 Real World Use Case

**Financial Calculation Engine:** A trading platform uses `long` for monetary values in cents (avoiding floating-point precision issues), `int` for order IDs, `double` for percentage calculations, and `boolean` for trade flags. Wrapper classes (`Integer`, `Long`) enable storing trade data in `HashMap` collections and parsing CSV input with `Integer.parseInt()`.

## 🎯 Interview Questions

**1. What is the default value of an `int` field in a class?**  
0. All numeric primitives default to 0, `boolean` to false, `char` to '\u0000', and reference types to null.

**2. Why does `float f = 3.14;` cause a compilation error?**  
3.14 is a `double` literal by default. Assigning a `double` to a `float` requires explicit casting: `float f = 3.14f;` or `float f = (float) 3.14;`.

**3. What is autoboxing and when does it occur?**  
Autoboxing is the automatic conversion of a primitive to its wrapper class. It occurs when assigning a primitive to a wrapper variable, passing a primitive to a method expecting a wrapper, or adding primitives to collections.

**4. Which primitive type would you use for a currency value?**  
`long` (store cents) or `BigDecimal` for exact precision. Never use `float` or `double` for currency due to rounding errors.

**5. What is the difference between `int` and `Integer`?**  
`int` is a primitive — cannot be null, stored on stack. `Integer` is a wrapper class — can be null, stored on heap, usable in generics (like `List<Integer>`).

## ⚠ Common Errors / Mistakes

- **Integer overflow** — `int max = Integer.MAX_VALUE + 1;` wraps to negative (use `long` or `Math.addExact()`)
- **Floating-point precision** — `0.1 + 0.2 == 0.3` is false due to binary representation
- **Forgetting `L` suffix for long** — `long big = 9999999999;` overflows before assignment
- **Comparing wrappers with `==`** — `Integer a = 127; Integer b = 127; a == b` is true (cached), but `a = 200; b = 200; a == b` is false (use `.equals()`)
- **Null pointer on unboxing** — `Integer x = null; int y = x;` throws `NullPointerException`

## 📝 Practice Exercises

**Beginner**
1. Declare all 8 primitive types with appropriate values and print them with their type names.
2. Create a program that finds and prints the minimum and maximum values of `int`, `long`, and `double` using wrapper constants.
3. Write a program that converts a `String` to an `int` using `Integer.parseInt()` and prints the square.

**Intermediate**
4. Create a program that demonstrates the difference between `==` and `.equals()` for `Integer` values both inside and outside the cached range (-128 to 127).
5. Write a program that shows the overflow behavior of `int` and how to detect/prevent it using `Math.addExact()`.
6. Create a method that accepts `List<Integer>` and returns the sum, demonstrating autoboxing when calling the method.

**Advanced**
7. Create a generic utility method that converts any numeric wrapper string (e.g., "3.14", "42", "true") to its correct wrapper type using wrapper class parsing methods and a functional approach.
8. Implement a program that benchmarks the performance difference between using `int[]` vs `Integer[]` for summing 10 million values, explaining the impact of autoboxing overhead.
