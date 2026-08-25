## 52. Java ArrayList

## 📘 Introduction
`ArrayList<E>` is a resizable array implementation of the `List` interface. It provides dynamic array growth, fast random access (O(1)), and is the most commonly used List implementation in Java. It is part of `java.util` and supports all optional List operations including null elements.

## 🧠 Key Concepts
- **add(E) / add(index, E)**: Appends or inserts elements; O(1) amortized append, O(n) insert at arbitrary index
- **get(index)**: O(1) random access
- **set(index, E)**: Replace element at position
- **remove(index) / remove(Object)**: O(n) due to shifting
- **size()**, **contains(Object)**, **indexOf(Object)**, **lastIndexOf(Object)**
- **forEach()** and **iterator()**: Internal and external iteration
- **Capacity and growth**: Initial capacity = 10; grows by `oldCapacity + (oldCapacity >> 1)` (1.5x) when full
- **ArrayList vs LinkedList**: ArrayList wins on random access and memory locality; LinkedList wins on head/middle insertion
- **Serialization**: Implements `Serializable` (transient `Object[] elementData`)
- **Collections.addAll()**, **Arrays.asList()**: Convenience factory methods
- **ensureCapacity()**, **trimToSize()**: Capacity management

## 💻 Syntax

```java
ArrayList<String> list = new ArrayList<>();          // default capacity 10
ArrayList<String> list2 = new ArrayList<>(20);       // initial capacity 20
ArrayList<String> list3 = new ArrayList<>(otherCol); // copy constructor

list.add("A");
list.add(0, "B");                    // insert at index
String val = list.get(2);
list.set(1, "C");                    // replace
list.remove(0);                      // by index
list.remove("A");                    // by object
boolean exists = list.contains("A");
int pos = list.indexOf("A");
list.forEach(System.out::println);

// Bulk operations
Collections.addAll(list, "X", "Y", "Z");
List<String> asList = Arrays.asList("a", "b", "c"); // fixed-size view
ArrayList<String> copy = new ArrayList<>(Arrays.asList("a", "b"));
```

## ✅ Example 1 - Basic
**Problem**: Create an ArrayList of student names, perform add, get, set, remove, and search operations.

```java
import java.util.*;

public class ArrayListBasics {
    public static void main(String[] args) {
        ArrayList<String> students = new ArrayList<>();

        students.add("Alice");
        students.add("Bob");
        students.add("Charlie");
        students.add("Diana");
        students.add(1, "Eve");           // insert at index 1

        System.out.println("Students: " + students);
        System.out.println("First: " + students.get(0));
        System.out.println("Size: " + students.size());

        students.set(2, "Bobby");         // replace Bob -> Bobby
        students.remove("Diana");         // remove by object

        System.out.println("After changes: " + students);
        System.out.println("Contains 'Eve'? " + students.contains("Eve"));
        System.out.println("Index of 'Eve': " + students.indexOf("Eve"));
    }
}
```

**Output:**
```
Students: [Alice, Eve, Bob, Charlie, Diana]
First: Alice
Size: 5
After changes: [Alice, Eve, Bobby, Charlie]
Contains 'Eve'? true
Index of 'Eve': 1
```

**Explanation:** `add(index, E)` inserts without overwriting — existing elements shift right. `remove(Object)` removes the first occurrence. `indexOf` returns -1 if not found.

## 🚀 Example 2 - Intermediate
**Problem**: Demonstrate capacity management, bulk addition, iterator usage, and the difference between `Arrays.asList` and a proper `ArrayList`.

```java
import java.util.*;

public class ArrayListAdvanced {
    public static void main(String[] args) {
        // Capacity management
        ArrayList<Integer> nums = new ArrayList<>(100);
        for (int i = 0; i < 100; i++) nums.add(i);
        System.out.println("Size: " + nums.size());
        nums.trimToSize();  // shrink backing array to exact size

        // Bulk addition
        Collections.addAll(nums, 200, 201, 202);

        // Arrays.asList returns fixed-size List backed by array
        List<String> fixed = Arrays.asList("X", "Y", "Z");
        // fixed.add("W"); // throws UnsupportedOperationException!
        ArrayList<String> mutable = new ArrayList<>(fixed);
        mutable.add("W");  // OK

        // Iterator with removal
        Iterator<Integer> it = nums.iterator();
        while (it.hasNext()) {
            if (it.next() % 2 == 0) it.remove();
        }
        System.out.println("After removing evens: " + nums.subList(0, 5) + "...");

        // forEach
        List<String> upper = new ArrayList<>();
        mutable.forEach(s -> upper.add(s.toUpperCase()));
        System.out.println("Uppercase: " + upper);
    }
}
```

**Output:**
```
Size: 100
After removing evens: [1, 3, 5, 7, 9]...
Uppercase: [X, Y, Z, W]
```

**Explanation:** `trimToSize()` frees unused capacity. `Arrays.asList` returns a fixed-size list backed by the original array — structural modifications are not allowed. The `Iterator.remove()` method safely removes elements during iteration.

## 🏢 Real World Use Case
**Order management system**: An `ArrayList<Order>` holds pending orders for a restaurant kitchen display. Orders are appended with `add()`, looked up by position with `get(index)`, removed when completed with `remove()`, and periodically `trimToSize()` is called after the dinner rush to reduce memory footprint. `Collections.sort(orders, byPriority)` sorts by preparation priority.

## 🎯 Interview Questions

1. **Q: How does ArrayList grow dynamically?**
   A: When full, it creates a new array of size `oldCapacity + (oldCapacity >> 1)` (approximately 1.5x), copies elements using `Arrays.copyOf`, and the old array is garbage collected.

2. **Q: What is the time complexity of get(index) vs remove(0) in ArrayList?**
   A: `get(index)` is O(1). `remove(0)` is O(n) because all subsequent elements must be shifted left.

3. **Q: What is the difference between `ArrayList` and `Vector`?**
   A: Vector is synchronized (thread-safe) and doubles its capacity when full; ArrayList grows by 50% and is not synchronized. Vector is legacy — use ArrayList with `Collections.synchronizedList()` or `CopyOnWriteArrayList` if needed.

4. **Q: Why is `elementData` in ArrayList declared as `transient Object[]`?**
   A: Because the array is typically larger than the actual number of elements. The serialization logic in `writeObject()` only serializes the populated portion (`size` elements), not the full capacity array.

5. **Q: What does `subList(fromIndex, toIndex)` return? Is the result backed by the original list?**
   A: It returns a `List<E>` view backed by the original ArrayList. Changes to the sublist are reflected in the original list, and vice versa. Structural changes to the original list (add/remove) invalidate the sublist.

## ⚠ Common Errors / Mistakes
- Calling `remove(int index)` when intending to `remove(Object)` — autoboxing causes `remove(1)` to remove at index, not the Integer `1`
- Using `Arrays.asList` result as if it were a full ArrayList — it does not support `add()` or `remove()`
- Forgetting that `indexOf` uses `.equals()` for comparison
- Modifying ArrayList with for-each loop (get `ConcurrentModificationException`)
- Not specifying initial capacity when the approximate size is known, causing repeated resizing

## 📝 Practice Exercises

**Beginner:**
1. Create an `ArrayList` of 10 integers, remove all odd numbers, and print the even ones.
2. Write a program that reads 5 names from user input into an `ArrayList`, then prints them in reverse order using `ListIterator`.
3. Use `Collections.addAll` to populate an ArrayList and print its minimum and maximum elements.

**Intermediate:**
4. Implement a method that takes an `ArrayList<String>` and returns a new list with duplicates removed (preserving first occurrence order).
5. Given two `ArrayList<Integer>`, compute their union and intersection using bulk operations (`addAll`, `retainAll`).
6. Create a custom `ArrayList<Employee>` and sort it by salary using `Collections.sort` with a `Comparator`.

**Advanced:**
7. Implement a pagination utility that takes an `ArrayList<T>` and a page size, and returns a `List<List<T>>` of pages.
8. Write a thread-safe wrapper around `ArrayList` without using `synchronizedList` — use `ReentrantReadWriteLock` to allow concurrent reads but exclusive writes.
