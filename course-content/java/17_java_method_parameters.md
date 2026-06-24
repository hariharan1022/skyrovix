## 17. Java Method Parameters

## 📘 Introduction
Parameters allow methods to receive input from the caller. Understanding how parameters work is critical for writing flexible, safe, and reusable methods.

## 🧠 Key Concepts
- **Parameters vs Arguments**: parameters are variables in the method definition; arguments are actual values passed
- **Primitive vs Reference Parameters**: primitives copy the value; references copy the reference (object still shared)
- **Varargs (String...)**: variable-length argument list; must be the last parameter
- **Parameter Naming**: descriptive names following camelCase convention
- **@param Javadoc**: documents each parameter in the method's Javadoc comment
- **Parameter Validation**: checking for null, range, or invalid values at method entry

## 💻 Syntax
```java
// Regular parameters
public returnType methodName(Type param1, Type param2)

// Varargs
public returnType methodName(Type... varargs)

// Javadoc
/**
 * @param param1 description of param1
 * @param param2 description of param2
 * @return description of return value
 */
```

## ✅ Example 1 - Basic

**Problem:** Write a method that greets a user, with a default greeting if no name is provided using varargs.

**Code:**
```java
public class Greeter {
    public void greet(String... names) {
        if (names.length == 0) {
            System.out.println("Hello, Guest!");
        } else {
            for (String name : names) {
                System.out.println("Hello, " + name + "!");
            }
        }
    }

    public static void main(String[] args) {
        Greeter g = new Greeter();
        g.greet();
        g.greet("Alice", "Bob");
    }
}
```

**Output:**
```
Hello, Guest!
Hello, Alice!
Hello, Bob!
```

**Explanation:** The varargs parameter `String... names` accepts zero or more arguments. Inside the method, it is treated as an array.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate the difference between passing a primitive vs a reference type as a parameter.

**Code:**
```java
public class ParamDemo {
    public void modifyPrimitive(int x) {
        x = 100;
    }

    public void modifyString(String s) {
        s = "Modified";
    }

    public void modifyArray(int[] arr) {
        arr[0] = 999;
    }

    public static void main(String[] args) {
        ParamDemo pd = new ParamDemo();

        int num = 5;
        pd.modifyPrimitive(num);
        System.out.println("Primitive after: " + num);

        String str = "Original";
        pd.modifyString(str);
        System.out.println("String after: " + str);

        int[] nums = {1, 2, 3};
        pd.modifyArray(nums);
        System.out.println("Array[0] after: " + nums[0]);
    }
}
```

**Output:**
```
Primitive after: 5
String after: Original
Array[0] after: 999
```

**Explanation:** Primitives are copied, so `x = 100` does not affect the caller. Strings are immutable; reassigning the reference inside the method does not affect the caller. But with the array, the reference points to the same object, so modifying the array's content is visible to the caller.

## 🏢 Real World Use Case
- Varargs is used in `String.format(String format, Object... args)` and `Logger.log(String message, Object... params)`
- Parameter validation with `Objects.requireNonNull(obj, "message")` is standard in constructors and setter methods
- Javadoc with `@param` is required in enterprise Java projects

## 🎯 Interview Questions

**Q1: What is the difference between a parameter and an argument?**
A: Parameters are the variables declared in the method definition. Arguments are the actual values passed when calling the method.

**Q2: Can a method have both varargs and regular parameters?**
A: Yes, but varargs must be the last parameter. Example: `void method(String prefix, int... numbers)`.

**Q3: Is `String...` equivalent to `String[]` as a parameter?**
A: At runtime yes, but callers can pass individual arguments with varargs without explicitly creating an array.

**Q4: Can we overload a method using varargs that clashes with a fixed-parameter version?**
A: It can cause ambiguity. Example: `void foo(int a)` and `void foo(int... a)` — calling `foo(5)` is ambiguous.

**Q5: How do you validate method parameters effectively?**
A: Use `Objects.requireNonNull()` for null checks, `Preconditions` from Guava, or manual `if` checks with `IllegalArgumentException`.

## ⚠ Common Errors / Mistakes
- Declaring varargs as the first or middle parameter (must be last)
- Assuming object parameters are passed by reference (they are passed by value — the reference value is copied)
- Forgetting that String is immutable; reassignment inside method has no external effect
- Not validating parameters leading to NullPointerException
- Crossing varargs with the same type as an array parameter causes ambiguity

## 📝 Practice Exercises

**Beginner:**
1. Write a method `concat(String... strings)` that concatenates all given strings with a space between them.
2. Write a method that accepts two `int` parameters and returns their product.
3. Write a method `printDetails(String name, int age)` that prints a formatted introduction.

**Intermediate:**
4. Write a method `average(double... values)` that returns the average of the given numbers. Handle the case of zero arguments.
5. Create a method `createPerson(String name, int age, String... hobbies)` that prints a person summary along with their hobbies.
6. Write a method `int sum(int[] numbers)` and a varargs version `int sum(int... numbers)` — observe which one takes precedence and why.

**Advanced:**
7. Write a method `validateNotNull(Object... args)` that checks each argument and throws `NullPointerException` with the argument index if any is null.
8. Implement a method `buildQuery(String baseQuery, String... conditions)` that appends `WHERE condition1 AND condition2 ...` to the base query.
