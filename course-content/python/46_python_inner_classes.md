## 46. Python Inner Classes

## 📘 Introduction
Inner classes (nested classes) are classes defined inside another class. They are used to logically group classes that are only relevant in the context of the outer class. Inner classes help organize code, reduce namespace pollution, and encapsulate helper types. Common use cases include node definitions in linked lists/trees, builder patterns, and enumeration-like groupings.

## 🧠 Key Concepts
- Nested class: a `class` defined inside another `class`
- Inner class instances do NOT automatically have access to an outer class instance
- To access the outer instance, the inner class must receive a reference explicitly (e.g., via `__init__` parameter)
- Multi-level nesting: classes can be nested arbitrarily deep
- Inner classes are useful for `Node` in a `LinkedList`, `Builder` in a complex object, or `Type` enums
- Inner classes follow the same inheritance, method, and attribute rules as top-level classes
- Python does not have a `this` pointer for outer-inner binding — you must pass the outer `self` manually

## 💻 Syntax
```python
class Outer:
    class_var = "outer"

    def __init__(self, val):
        self.val = val

    class Inner:
        def __init__(self, outer_instance, inner_val):
            self.outer = outer_instance
            self.inner_val = inner_val

        def show(self):
            return f"outer.val={self.outer.val}, inner={self.inner_val}"

# Usage
o = Outer("hello")
i = o.Inner(o, "world")
print(i.show())
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Create a `LinkedList` class that uses an inner `Node` class to represent each element. The `Node` should only be meaningful within the context of the linked list.

**Code:**
```python
class LinkedList:
    class Node:
        def __init__(self, data):
            self.data = data
            self.next = None

    def __init__(self):
        self._head = None

    def append(self, data):
        new_node = LinkedList.Node(data)
        if not self._head:
            self._head = new_node
            return
        current = self._head
        while current.next:
            current = current.next
        current.next = new_node

    def display(self):
        elements = []
        current = self._head
        while current:
            elements.append(str(current.data))
            current = current.next
        return " -> ".join(elements)

# Usage
ll = LinkedList()
ll.append(10)
ll.append(20)
ll.append(30)
print(ll.display())
print(type(ll._head))
```

**Output:**
```
10 -> 20 -> 30
<class '__main__.LinkedList.Node'>
```

**Explanation:** The `Node` class is nested inside `LinkedList` because `Node` is an implementation detail — external code should not need to create `Node` instances directly. The outer class manages all node creation internally. `LinkedList.Node` qualifies the inner class name within the outer's namespace.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Create a `Computer` class with an inner `Builder` class that implements the builder pattern for constructing a `Computer` with many optional parameters.

**Code:**
```python
class Computer:
    class Builder:
        def __init__(self):
            self._cpu = "Intel i5"
            self._ram_gb = 8
            self._storage_gb = 256
            self._gpu = None
            self._os = "Windows"

        def cpu(self, cpu):
            self._cpu = cpu
            return self

        def ram(self, gb):
            self._ram_gb = gb
            return self

        def storage(self, gb):
            self._storage_gb = gb
            return self

        def gpu(self, gpu):
            self._gpu = gpu
            return self

        def os(self, os):
            self._os = os
            return self

        def build(self):
            return Computer(self._cpu, self._ram_gb, self._storage_gb, self._gpu, self._os)

    def __init__(self, cpu, ram_gb, storage_gb, gpu, os):
        self._cpu = cpu
        self._ram_gb = ram_gb
        self._storage_gb = storage_gb
        self._gpu = gpu
        self._os = os

    def specs(self):
        parts = [
            f"CPU: {self._cpu}",
            f"RAM: {self._ram_gb}GB",
            f"Storage: {self._storage_gb}GB SSD",
        ]
        if self._gpu:
            parts.append(f"GPU: {self._gpu}")
        parts.append(f"OS: {self._os}")
        return "\n".join(parts)

# Usage
gaming_pc = (Computer.Builder()
             .cpu("AMD Ryzen 9")
             .ram(32)
             .storage(1024)
             .gpu("NVIDIA RTX 4080")
             .os("Ubuntu 24.04")
             .build())
print(gaming_pc.specs())
```

**Output:**
```
CPU: AMD Ryzen 9
RAM: 32GB
Storage: 1024GB SSD
GPU: NVIDIA RTX 4080
OS: Ubuntu 24.04
```

**Explanation:** The `Builder` inner class accumulates configuration via method chaining (each setter returns `self`) and produces a `Computer` instance via `build()`. This pattern is useful when an object has many optional parameters — it avoids telescoping constructors. The `Builder` is nested because it exists solely to construct `Computer` objects.

## 🏢 Real World Use Case
**Django REST Framework Serializers:** DRF uses inner `Meta` classes to configure serializer behavior. The pattern `class Meta: model = MyModel; fields = ['id', 'name']` is an inner class that carries metadata about how the outer serializer should behave — it's only meaningful when nested.

## 🎯 Interview Questions (5 with answers)

**Q1. Can an inner class access the outer class's instance attributes?**
*Not automatically. To access the outer instance's attributes, the inner class must receive a reference to the outer instance (typically passed during `__init__`).*

**Q2. What is the difference between a nested class and an inner class?**
*In Python, the terms are used interchangeably. All classes defined inside another class are nested/inner classes. Some languages distinguish them by whether the inner class has an implicit reference to an outer instance.*

**Q3. When should you use an inner class instead of a top-level class?**
*Use an inner class when it is an implementation detail of the outer class, it has no meaning outside the outer class's context, or you want to avoid polluting the module namespace.*

**Q4. Can inner classes be inherited?**
*Yes. If you subclass the outer class, the inner class is inherited. The subclass can also override the inner class by redefining it.*

**Q5. How does Python's MRO work with inner classes?**
*Inner classes have their own independent MRO. The outer class's inheritance has no effect on the inner class's MRO, and vice versa.*

## ⚠ Common Errors / Mistakes
- Expecting `self` in the inner class to refer to the outer instance — it never does; `self` in the inner class refers to the inner instance.
- Forgetting to qualify the inner class name (use `LinkedList.Node` or `self.Node`, not just `Node` in class-level code).
- Overusing inner classes — if a class is complex and used from multiple places, make it a top-level class for clarity.
- Attempting to instantiate the inner class without referencing the outer class (`Node()` instead of `LinkedList.Node()`).

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)

**Beginner:**
1. Create a `Library` class with an inner `Book` class that has `title` and `author`. The outer class maintains a list of books and provides `add_book()` and `list_books()`.
2. Create a `Company` class with an inner `Employee` class. The outer class stores a list of employees and provides a `total_count()` method.
3. Create a `University` class with an inner `Department` class. Each `Department` has a `name` and `courses` list. The outer class manages multiple departments.

**Intermediate:**
4. Create a `Menu` class with an inner `MenuItem` class. `MenuItem` has `label` and `action` (a callable). The outer class builds a menu hierarchy. `MenuItem` instances keep a reference to their parent `Menu` instance to support navigation.
5. Create a `TreeNode` class (outer) where each node has an inner `Data` class that stores key-value pairs. Implement `insert()`, `search()`, and `delete()`. The `Data` inner class has a reference to its containing `TreeNode`.
6. Create a `Playlist` class with an inner `Song` class. The outer class manages a queue of songs. Provide methods `add_song()`, `next_song()`, `shuffle()`. The `Song` inner class tracks its position in the playlist.

**Advanced:**
7. Create a `QueryBuilder` class with an inner `WhereClause` class. `QueryBuilder` has methods `select()`, `from_table()`, and `where()` that returns a `WhereClause` instance. `WhereClause` supports method chaining (`eq()`, `gt()`, `lt()`, `and_()`, `or_()`) and a `build()` method that produces the final SQL string. The inner class must be able to access the outer class's accumulated state.
8. Create a `Document` class with a nested `Style` class and a nested `Element` class hierarchy (`Paragraph`, `Heading`, `List`). The `Style` inner class holds font, size, color, and alignment. `Element` subclasses each inherit from `Element` and interact with both `Style` and the outer `Document`. The outer class provides `render()` that walks all elements and generates formatted output. Demonstrate multi-level nesting with inheritance.
