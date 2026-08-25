## 51. Java Collections Framework

## 📘 Introduction
The Java Collections Framework (JCF) provides a unified architecture for storing, retrieving, and manipulating groups of objects. It includes interfaces, implementations, and algorithms that eliminate the need for custom data structures, offering reusable, high-performance collections out of the box.

## 🧠 Key Concepts
- **Collection interface hierarchy**: `Iterable` → `Collection` → `List`, `Set`, `Queue`
- **Map** is separate from `Collection` — `Map<K,V>` with `HashMap`, `TreeMap`, `LinkedHashMap`
- **List**: Ordered, allows duplicates (`ArrayList`, `LinkedList`, `Vector`)
- **Set**: Unordered, no duplicates (`HashSet`, `LinkedHashSet`, `TreeSet`)
- **Queue**: FIFO / priority ordering (`LinkedList`, `PriorityQueue`, `ArrayDeque`)
- **Collections utility class**: Static methods for sorting, searching, synchronizing
- Choosing the right collection depends on access pattern, ordering needs, null tolerance, and thread safety

## 💻 Syntax

```java
// Collection hierarchy relationships
Collection<String> list = new ArrayList<>();
Collection<String> set  = new HashSet<>();
Queue<String>      queue = new LinkedList<>();
Map<String, Integer> map = new HashMap<>();

// Collections utility
Collections.sort(list);
Collections.reverse(list);
Collections.shuffle(list);
int index = Collections.binarySearch(list, "value");
int freq  = Collections.frequency(list, "value");
List<String> unmod = Collections.unmodifiableList(list);
```

## ✅ Example 1 - Basic
**Problem**: Demonstrate basic Collection operations — add, remove, size, and iteration across List, Set, and Map.

```java
import java.util.*;

public class BasicCollections {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C", "A"));
        Set<String> set = new HashSet<>(list);
        Map<String, Integer> map = new HashMap<>();
        map.put("A", 1); map.put("B", 2);

        System.out.println("List: " + list + " | size=" + list.size());
        System.out.println("Set (no dupes): " + set + " | size=" + set.size());
        System.out.println("Map: " + map);

        list.remove("A");
        System.out.println("After remove 'A': " + list);
    }
}
```

**Output:**
```
List: [A, B, C, A] | size=4
Set (no dupes): [A, B, C] | size=3
Map: {A=1, B=2}
After remove 'A': [B, C, A]
```

**Explanation:** The List preserves duplicates and insertion order, the Set deduplicates automatically, and the Map stores key-value pairs. `remove()` on List removes only the first occurrence.

## 🚀 Example 2 - Intermediate
**Problem**: Use `Collections` utility methods to sort, search, shuffle, and create an unmodifiable view of a list.

```java
import java.util.*;

public class CollectionsUtilityDemo {
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(Arrays.asList(5, 3, 9, 1, 7, 3));

        Collections.sort(nums);
        System.out.println("Sorted: " + nums);

        int idx = Collections.binarySearch(nums, 7);
        System.out.println("Index of 7: " + idx);

        Collections.shuffle(nums);
        System.out.println("Shuffled: " + nums);

        System.out.println("Min: " + Collections.min(nums));
        System.out.println("Max: " + Collections.max(nums));
        System.out.println("Frequency of 3: " + Collections.frequency(nums, 3));

        List<Integer> immutable = Collections.unmodifiableList(nums);
        // immutable.add(99); // throws UnsupportedOperationException
    }
}
```

**Output:**
```
Sorted: [1, 3, 3, 5, 7, 9]
Index of 7: 4
Shuffled: [3, 9, 1, 5, 7, 3]
Min: 1
Max: 9
Frequency of 3: 2
```

**Explanation:** `Collections.sort` uses TimSort (O(n log n)). `binarySearch` requires prior sorting. `unmodifiableList` creates a read-only view — any mutation attempt throws `UnsupportedOperationException`.

## 🏢 Real World Use Case
**E-commerce product catalog filtering**: A `HashMap<String, Product>` for O(1) lookups by SKU, a `TreeSet<Product>` for sorted display by price, and `Collections.sort(cartItems)` to arrange a user's cart for checkout. The Collections utility class provides sorting, searching, and synchronization across the catalog service.

## 🎯 Interview Questions

1. **Q: What is the difference between Collection and Collections?**
   A: `Collection` is the root interface of the collections hierarchy (List, Set, Queue). `Collections` is a utility class with static methods for operating on collections (sort, shuffle, unmodifiable).

2. **Q: Which collection does not implement the Collection interface?**
   A: `Map` — it implements `Map<K,V>` directly, not `Collection<E>`. It is still part of the Java Collections Framework.

3. **Q: When would you choose ArrayList over LinkedList?**
   A: ArrayList when random access (get by index) is frequent and the list is read-heavy. LinkedList when frequent insertions/removals at ends or middle are needed.

4. **Q: Explain fail-fast vs fail-safe iterators in the context of collections.**
   A: Fail-fast iterators (ArrayList, HashMap) throw `ConcurrentModificationException` if the collection is structurally modified during iteration. Fail-safe iterators (CopyOnWriteArrayList, ConcurrentHashMap) operate on a snapshot and do not throw.

5. **Q: How do you make a collection thread-safe?**
   A: Use `Collections.synchronizedList(list)`, `Collections.synchronizedMap(map)`, or the `java.util.concurrent` classes like `CopyOnWriteArrayList`, `ConcurrentHashMap`.

## ⚠ Common Errors / Mistakes
- Using `==` instead of `.equals()` for element comparison inside collections
- Modifying a collection while iterating with for-each — use `Iterator.remove()` instead
- Forgetting that `HashSet`/`HashMap` require proper `hashCode()` and `equals()` overrides
- Assuming `TreeSet`/`TreeMap` elements are Comparable; otherwise provide a Comparator or get `ClassCastException`
- Returning reference to internal collection instead of an unmodifiable or defensive copy

## 📝 Practice Exercises

**Beginner:**
1. Create a `List<String>` of 5 colors, sort it, reverse it, and print the result.
2. Write a program that counts word frequencies in a sentence using `HashMap<String, Integer>`.
3. Create a `HashSet` of integers, add duplicates, and verify that the set size equals the number of unique elements.

**Intermediate:**
4. Use `Collections.frequency()` to find all duplicate elements in a list and print them.
5. Write a method that merges two `List<Integer>` into one sorted list without duplicates.
6. Implement a `Queue<String>` using `LinkedList` (or `PriorityQueue`) that processes tasks in FIFO order.

**Advanced:**
7. Implement a thread-safe cache using `Collections.synchronizedMap()` that evicts the oldest entry when it exceeds a capacity of 100.
8. Build a custom `TreeSet` with a `Comparator` that sorts `Person` objects by age descending, then by name alphabetically.
