## 60. Java Lambda

## 📘 Introduction
Lambda expressions (introduced in Java 8) enable functional programming by allowing you to treat functions as method arguments. A lambda is a concise way to implement a functional interface (an interface with a single abstract method). Together with the Stream API, lambdas revolutionized Java's expressiveness.

## 🧠 Key Concepts
- **Lambda syntax**: `(parameters) -> expression` or `(parameters) -> { statements; }`
- **Functional interfaces**: `Runnable` (no params, void), `Comparator<T>` (compare), `Consumer<T>` (consume), `Supplier<T>` (supply), `Function<T,R>` (transform), `Predicate<T>` (test boolean)
- **Method references**: `ClassName::staticMethod`, `instance::method`, `ClassName::instanceMethod`, `Class::new`
- **Stream API overview**: `filter(Predicate)`, `map(Function)`, `reduce(BinaryOperator)`, `collect(Collector)`, `forEach(Consumer)`
- **Lambda scope**: Lambdas capture variables from enclosing scope — they must be **effectively final** (not reassigned)
- **Effectively final**: A variable is effectively final if its value never changes after initialization
- **Stream pipeline**: Source → intermediate operations (lazy) → terminal operation (eager)
- **Common Collectors**: `toList()`, `toSet()`, `toMap()`, `joining()`, `groupingBy()`, `counting()`

## 💻 Syntax

```java
// Lambda forms
Runnable r = () -> System.out.println("Hello");
Comparator<String> byLen = (a, b) -> Integer.compare(a.length(), b.length());
Consumer<String> printer = s -> System.out.println(s);
Supplier<Double> random = () -> Math.random();
Function<String, Integer> parser = s -> Integer.parseInt(s);
Predicate<String> isEmpty = s -> s.isEmpty();

// Method references
Consumer<String> print = System.out::println;  // instance::method
Function<String, Integer> parse = Integer::parseInt; // Class::staticMethod
Comparator<Integer> comp = Integer::compareTo; // Class::instanceMethod
Supplier<List<String>> maker = ArrayList::new; // Class::new

// Stream API
List<String> result = list.stream()
    .filter(s -> s.startsWith("A"))
    .map(String::toUpperCase)
    .sorted()
    .collect(Collectors.toList());
```

## ✅ Example 1 - Basic
**Problem**: Demonstrate lambda syntax with common functional interfaces and method references.

```java
import java.util.*;
import java.util.function.*;

public class LambdaBasics {
    public static void main(String[] args) {
        // Predicate: test condition
        Predicate<Integer> isEven = n -> n % 2 == 0;
        System.out.println("Is 4 even? " + isEven.test(4));

        // Function: transform
        Function<String, Integer> wordCount = s -> s.split("\\s+").length;
        System.out.println("Word count: " + wordCount.apply("Java lambda rocks"));

        // Consumer: consume value
        Consumer<String> shout = s -> System.out.println(s.toUpperCase() + "!");
        shout.accept("hello");

        // Supplier: supply value
        Supplier<Double> piSupplier = () -> Math.PI;
        System.out.println("Pi: " + piSupplier.get());

        // Method reference
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        names.forEach(System.out::println);

        // Comparator as lambda
        names.sort((a, b) -> Integer.compare(b.length(), a.length()));
        System.out.println("Sorted by length desc: " + names);
    }
}
```

**Output:**
```
Is 4 even? true
Word count: 3
HELLO!
Pi: 3.141592653589793
Alice
Bob
Charlie
Sorted by length desc: [Charlie, Alice, Bob]
```

**Explanation:** Each lambda implements a functional interface with a single abstract method. Method references (`System.out::println`) provide even more concise syntax. The `sort` lambda sorts names by descending length.

## 🚀 Example 2 - Intermediate
**Problem**: Demonstrate Stream API pipeline — filter, map, reduce, collect, and groupingBy with effectively final and method references.

```java
import java.util.*;
import java.util.stream.*;

public class StreamAPIDemo {
    public static void main(String[] args) {
        List<String> words = Arrays.asList(
            "lambda", "stream", "java", "functional",
            "predicate", "java", "collector", "lambda"
        );

        // Pipeline: filter unique words with length > 4, uppercase, sort
        List<String> filtered = words.stream()
            .distinct()
            .filter(w -> w.length() > 4)
            .map(String::toUpperCase)
            .sorted()
            .collect(Collectors.toList());
        System.out.println("Filtered: " + filtered);

        // Reduce: concatenate
        String concatenated = words.stream()
            .distinct()
            .reduce("", (a, b) -> a + "-" + b);
        System.out.println("Reduced: " + concatenated);

        // GroupingBy: count word frequency
        Map<String, Long> freq = words.stream()
            .collect(Collectors.groupingBy(
                Function.identity(), Collectors.counting()
            ));
        System.out.println("Frequency: " + freq);

        // Sum of lengths using mapToInt + sum
        int totalLength = words.stream()
            .distinct()
            .mapToInt(String::length)
            .sum();
        System.out.println("Total unique length: " + totalLength);

        // Effectively final variable captured in lambda
        String suffix = "!";
        words.stream().limit(3).forEach(w -> System.out.print(w + suffix + " "));
    }
}
```

**Output:**
```
Filtered: [COLLECTOR, FUNCTIONAL, LAMBDA, PREDICATE, STREAM]
Reduced: -lambda-stream-java-functional-predicate-collector
Frequency: {lambda=2, stream=1, functional=1, predicate=1, collector=1, java=2}
Total unique length: 45
lambda! stream! java!
```

**Explanation:** The Stream pipeline is lazy until `collect()` is called. `distinct()` removes duplicates. `filter` with `Predicate`, `map` with `Function`, and `sorted` form intermediate ops. `groupingBy` + `counting()` produces frequency maps. The variable `suffix` is effectively final — it compiles only because it is never reassigned.

## 🏢 Real World Use Case
**E-commerce order analytics**: A stream pipeline processes millions of orders: `orders.stream().filter(o -> o.getStatus() == COMPLETED).mapToDouble(Order::getTotal).average()` computes average order value. `groupingBy(Order::getCategory, summingDouble(Order::getTotal))` calculates revenue by category. `map(order -> order.getItems()).flatMap(Collection::stream)` flattens order items. Lambdas replace dozens of verbose anonymous inner classes, improving readability and maintainability.

## 🎯 Interview Questions

1. **Q: What is a functional interface?**
   A: An interface with exactly one abstract method (SAM — Single Abstract Method). Examples: `Runnable`, `Comparator`, `Consumer<T>`, `Function<T,R>`. Can have default and static methods. Annotated with `@FunctionalInterface`.

2. **Q: What does "effectively final" mean in the context of lambdas?**
   A: A variable is effectively final if it is never reassigned after initialization. Lambdas can only capture effectively final variables from the enclosing scope. This prevents race conditions and aliasing issues.

3. **Q: What is the difference between `map` and `flatMap` in streams?**
   A: `map` transforms each element to another object (1:1). `flatMap` transforms each element to a Stream and flattens the results (1:N). For example, `flatMap(line -> Arrays.stream(line.split(" ")))` flattens lines into words.

4. **Q: What are the types of method references?**
   A: (1) `Class::staticMethod` — `Integer::parseInt`. (2) `instance::method` — `System.out::println`. (3) `Class::instanceMethod` — `String::length` (first arg becomes the instance). (4) `Class::new` — `ArrayList::new`.

5. **Q: What is the difference between intermediate and terminal stream operations?**
   A: Intermediate operations (`filter`, `map`, `sorted`) are lazy — they return a new stream and do nothing until a terminal operation is invoked. Terminal operations (`collect`, `forEach`, `reduce`, `count`) trigger the pipeline and close the stream.

## ⚠ Common Errors / Mistakes
- Reassigning a captured variable inside the lambda body (variables must be effectively final)
- Using `return` in a single-expression lambda unnecessarily: `(a, b) -> a + b` not `(a, b) -> { return a + b; }`
- Storing a mutable array/list in a final reference and modifying it inside a lambda (works but breaks the spirit of effectively final)
- Calling `collect()` multiple times on the same stream (streams can only be consumed once)
- Forgetting that `filter`/`map` return new streams and do not modify the original collection

## 📝 Practice Exercises

**Beginner:**
1. Write a lambda that implements `Predicate<Integer>` to check if a number is a perfect square.
2. Use `list.forEach()` with a lambda to print each element of a list, then convert to method reference.
3. Implement a `Comparator<Person>` using a lambda that sorts by last name, then by first name.

**Intermediate:**
4. Given a list of strings, use streams to: filter strings starting with vowel, convert to uppercase, sort descending, and collect to a list.
5. Use `Stream.iterate` and `limit` to generate the first 20 Fibonacci numbers, collect to a list, and find the sum using `reduce`.
6. Use `Collectors.groupingBy` and `Collectors.mapping` to group a list of words by their first letter and collect the words as a `Set`.

**Advanced:**
7. Implement a custom `Collector` that collects stream elements into a `LinkedList` while inserting each element at the head (reverse order).
8. Build a parallel stream pipeline that processes a large file (10M+ lines), filters lines matching a regex pattern, groups by date, and aggregates counts — measure parallel vs sequential performance.
