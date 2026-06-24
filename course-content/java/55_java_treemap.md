## 55. Java TreeMap

## 📘 Introduction
`TreeMap<K,V>` is a Red-Black tree-based implementation of the `NavigableMap` interface. It stores keys in sorted order — either by their natural ordering (Comparable) or by a provided Comparator. All operations (put, get, remove) are O(log n).

## 🧠 Key Concepts
- **Sorted map**: Keys are always in sorted order; iteration order is deterministic
- **put(K, V) / get(Object) / remove(Object)**: O(log n) operations
- **firstKey() / lastKey()**: Returns the smallest and largest key
- **subMap(fromKey, toKey)**: View of portion of the map (half-open: inclusive from, exclusive to)
- **headMap(toKey) / tailMap(fromKey)**: Views for keys less than toKey / greater than or equal to fromKey
- **TreeMap vs HashMap vs LinkedHashMap**:
  - TreeMap: sorted, O(log n), requires Comparable/Comparator
  - HashMap: unordered, O(1), requires hashCode/equals
  - LinkedHashMap: insertion-order (or access-order), O(1), predictable iteration
- **Comparator and Comparable**: If keys implement `Comparable`, natural order is used. Pass a `Comparator` to the constructor for custom ordering
- **NavigableMap methods**: `lowerKey`, `floorKey`, `ceilingKey`, `higherKey`, `descendingMap`, `pollFirstEntry`, `pollLastEntry`

## 💻 Syntax

```java
// Natural ordering (keys must implement Comparable)
TreeMap<String, Integer> map = new TreeMap<>();

// Custom Comparator
TreeMap<String, Integer> rev = new TreeMap<>(Comparator.reverseOrder());

map.put("Charlie", 30);
map.put("Alice", 25);
map.put("Bob", 28);

String first = map.firstKey();        // "Alice"
String last  = map.lastKey();         // "Charlie"

// Sorted view methods
SortedMap<String, Integer> sub = map.subMap("B", "D");     // {Bob=28, Charlie=30}
SortedMap<String, Integer> head = map.headMap("C");        // {Alice=25, Bob=28}
SortedMap<String, Integer> tail = map.tailMap("B");        // {Bob=28, Charlie=30}

// NavigableMap methods
String ceiling = map.ceilingKey("B");    // "Bob"
String higher  = map.higherKey("Bob");   // "Charlie"
String lower   = map.lowerKey("Bob");    // "Alice"
Map.Entry<String,Integer> firstEntry = map.pollFirstEntry();

// Reverse view
NavigableMap<String,Integer> desc = map.descendingMap();
```

## ✅ Example 1 - Basic
**Problem**: Store employee salary data in a TreeMap (sorted by name), retrieve first/last, and use head/tail views.

```java
import java.util.*;

public class TreeMapBasics {
    public static void main(String[] args) {
        TreeMap<String, Integer> salaries = new TreeMap<>();

        salaries.put("Diana", 75000);
        salaries.put("Alice", 68000);
        salaries.put("Charlie", 82000);
        salaries.put("Bob", 71000);

        System.out.println("Salaries (sorted by name): " + salaries);
        System.out.println("First key: " + salaries.firstKey());
        System.out.println("Last key: " + salaries.lastKey());

        // Employees whose name is >= "C"
        SortedMap<String, Integer> fromC = salaries.tailMap("C");
        System.out.println("From 'C' onwards: " + fromC);

        // Employees whose name < "C"
        SortedMap<String, Integer> beforeC = salaries.headMap("C");
        System.out.println("Before 'C': " + beforeC);

        // Keys in alphabetical range [A, D)
        SortedMap<String, Integer> aToD = salaries.subMap("A", "D");
        System.out.println("A to D: " + aToD);
    }
}
```

**Output:**
```
Salaries (sorted by name): {Alice=68000, Bob=71000, Charlie=82000, Diana=75000}
First key: Alice
Last key: Diana
From 'C' onwards: {Charlie=82000, Diana=75000}
Before 'C': {Alice=68000, Bob=71000}
A to D: {Alice=68000, Bob=71000, Charlie=82000}
```

**Explanation:** TreeMap sorts keys alphabetically (natural order of String). `headMap`/`tailMap`/`subMap` return live views backed by the original map — modifications to the view affect the original.

## 🚀 Example 2 - Intermediate
**Problem**: Use a custom Comparator to sort by salary value (descending), demonstrate NavigableMap methods, and compare with HashMap.

```java
import java.util.*;

public class TreeMapAdvanced {
    public static void main(String[] args) {
        // TreeMap with custom Comparator: sort by salary descending
        // (We store salary as key so we can sort by it)
        TreeMap<Integer, String> bySalary = new TreeMap<>(Comparator.reverseOrder());
        bySalary.put(68000, "Alice");
        bySalary.put(82000, "Charlie");
        bySalary.put(71000, "Bob");
        bySalary.put(75000, "Diana");

        System.out.println("By salary (desc): " + bySalary);
        System.out.println("Highest paid: " + bySalary.firstEntry());
        System.out.println("Lowest paid: " + bySalary.lastEntry());

        // NavigableMap methods
        System.out.println("Ceiling of 72000: " + bySalary.ceilingKey(72000));
        System.out.println("Lower than 75000: " + bySalary.lowerKey(75000));
        System.out.println("Descending map: " + bySalary.descendingMap());

        // HashMap vs TreeMap comparison
        Map<String, Integer> hashMap = new HashMap<>();
        hashMap.put("Z", 1); hashMap.put("A", 2); hashMap.put("M", 3);
        System.out.println("\nHashMap: " + hashMap);

        TreeMap<String, Integer> treeMap = new TreeMap<>(hashMap);
        System.out.println("TreeMap from HashMap: " + treeMap);
    }
}
```

**Output:**
```
By salary (desc): {82000=Charlie, 75000=Diana, 71000=Bob, 68000=Alice}
Highest paid: 82000=Charlie
Lowest paid: 68000=Alice
Ceiling of 72000: 75000
Lower than 75000: 71000
Descending map: {68000=Alice, 71000=Bob, 75000=Diana, 82000=Charlie}

HashMap: {A=2, Z=1, M=3}
TreeMap from HashMap: {A=2, M=3, Z=1}
```

**Explanation:** A custom reverse-order Comparator sorts salaries descending. `ceilingKey(72000)` returns the smallest key >= 72000. `lowerKey(75000)` returns the greatest key < 75000. A TreeMap can be constructed from any Map to get a sorted view.

## 🏢 Real World Use Case
**Stock order book**: A `TreeMap<Double, List<Order>>` stores buy orders sorted by price descending (custom Comparator). The best bid is `firstEntry()`. `subMap(lowPrice, highPrice)` shows the order book for a price range. `pollFirstEntry()` matches the highest bid instantly. A `NavigableMap` provides `ceilingKey` / `floorKey` for price-level lookups during order matching.

## 🎯 Interview Questions

1. **Q: What data structure does TreeMap use internally?**
   A: A Red-Black tree — a self-balancing binary search tree that guarantees O(log n) for put, get, and remove.

2. **Q: What is the difference between TreeMap and HashMap?**
   A: TreeMap: sorted keys, O(log n), requires Comparable/Comparator, no null keys. HashMap: unordered, O(1), requires hashCode/equals, allows one null key.

3. **Q: How does subMap work? What happens if the fromKey > toKey?**
   A: `subMap(fromKey, toKey)` returns a view of the map from `fromKey` (inclusive) to `toKey` (exclusive). If `fromKey > toKey`, it throws `IllegalArgumentException`.

4. **Q: What is the difference between `headMap(toKey)` and `headMap(toKey, inclusive)`?**
   A: The first returns a `SortedMap` view that excludes `toKey`. The second (NavigableMap method) accepts a boolean `inclusive` parameter to include `toKey`.

5. **Q: Can TreeMap store null keys? What about null values?**
   A: TreeMap does NOT allow null keys (comparison throws NullPointerException). It does allow null values.

## ⚠ Common Errors / Mistakes
- Using keys that do not implement `Comparable` without providing a `Comparator` — causes `ClassCastException` at insertion time
- Mutating key objects after insertion (if the mutation affects comparison behavior, the tree structure is corrupted)
- Forgetting that `subMap`, `headMap`, and `tailMap` return live views — modifications to the view modify the original map
- Using `headMap`/`tailMap` with incorrect inclusivity expectations (use the `NavigableMap` overloads with `boolean inclusive`)
- Passing `null` as a key — TreeMap throws `NullPointerException`

## 📝 Practice Exercises

**Beginner:**
1. Create a `TreeMap<String, Integer>` of 5 students (name -> grade), print it sorted, and display the top and bottom student.
2. Use `subMap` to find all students whose names start with letters between "C" and "M".
3. Create a TreeMap with a reverse-order Comparator and verify that keys are sorted descending.

**Intermediate:**
4. Implement a method that takes a `HashMap<String, Integer>` and returns a `TreeMap<String, Integer>` sorted by values (not keys).
5. Use `NavigableMap` methods (`ceilingKey`, `floorKey`, `higherKey`, `lowerKey`) to find the nearest available meeting room capacity for a given attendee count.
6. Build a TreeMap that stores `Employee` objects as keys (sorted by employee ID) and manages insertion/removal.

**Advanced:**
7. Implement an interval tree using TreeMap — store intervals as keys and support queries like "find all intervals that overlap with a given range" using `subMap`.
8. Build a concurrent-friendly sorted cache using `ConcurrentSkipListMap` (the concurrent analog of TreeMap) and compare its performance vs Collections.synchronizedSortedMap(new TreeMap<>()).
