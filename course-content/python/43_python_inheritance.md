## 43. Python Inheritance

## 📘 Introduction
Inheritance allows a class (child/derived) to reuse attributes and methods from another class (parent/base). It promotes code reuse, establishes a hierarchy, and enables polymorphic behavior. Python supports single, multiple, and multilevel inheritance, with a sophisticated Method Resolution Order (MRO) that determines method lookup across complex hierarchies.

## 🧠 Key Concepts
- **Single inheritance**: one child inherits from one parent
- **Parent/Base class**: the class being inherited from
- **Child/Derived class**: the class that inherits
- `super()` returns a proxy object that delegates method calls to the next class in MRO
- **Method overriding**: child redefines a method from the parent with the same signature
- `isinstance(obj, Class)` checks whether `obj` is an instance of `Class` (or a subclass thereof)
- `issubclass(Child, Parent)` checks whether `Child` is a subclass of `Parent`
- **MRO** (Method Resolution Order): the order Python searches for methods, computed via C3 linearization
- **Multiple inheritance**: a child inherits from more than one parent class

## 💻 Syntax
```python
class Parent:
    def method(self):
        return "Parent"

class Child(Parent):          # single inheritance
    def method(self):
        return super().method() + " -> Child"

class A:
    pass
class B:
    pass
class C(A, B):                # multiple inheritance
    pass

print(C.__mro__)              # view MRO
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Create a base `Vehicle` class with `brand` and `model`, and a method `info()`. Derive a `Car` class that adds `doors` and overrides `info()` to include vehicle and car details.

**Code:**
```python
class Vehicle:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

    def info(self):
        return f"{self.brand} {self.model}"

class Car(Vehicle):
    def __init__(self, brand, model, doors=4):
        super().__init__(brand, model)
        self.doors = doors

    def info(self):
        return f"{super().info()} with {self.doors} doors"

# Usage
v = Vehicle("Generic", "X1")
c = Car("Toyota", "Camry", 4)
print(v.info())
print(c.info())
print(isinstance(c, Vehicle))
print(issubclass(Car, Vehicle))
```

**Output:**
```
Generic X1
Toyota Camry with 4 doors
True
True
```

**Explanation:** `Car` inherits `brand` and `model` from `Vehicle`. The child's `__init__` calls `super().__init__()` to initialize parent attributes. `info()` is overridden — it calls the parent's `info()` via `super()` and appends additional details. `isinstance()` and `issubclass()` confirm the inheritance relationship.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Create an employee hierarchy with multiple inheritance: `Employee` (base), `Manager` (adds team management), `Developer` (adds programming skills), and a `TechLead` that inherits from both `Manager` and `Developer`. Demonstrate MRO and `super()` in diamond-shaped inheritance.

**Code:**
```python
class Employee:
    def __init__(self, name, emp_id):
        self.name = name
        self.emp_id = emp_id

    def role(self):
        return "Employee"

class Manager(Employee):
    def __init__(self, name, emp_id, team_size=0):
        super().__init__(name, emp_id)
        self.team_size = team_size

    def role(self):
        return f"Manager (team of {self.team_size})"

class Developer(Employee):
    def __init__(self, name, emp_id, language="Python"):
        super().__init__(name, emp_id)
        self.language = language

    def role(self):
        return f"Developer ({self.language})"

class TechLead(Manager, Developer):
    def __init__(self, name, emp_id, team_size, language):
        super().__init__(name, emp_id, team_size=team_size)
        self.language = language

    def role(self):
        return f"TechLead leads {self.team_size}, codes in {self.language}"

# Usage
tl = TechLead("Alice", "TL001", 5, "Python")
print(tl.role())
print(TechLead.__mro__)
print(f"Name: {tl.name}, ID: {tl.emp_id}")
```

**Output:**
```
TechLead leads 5, codes in Python
(<class '__main__.TechLead'>, <class '__main__.Manager'>, <class '__main__.Developer'>, <class '__main__.Employee'>, <class 'object'>)
Name: Alice, ID: TL001
```

**Explanation:** `TechLead` inherits from both `Manager` and `Developer`. MRO follows Python's C3 linearization: `TechLead -> Manager -> Developer -> Employee -> object`. The `super().__init__()` in `TechLead` resolves to `Manager.__init__()` according to MRO, which in turn calls `Employee.__init__()` via its own `super()`. This ensures `Employee.__init__()` is called exactly once (cooperative inheritance).

## 🏢 Real World Use Case
**Django Model Inheritance:** Django uses three inheritance styles — abstract base classes (common fields like `created_at`, `updated_at`), multi-table inheritance (each model maps to its own database table with a parent link), and proxy models (alter behavior without changing the schema). The MRO guarantees consistent field and method resolution.

## 🎯 Interview Questions (5 with answers)

**Q1. What is the `super()` function and why is it important in inheritance?**
*`super()` returns a proxy object that delegates method calls to the next class in MRO. It is essential for cooperative multiple inheritance to ensure all parent initializers run and to avoid diamond problem issues.*

**Q2. How does Python determine MRO?**
*Python uses the C3 linearization algorithm, which ensures that each class appears before its parents, the order of base classes is preserved, and monotonicity is maintained (no reordering in subclasses).*

**Q3. What is the diamond problem and how does Python handle it?**
*The diamond problem occurs when a class inherits from two classes that share a common ancestor. Python resolves it via MRO, ensuring the common ancestor's method is called only once, in a predictable order.*

**Q4. Can you prevent a class from being inherited?**
*Yes — define the class's `__init_subclass__` to raise `TypeError`, or give the class a metaclass with `__subclasscheck__` logic. In Python 3.12+, the `@final` decorator (`typing.final`) marks a class as uninheritable.*

**Q5. What is the difference between `isinstance()` and `issubclass()`?**
*`isinstance(obj, Class)` returns `True` if `obj` is an instance of `Class` or any of its subclasses. `issubclass(Sub, Parent)` returns `True` if `Sub` is a subclass of `Parent` (not instances, but class objects).*

## ⚠ Common Errors / Mistakes
- Forgetting to call `super().__init__()` in the child class — parent attributes are never initialized.
- Calling `super().__init__()` with wrong arguments in multiple inheritance — ensure signatures are compatible across the hierarchy.
- Expecting `self.__class__` to match the defining class in inheritance — it always reflects the actual runtime class.
- Using method overriding but changing the method signature — this breaks Liskov Substitution Principle and confuses callers.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)

**Beginner:**
1. Create a base class `Animal` with `name` and a method `speak()`. Create `Dog` and `Cat` subclasses that override `speak()`.
2. Create a `Shape` base class with `area()` method. Create `Square` and `Circle` subclasses that implement `area()`.
3. Create a `Device` base class with `power_on()` method. Create `Laptop` and `Phone` subclasses with additional attributes (`ram`, `battery_life`).

**Intermediate:**
4. Create a logging system with `Logger` (base), `FileLogger`, `ConsoleLogger`, and a `BufferedLogger` that inherits from both `FileLogger` and `ConsoleLogger`. Ensure `super().__init__()` is called correctly via MRO.
5. Create a `Person` -> `Employee` -> `SalesPerson` hierarchy where `SalesPerson` has a `quota` attribute. Use `super()` in all `__init__` methods.
6. Create a `MediaFile` base class with `play()` and `stop()`. Create `AudioFile` and `VideoFile` subclasses, and a `MediaPlayer` class that accepts any `MediaFile` and calls `play()` polymorphically.

**Advanced:**
7. Design a role-based permission system with abstract `Permission` class, then `ReadPermission`, `WritePermission`, `ExecutePermission` mixins. Create an `AdminUser` that inherits from all three plus a `User` base. Ensure the permission checking logic uses `super()` correctly through MRO.
8. Create a numerical type hierarchy: `Number` -> `Integer`, `Real`, `Complex`. Implement arithmetic operations that return the most appropriate type (e.g., `Integer + Integer -> Integer`, `Integer + Real -> Real`). Use MRO-aware `super()` calls.
