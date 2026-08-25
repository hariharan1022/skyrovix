## 26. Java `this` Keyword

## 📘 Introduction
The `this` keyword in Java refers to the current object instance. It is used to disambiguate fields from parameters, call other constructors, pass the current object as a parameter, enable method chaining, and access outer class instances from inner classes.

## 🧠 Key Concepts
- **`this` for Instance Variables**: resolves shadowing when parameter names match field names
- **`this()` for Constructor Call**: invokes another constructor in the same class (must be first statement)
- **`this` as Method Parameter**: passes the current object to another method
- **`this` for Method Chaining**: return `this` from setter/modifier methods
- **`this` with Inner Classes**: `OuterClass.this` to access the enclosing instance from an inner class

## 💻 Syntax
```java
this.fieldName                 // access instance field
this.methodName()              // call instance method
this()                         // call another constructor
this(param1, param2)           // call parameterized constructor
return this;                   // method chaining
OuterClass.this.fieldName      // access outer class from inner class
```

## ✅ Example 1 - Basic

**Problem:** Use `this` to resolve shadowing in a constructor and a setter.

**Code:**
```java
public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;    // 'this.name' is the field, 'name' is the parameter
        this.age = age;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void display() {
        System.out.println("Name: " + this.name + ", Age: " + this.age);
    }

    public static void main(String[] args) {
        Person p = new Person("Alice", 25);
        p.display();
        p.setName("Bob");
        p.display();
    }
}
```

**Output:**
```
Name: Alice, Age: 25
Name: Bob, Age: 25
```

**Explanation:** `this.name = name` distinguishes the instance field from the constructor parameter. Without `this`, the parameter would shadow the field.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate constructor chaining with `this()`, method chaining, and inner class access.

**Code:**
```java
public class Employee {
    private String name;
    private String role;

    public Employee() {
        this("Unknown", "Guest");   // constructor chaining
    }

    public Employee(String name, String role) {
        this.name = name;
        this.role = role;
    }

    public Employee setName(String name) {
        this.name = name;
        return this;                // for chaining
    }

    public Employee setRole(String role) {
        this.role = role;
        return this;
    }

    public void print() {
        System.out.println(this.name + " - " + this.role);
        // Inner class using OuterClass.this
        class Details {
            void show() {
                System.out.println("Details: " + Employee.this.name);
            }
        }
        new Details().show();
    }

    public static void main(String[] args) {
        Employee emp = new Employee();
        emp.setName("Alice").setRole("Developer").print();
    }
}
```

**Output:**
```
Alice - Developer
Details: Alice
```

**Explanation:** `this()` chains to the parameterized constructor. `return this` enables `setName().setRole()`. Inside the local inner class, `Employee.this.name` accesses the outer class field.

## 🏢 Real World Use Case
- Setters in Spring beans often use `this.field = field` pattern
- Builder and fluent API patterns rely on `return this` 
- GUI event handlers using anonymous inner classes access outer `this` with `OuterClass.this`
- Constructor chaining reduces code duplication

## 🎯 Interview Questions

**Q1: What does `this` refer to in Java?**
A: `this` refers to the current object instance — the object whose method or constructor is being invoked.

**Q2: Can `this` be used in a static context?**
A: No. `this` requires an instance. Using `this` in a static method causes a compile error.

**Q3: What is the purpose of `this()`?**
A: `this()` calls another constructor in the same class. It must be the first statement in a constructor and is used to avoid code duplication.

**Q4: How do you access the outer class instance from an inner class?**
A: Use `OuterClassName.this.fieldName` or `OuterClassName.this.methodName()`.

**Q5: Can `this` be used as a method argument?**
A: Yes. You can pass `this` to another method, e.g., `someMethod(this)`, to give that method access to the current object.

## ⚠ Common Errors / Mistakes
- Using `this` in a static method or static context
- Calling `this()` after another statement in a constructor (must be first)
- Forgetting `this` when a parameter shadows a field (causes no effect assignments)
- Calling `this()` and `super()` in the same constructor (both must be first — not possible)
- Navigating inner class `this` without qualifying the outer class

## 📝 Practice Exercises

**Beginner:**
1. Create a `Product` class with fields `name` and `price`. Use `this` in the constructor and a `setPrice` method.
2. Create a `Person` class where the constructor parameters have the same names as the fields. Use `this` to assign them correctly.
3. Write a program that demonstrates that `this` cannot be used in a `static` method (compile error).

**Intermediate:**
4. Create a `FluentPerson` class where `setName()` and `setAge()` return `this`. Chain calls to build and print a person.
5. Create a class `Counter` with constructors: `Counter()` defaults to `Counter(0)`, `Counter(int start)` sets the count. Use `this()` for chaining.
6. Create an outer class `Shop` with a field `shopName` and an inner class `Employee` that accesses `Shop.this.shopName`.

**Advanced:**
7. Implement a `MessageBuilder` class with methods `to(String)`, `from(String)`, `subject(String)`, `body(String)` all returning `this`. Add a `send()` method that prints the full message.
8. Create a `Tree` class (with `value` and `left`/`right` children) where each node can pass `this` to a `TreeVisitor` visitor method that operates on the current node.
