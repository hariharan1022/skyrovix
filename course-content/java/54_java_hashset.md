## 54. Java HashSet

## 📘 Introduction
`HashSet<E>` implements the `Set` interface using a hash table (backed by a `HashMap`). It offers O(1) average time for add, remove, and contains operations. It does not guarantee iteration order — elements may appear in any order that can change over time.

## 🧠 Key Concepts
- **add(E)**: Adds element if not present; returns `true` if added
- **remove(Object)**: Removes element; returns `true` if present
- **contains(Object)**: O(1) average-time membership test
- **Iteration order**: No guarantees; use `LinkedHashSet` for insertion order, `TreeSet` for sorted order
- **hashCode() and equals() contract**: If `a.equals(b)` then `a.hashCode() == b.hashCode()`. Equal objects must have equal hash codes; unequal objects may share hash codes (collisions)
- **LinkedHashSet**: Maintains a doubly-linked list of entries for predictable insertion-order iteration
- **Load factor and initial capacity**: Default initial capacity = 16, load factor = 0.75. When `size > capacity * loadFactor`, the table resizes (doubles)
- **Union**: `set1.addAll(set2)`
- **Intersection**: `set1.retainAll(set2)`
- **Difference**: `set1.removeAll(set2)`
- **Symmetric difference**: `(set1.addAll(set2); set1.removeAll(intersection))` or use `Sets.symmetricDifference()` from Guava

## 💻 Syntax

```java
HashSet<String> set = new HashSet<>();                    // default: 16 cap, 0.75 load
HashSet<String> set2 = new HashSet<>(32, 0.5f);          // custom cap & load
HashSet<String> set3 = new HashSet<>(otherCollection);

set.add("A"); set.add("B"); set.add("A");                // "A" only added once
set.remove("B");
boolean present = set.contains("A");

// Set algebra
HashSet<Integer> a = new HashSet<>(Set.of(1,2,3));
HashSet<Integer> b = new HashSet<>(Set.of(3,4,5));
HashSet<Integer> union = new HashSet<>(a); union.addAll(b);        // {1,2,3,4,5}
HashSet<Integer> inter = new HashSet<>(a); inter.retainAll(b);     // {3}
HashSet<Integer> diff  = new HashSet<>(a); diff.removeAll(b);      // {1,2}

// LinkedHashSet for insertion order
LinkedHashSet<String> ordered = new LinkedHashSet<>();
ordered.add("Z"); ordered.add("A"); ordered.add("M");
// iteration: Z, A, M (insertion order preserved)
```

## ✅ Example 1 - Basic
**Problem**: Create a HashSet of product IDs, demonstrate add, duplicate rejection, contains, and iteration.

```java
import java.util.*;

public class HashSetBasics {
    public static void main(String[] args) {
        HashSet<Integer> productIds = new HashSet<>();

        productIds.add(101);
        productIds.add(102);
        productIds.add(103);
        productIds.add(101);                      // duplicate, ignored
        productIds.add(104);

        System.out.println("Set: " + productIds);
        System.out.println("Size: " + productIds.size());
        System.out.println("Contains 102? " + productIds.contains(102));
        System.out.println("Contains 999? " + productIds.contains(999));

        productIds.remove(103);
        System.out.println("After removal: " + productIds);

        System.out.print("Iterating: ");
        for (Integer id : productIds) {
            System.out.print(id + " ");
        }
    }
}
```

**Output:**
```
Set: [101, 102, 103, 104]
Size: 4
Contains 102? true
Contains 999? false
After removal: [101, 102, 104]
Iterating: 101 102 104
```

**Explanation:** Duplicate 101 is silently ignored (add returns `false`). The iteration order appears random — never rely on it. `contains` and `remove` are O(1) average.

## 🚀 Example 2 - Intermediate
**Problem**: Use HashSet for set algebra — find unique visitors across two website domains, common visitors, and visitors exclusive to one site.

```java
import java.util.*;

public class HashSetSetAlgebra {
    public static void main(String[] args) {
        Set<String> siteA = new HashSet<>(Set.of("Alice", "Bob", "Charlie", "Diana"));
        Set<String> siteB = new HashSet<>(Set.of("Charlie", "Eve", "Frank", "Alice"));

        // Union: all unique visitors
        Set<String> allVisitors = new HashSet<>(siteA);
        allVisitors.addAll(siteB);
        System.out.println("All unique visitors: " + allVisitors);

        // Intersection: visited both sites
        Set<String> bothSites = new HashSet<>(siteA);
        bothSites.retainAll(siteB);
        System.out.println("Visited both: " + bothSites);

        // Difference: visited A but not B
        Set<String> onlyA = new HashSet<>(siteA);
        onlyA.removeAll(siteB);
        System.out.println("Only site A: " + onlyA);

        // Check subset
        System.out.println("siteA contains bothSites? " + siteA.containsAll(bothSites));

        // LinkedHashSet preserves insertion order
        Set<String> ordered = new LinkedHashSet<>();
        ordered.add("First"); ordered.add("Second"); ordered.add("Third");
        System.out.println("LinkedHashSet: " + ordered);
    }
}
```

**Output:**
```
All unique visitors: [Alice, Bob, Charlie, Diana, Eve, Frank]
Visited both: [Alice, Charlie]
Only site A: [Bob, Diana]
siteA contains bothSites? true
LinkedHashSet: [First, Second, Third]
```

**Explanation:** `addAll` computes the union, `retainAll` computes the intersection, and `removeAll` computes the difference. `LinkedHashSet` preserves the order in which elements were inserted, unlike `HashSet`.

## 🏢 Real World Use Case
**Email spam filter**: A `HashSet<String>` of known spam sender addresses provides O(1) lookup when an email arrives. `LinkedHashSet` tracks the 10,000 most recent spam addresses for reporting, and `Collections.newSetFromMap(new LinkedHashMap<>(...))` creates an LRU spam cache. Set algebra (`retainAll`) identifies addresses shared across multiple spam blacklists.

## 🎯 Interview Questions

1. **Q: How does HashSet guarantee uniqueness?**
   A: It uses `hashCode()` to determine the bucket, then `equals()` to check for duplicates within the bucket. Both must be properly overridden for custom objects.

2. **Q: What happens if you mutate an object already in a HashSet?**
   A: If the mutation changes `hashCode()` or `equals()` behavior, the object becomes "lost" in the set — it cannot be found or removed, and duplicates may appear. Never mutate set elements.

3. **Q: What is the difference between HashSet, LinkedHashSet, and TreeSet?**
   A: HashSet: unordered, O(1). LinkedHashSet: insertion-ordered, O(1). TreeSet: sorted (natural or Comparator order), O(log n). All reject duplicates.

4. **Q: Explain load factor. What happens if the load factor is 1.0?**
   A: Load factor = `size / capacity`. At 0.75, the hash table resizes when 75% full. At 1.0, resizing happens only when full — this reduces resizes but increases collision probability, degrading performance.

5. **Q: Can a HashSet contain null?**
   A: Yes, HashSet allows at most one null element (stored in bucket 0 of the backing HashMap). TreeSet does not allow nulls (because `compareTo()` would throw `NullPointerException`).

## ⚠ Common Errors / Mistakes
- Adding mutable objects to a HashSet and then mutating them — breaks the set invariants
- Relying on HashSet iteration order (use LinkedHashSet if order matters)
- Forgetting to override `hashCode()` when overriding `equals()` (or vice versa)
- Using a `HashSet` with objects that have inconsistent `equals()` (e.g., arrays — use `Arrays.equals` and `Arrays.hashCode` or a `List` wrapper)
- Not initializing capacity when the approximate set size is known, causing repeated resizing

## 📝 Practice Exercises

**Beginner:**
1. Create a `HashSet<String>` of 5 cities, add a duplicate, and show the set contains only unique entries.
2. Write a program that removes duplicate words from a sentence using a HashSet and prints the unique words.
3. Create two `HashSet<Integer>` and compute their union, intersection, and difference.

**Intermediate:**
4. Implement a method that takes a `List<Integer>` and returns a `LinkedHashSet<Integer>` preserving the order of first occurrence while removing duplicates.
5. Given two `HashSet<String>`, check if one is a subset of the other using `containsAll`.
6. Create a `HashSet<Employee>` where `Employee` has `id` and `name` fields — ensure duplicates are detected based on `id` by overriding `equals` and `hashCode`.

**Advanced:**
7. Implement a Bloom filter (probabilistic set membership test) using `BitSet` and multiple hash functions; compare accuracy vs a HashSet for large datasets.
8. Build a spell-checker that uses a `HashSet<String>` dictionary, generates candidate corrections (edit distance 1), and returns the closest match.
