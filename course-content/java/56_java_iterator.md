## 56. Java Iterator

## 📘 Introduction
The `Iterator<E>` interface provides a universal way to traverse collections without exposing the underlying data structure. It replaced `Enumeration` and adds the ability to remove elements during iteration. The enhanced for-each loop uses `Iterator` internally.

## 🧠 Key Concepts
- **Iterator<E> interface**: `hasNext()`, `next()`, `remove()` (optional)
- **hasNext()**: Returns `true` if more elements exist
- **next()**: Returns the next element; throws `NoSuchElementException` if none remain
- **remove()**: Removes the last element returned by `next()`; can only be called once per `next()`
- **ListIterator<E>**: Extends `Iterator` for bidirectional traversal on lists; adds `hasPrevious()`, `previous()`, `nextIndex()`, `previousIndex()`, `set(E)`, `add(E)`
- **For-each loop**: Compiled to `Iterator` bytecode; equivalent to `while(iterator.hasNext()) { E e = iterator.next(); ... }`
- **Fail-fast iterators**: Throw `ConcurrentModificationException` if the collection is structurally modified after the iterator is created (except via the iterator's own `remove`)
- **Fail-safe iterators**: Operate on a snapshot or copy; concurrent modifications do not throw (e.g., `CopyOnWriteArrayList`, `ConcurrentHashMap`)
- **ConcurrentModificationException**: Thrown when a thread detects concurrent modification of an object, or when `modCount` != `expectedModCount`

## 💻 Syntax

```java
// Basic Iterator
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String s = it.next();
    if (s.startsWith("x")) it.remove();   // safe removal
}

// ListIterator (bidirectional)
ListIterator<String> li = list.listIterator();
while (li.hasNext()) li.next();
while (li.hasPrevious()) {
    System.out.println(li.previous());
}

// For-each (equivalent to iterator)
for (String s : list) { /* cannot remove here */ }

// Fail-safe example
CopyOnWriteArrayList<String> safe = new CopyOnWriteArrayList<>();
Iterator<String> safeIt = safe.iterator();
safe.add("new");   // safeIt does NOT see "new" — snapshot iterator
```

## ✅ Example 1 - Basic
**Problem**: Use Iterator to traverse an ArrayList, remove elements conditionally, and demonstrate the relationship with the for-each loop.

```java
import java.util.*;

public class IteratorBasics {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(Arrays.asList(
            "Alice", "Bob", "Charlie", "Dave", "Eve"
        ));

        // Iterator with removal
        Iterator<String> it = names.iterator();
        while (it.hasNext()) {
            String name = it.next();
            if (name.length() <= 3) it.remove();  // remove short names (Bob, Eve)
        }
        System.out.println("After remove short: " + names);

        // For-each loop (compiled to iterator)
        for (String name : names) {
            System.out.println("Hello, " + name);
        }

        // This would throw ConcurrentModificationException:
        // for (String name : names) {
        //     if (name.equals("Alice")) names.remove(name); // BAD!
        // }
    }
}
```

**Output:**
```
After remove short: [Alice, Charlie, Dave]
Hello, Alice
Hello, Charlie
Hello, Dave
```

**Explanation:** `Iterator.remove()` is the safe way to delete elements during iteration. The for-each loop is syntactic sugar — the compiler generates an iterator-based loop. Direct modification of the collection inside a for-each throws `ConcurrentModificationException`.

## 🚀 Example 2 - Intermediate
**Problem**: Use ListIterator for bidirectional traversal, demonstrate fail-fast behavior, and compare with fail-safe iteration.

```java
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;

public class IteratorAdvanced {
    public static void main(String[] args) {
        // ListIterator: forward + backward
        List<String> words = new ArrayList<>(Arrays.asList("One", "Two", "Three", "Four"));
        ListIterator<String> li = words.listIterator();

        System.out.print("Forward: ");
        while (li.hasNext()) {
            System.out.print(li.next() + " ");
        }

        System.out.print("\nBackward: ");
        while (li.hasPrevious()) {
            System.out.print(li.previous() + " ");
        }

        // set() and add() via ListIterator
        while (li.hasNext()) {
            String w = li.next();
            if (w.equals("Two")) li.set("TWO");  // replace
            if (w.equals("Three")) li.add("THREE_FIVE");  // insert after
        }
        System.out.println("\nModified: " + words);

        // Fail-fast demo
        try {
            Iterator<String> fastIt = words.iterator();
            while (fastIt.hasNext()) {
                String w = fastIt.next();
                if (w.equals("Four")) words.remove("Four"); // concurrent mod!
            }
        } catch (ConcurrentModificationException e) {
            System.out.println("Fail-fast caught: " + e);
        }

        // Fail-safe demo
        CopyOnWriteArrayList<String> safe = new CopyOnWriteArrayList<>(
            Arrays.asList("A", "B", "C")
        );
        Iterator<String> safeIt = safe.iterator();
        safe.add("D");    // safeIt iterates over snapshot; no exception
        System.out.print("Fail-safe iteration: ");
        while (safeIt.hasNext()) System.out.print(safeIt.next() + " ");
    }
}
```

**Output:**
```
Forward: One Two Three Four
Backward: Four Three Two One
Modified: [One, TWO, Three, THREE_FIVE, Four]
Fail-fast caught: java.util.ConcurrentModificationException
Fail-safe iteration: A B C
```

**Explanation:** `ListIterator` enables bidirectional movement, `set()` to replace current element, and `add()` to insert after the current position. Fail-fast iterators throw `ConcurrentModificationException` on external modification. `CopyOnWriteArrayList` iterates over a snapshot — modifications create a new copy.

## 🏢 Real World Use Case
**Batch data processing pipeline**: An `Iterator<Record>` reads records from a database cursor without loading all records into memory. The pipeline applies transformations (`next()`), filters out invalid records (`remove()`), and commits in batches. `ListIterator` is used in an undo-redo editor where `previous()` navigates backward through the edit history and `set()` replaces the current state.

## 🎯 Interview Questions

1. **Q: What is the difference between Iterator and Enumeration?**
   A: Iterator has `remove()` and is fail-fast. Enumeration is read-only and fail-safe. Iterator also has shorter method names (`hasNext` vs `hasMoreElements`).

2. **Q: Can you remove an element from a collection while iterating with a for-each loop?**
   A: No — it throws `ConcurrentModificationException`. Use `Iterator.remove()` or collect items to remove and call `removeAll` after the loop.

3. **Q: What is ConcurrentModificationException and when is it thrown?**
   A: It is thrown when a collection is structurally modified (added/deleted) while an iterator is traversing it, unless the modification is done via the iterator's own `remove` or `add` methods.

4. **Q: What is the difference between fail-fast and fail-safe iterators?**
   A: Fail-fast iterators throw `ConcurrentModificationException` on concurrent modification. Fail-safe iterators (CopyOnWriteArrayList, ConcurrentHashMap entry set) operate on a snapshot and never throw.

5. **Q: How do you get a ListIterator starting at a specific position?**
   A: `list.listIterator(index)` returns a ListIterator positioned at the given index. The first call to `next()` returns the element at that index.

## ⚠ Common Errors / Mistakes
- Calling `remove()` without calling `next()` first — throws `IllegalStateException`
- Calling `next()` when `hasNext()` is false — throws `NoSuchElementException`
- Modifying the collection directly (not via the iterator) during iteration — causes `ConcurrentModificationException`
- Using `list.remove(index)` inside an indexed for loop and skipping the next element due to shifting
- Forgetting that `ListIterator.add()` inserts BEFORE the next element that would be returned by `next()`

## 📝 Practice Exercises

**Beginner:**
1. Given a `List<Integer>`, use an Iterator to remove all negative numbers and print the result.
2. Write a program that uses a for-each loop and then manually translate it into an equivalent `Iterator`-based loop.
3. Use a `ListIterator` to traverse a list of strings forward and print them in reverse order.

**Intermediate:**
4. Implement a method that alternates between two iterators, returning elements from each one at a time.
5. Create a custom `Iterable<String>` that generates an infinite sequence of Fibonacci numbers (use an Iterator with hasNext returning true).
6. Write code that triggers and catches a `ConcurrentModificationException`, then explain why it happened in a comment.

**Advanced:**
7. Implement a `PeekingIterator` wrapper that allows looking at the next element without advancing the iterator (similar to Guava's `PeekingIterator`).
8. Build a paginated `Iterator<List<T>>` that takes a batch iterator from a database and lazily loads the next page only when needed.
