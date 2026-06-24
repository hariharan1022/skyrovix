## 53. Java LinkedList

## 📘 Introduction
`LinkedList<E>` is a doubly-linked list implementation of both the `List` and `Deque` interfaces. It stores elements as nodes with pointers to the previous and next nodes, enabling efficient insertions and removals at both ends and in the middle, at the cost of O(n) random access.

## 🧠 Key Concepts
- **Doubly-linked list**: Each node holds data + `prev` and `next` references
- **addFirst(E) / addLast(E)**: O(1) insertion at head or tail
- **getFirst() / getLast()**: O(1) retrieval of head or tail; throws `NoSuchElementException` if empty
- **removeFirst() / removeLast()**: O(1) removal from ends
- **LinkedList as Deque**: Implements `Deque<E>` — supports `offerFirst`, `pollLast`, `peek`, `push`, `pop`
- **LinkedList as Queue**: `offer(E)`, `poll()`, `peek()` — FIFO behavior
- **Performance vs ArrayList**:
  - LinkedList: O(1) add/remove at ends, O(n) get(index)
  - ArrayList: O(1) get(index), O(n) add/remove at middle or front
- **Stack implementation**: `push()` / `pop()` using the Deque methods (LIFO)
- **Descending iterator**: `descendingIterator()` for reverse traversal

## 💻 Syntax

```java
LinkedList<String> list = new LinkedList<>();

// List methods
list.add("B"); list.addFirst("A"); list.addLast("C");
String first = list.getFirst();    // "A"
String last  = list.getLast();     // "C"
list.removeFirst(); list.removeLast();

// Deque / Queue methods
list.offer("X");          // add to tail
list.offerFirst("0");     // add to head
String head = list.poll();  // remove and return head
String peek = list.peek();  // return head without removing

// Stack operations (Deque)
list.push("TOP");         // add to head
String top = list.pop();  // remove and return head

// Iteration
for (String s : list) { }
Iterator<String> desc = list.descendingIterator();
```

## ✅ Example 1 - Basic
**Problem**: Build a LinkedList of task items, demonstrate addFirst/addLast, getFirst/getLast, and queue operations.

```java
import java.util.*;

public class LinkedListBasics {
    public static void main(String[] args) {
        LinkedList<String> tasks = new LinkedList<>();

        tasks.add("Review code");
        tasks.addFirst("Urgent: fix bug");
        tasks.addLast("Write docs");

        System.out.println("Tasks: " + tasks);
        System.out.println("First: " + tasks.getFirst());
        System.out.println("Last: " + tasks.getLast());

        // Queue behavior (FIFO)
        tasks.offer("Test feature");
        String nextTask = tasks.poll();   // removes and returns head
        System.out.println("Processing: " + nextTask);
        System.out.println("Remaining: " + tasks);

        // Stack behavior (LIFO)
        tasks.push("Hotfix");
        String critical = tasks.pop();
        System.out.println("Critical: " + critical);
        System.out.println("Final: " + tasks);
    }
}
```

**Output:**
```
Tasks: [Urgent: fix bug, Review code, Write docs]
First: Urgent: fix bug
Last: Write docs
Processing: Urgent: fix bug
Remaining: [Review code, Write docs, Test feature]
Critical: Hotfix
Final: [Review code, Write docs, Test feature]
```

**Explanation:** `addFirst`/`addLast` insert at ends. `poll()` retrieves and removes the head (FIFO). `push`/`pop` operate on the head of the list (LIFO). LinkedList serves as both a Queue and a Deque.

## 🚀 Example 2 - Intermediate
**Problem**: Compare performance of LinkedList vs ArrayList for front insertions, and implement a browser back/forward navigation using LinkedList as a Deque.

```java
import java.util.*;

public class LinkedListVsArrayList {
    public static void main(String[] args) {
        // Front insertion performance comparison
        List<String> arrayList = new ArrayList<>();
        List<String> linkedList = new LinkedList<>();

        long t1 = System.nanoTime();
        for (int i = 0; i < 10000; i++) arrayList.add(0, "x");
        long t2 = System.nanoTime();
        for (int i = 0; i < 10000; i++) linkedList.add(0, "x");
        long t3 = System.nanoTime();

        System.out.println("ArrayList insert front: " + (t2 - t1) / 1e6 + " ms");
        System.out.println("LinkedList insert front: " + (t3 - t2) / 1e6 + " ms");

        // Browser history as Deque
        Deque<String> history = new LinkedList<>();
        history.addFirst("Home");
        history.addFirst("About");
        history.addFirst("Products");
        history.addFirst("Checkout");

        System.out.println("\nBack button: " + history.removeFirst());
        System.out.println("Back button: " + history.removeFirst());
        System.out.println("Current page: " + history.peekFirst());

        Iterator<String> desc = history.descendingIterator();
        System.out.print("Forward history: ");
        desc.forEachRemaining(s -> System.out.print(s + " "));
    }
}
```

**Output:**
```
ArrayList insert front: 45.2 ms
LinkedList insert front: 3.1 ms

Back button: Checkout
Back button: Products
Current page: About
Forward history: Home About
```

**Explanation:** Front insertion in ArrayList requires O(n) shifting; LinkedList is O(1) by updating node references. The Deque methods (`addFirst`, `removeFirst`, `peekFirst`) model browser navigation. `descendingIterator()` traverses from tail to head.

## 🏢 Real World Use Case
**Music player playlist**: A `LinkedList<Song>` implements the "Now Playing" queue. The currently playing song is `getFirst()`. "Next" calls `removeFirst()`. "Add to queue" calls `addLast()`. "Play next" calls `addFirst()`. The playlist supports both queue (FIFO) and stack (LIFO repeat-one) behaviors without any data structure changes.

## 🎯 Interview Questions

1. **Q: What is the time complexity of `get(index)` in LinkedList?**
   A: O(n) — it must traverse from the head (or tail, if index > size/2) to reach the element. ArrayList does this in O(1).

2. **Q: Can LinkedList be used as a Queue? How?**
   A: Yes, LinkedList implements the `Queue` interface. Use `offer(E)` to add to tail, `poll()` to retrieve and remove head, and `peek()` to view head without removal.

3. **Q: What memory overhead does LinkedList have compared to ArrayList?**
   A: Each element in a LinkedList is wrapped in a `Node` object with `item`, `prev`, and `next` references (roughly 24+ bytes overhead per element). ArrayList stores elements in a flat `Object[]` array with minimal overhead.

4. **Q: When would you choose LinkedList over ArrayDeque for stack/queue operations?**
   A: `ArrayDeque` is generally faster (less memory overhead, better cache locality). Choose LinkedList only when you need both List and Deque operations on the same data, or when you need null elements (ArrayDeque does not allow nulls).

5. **Q: How does `listIterator(int index)` work in LinkedList?**
   A: It creates a `ListIterator` positioned at the given index. The implementation navigates from the nearest end (head or tail) to reach the starting position.

## ⚠ Common Errors / Mistakes
- Using `get(index)` on a large LinkedList — O(n) traversal makes this very slow
- Assuming `removeFirst()` returns null on empty list (it throws `NoSuchElementException`; use `pollFirst()` instead)
- Forgetting that LinkedList implements both `List` and `Deque`, which can cause confusion about which method to use
- Using `add(int index, E)` in the middle — still O(n) due to traversal to find the node
- Modifying the list while iterating with a for-each loop causing `ConcurrentModificationException`

## 📝 Practice Exercises

**Beginner:**
1. Create a `LinkedList<String>` of 4 fruits, use `addFirst` and `addLast` to add two more, then print both the first and last element.
2. Use a LinkedList as a FIFO queue: add 5 numbers, poll all of them, and verify the queue is empty.
3. Implement a simple undo stack: push 3 actions onto a LinkedList, pop and print each one.

**Intermediate:**
4. Write a method that takes a `LinkedList<Integer>` and removes every second element efficiently using an iterator.
5. Implement a round-robin task scheduler using LinkedList where tasks are polled from the head and re-offered to the tail.
6. Compare the time to search for an element in ArrayList vs LinkedList (10,000 elements, search at end).

**Advanced:**
7. Implement a Least Recently Used (LRU) cache using a combination of `LinkedList` (for access order) and `HashMap` (for O(1) lookups).
8. Write a thread-safe version of LinkedList that supports concurrent `addFirst`/`addLast` from multiple threads (research and implement lock-free techniques or use `ReentrantLock`).
