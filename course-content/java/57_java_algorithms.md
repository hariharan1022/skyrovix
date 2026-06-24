## 57. Java Algorithms

## 📘 Introduction
The `java.util.Collections` and `java.util.Arrays` classes provide a rich set of algorithms for sorting, searching, shuffling, and manipulating collections and arrays. These utility methods work with any `List` or array and accept custom `Comparator` implementations.

## 🧠 Key Concepts
- **Sorting**: `Arrays.sort()` for arrays (primitive & object), `Collections.sort()` for Lists
- **Sorting algorithm**: Dual-Pivot Quicksort for primitives, TimSort (adaptive mergesort) for objects
- **Searching**: `Arrays.binarySearch()`, `Collections.binarySearch()` — O(log n), require sorted data
- **Shuffling**: `Collections.shuffle(List)` — random permutation using Fisher-Yates
- **Rotating**: `Collections.rotate(List, distance)` — circular shift
- **Frequency**: `Collections.frequency(Collection, Object)` — count occurrences
- **Disjoint**: `Collections.disjoint(Collection, Collection)` — `true` if no common elements
- **Min/Max**: `Collections.min()` / `Collections.max()` — with natural order or Comparator
- **Custom Comparator/Comparable**: `Comparable` defines natural order within the class; `Comparator` defines external custom order

## 💻 Syntax

```java
// Sorting
Arrays.sort(intArr);                          // primitive array
Arrays.sort(objArr, Comparator);              // object array with comparator
Collections.sort(list);                       // natural order
Collections.sort(list, Comparator);           // custom order
list.sort(Comparator);                        // List's own sort (Java 8+)

// Searching
int idx = Arrays.binarySearch(arr, key);      // array
int idx = Collections.binarySearch(list, key); // list

// Utility
Collections.shuffle(list);
Collections.rotate(list, 2);
int freq = Collections.frequency(list, "X");
boolean noOverlap = Collections.disjoint(list1, list2);
T min = Collections.min(list);
T max = Collections.max(list, comparator);

// Custom Comparator
Collections.sort(people, (p1, p2) -> p1.age - p2.age);
Collections.sort(people, Comparator.comparingInt(Person::getAge)
    .thenComparing(Person::getName));
```

## ✅ Example 1 - Basic
**Problem**: Sort an array and a list, search for elements, compute frequency, and find min/max.

```java
import java.util.*;

public class AlgorithmsBasics {
    public static void main(String[] args) {
        // Array sorting
        int[] nums = {5, 2, 8, 1, 9};
        Arrays.sort(nums);
        System.out.println("Sorted array: " + Arrays.toString(nums));
        System.out.println("Index of 8: " + Arrays.binarySearch(nums, 8));

        // List sorting
        List<String> names = new ArrayList<>(Arrays.asList("Dave", "Alice", "Bob", "Charlie"));
        Collections.sort(names);
        System.out.println("Sorted names: " + names);

        // Searching
        int pos = Collections.binarySearch(names, "Charlie");
        System.out.println("Charlie at index: " + pos);

        // Frequency, min, max
        List<Integer> scores = Arrays.asList(85, 92, 78, 92, 88);
        System.out.println("Frequency of 92: " + Collections.frequency(scores, 92));
        System.out.println("Max score: " + Collections.max(scores));
        System.out.println("Min score: " + Collections.min(scores));

        // Disjoint
        List<Integer> a = Arrays.asList(1, 2, 3);
        List<Integer> b = Arrays.asList(4, 5, 6);
        System.out.println("Disjoint: " + Collections.disjoint(a, b));
    }
}
```

**Output:**
```
Sorted array: [1, 2, 5, 8, 9]
Index of 8: 3
Sorted names: [Alice, Bob, Charlie, Dave]
Charlie at index: 2
Frequency of 92: 2
Max score: 92
Min score: 78
Disjoint: true
```

**Explanation:** `Arrays.sort` sorts primitives in-place. `Collections.sort` sorts Lists in-place. `binarySearch` requires sorted input. `frequency` counts occurrences. `disjoint` returns `true` when two collections share no elements.

## 🚀 Example 2 - Intermediate
**Problem**: Sort by custom Comparator, shuffle, rotate, and demonstrate natural ordering with Comparable.

```java
import java.util.*;

class Student implements Comparable<Student> {
    String name; int grade;
    Student(String name, int grade) { this.name = name; this.grade = grade; }
    public int compareTo(Student o) { return Integer.compare(this.grade, o.grade); }
    public String toString() { return name + "=" + grade; }
}

public class AlgorithmsAdvanced {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>(Arrays.asList(
            new Student("Alice", 88), new Student("Bob", 95),
            new Student("Charlie", 72), new Student("Diana", 88)
        ));

        // Natural order (by grade via Comparable)
        Collections.sort(students);
        System.out.println("By grade: " + students);

        // Custom Comparator: by name descending
        Collections.sort(students, (s1, s2) -> s2.name.compareTo(s1.name));
        System.out.println("By name desc: " + students);

        // Shuffle
        Collections.shuffle(students);
        System.out.println("Shuffled: " + students);

        // Rotate
        List<Integer> nums = new ArrayList<>(Arrays.asList(1,2,3,4,5));
        Collections.rotate(nums, 2);
        System.out.println("Rotated by 2: " + nums);
        Collections.rotate(nums, -1);
        System.out.println("Rotated by -1: " + nums);

        // thenComparing chaining
        Comparator<Student> byGradeThenName = Comparator
            .comparingInt((Student s) -> s.grade)
            .thenComparing(s -> s.name);
        Collections.sort(students, byGradeThenName);
        System.out.println("By grade then name: " + students);
    }
}
```

**Output:**
```
By grade: [Charlie=72, Alice=88, Diana=88, Bob=95]
By name desc: [Diana=88, Charlie=72, Bob=95, Alice=88]
Shuffled: [Charlie=72, Bob=95, Diana=88, Alice=88]
Rotated by 2: [4, 5, 1, 2, 3]
Rotated by -1: [5, 1, 2, 3, 4]
By grade then name: [Charlie=72, Alice=88, Diana=88, Bob=95]
```

**Explanation:** `Comparable` defines natural order (by grade). A lambda `Comparator` sorts by name descending. `rotate(list, distance)` shifts elements right by the given distance (positive = right, negative = left). `Comparator.comparingInt(...).thenComparing(...)` chains sort criteria.

## 🏢 Real World Use Case
**Leaderboard system**: A game uses `Collections.sort(players, Comparator.comparingInt(Player::getScore).reversed())` to display the leaderboard sorted by descending score. `Collections.binarySearch` (with the same comparator) finds a player's rank. `Collections.shuffle` randomizes daily challenge opponents. `Collections.rotate` cycles through featured player spotlights.

## 🎯 Interview Questions

1. **Q: What sorting algorithm does `Arrays.sort()` use for primitives vs objects?**
   A: Primitives: Dual-Pivot Quicksort (O(n log n), not stable). Objects: TimSort (O(n log n), stable, adaptive).

2. **Q: What is the difference between Comparable and Comparator?**
   A: `Comparable` (compareTo) defines natural ordering inside the class. `Comparator` (compare) defines external ordering outside the class. Comparable modifies the class; Comparator does not.

3. **Q: What happens if you call `binarySearch` on an unsorted list?**
   A: The result is undefined — it may return an arbitrary index or -1. It will NOT throw an exception. You must sort before searching.

4. **Q: How does `Collections.shuffle` work?**
   A: It uses the Fisher-Yates shuffle algorithm, iterating from the last element to the first, swapping each element with a randomly selected earlier element.

5. **Q: What is the time complexity of `Collections.rotate`?**
   A: O(n). It reverses the list in three segments: (0, distance-1), (distance, n-1), then the whole list — an elegant O(n) algorithm.

## ⚠ Common Errors / Mistakes
- Calling `binarySearch` on an unsorted list or array
- Forgetting that `binarySearch` returns `-(insertionPoint) - 1` when the key is not found
- Using `Comparator` that violates the contract (not transitive, not consistent with equals)
- Sorting a List and then modifying elements that affect comparison (corrupts the order)
- Using `==` for comparison instead of `compare()` / `compareTo()` (especially for floating-point)

## 📝 Practice Exercises

**Beginner:**
1. Create an array of 10 random integers, sort it using `Arrays.sort`, and search for the number 42 using `binarySearch`.
2. Given a `List<String>` of names, sort it in reverse alphabetical order using `Collections.sort` with a `Comparator`.
3. Use `Collections.frequency` and `Collections.disjoint` to analyze two lists of integers.

**Intermediate:**
4. Implement a `Comparator<Employee>` that sorts by salary descending, then by years of experience ascending.
5. Write a method that rotates a list by `k` positions to the left using `Collections.rotate`.
6. Create a `Person` class that implements `Comparable` (by age), sort a `List<Person>`, then use `binarySearch` to find a specific person.

**Advanced:**
7. Implement a generic `Sorter<T>` class that can sort using multiple algorithms (TimSort, Quicksort, Merge sort) and compare their performance on large datasets.
8. Write a custom `Comparator` that performs a stable topological sort on a DAG of tasks with dependencies.
