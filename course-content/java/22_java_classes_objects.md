## 22. Java Classes / Objects

## 📘 Introduction
Objects are the runtime instances of classes. Java is object-centric — almost everything is an object, except primitives. Understanding object creation, comparison, lifecycle, and memory management is essential.

## 🧠 Key Concepts
- **Object Creation**: using the `new` keyword invokes a constructor and allocates heap memory
- **Reference Variables**: hold the memory address of an object; not the object itself
- **Object Comparison**: `==` compares references; `equals()` compares content (can be overridden)
- **`toString()`**: returns a string representation of an object; overridden for meaningful output
- **`hashCode()`**: returns an integer hash; used in hash-based collections (HashMap, HashSet)
- **Garbage Collection**: JVM automatically destroys objects with no live references
- **Null References**: a reference that points to no object; accessing it throws NullPointerException

## 💻 Syntax
```java
MyClass obj = new MyClass();           // create object
if (obj instanceof MyClass) { }        // type check
String s = obj.toString();             // string representation
boolean eq = obj1.equals(obj2);        // equality check
int hash = obj.hashCode();             // hash code
obj = null;                            // eligible for GC
```

## ✅ Example 1 - Basic

**Problem:** Create two `Person` objects, compare them with `==` and `equals()`, and print their string representations.

**Code:**
```java
public class Person {
    String name;

    public Person(String name) {
        this.name = name;
    }

    public static void main(String[] args) {
        Person p1 = new Person("Alice");
        Person p2 = new Person("Alice");
        Person p3 = p1;

        System.out.println("p1 == p2: " + (p1 == p2));
        System.out.println("p1 == p3: " + (p1 == p3));
        System.out.println("p1.equals(p2): " + p1.equals(p2));
        System.out.println("p1: " + p1);
    }
}
```

**Output:**
```
p1 == p2: false
p1 == p3: true
p1.equals(p2): false
p1: Person@<hashcode>
```

**Explanation:** `==` checks reference equality — `p1` and `p2` are different objects. `p1 == p3` is true because they point to the same object. `equals()` is not overridden, so it behaves like `==`. The default `toString()` prints class name + hash.

## 🚀 Example 2 - Intermediate

**Problem:** Override `equals()`, `hashCode()`, and `toString()` in the `Person` class.

**Code:**
```java
import java.util.Objects;

public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return age == person.age && Objects.equals(name, person.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }

    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }

    public static void main(String[] args) {
        Person p1 = new Person("Alice", 25);
        Person p2 = new Person("Alice", 25);
        Person p3 = new Person("Bob", 30);

        System.out.println(p1);
        System.out.println("p1.equals(p2): " + p1.equals(p2));
        System.out.println("p1.hashCode() == p2.hashCode(): " + (p1.hashCode() == p2.hashCode()));
        System.out.println(p3);

        p1 = null;
        System.gc();  // suggest GC (not guaranteed)
        System.out.println("p1 may be garbage collected");
    }
}
```

**Output:**
```
Person{name='Alice', age=25}
p1.equals(p2): true
p1.hashCode() == p2.hashCode(): true
Person{name='Bob', age=30}
p1 may be garbage collected
```

**Explanation:** Overridden `equals()` compares by content. `hashCode()` is consistent with `equals` (same fields). `toString()` provides readable output. Setting `p1 = null` marks it for garbage collection.

## 🏢 Real World Use Case
- Hibernate entities require proper `equals()` and `hashCode()` overrides for correct caching and collection behavior
- DTOs override `toString()` for logging and debugging
- Object pooling and caching rely on proper equality semantics

## 🎯 Interview Questions

**Q1: What is the difference between `==` and `equals()`?**
A: `==` compares reference (memory address). `equals()` compares content when overridden; otherwise behaves like `==`.

**Q2: Why must `hashCode()` and `equals()` be consistent?**
A: Hash-based collections (HashMap, HashSet) use `hashCode()` to find buckets and `equals()` to find exact matches. If two objects are equal but have different hash codes, lookups fail.

**Q3: How does garbage collection work in Java?**
A: The JVM's garbage collector runs periodically, destroying objects that have no active references. It is automatic and non-deterministic.

**Q4: What is a null reference? What happens when you access a method on it?**
A: A null reference points to no object. Calling a method or accessing a field on it throws `NullPointerException`.

**Q5: What is `toString()` used for?**
A: It returns a string representation of the object. It is called implicitly when concatenating with a string or passing to `System.out.print()`.

## ⚠ Common Errors / Mistakes
- Using `==` instead of `equals()` for string comparison
- Overriding `equals()` without overriding `hashCode()` (breaks hash collections)
- Forgetting to override `equals()` correctly (null checks, type checks)
- Calling methods on null references
- Relying on `System.gc()` to run immediately (it is only a suggestion)

## 📝 Practice Exercises

**Beginner:**
1. Create two `String` objects using `new String("hello")` and compare them with `==` and `equals()`.
2. Create a class `Item` with fields `id` and `name`. Do not override anything. Print an instance using `System.out.println()`.
3. Write a program that attempts to call a method on a null reference and catches the `NullPointerException`.

**Intermediate:**
4. Override `equals()`, `hashCode()`, and `toString()` in an `Order` class with fields `orderId`, `customerName`, and `totalAmount`. Create two equal orders and verify they work correctly in a `HashSet`.
5. Write a program that demonstrates that two objects with the same content but not overridden `equals()` are treated as different in a `List.contains()` check.
6. Create a `Product` class with `id` and `price`. Use it as a key in a `HashMap`. Show what happens without `hashCode()` override.

**Advanced:**
7. Implement a simple `ObjectPool` that reuses objects. The pool should track which objects are "in use" and which are "available". Use weak references to allow GC of abandoned objects.
8. Write a `DeepCopyUtil` class with a static method `<T> T deepCopy(T obj)` using serialization or reflection to create a deep copy of any serializable object.
