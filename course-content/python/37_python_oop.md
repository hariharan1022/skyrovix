# 37. Python OOP Introduction

## 📘 Introduction

Object-Oriented Programming (OOP) is a programming paradigm that organizes code around "objects" rather than functions and logic. An object is a self-contained unit that contains both data (attributes) and behavior (methods). Python supports OOP as a core feature — everything in Python is an object, including integers, strings, lists, and functions. A class is a blueprint for creating objects. It defines what attributes and methods all objects of that type will have. An object is a specific instance of a class, with its own unique data while sharing the structure defined by the class. The `__init__` constructor method initializes new objects with their initial state, and the `self` parameter gives each method access to the specific instance it belongs to. OOP promotes code reuse, modularity, and makes it easier to model real-world entities in code. Understanding classes and objects is fundamental to Python development.

## 🧠 Key Concepts

- **Class**: A blueprint or template that defines the structure (attributes) and behavior (methods) of objects
- **Object**: An instance of a class — a concrete entity with its own attribute values
- **Attribute**: A variable that belongs to an object or class, storing data about the object
- **Method**: A function defined inside a class that operates on the object's data
- **\_\_init\_\_**: The constructor method called automatically when a new object is created; initializes the object's attributes
- **self**: The first parameter of instance methods; references the specific instance being operated on
- **Encapsulation**: Bundling data and methods that operate on that data within a single unit (the object)

| OOP Concept | Python Implementation |
|-------------|----------------------|
| Class | `class ClassName:` |
| Object | `obj = ClassName()` |
| Attribute | `obj.attribute = value` |
| Method | `def method(self):` |
| Constructor | `def __init__(self):` |
| Instance reference | `self` parameter |

## 💻 Syntax

```python
# Define a class
class Dog:
    # Class attribute (shared by all instances)
    species = "Canis familiaris"

    # Constructor (initializer)
    def __init__(self, name, age):
        # Instance attributes (unique to each object)
        self.name = name
        self.age = age

    # Instance method
    def bark(self):
        return f"{self.name} says Woof!"

    def get_info(self):
        return f"{self.name} is {self.age} years old."

# Create objects (instances)
dog1 = Dog("Buddy", 3)
dog2 = Dog("Max", 5)

# Access attributes
print(dog1.name)       # Buddy
print(dog1.species)    # Canis familiaris (class attribute)

# Call methods
print(dog1.bark())     # Buddy says Woof!
print(dog2.get_info()) # Max is 5 years old.
```

Line-by-line explanation:
- `class Dog:` — declares a new class named `Dog`; the class body defines its structure
- `species = "Canis familiaris"` — class attribute; belongs to the class itself, shared by all instances
- `def __init__(self, name, age):` — the constructor; Python calls this automatically after creating the object
- `self.name = name` — creates an instance attribute `name` and assigns it the value from the `name` parameter
- `def bark(self):` — defines a method; `self` is the first parameter, referring to the instance that calls it
- `dog1 = Dog("Buddy", 3)` — creates (instantiates) a Dog object; Python passes `"Buddy"` and `3` to `__init__`
- `dog1.name` — accesses the `name` attribute of the `dog1` instance
- `dog1.bark()` — calls the `bark` method on the `dog1` instance; Python automatically passes `dog1` as `self`

## ✅ Example 1 - Basic: Modeling a Student

**Problem**: Create a `Student` class that stores a student's name, ID, and list of grades. Include methods to add a grade and calculate the average.

**Code**:
```python
class Student:
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
        self.grades = []

    def add_grade(self, grade):
        self.grades.append(grade)

    def average(self):
        if not self.grades:
            return 0.0
        return sum(self.grades) / len(self.grades)

    def display(self):
        avg = self.average()
        return f"{self.name} (ID: {self.student_id}) - Avg: {avg:.1f} - Grades: {self.grades}"

# Create students
alice = Student("Alice Johnson", "S1001")
bob = Student("Bob Smith", "S1002")

# Add grades
alice.add_grade(85)
alice.add_grade(92)
alice.add_grade(78)

bob.add_grade(95)
bob.add_grade(88)

# Display results
print(alice.display())
print(bob.display())
```

**Output**:
```
Alice Johnson (ID: S1001) - Avg: 85.0 - Grades: [85, 92, 78]
Bob Smith (ID: S1002) - Avg: 91.5 - Grades: [95, 88]
```

**Explanation**: The `Student` class encapsulates student data (name, ID, grades) and behavior (adding grades, calculating averages) into a single unit. Each `Student` object maintains its own `grades` list — `alice.grades` and `bob.grades` are independent. The `average()` method operates on the object's own data via `self.grades`. This demonstrates the core OOP principle of bundling data with behavior, making the code organized and reusable.

## 🚀 Example 2 - Intermediate: Bank Account with Encapsulation

**Problem**: Create a `BankAccount` class with deposit, withdrawal, and balance check operations. Prevent direct modification of the balance from outside the class by using a private attribute convention.

**Code**:
```python
class BankAccount:
    def __init__(self, owner, initial_balance=0):
        self.owner = owner
        self._balance = initial_balance  # Convention: underscore means "protected"

    def deposit(self, amount):
        if amount <= 0:
            return "Deposit amount must be positive."
        self._balance += amount
        return f"Deposited ${amount:.2f}. New balance: ${self._balance:.2f}"

    def withdraw(self, amount):
        if amount <= 0:
            return "Withdrawal amount must be positive."
        if amount > self._balance:
            return "Insufficient funds."
        self._balance -= amount
        return f"Withdrew ${amount:.2f}. New balance: ${self._balance:.2f}"

    def get_balance(self):
        return self._balance

    def __str__(self):
        return f"Account owner: {self.owner}, Balance: ${self._balance:.2f}"

# Create account
account = BankAccount("Alice", 1000)
print(account.deposit(500))
print(account.withdraw(200))
print(account.withdraw(2000))  # Should fail
print(account)
print(f"Balance via method: ${account.get_balance():.2f}")

# The underscore convention warns against direct access
# account._balance = 999999  # Technically possible but discouraged
```

**Output**:
```
Deposited $500.00. New balance: $1500.00
Withdrew $200.00. New balance: $1300.00
Insufficient funds.
Account owner: Alice, Balance: $1300.00
Balance via method: $1300.00
```

**Explanation**: The `BankAccount` class uses the underscore convention (`_balance`) to indicate that the balance should not be accessed directly. Instead, `deposit()`, `withdraw()`, and `get_balance()` provide controlled access with validation. The `withdraw` method prevents overdrawing, and `deposit` rejects non-positive amounts. This is encapsulation — the internal data (`_balance`) is protected from invalid states by the methods that modify it. The `__str__` method provides a readable representation of the object.

## 🏢 Real World Use Case

**Django**, Python's most popular web framework, is built entirely on OOP principles. Models are Python classes that map to database tables — each model class attribute becomes a database column, and each model instance represents a row. Views are classes (class-based views) that handle HTTP requests and return responses using methods like `get()` and `post()`. **Blender**, the 3D graphics suite, uses Python OOP extensively. Every 3D object (mesh, camera, light) is a Python object with attributes (position, rotation, scale) and methods (duplicate, transform, delete). The entire scripting API is class-based. **Pandas** uses OOP with `DataFrame` as a class — each DataFrame object has methods like `.mean()`, `.groupby()`, `.merge()` that operate on the data inside the object. This is why the library feels intuitive: you create an object (a DataFrame) and ask it to do things (calculate, filter, join).

## 🎯 Interview Questions

**Q1: What is the difference between a class and an object in Python?**
A: A class is a blueprint or template that defines the structure (attributes) and behavior (methods) that objects of that type will have. An object is a specific instance created from that class, with its own unique attribute values. For example, `Student` is the class (defining what a student is), while `alice = Student("Alice", "S1001")` creates an object (a specific student with name "Alice" and ID "S1001").

**Q2: What is the `__init__` method and when is it called?**
A: `__init__` is the constructor method that is automatically called when a new instance of a class is created. It initializes the object's attributes to their initial state. The first parameter is always `self` (referring to the new instance), followed by any additional arguments passed when creating the object. `__init__` does not create the object — that is done by `__new__` — but it initializes it.

**Q3: What is `self` in Python classes? Is it a keyword?**
A: `self` is the first parameter of instance methods and refers to the specific instance on which the method is being called. It is NOT a keyword — it is a naming convention. You could technically use any name (like `this` or `me`), but `self` is universally expected by Python developers. Python automatically passes the instance as the first argument when you call a method on an object (e.g., `dog.bark()` becomes `Dog.bark(dog)` internally).

**Q4: What is the difference between instance attributes and class attributes?**
A: Instance attributes are defined in `__init__` using `self.attribute = value` — each object has its own copy. Class attributes are defined directly in the class body and are shared by all instances. Changing a class attribute affects all instances, while changing an instance attribute only affects that one object. Access a class attribute via `ClassName.attr` or `self.attr` (if not shadowed by an instance attribute).

**Q5: What is encapsulation and how does Python support it?**
A: Encapsulation is the bundling of data (attributes) and methods that operate on that data within a single unit (the class), and restricting direct access to some of the object's internal components. Python uses naming conventions rather than strict access modifiers: a single underscore prefix (`_attr`) indicates "protected" (internal use, not part of the public API), while double underscores (`__attr`) trigger name mangling for a stronger form of privacy. Python relies on convention and trust rather than enforced access control.

## ⚠ Common Errors / Mistakes

**Error 1: Forgetting `self` as the first parameter of instance methods**
```python
class Dog:
    def __init__(self, name):
        self.name = name

    # Wrong: missing self parameter
    def bark():
        return f"{self.name} says Woof!"  # NameError: self not defined

    # Correct
    def bark(self):
        return f"{self.name} says Woof!"
```

**Error 2: Using class attributes when instance attributes are needed**
```python
class Dog:
    tricks = []  # Class attribute — shared by all instances!

    def add_trick(self, trick):
        self.tricks.append(trick)  # Appends to the shared list

d1 = Dog()
d2 = Dog()
d1.add_trick("roll over")
print(d2.tricks)  # ['roll over'] — unexpected!

# Correct: use instance attribute
class Dog:
    def __init__(self):
        self.tricks = []  # Each instance has its own list

    def add_trick(self, trick):
        self.tricks.append(trick)
```

**Error 3: Forgetting parentheses when creating an instance**
```python
class Dog:
    def __init__(self, name):
        self.name = name

# Wrong: no parentheses — this references the class, does not create an instance
d = Dog  # d is now the Dog class itself, not an instance

# Correct
d = Dog("Buddy")
print(d.name)
```

## 📝 Practice Exercises

**Beginner:**
1. Create a `Book` class with attributes `title`, `author`, and `pages`. Include a method `description()` that returns a formatted string about the book.
2. Define a `Rectangle` class with `width` and `height` attributes. Add methods `area()` and `perimeter()` to calculate and return these values.
3. Create a `Car` class with attributes `make`, `model`, `year`, and `mileage`. Include a method `drive(miles)` that increases the mileage.

**Intermediate:**
4. Build a `Library` class that maintains a list of `Book` objects (using the Book class from exercise 1). Include methods to add a book, remove a book by title, search by author, and list all books.
5. Create an `Elevator` class that tracks current floor, total floors, and direction. Include methods to `go_up()`, `go_down()`, `go_to_floor(n)`, and a `__str__` method for display.
6. Implement a `ShoppingCart` class that holds `Item` objects (Item has name and price). Include methods to add item, remove item, calculate total, apply discount percentage, and display the cart.

**Advanced:**
7. Design a `Bank` system with `Customer`, `Account`, `SavingsAccount`, and `CheckingAccount` classes. Use inheritance (covered in upcoming topics), with the account classes sharing common behavior through a base class. Implement deposit, withdraw, transfer, and interest calculation.
8. Build a `TaskManager` class that manages `Task` objects. Each Task has a title, description, priority, due date, and status. Implement methods to add, complete, delete, filter by priority, sort by due date, and save/load tasks from a JSON file.
