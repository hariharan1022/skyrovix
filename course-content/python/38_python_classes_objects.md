# 38. Python Classes/Objects

## 📘 Introduction

Classes and objects are the core building blocks of Object-Oriented Programming in Python. The `class` keyword defines a new type that bundles data (attributes) and behavior (methods) into a single entity. Attributes can be instance-level (unique per object, defined in `__init__` with `self`) or class-level (shared across all instances, defined directly in the class body). Python provides special methods like `__str__` (user-friendly string representation) and `__repr__` (developer-focused representation) to control how objects are displayed. Objects can be compared using custom logic via `__eq__`, `__lt__`, and other comparison methods. Python also supports deleting objects with `del`, though garbage collection handles memory cleanup automatically. Understanding the distinction between instance and class attributes, and mastering special methods, is essential for designing clean, intuitive classes that integrate naturally with Python's idioms.

## 🧠 Key Concepts

- **class keyword**: `class ClassName:` defines a new user-defined type
- **Instance attributes**: Defined with `self.attr = value` inside methods; unique per object
- **Class attributes**: Defined at the class body level; shared by all instances
- **\_\_str\_\_ method**: Returns a human-readable string representation; called by `print()` and `str()`
- **\_\_repr\_\_ method**: Returns an unambiguous, developer-friendly string; called by `repr()` and in debugging
- **Object comparison**: `__eq__` for equality (`==`), `__lt__` for less-than (`<`), etc.
- **Deleting objects**: `del obj` removes the reference; Python's garbage collector reclaims memory

| Special Method | Purpose | Called By |
|----------------|---------|-----------|
| `__str__(self)` | Human-readable string | `print(obj)`, `str(obj)` |
| `__repr__(self)` | Unambiguous representation | `repr(obj)`, debugging |
| `__eq__(self, other)` | Equality comparison | `obj == other` |
| `__lt__(self, other)` | Less-than comparison | `obj < other` |
| `__len__(self)` | Length | `len(obj)` |
| `__del__(self)` | Destructor (cleanup) | `del obj` |

## 💻 Syntax

```python
class Student:
    # Class attribute (shared by all instances)
    school = "Springfield High"

    def __init__(self, name, grade, student_id):
        # Instance attributes (unique per instance)
        self.name = name
        self.grade = grade
        self.student_id = student_id

    def __str__(self):
        # Called by print() — human-readable
        return f"{self.name} (Grade: {self.grade})"

    def __repr__(self):
        # Called by repr() — unambiguous, for developers
        return f"Student('{self.name}', {self.grade}, '{self.student_id}')"

    def __eq__(self, other):
        # Custom equality: two students are equal if they have the same ID
        if not isinstance(other, Student):
            return NotImplemented
        return self.student_id == other.student_id

    def __lt__(self, other):
        # Custom sorting: compare by name
        return self.name < other.name

    def promote(self):
        self.grade += 1

# Creating objects
s1 = Student("Alice", 10, "S1001")
s2 = Student("Bob", 11, "S1002")
s3 = Student("Alice", 10, "S1001")  # Same ID as s1

# Using __str__ (via print)
print(s1)       # Alice (Grade: 10)

# Using __repr__
print(repr(s1)) # Student('Alice', 10, 'S1001')

# Using __eq__
print(s1 == s3)  # True (same student_id)
print(s1 == s2)  # False (different IDs)

# Using __lt__ for sorting
students = [s2, s1]
students.sort()
print(students)  # [Alice, Bob] (sorted by name)
```

Line-by-line explanation:
- `school = "Springfield High"` — class attribute; accessible via `Student.school` or `self.school`
- `self.name = name` — instance attribute; each student has their own `name`
- `__str__` returns `f"{self.name} (Grade: {self.grade})"` — called by `print(s1)` to show a friendly description
- `__repr__` returns a string that looks like valid Python code to recreate the object — ideal for debugging
- `__eq__` checks if `other` is a `Student` and compares `student_id`; returns `NotImplemented` for invalid types
- `__lt__` compares by name, enabling `sorted()` to order students alphabetically
- `s1 == s3` — returns `True` because both have student_id "S1001" (our `__eq__` logic)

## ✅ Example 1 - Basic: Product Class with __str__ and __repr__

**Problem**: Create an `InventoryItem` class with name, price, and quantity. Implement `__str__` for customer display and `__repr__` for developer debugging.

**Code**:
```python
class InventoryItem:
    category = "General"  # Class attribute

    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity

    def __str__(self):
        return f"{self.name} — ${self.price:.2f} ({self.quantity} in stock)"

    def __repr__(self):
        return f"InventoryItem('{self.name}', {self.price}, {self.quantity})"

    def total_value(self):
        return self.price * self.quantity

# Create items
item1 = InventoryItem("Laptop", 999.99, 5)
item2 = InventoryItem("Mouse", 29.99, 50)

# __str__ usage
print(item1)                # Laptop — $999.99 (5 in stock)
print(f"Item: {item1}")     # Same: str() is called

# __repr__ usage
print(repr(item1))          # InventoryItem('Laptop', 999.99, 5)
print([item1, item2])       # Uses __repr__ for list display

# Access class attribute
print(item1.category)       # General
print(InventoryItem.category)  # General

# Modify class attribute (affects all instances)
InventoryItem.category = "Electronics"
print(item2.category)       # Electronics
```

**Output**:
```
Laptop — $999.99 (5 in stock)
Item: Laptop — $999.99 (5 in stock)
InventoryItem('Laptop', 999.99, 5)
[InventoryItem('Laptop', 999.99, 5), InventoryItem('Mouse', 29.99, 50)]
General
General
Electronics
```

**Explanation**: `__str__` provides a customer-friendly display with formatted price and stock count — this is what users see when the item is printed. `__repr__` returns an unambiguous string that could (ideally) be used to recreate the object — this is what appears in logs, debug output, and when the object is inside a container. The class attribute `category` is shared: changing it via `InventoryItem.category` updates it for all instances.

## 🚀 Example 2 - Intermediate: Comparable and Sortable Employee Class

**Problem**: Build an `Employee` class where employees can be compared by salary, sorted by name, and checked for equality by employee ID. Also demonstrate object deletion.

**Code**:
```python
class Employee:
    company = "TechCorp"

    def __init__(self, emp_id, name, salary):
        self.emp_id = emp_id
        self.name = name
        self.salary = salary

    def __str__(self):
        return f"{self.name} (ID: {self.emp_id})"

    def __repr__(self):
        return f"Employee({self.emp_id}, '{self.name}', {self.salary})"

    def __eq__(self, other):
        if not isinstance(other, Employee):
            return NotImplemented
        return self.emp_id == other.emp_id

    def __lt__(self, other):
        return self.name.lower() < other.name.lower()

    def __del__(self):
        print(f"Employee {self.name} (ID: {self.emp_id}) removed from memory.")

# Create employees
e1 = Employee(101, "Charlie", 75000)
e2 = Employee(102, "Alice", 85000)
e3 = Employee(103, "Bob", 65000)
e4 = Employee(101, "Charlie", 75000)  # Same ID as e1

# Equality check
print(f"e1 == e4: {e1 == e4}")   # True (same ID)
print(f"e1 == e2: {e1 == e2}")   # False

# Sorting by name (via __lt__)
employees = [e1, e2, e3]
employees.sort()
print("Sorted:", employees)      # Alice, Bob, Charlie

# Find max salary employee
highest = max(employees, key=lambda e: e.salary)
print(f"Highest paid: {highest}")

# Delete an object
print("\nDeleting e3...")
del e3
print("Done.")
```

**Output**:
```
e1 == e4: True
e1 == e2: False
Sorted: [Alice (ID: 102), Bob (ID: 103), Charlie (ID: 101)]
Highest paid: Alice (ID: 102)

Deleting e3...
Employee Bob (ID: 103) removed from memory.
Done.
```

**Explanation**: The `__eq__` method allows comparing employees by ID rather than by memory location (the default). The `__lt__` method enables sorting — `employees.sort()` uses `<` comparisons. The `__del__` destructor is called when the object is garbage collected (when its reference count reaches zero). Note that `max()` requires a `key` function for salary comparison because `__lt__` sorts by name; for salary-based operations we use `lambda`. This example demonstrates how special methods make custom classes integrate naturally with Python's built-in functions and syntax.

## 🏢 Real World Use Case

**Django ORM** (Object-Relational Mapper) extensively uses class-level attributes to define database schema. Each model class attribute (e.g., `name = models.CharField(max_length=100)`) is a class attribute that Django's metaclass system processes to generate database column definitions. The `__str__` method is overridden to return a human-readable representation for each model instance, which appears in the Django admin interface. **SQLAlchemy** uses `__repr__` to provide debugging output for database records. **PyTorch** defines `__eq__` and `__lt__` on tensor objects to support element-wise comparisons and sorting operations. **pandas** DataFrame uses `__del__` and garbage collection hooks to manage memory for large datasets efficiently. The `__str__` vs `__repr__` distinction is crucial in DataFrame — `print(df)` shows a nicely formatted table (`__str__`), while `repr(df)` used in Jupyter notebooks shows the same table because Jupyter uses `repr()` for display.

## 🎯 Interview Questions

**Q1: What is the difference between `__str__` and `__repr__`? When should you implement each?**
A: `__str__` should return a human-readable, user-friendly string — it is called by `print()` and `str()`. `__repr__` should return an unambiguous, developer-focused string that ideally could be used to recreate the object — it is called by `repr()`, in debug output, and when displaying objects in containers. The rule of thumb: implement `__repr__` for every class (it serves as a fallback for `__str__`), and implement `__str__` when you want a more readable presentation. If only `__repr__` is defined, `__str__` uses `__repr__`.

**Q2: What is the difference between instance attributes and class attributes? How does Python resolve attribute access?**
A: Instance attributes are defined with `self.attr = value` inside methods (especially `__init__`) — each object has its own copy. Class attributes are defined in the class body — shared by all instances. When accessing `obj.attr`, Python first looks for an instance attribute; if not found, it looks for a class attribute; if still not found, it checks parent classes (via MRO). Setting `obj.attr = value` always creates or modifies an instance attribute, even if a class attribute with that name exists.

**Q3: How do you make a class sortable? What methods are needed?**
A: To make a class sortable with `sorted()` or `list.sort()`, implement `__lt__` (less-than). Python's sort algorithm (Timsort) primarily uses `<` comparisons. For full comparison support (==, !=, <, <=, >, >=), implement `__eq__` and one of `__lt__`, `__le__`, `__gt__`, `__ge__`, then use the `@functools.total_ordering` decorator to fill in the rest automatically.

**Q4: What does the `__del__` method do? Should you rely on it for cleanup?**
A: `__del__` is the destructor method called when an object is about to be destroyed (when its reference count reaches zero or during garbage collection). It is not guaranteed to be called immediately after `del obj` (which only removes the reference), and in some cases (e.g., circular references, interpreter shutdown) it may never be called. For resource cleanup (files, network connections), use context managers (`with` statement) or the `atexit` module instead of `__del__`.

**Q5: What is the difference between `del obj` and the garbage collector?**
A: `del obj` removes the reference `obj` from the current namespace, decrementing the object's reference count. If the reference count reaches zero, the object is immediately deallocated. Python's garbage collector (gc module) handles circular references (objects referencing each other but with no external references) that reference counting alone cannot clean up. Use `del` to explicitly remove references; the garbage collector runs automatically periodically or can be triggered with `gc.collect()`.

## ⚠ Common Errors / Mistakes

**Error 1: Accidentally shadowing a class attribute with an instance attribute**
```python
class Dog:
    tricks = []  # Class attribute intended to be shared

    def __init__(self, name):
        self.name = name
        self.tricks = []  # Creates INSTANCE attribute, shadows class attribute

# Now tricks is an instance attribute, not the class attribute
d = Dog("Buddy")
print(d.tricks)  # [] — instance attribute, not Dog.tricks
```

**Error 2: Defining `__str__` but forgetting to return a string**
```python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    # Wrong: prints instead of returns
    def __str__(self):
        print(f"{self.name}: ${self.price}")  # Returns None!

    # Correct: returns a string
    def __str__(self):
        return f"{self.name}: ${self.price}"
```

**Error 3: Forgetting that `del` does not immediately call `__del__`**
```python
class Resource:
    def __del__(self):
        print("Cleanup...")  # May not run immediately!

r = Resource()
r_copy = r    # Another reference
del r         # Removes one reference, but r_copy still holds one
# __del__ is NOT called yet!

# Only when all references are gone:
del r_copy    # Now reference count is zero, __del__ runs
```

## 📝 Practice Exercises

**Beginner:**
1. Create a `Movie` class with title, director, year, and rating. Implement `__str__` to display as `"Title (Year) — Rating: X/10"` and `__repr__` to show the constructor call.
2. Define a `Point` class with x, y coordinates. Implement `__eq__` to compare two points by their coordinates. Test with several comparisons.
3. Create a `Person` class with name and age. Implement `__lt__` to sort by age. Create a list of Person objects and sort them.

**Intermediate:**
4. Build a `Deck` class representing a deck of playing cards. Each card has suit and rank. Implement `__len__` (returns 52), `__str__` (lists cards), and `__getitem__` to allow `deck[i]` access. Implement a `shuffle()` method.
5. Create a `Fraction` class with numerator and denominator. Implement `__eq__`, `__lt__`, `__add__`, `__sub__`, `__mul__`, `__str__` (as "n/d"), and `__repr__`. Reduce fractions using GCD automatically.
6. Implement a `Version` class that represents software versions (e.g., "2.3.1"). Implement `__init__` that parses a string, `__str__`, `__repr__`, `__eq__`, `__lt__`, and `__le__`. Make versions sortable and comparable.

**Advanced:**
7. Design a `Graph` class that stores nodes and edges. Nodes can be any hashable type. Implement `__len__` (node count), `__contains__` (node in graph), `__iter__` (iterate nodes), `__getitem__` (get neighbors of a node), and `__str__`/`__repr__`. Include methods to add_node, add_edge, and bfs/dfs traversal.
8. Build a `QueryBuilder` class that constructs SQL-like queries using method chaining (each method returns `self`). Include `select()`, `from_()`, `where()`, `order_by()`, `limit()`. Implement `__str__` to output the SQL string and `__repr__` for debugging. Example: `QueryBuilder().select("name").from_("users").where("age > 18").__str__()` → `"SELECT name FROM users WHERE age > 18"`.
