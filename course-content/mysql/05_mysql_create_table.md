## 5. MySQL Create Table

## 📘 Introduction
Tables are the fundamental storage unit in MySQL. `CREATE TABLE` defines the table structure: column names, data types, constraints, and options. Choosing appropriate data types and constraints ensures data integrity, performance, and efficient storage.

## 🧠 Key Concepts
- **Data Types**: INT (integer), VARCHAR (variable string), TEXT (large text), DECIMAL (exact decimal), DATE, DATETIME, BOOLEAN (TINYINT(1))
- **NOT NULL**: Column must have a value
- **DEFAULT**: Default value if none provided
- **AUTO_INCREMENT**: Automatically generates sequential integers
- **PRIMARY KEY**: Uniquely identifies each row
- **UNIQUE**: Ensures all values in a column are distinct
- **SHOW TABLES**: Lists all tables in the current database
- **DESC / EXPLAIN table**: Shows table structure

## 💻 Syntax
```sql
CREATE TABLE table_name (
    column1 datatype constraints,
    column2 datatype constraints,
    ...
    PRIMARY KEY (column),
    UNIQUE (column),
    FOREIGN KEY (column) REFERENCES other_table(other_column)
);

-- View tables
SHOW TABLES;

-- View table structure
DESC table_name;
-- or
EXPLAIN table_name;
```

## ✅ Example 1 - Basic

**Problem**: Create a `students` table with id, name, email, age, and enrollment date.

**SQL Query**:
```sql
CREATE TABLE students (
    id INT AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    age INT DEFAULT 18,
    enrolled_at DATE DEFAULT (CURRENT_DATE),
    PRIMARY KEY (id),
    UNIQUE (email)
);
```

**Output** (after `DESC students`):
```
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| id          | int          | NO   | PRI | NULL    | auto_increment |
| name        | varchar(100) | NO   |     | NULL    |                |
| email       | varchar(255) | NO   | UNI | NULL    |                |
| age         | int          | YES  |     | 18      |                |
| enrolled_at | date         | YES  |     | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+
```

**Explanation**: `id` is an auto-incrementing primary key. `email` has a `UNIQUE` constraint to prevent duplicates. `age` defaults to 18 if omitted. `enrolled_at` defaults to the current date using an expression default (MySQL 8.0.13+).

## 🚀 Example 2 - Intermediate

**Problem**: Create an `orders` table with foreign key referencing `customers`, and a composite `UNIQUE` constraint.

**SQL Query**:
```sql
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    UNIQUE (customer_id, order_date),
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);
```

**Output** (after `SHOW TABLES` and `DESC orders`):
```
+----------------+
| Tables_in_shop |
+----------------+
| customers      |
| orders         |
+----------------+

+-------------+----------------------------------------+------+-----+-------------------+-------------------+
| Field       | Type                                   | Null | Key | Default           | Extra             |
+-------------+----------------------------------------+------+-----+-------------------+-------------------+
| id          | int                                    | NO   | PRI | NULL              | auto_increment    |
| customer_id | int                                    | NO   | MUL | NULL              |                   |
| order_date  | datetime                                | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| total       | decimal(10,2)                          | NO   |     | NULL              |                   |
| status      | enum('pending','shipped','delivered',  | YES  |     | pending           |                   |
|             |        'cancelled')                    |      |     |                   |                   |
+-------------+----------------------------------------+------+-----+-------------------+-------------------+
```

**Explanation**: `orders` references `customers` via a foreign key. `ON DELETE CASCADE` automatically deletes related orders when a customer is deleted. `ENUM` restricts status to specific values. The composite `UNIQUE (customer_id, order_date)` prevents a customer from having two orders on the exact same timestamp.

## 🏢 Real World Use Case
A banking application creates an `accounts` table with `DECIMAL(15,2)` for precise money storage, `TIMESTAMP` for transaction audit trails, `CHECK` constraints for minimum balance, and foreign keys linking to `users` and `branches` tables for relational integrity.

## 🎯 Interview Questions
1. **Q**: What is the difference between `CHAR` and `VARCHAR`?  
   **A**: `CHAR` is fixed-length (padded with spaces); `VARCHAR` is variable-length (1-2 extra bytes for length). `VARCHAR` saves space for variable-length strings.
2. **Q**: What is `AUTO_INCREMENT` and how does it work?  
   **A**: It automatically generates a unique sequential integer for each new row. The counter starts at 1 and increments by 1 by default.
3. **Q**: What is the difference between `PRIMARY KEY` and `UNIQUE`?  
   **A**: A table can have only one `PRIMARY KEY` (which is implicitly `NOT NULL` and unique). A table can have multiple `UNIQUE` constraints, which allow one `NULL` each (in MySQL).
4. **Q**: What is `ON DELETE CASCADE`?  
   **A**: It automatically deletes child rows when the parent row is deleted.
5. **Q**: What is the `ENUM` data type?  
   **A**: A string column that can only take one value from a predefined list. It's stored internally as an integer for efficiency.

## ⚠ Common Errors / Mistakes
- Using `VARCHAR(255)` for every string without considering actual data size
- Forgetting `PRIMARY KEY` or `AUTO_INCREMENT` on an id column
- Using `FLOAT`/`DOUBLE` for monetary values instead of `DECIMAL`
- Creating circular foreign key references
- Not setting `ON DELETE`/`ON UPDATE` actions on foreign keys

## 📝 Practice Exercises
**Beginner**
1. Create a table `employees` with columns: `id` (INT AUTO_INCREMENT PK), `name` (VARCHAR(100) NOT NULL), `salary` (DECIMAL(10,2)), `hire_date` (DATE).
2. Use `DESC employees` to view the table structure.
3. Create a table `departments` with `id` INT PK and `name` VARCHAR(100) NOT NULL UNIQUE.

**Intermediate**
4. Create a table `projects` with `id` PK, `title` VARCHAR(200), `budget` DECIMAL(12,2), `dept_id` INT with a foreign key referencing `departments(id)` ON DELETE CASCADE.
5. Add an `ENUM` column `priority` ('low', 'medium', 'high', 'critical') to the `projects` table with default 'medium'.
6. Create a table `project_assignments` with a composite primary key (`employee_id`, `project_id`) and foreign keys to both `employees` and `projects`.

**Advanced**
7. Design a normalized schema for a library system: `authors`, `books`, `members`, `loans` — with appropriate data types, primary keys, foreign keys, and constraints. Include `ENUM` for book status, `DECIMAL` for fines, and `CHECK` constraints where supported.
8. Write a `CREATE TABLE` statement for `inventory` that uses a generated column (`quantity * unit_price AS total_value STORED`) and explain the storage implications.
