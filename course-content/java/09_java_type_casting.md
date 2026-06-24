## 9. Java Type Casting

## 📘 Introduction

Type casting in Java converts a value from one data type to another. There are two categories: **widening** (automatic/implicit) and **narrowing** (explicit with a cast operator). Understanding casting is essential for avoiding data loss and runtime exceptions.

## 🧠 Key Concepts

**Widening (Implicit) — Automatic, no data loss:**
```
byte → short → int → long → float → double
                 ↑
                char
```

**Narrowing (Explicit) — Requires cast, potential data loss:**
```
double → float → long → int → short → byte
```

| Conversion | Syntax | Risk |
|-----------|--------|------|
| Widening | `int x = 10; double y = x;` | None — automatic |
| Narrowing | `double d = 9.99; int i = (int) d;` | Truncation, overflow |
| String to int | `Integer.parseInt("123")` | `NumberFormatException` |
| int to String | `String.valueOf(123)` | None |

## 💻 Syntax

```java
public class CastingDemo {
    public static void main(String[] args) {
        // Widening (implicit)
        int myInt = 42;
        double myDouble = myInt;          // automatic: 42 → 42.0

        // Narrowing (explicit)
        double pi = 3.14159;
        int truncated = (int) pi;          // explicit cast: loses .14159

        // String conversions
        int parsed = Integer.parseInt("100");
        String back = String.valueOf(parsed);

        System.out.println("Widened: " + myDouble);
        System.out.println("Narrowed (truncated): " + truncated);
        System.out.println("Parsed: " + parsed);
    }
}
```

## ✅ Example 1 - Basic

**Problem:** Convert between numeric types and observe data loss.

**Code:**
```java
public class CastingExample {
    public static void main(String[] args) {
        // Widening
        byte b = 100;
        short s = b;           // byte → short
        int i = s;             // short → int
        long l = i;            // int → long
        float f = l;           // long → float
        double d = f;          // float → double

        System.out.println("byte " + b + " → short " + s + " → int " + i);
        System.out.println("→ long " + l + " → float " + f + " → double " + d);

        // Narrowing — data loss
        double original = 123.456;
        float flo = (float) original;
        long lo = (long) flo;
        int in = (int) lo;
        short sh = (short) in;
        byte by = (byte) sh;

        System.out.println("\nNarrowing " + original + ":");
        System.out.println("double→float: " + flo);
        System.out.println("float→long: " + lo);
        System.out.println("long→int: " + in);
        System.out.println("int→short: " + sh);
        System.out.println("short→byte: " + by + " (truncated!)");
    }
}
```

**Output:**
```
byte 100 → short 100 → int 100
→ long 100 → float 100.0 → double 100.0

Narrowing 123.456:
double→float: 123.456
float→long: 123
long→int: 123
int→short: 123
short→byte: 123
```

**Explanation:** Widening conversions are automatic. Narrowing requires explicit `(type)` casting and may lose precision (decimal truncated) or overflow (e.g., `short 130 → byte -126`).

## 🚀 Example 2 - Intermediate

**Problem:** Convert String to numeric types and handle potential exceptions.

**Code:**
```java
public class StringConversion {
    public static void main(String[] args) {
        String[] values = {"42", "3.14", "true", "hello", "9999999999"};
        
        for (String val : values) {
            System.out.print("Converting \"" + val + "\": ");
            
            try {
                if (val.contains(".")) {
                    double d = Double.parseDouble(val);
                    System.out.println("double = " + d + ", int cast = " + (int) d);
                } else if (val.equals("true") || val.equals("false")) {
                    boolean b = Boolean.parseBoolean(val);
                    System.out.println("boolean = " + b);
                } else {
                    int i = Integer.parseInt(val);
                    System.out.println("int = " + i);
                }
            } catch (NumberFormatException e) {
                System.out.println("NumberFormatException: " + e.getMessage());
            }
        }
    }
}
```

**Output:**
```
Converting "42": int = 42
Converting "3.14": double = 3.14, int cast = 3
Converting "true": boolean = true
Converting "hello": NumberFormatException: For input string: "hello"
Converting "9999999999": NumberFormatException: For input string: "9999999999"
```

**Explanation:** `Integer.parseInt()`, `Double.parseDouble()`, and `Boolean.parseBoolean()` convert strings to primitives. Invalid strings throw `NumberFormatException` for numeric types. The large number exceeds `int` range — use `Long.parseLong()` instead.

## 🏢 Real World Use Case

**Data Import Pipeline:** A CSV parser reads all values as strings. Each field is converted to the appropriate type: `Integer.parseInt()` for IDs, `Double.parseDouble()` for prices, `Boolean.parseBoolean()` for flags. Invalid rows are logged with the field name and skipped using try-catch, ensuring one bad row doesn't crash the entire import.

## 🎯 Interview Questions

**1. What is the difference between implicit and explicit casting?**  
Implicit (widening) happens automatically when converting to a larger type with no data loss. Explicit (narrowing) requires a cast operator `()` because data loss may occur.

**2. What happens when you cast a `double` to an `int`?**  
The fractional part is truncated (not rounded). `(int) 3.99` becomes `3`.

**3. How do you convert a `String` to an `int` safely?**  
Use `Integer.parseInt(str)` wrapped in a try-catch for `NumberFormatException`. Or use `Integer.valueOf(str).intValue()`.

**4. What is the result of `(int) (char) (byte) -1`?**  
65535. `byte -1` → `char 65535` (unsigned) → `int 65535`.

**5. What is `NumberFormatException`?**  
An exception thrown when a string cannot be parsed into a numeric type (e.g., `Integer.parseInt("abc")`).

## ⚠ Common Errors / Mistakes

- **Forgetting cast in narrowing** — `int i = 3.14;` causes "incompatible types" error
- **Integer division without casting** — `5 / 2` yields `2`, not `2.5` (use `(double) 5 / 2`)
- **Overflow during narrowing** — `(byte) 200` yields `-56` due to overflow
- **Truncation vs rounding** — Casting truncates; use `Math.round()` for rounding
- **Null string to parseInt** — `Integer.parseInt(null)` throws `NumberFormatException`

## 📝 Practice Exercises

**Beginner**
1. Write a program that declares an `int` and implicitly widens it to `double`, `float`, and `long`.
2. Cast a `double` value of 99.99 to `int` and print both values to see the truncation.
3. Convert the String "256" to an `int` and print double of it.

**Intermediate**
4. Write a program that takes a "HH:MM" time string, parses hours and minutes with `Integer.parseInt()`, and calculates minutes since midnight.
5. Create a program that demonstrates overflow: cast `int 300` to `byte` and explain the result (-128 to 127 range).
6. Write a method that safely converts a string to `int` with a default value if parsing fails (no exception thrown to caller).

**Advanced**
7. Create a generic utility method `convert(String value, Class<T> targetType)` that uses wrapper class `parse`/`valueOf` methods via reflection to convert strings to any primitive wrapper type.
8. Implement a type-safe number class that tracks its minimum and maximum possible value after a series of widening and narrowing operations, throwing an exception on overflow.
