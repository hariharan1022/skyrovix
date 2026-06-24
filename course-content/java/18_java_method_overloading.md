## 18. Java Method Overloading

## 📘 Introduction
Method overloading allows a class to have multiple methods with the same name but different parameter lists. It improves code readability and reusability by letting the same operation name work with different inputs.

## 🧠 Key Concepts
- **Multiple Methods, Same Name**: distinguished by number, type, or order of parameters
- **Return Type Is Not Part of Signature**: return type alone cannot overload a method
- **Type Promotion**: `byte` → `short` → `int` → `long` → `float` → `double`; `char` → `int`
- **Method Overloading vs Overriding**: overloading is compile-time (static) polymorphism; overriding is runtime polymorphism
- **Varargs and Overloading**: varargs is the least specific; fixed-arity methods are preferred when matching

## 💻 Syntax
```java
public int add(int a, int b)
public double add(double a, double b)       // different type
public int add(int a, int b, int c)         // different count
public double add(double a, int b)          // different order
```

## ✅ Example 1 - Basic

**Problem:** Create an overloaded `display` method that prints different types of data.

**Code:**
```java
public class Display {
    public void display(int i) {
        System.out.println("Integer: " + i);
    }

    public void display(double d) {
        System.out.println("Double: " + d);
    }

    public void display(String s) {
        System.out.println("String: " + s);
    }

    public static void main(String[] args) {
        Display d = new Display();
        d.display(10);
        d.display(3.14);
        d.display("Hello");
    }
}
```

**Output:**
```
Integer: 10
Double: 3.14
String: Hello
```

**Explanation:** The compiler selects the method whose parameter type best matches the argument.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate type promotion with overloading.

**Code:**
```java
public class PromotionOverload {
    public void print(int a) {
        System.out.println("int: " + a);
    }

    public void print(long a) {
        System.out.println("long: " + a);
    }

    public void print(double a) {
        System.out.println("double: " + a);
    }

    public static void main(String[] args) {
        PromotionOverload p = new PromotionOverload();
        byte b = 10;
        p.print(b);      // byte promoted to int
        p.print('A');    // char promoted to int
        p.print(10.5f);  // float promoted to double
    }
}
```

**Output:**
```
int: 10
int: 65
double: 10.5
```

**Explanation:** When no exact match exists, Java promotes the argument to the next wider type. `byte` → `int`, `char` → `int`, `float` → `double`.

## 🏢 Real World Use Case
- `System.out.println()` is overloaded for all primitive types, `String`, `char[]`, and `Object`
- `Math.max(int, int)`, `Math.max(long, long)`, `Math.max(float, float)`, `Math.max(double, double)`
- Constructor overloading in DTOs and entity classes

## 🎯 Interview Questions

**Q1: Can two methods have the same name and same parameters but different return types?**
A: No. Return type is not part of the method signature, so the compiler treats them as duplicate definitions.

**Q2: Which overloaded method is called when passing `null`?**
A: If there are multiple reference-type overloads, the compiler chooses the most specific one. Example: `void foo(String)` and `void foo(Integer)` — `foo(null)` is ambiguous and causes a compile error.

**Q3: Can static methods be overloaded?**
A: Yes, static methods can be overloaded just like instance methods.

**Q4: How does overloading differ from overriding?**
A: Overloading is compile-time polymorphism (same name, different params, within same class). Overriding is runtime polymorphism (same signature, different classes via inheritance).

**Q5: What happens if an exact overload match isn't found?**
A: Java applies type promotion (widening). If that also fails, it looks for varargs. If still no match, a compile error occurs.

## ⚠ Common Errors / Mistakes
- Trying to overload only by changing the return type
- Ambiguous overloads with `null` arguments
- Forgetting that widening beats boxing/unboxing in overload resolution
- Expecting varargs to be preferred over a fixed-parameter overload
- Confusing overloading with overriding when learning inheritance

## 📝 Practice Exercises

**Beginner:**
1. Overload a method `area` to calculate the area of a circle (double radius) and a rectangle (double length, double width).
2. Create a class `Printer` with overloaded `print` methods: one for `String`, one for `int`, one for `boolean`.
3. Write a method `concat` that is overloaded: one accepts two strings, another accepts three strings, another accepts an array of strings.

**Intermediate:**
4. Write a class `MathOperations` with overloaded `multiply` methods: `(int, int)`, `(int, int, int)`, `(double, double)`, and `(double, int)`. Show how calling `multiply(2.5, 3)` resolves.
5. Create overloaded methods `log(String message)` and `log(String message, Object... params)` that formats the message with `String.format`.
6. Write a program that demonstrates ambiguity when passing `null` to overloaded methods `foo(String)` and `foo(Integer)`. Fix it using explicit casting.

**Advanced:**
7. Implement a `Matrix` class with overloaded `add` methods that accept: another `Matrix`, a `double` scalar, or `int[][]` array. Each returns a new `Matrix`.
8. Design a `RestClient` class with overloaded `get` methods: `get(String url)`, `get(String url, Map<String,String> headers)`, `get(String url, Class<T> responseType)`, and `get(String url, Map<String,String> headers, Class<T> responseType)`. Use generics.
