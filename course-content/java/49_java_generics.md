## 49. Java Generics

## 📘 Introduction
Generics enable types (classes, interfaces, methods) to operate on type parameters, providing stronger type checks at compile time, eliminating casts, and enabling type-safe code. Introduced in Java 5.

## 🧠 Key Concepts
- **Generic classes** — Class with type parameter: `class Box<T> { ... }`
- **Generic methods** — Methods with their own type parameter: `<T> void method(T t)`
- **Bounded type parameters** — Restrict type to subclasses: `<T extends Number>`
- **Wildcards** — Unknown type: `?`, bounded wildcards `? extends T`, `? super T`
- **Type erasure** — Generic type info is removed at runtime; only raw type remains
- **Diamond operator** — Type inference: `Box<String> box = new Box<>()` (Java 7+)

## 💻 Syntax
```java
// Generic class
class Box<T> {
    private T value;
    
    public void set(T value) { this.value = value; }
    public T get() { return value; }
}

// Generic method
public static <T> T identity(T arg) {
    return arg;
}

// Bounded type parameter
public static <T extends Number> double sum(T a, T b) {
    return a.doubleValue() + b.doubleValue();
}

// Wildcards
List<? extends Number> readers;   // can read Number
List<? super Integer> writers;    // can write Integer

// Diamond operator
List<String> list = new ArrayList<>();

// Multiple bounds
class MultiBound<T extends Comparable<T> & Serializable> { }
```

## ✅ Example 1 - Basic

**Problem:** Create a generic `Pair<K, V>` class that holds two values of different types. Demonstrate type safety, diamond operator, and generic method.

**Code:**
```java
import java.util.*;

// Generic class with two type parameters
class Pair<K, V> {
    private K key;
    private V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() { return key; }
    public V getValue() { return value; }

    // Generic static method
    public static <K, V> Pair<K, V> of(K key, V value) {
        return new Pair<>(key, value);
    }
}

public class Main {
    public static void main(String[] args) {
        // Diamond operator — type inference
        Pair<String, Integer> p1 = new Pair<>("Age", 25);
        System.out.println(p1.getKey() + ": " + p1.getValue());

        // Compile-time type safety — uncommenting below causes error
        // p1.setValue("thirty");  // ERROR: String not assignable to Integer

        // Using the generic static factory method
        Pair<String, Double> p2 = Pair.of("Price", 19.99);
        System.out.println(p2.getKey() + ": " + p2.getValue());

        // Raw type (not recommended — loses type safety)
        Pair raw = new Pair("Key", "Value");
        String val = (String) raw.getValue();  // must cast
        System.out.println("Raw: " + val);
    }
}
```

**Output:**
```
Age: 25
Price: 19.99
Raw: Value
```

**Explanation:** `Pair<K, V>` is a generic class with two type parameters. The diamond operator `<>` infers types. The static generic method `of()` creates instances. Raw types (no type parameter) lose compile-time safety.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate bounded type parameters, wildcards (producer extends, consumer super), and the PECS principle.

**Code:**
```java
import java.util.*;

public class Main {
    // Bounded type parameter — T must be a Number
    public static <T extends Number> double sumOfList(List<T> list) {
        double sum = 0;
        for (T elem : list) {
            sum += elem.doubleValue();
        }
        return sum;
    }

    // Upper-bounded wildcard — "Producer Extends" (read only)
    public static void printNumbers(List<? extends Number> list) {
        for (Number n : list) {
            System.out.print(n + " ");
        }
        System.out.println();
        // list.add(42);  // ERROR: cannot add to ? extends
    }

    // Lower-bounded wildcard — "Consumer Super" (write only)
    public static void addIntegers(List<? super Integer> list) {
        list.add(10);
        list.add(20);
        list.add(30);
        // Integer val = list.get(0);  // ERROR: can only read as Object
    }

    @SuppressWarnings("unchecked")
    public static void main(String[] args) {
        // Bounded type parameter
        List<Integer> ints = Arrays.asList(1, 2, 3, 4, 5);
        System.out.println("Sum of integers: " + sumOfList(ints));

        List<Double> doubles = Arrays.asList(1.5, 2.5, 3.5);
        System.out.println("Sum of doubles: " + sumOfList(doubles));

        // Wildcards — producer extends
        System.out.print("Numbers: ");
        printNumbers(ints);     // List<Integer> works
        printNumbers(doubles);  // List<Double> works

        // Wildcards — consumer super
        List<Number> numbers = new ArrayList<>();
        addIntegers(numbers);
        System.out.println("Numbers after add: " + numbers);

        // List<Object> also works as consumer
        List<Object> objects = new ArrayList<>();
        addIntegers(objects);
        System.out.println("Objects after add: " + objects);
    }
}
```

**Output:**
```
Sum of integers: 15.0
Sum of doubles: 7.5
Numbers: 1 2 3 4 5 
Numbers: 1.5 2.5 3.5 
Numbers after add: [10, 20, 30]
Objects after add: [10, 20, 30]
```

**Explanation:** Bounded type `<T extends Number>` restricts to Number subclasses. `? extends Number` (producer) allows reading as Number but not writing. `? super Integer` (consumer) allows writing Integer but reading only as Object. This is the PECS principle (Producer Extends, Consumer Super).

## 🏢 Real World Use Case
The Java Collections API uses generics extensively — `List<E>`, `Map<K,V>`, `Comparator<T>`. A data access framework uses `Repository<T, ID>` with `T extends Entity` and `ID extends Serializable>` for type-safe CRUD operations.

## 🎯 Interview Questions

**1. What is type erasure in Java generics?**
The compiler removes generic type information during compilation and replaces type parameters with their bounds (or `Object` if unbounded). The resulting bytecode contains only raw types. This ensures backward compatibility with pre-generics code.

**2. What is the difference between <? extends T> and <? super T>?**
`? extends T` (upper-bounded) — the list can produce/read `T` values (but not add). `? super T` (lower-bounded) — the list can consume/write `T` values (but reading yields only `Object`).

**3. Can we use primitives as type parameters?**
No. Generics work only with reference types. Use wrapper classes (`Integer`, `Double`, etc.) instead.

**4. What is the diamond operator?**
`<>` allows the compiler to infer type arguments from the context. E.g., `List<String> list = new ArrayList<>()`. Without the diamond, you'd need `new ArrayList<String>()`.

**5. Can a generic class have multiple bounded type parameters?**
Yes: `class A<T extends Comparable<T> & Serializable>` — the class bound must come first, then interfaces separated by `&`.

## ⚠ Common Errors / Mistakes
- Using primitives as type parameters (e.g., `List<int>`) — use `List<Integer>` instead
- Creating generic arrays: `new T[10]` — not allowed due to type erasure; use `ArrayList<T>` instead
- Assuming `List<Integer>` is a subclass of `List<Number>` — it's not; generics are invariant
- Using raw types accidentally — lose type safety
- Not understanding that `static` fields of a generic class are shared across all type instantiations

## 📝 Practice Exercises

**Beginner:**
1. Create a generic `Storage<T>` class with methods `store(T item)` and `T retrieve()`. Store and retrieve a String and an Integer.
2. Write a generic method `printArray(T[] arr)` that prints all elements of an array.
3. Use the diamond operator to create `ArrayList<String>` and `HashMap<String, Integer>`.

**Intermediate:**
4. Write a generic method `findMax(T[] arr, Comparator<T> comp)` that finds the maximum element using the given comparator.
5. Create a generic `Cache<K, V>` class with a configurable eviction policy (FIFO). Use `LinkedHashMap<K, V>` internally.
6. Demonstrate PECS — write a method `copy(List<? extends T> source, List<? super T> dest)` that copies all elements from source to dest.

**Advanced:**
7. Implement a type-safe generic builder pattern: `QueryBuilder<T>` with methods `where(String field, T value)`, `orderBy(...)`, and `List<T> execute()`. Use bounded wildcards for the value parameter.
8. Design a generic fluent API for a validation framework: `Validator<T>` with `rule(Predicate<T>, String errorMsg)`, then `validate(T obj)` returns `ValidationResult` with all errors. Use bounded wildcards in the Predicate for covariance.
