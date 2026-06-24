## 50. Java HashMap

## 📘 Introduction
`HashMap<K,V>` is a hash table-based implementation of the `Map` interface. It stores key-value pairs, allowing fast insertion, deletion, and lookup (O(1) average). It permits one null key and multiple null values, and is not synchronized.

## 🧠 Key Concepts
- **HashMap<K,V>** — Hash table implementation; order not guaranteed
- **put / get / remove** — Core operations for inserting, retrieving, and deleting entries
- **containsKey / containsValue** — Check for key/value existence
- **keySet / values / entrySet** — View collections of keys, values, and entries
- **forEach with BiConsumer** — Iterate using lambda: `map.forEach((k, v) -> ...)`
- **HashMap vs TreeMap vs LinkedHashMap** — Ordering guarantees differ
- **equals and hashCode contract** — Keys must implement `equals()` and `hashCode()` consistently
- **Load factor** — Default 0.75; determines when to resize (rehash)
- **Collision handling** — HashMap uses separate chaining (linked lists or red-black trees)

## 💻 Syntax
```java
// Create
Map<String, Integer> map = new HashMap<>();

// Basic operations
map.put("Apple", 10);
int count = map.get("Apple");           // 10
int missing = map.getOrDefault("Banana", 0);  // 0
map.remove("Apple");

// Existence checks
boolean hasKey = map.containsKey("Apple");
boolean hasValue = map.containsValue(10);

// Views
Set<String> keys = map.keySet();
Collection<Integer> values = map.values();
Set<Map.Entry<String, Integer>> entries = map.entrySet();

// Iteration
map.forEach((k, v) -> System.out.println(k + ": " + v));

// Other
map.size();
map.clear();
map.isEmpty();
```

## ✅ Example 1 - Basic

**Problem:** Create a HashMap that stores word frequencies. Insert, retrieve, update, and iterate entries.

**Code:**
```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Create HashMap
        Map<String, Integer> wordCount = new HashMap<>();

        // put — insert or update
        wordCount.put("apple", 3);
        wordCount.put("banana", 2);
        wordCount.put("cherry", 5);
        wordCount.put("apple", wordCount.get("apple") + 1);  // update: 3 → 4

        // get and getOrDefault
        System.out.println("apple count: " + wordCount.get("apple"));
        System.out.println("durian count: " + wordCount.getOrDefault("durian", 0));

        // containsKey and containsValue
        System.out.println("Contains 'banana': " + wordCount.containsKey("banana"));
        System.out.println("Count 5 exists: " + wordCount.containsValue(5));

        // keySet, values, entrySet
        System.out.println("Keys: " + wordCount.keySet());
        System.out.println("Values: " + wordCount.values());

        System.out.println("\nEntries:");
        for (Map.Entry<String, Integer> entry : wordCount.entrySet()) {
            System.out.println("  " + entry.getKey() + " → " + entry.getValue());
        }

        // remove
        wordCount.remove("cherry");
        System.out.println("After remove: " + wordCount);

        // size and isEmpty
        System.out.println("Size: " + wordCount.size());
        System.out.println("Is empty: " + wordCount.isEmpty());
    }
}
```

**Output:**
```
apple count: 4
durian count: 0
Contains 'banana': true
Count 5 exists: true
Keys: [banana, cherry, apple]
Values: [2, 5, 4]

Entries:
  banana → 2
  cherry → 5
  apple → 4
After remove: {banana=2, apple=4}
Size: 2
Is empty: false
```

**Explanation:** `put()` inserts or updates. `get()` returns the value or `null`. `entrySet()` provides key-value pairs. `keySet/values` return views backed by the map — changes to them affect the map.

## 🚀 Example 2 - Intermediate

**Problem:** Use `forEach` with `BiConsumer`, compare `HashMap` vs `TreeMap` vs `LinkedHashMap`, and demonstrate a custom object as key with proper `equals`/`hashCode`.

**Code:**
```java
import java.util.*;

class Person {
    String name;
    int id;

    Person(String name, int id) {
        this.name = name;
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Person)) return false;
        Person p = (Person) o;
        return id == p.id && Objects.equals(name, p.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, id);
    }

    public String toString() { return name + "(" + id + ")"; }
}

public class Main {
    public static void main(String[] args) {
        // forEach with BiConsumer
        Map<String, String> config = new HashMap<>();
        config.put("host", "localhost");
        config.put("port", "8080");
        config.put("timeout", "5000");

        System.out.println("--- forEach with BiConsumer ---");
        config.forEach((key, value) ->
            System.out.println(key + " = " + value));

        // HashMap vs TreeMap vs LinkedHashMap
        System.out.println("\n--- HashMap (no order) ---");
        Map<Integer, String> hashMap = new HashMap<>();
        hashMap.put(3, "three");
        hashMap.put(1, "one");
        hashMap.put(2, "two");
        hashMap.forEach((k, v) -> System.out.println("  " + k + " → " + v));

        System.out.println("--- TreeMap (sorted by key) ---");
        Map<Integer, String> treeMap = new TreeMap<>();
        treeMap.put(3, "three");
        treeMap.put(1, "one");
        treeMap.put(2, "two");
        treeMap.forEach((k, v) -> System.out.println("  " + k + " → " + v));

        System.out.println("--- LinkedHashMap (insertion order) ---");
        Map<Integer, String> linkedMap = new LinkedHashMap<>();
        linkedMap.put(3, "three");
        linkedMap.put(1, "one");
        linkedMap.put(2, "two");
        linkedMap.forEach((k, v) -> System.out.println("  " + k + " → " + v));

        // Custom object as key — requires equals() and hashCode()
        System.out.println("\n--- Custom Person key ---");
        Map<Person, String> personMap = new HashMap<>();
        personMap.put(new Person("Alice", 1), "Engineer");
        personMap.put(new Person("Bob", 2), "Designer");

        // Retrieval works because equals/hashCode are properly implemented
        String role = personMap.get(new Person("Alice", 1));
        System.out.println("Alice's role: " + role);

        // Load factor example: initial capacity and load factor
        Map<String, Integer> optimized = new HashMap<>(64, 0.8f);
        System.out.println("Optimized map created with capacity 64, load factor 0.8");
    }
}
```

**Output:**
```
--- forEach with BiConsumer ---
host = localhost
port = 8080
timeout = 5000

--- HashMap (no order) ---
  1 → one
  2 → two
  3 → three
--- TreeMap (sorted by key) ---
  1 → one
  2 → two
  3 → three
--- LinkedHashMap (insertion order) ---
  3 → three
  1 → one
  2 → two

--- Custom Person key ---
Alice's role: Engineer
Optimized map created with capacity 64, load factor 0.8
```

**Explanation:** `HashMap` has no ordering guarantee. `TreeMap` sorts by keys (natural order or custom `Comparator`). `LinkedHashMap` maintains insertion order. Custom keys must implement `equals()` and `hashCode()` consistently for correct `HashMap` behavior.

## 🏢 Real World Use Case
A web application session manager uses `HashMap<String, HttpSession>` for O(1) session lookups. A caching layer uses `LinkedHashMap` with access-order for LRU eviction. A configuration service uses `TreeMap` to store sorted property keys.

## 🎯 Interview Questions

**1. How does HashMap handle collisions?**
HashMap uses separate chaining — when two keys hash to the same bucket, entries are stored in a linked list. If a bucket exceeds 8 entries, the list converts to a red-black tree for O(log n) lookup (Java 8+).

**2. What is the load factor and what happens when it's exceeded?**
Load factor (default 0.75) controls when the HashMap resizes. When the number of entries exceeds `capacity × load factor`, the capacity doubles and entries are rehashed. Higher load factor saves memory but increases lookup time.

**3. What is the contract between equals() and hashCode()?**
If two objects are equal via `equals()`, they must have the same `hashCode()`. If they have the same `hashCode()`, they may or may not be equal. Violating this causes HashMap to behave incorrectly.

**4. What is the difference between HashMap, TreeMap, and LinkedHashMap?**
HashMap: O(1) operations, no order. TreeMap: O(log n), sorted by key (Comparable or Comparator). LinkedHashMap: O(1), maintains insertion or access order.

**5. Is HashMap thread-safe?**
No. Use `Collections.synchronizedMap(map)` or `ConcurrentHashMap` for concurrent access. ConcurrentHashMap provides better scalability with segment-based locking.

## ⚠ Common Errors / Mistakes
- Using mutable objects as keys — modifying a key's fields changes its hashCode, making it unfindable in the map
- Forgetting to override `hashCode()` when overriding `equals()` — causes lookup failures
- Assuming HashMap has ordering — use `LinkedHashMap` or `TreeMap` if order matters
- Not initializing capacity for large maps — frequent resizing/rehashing degrades performance
- Using `HashMap` in multi-threaded context without synchronization — use `ConcurrentHashMap`

## 📝 Practice Exercises

**Beginner:**
1. Create a `HashMap<String, Integer>` of 5 students and their scores. Update one student's score, remove another, and print the map.
2. Write a program that counts character frequency in a string using `HashMap<Character, Integer>`.
3. Use `getOrDefault()` to count word occurrences in a sentence without explicit null checks.

**Intermediate:**
4. Create a `LinkedHashMap` with access-order `true` to implement a simple LRU cache that evicts the least recently accessed entry when it exceeds a max size of 5.
5. Use `TreeMap` to store employee records with employee ID (Integer) as key and name as value. Print them in sorted order.
6. Write a program that merges two maps — for common keys, sum the values; for unique keys, keep them. Use `HashMap.merge()`.

**Advanced:**
7. Implement a custom `HashMap` from scratch (using an array of buckets with linked lists) that supports `put()`, `get()`, `remove()`, resizing, and proper hash distribution.
8. Design a multi-level cache with `ConcurrentHashMap` and `TreeMap` — L1 cache (fast, small, LRU eviction using LinkedHashMap), L2 cache (larger, sorted by access time using TreeMap), with a background thread to promote/demote entries between layers.
