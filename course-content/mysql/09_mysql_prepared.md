## 9. MySQL Prepared Statements

## 📘 Introduction
Prepared statements separate SQL logic from data. The query is sent to MySQL once for parsing and optimization, then executed multiple times with different parameters using `?` placeholders. This improves performance for repeated queries and completely prevents SQL injection attacks.

## 🧠 Key Concepts
- **PREPARE**: Parses and compiles a SQL statement with `?` placeholders
- **EXECUTE**: Runs the prepared statement with actual parameter values (USING @vars)
- **DEALLOCATE PREPARE**: Frees the prepared statement resources
- **Parameterized Queries**: `?` placeholders used instead of concatenated values
- **SQL Injection Prevention**: Parameters are never interpreted as SQL code — separated from the query structure
- **MySQLi / PDO**: Both PHP extensions support prepared statements natively
- **Performance**: Reuse the same execution plan for repeated queries

## 💻 Syntax
```sql
-- Prepare
PREPARE stmt_name FROM 'SELECT * FROM users WHERE email = ? AND status = ?';

-- Execute
SET @email = 'alice@example.com';
SET @status = 'active';
EXECUTE stmt_name USING @email, @status;

-- Deallocate
DEALLOCATE PREPARE stmt_name;
```

## ✅ Example 1 - Basic

**Problem**: Use a prepared statement to search for products by category with variable input.

**SQL Query**:
```sql
PREPARE search_products FROM
    'SELECT id, name, price FROM products WHERE category = ? AND price <= ?';

SET @cat = 'Electronics';
SET @max_price = 500.00;
EXECUTE search_products USING @cat, @max_price;

SET @cat = 'Clothing';
SET @max_price = 50.00;
EXECUTE search_products USING @cat, @max_price;

DEALLOCATE PREPARE search_products;
```

**Output**:
```
+----+-------------+--------+
| id | name        | price  |
+----+-------------+--------+
|  1 | Headphones  | 199.99 |
|  2 | Mouse       |  29.99 |
+----+-------------+--------+

+----+-----------+-------+
| id | name      | price |
+----+-----------+-------+
|  5 | T-Shirt   | 24.99 |
|  6 | Jeans     | 49.99 |
+----+-----------+-------+
```

**Explanation**: The statement is prepared once with `?` placeholders. Two different executions use different parameter values but the same query plan. This avoids re-parsing and re-optimizing the SQL.

## 🚀 Example 2 - Intermediate

**Problem**: Prevent SQL injection by using prepared statements in PHP PDO.

**PHP Code**:
```php
<?php
$pdo = new PDO('mysql:host=localhost;dbname=shop', 'root', '', [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

// UNSAFE: concatenating user input
// $sql = "SELECT * FROM users WHERE email = '" . $_GET['email'] . "'";

// SAFE: prepared statement
$stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email AND status = :status');
$stmt->execute([
    ':email' => $_GET['email'],
    ':status' => 'active'
]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// Named placeholders (:email) are clearer for many parameters
// Positional placeholders (?) work too
$stmt2 = $pdo->prepare('INSERT INTO logs (action, user_id) VALUES (?, ?)');
$stmt2->execute(['login', $user['id']]);
?>
```

**Explanation**: User input (`$_GET['email']`) is bound to placeholders — never concatenated. Even if the user passes `' OR 1=1 --`, it's treated as a literal string value, not SQL code. Named placeholders (`:email`) improve readability for complex queries.

## 🏢 Real World Use Case
A REST API processes hundreds of user registrations per minute. Using PDO prepared statements, the server inserts new users with parameterized queries — preventing SQL injection from malicious registration data and reducing CPU overhead from repeated query parsing.

## 🎯 Interview Questions
1. **Q**: What is SQL injection and how do prepared statements prevent it?  
   **A**: SQL injection occurs when user input is concatenated into SQL. Prepared statements separate SQL logic from data, so input is always treated as literal values.
2. **Q**: What are the benefits of prepared statements?  
   **A**: SQL injection prevention, query plan caching for repeated execution, and cleaner code.
3. **Q**: What is the difference between `?` positional and `:name` named placeholders?  
   **A**: Positional placeholders are filled by position; named placeholders are filled by name. Named is clearer for many parameters.
4. **Q**: Do prepared statements always improve performance?  
   **A**: They improve performance when the same query is executed many times with different parameters. For one-off queries, the overhead of PREPARE may not be beneficial.
5. **Q**: What happens when you `DEALLOCATE PREPARE`?  
   **A**: The server frees memory and resources associated with the prepared statement.

## ⚠ Common Errors / Mistakes
- Concatenating user input directly into SQL strings
- Using prepared statements but still concatenating values for IN lists (must use individual `?` per value)
- Forgetting to `DEALLOCATE PREPARE` (resources freed on connection close, but good practice)
- Using `EXECUTE` without setting all `@variables`
- Assuming `LIMIT ?` works — LIMIT parameters must be integers; use prepared statements with CAST

## 📝 Practice Exercises
**Beginner**
1. Write a prepared statement that selects a user by ID using a `?` placeholder.
2. Execute the same prepared statement with different `@category` values to filter products.
3. Deallocate the prepared statement after use.

**Intermediate**
4. Write a PHP PDO script with prepared statements to insert 100 users with random names (loop with bound parameters).
5. Create a prepared statement that updates employee salary by department, using two parameters (`@dept_id`, `@increase_pct`).
6. Compare execution time of 10,000 single-row INSERTs using concatenation vs prepared statements in PHP.

**Advanced**
7. Write a PHP class `SafeQuery` that automatically binds all named parameters from an associative array and logs the query for debugging.
8. Demonstrate a SQL injection attempt on a vulnerable concatenated query vs a safe prepared statement — show how the injection fails with prepared statements.
