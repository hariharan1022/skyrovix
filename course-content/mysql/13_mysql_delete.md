## 13. MySQL Delete Data

## 📘 Introduction
`DELETE` removes rows from a table. It can target specific rows with `WHERE`, remove all rows, or delete across related tables with joins. `TRUNCATE` is a faster alternative for removing all rows. Foreign key constraints influence what can be deleted and how cascading deletes behave.

## 🧠 Key Concepts
- **DELETE FROM**: Removes rows matching the WHERE clause
- **DELETE without WHERE**: Removes ALL rows (use with extreme caution)
- **TRUNCATE**: Drops and recreates the table — faster than DELETE for all rows, but cannot be filtered
- **DELETE with JOIN**: Removes rows from one table based on conditions in another table
- **Foreign Key Constraints**: Prevent deletion of parent rows if child rows exist (by default)
- **ON DELETE CASCADE**: Automatically deletes child rows when parent is deleted
- **Safe Delete Practices**: Always use WHERE, test with SELECT first, use transactions

## 💻 Syntax
```sql
-- Delete specific rows
DELETE FROM table_name WHERE condition;

-- Delete all rows
DELETE FROM table_name;  -- slow, logged per row
TRUNCATE TABLE table_name;  -- fast, DDL operation

-- Delete with JOIN
DELETE t1 FROM table1 t1
JOIN table2 t2 ON t1.id = t2.ref_id
WHERE t2.status = 'archived';

-- Delete with subquery
DELETE FROM table1 WHERE id IN (SELECT id FROM table2 WHERE status = 'inactive');

-- Limit deletes (for batch processing)
DELETE FROM table_name WHERE condition LIMIT 100;
```

## ✅ Example 1 - Basic

**Problem**: Delete all inactive customers who have not placed any orders.

**SQL Query**:
```sql
-- First: check which rows will be deleted
SELECT id, name, email FROM customers
WHERE status = 'inactive'
  AND id NOT IN (SELECT DISTINCT customer_id FROM orders);

-- Then: delete them
DELETE FROM customers
WHERE status = 'inactive'
  AND id NOT IN (SELECT DISTINCT customer_id FROM orders);
```

**Output**:
```
Query OK, 3 rows affected (0.01 sec)
```

**Explanation**: Always verify with `SELECT` before `DELETE`. The subquery finds customers with no orders. The WHERE clause filters only inactive ones. 3 rows were removed. Using `LIMIT` or batching in a transaction prevents long-running locks.

## 🚀 Example 2 - Intermediate

**Problem**: Delete all orders and associated order items for orders older than 3 years, demonstrating `ON DELETE CASCADE` and join-based deletion.

**SQL Query**:
```sql
-- Setup with CASCADE (order_items has FK with ON DELETE CASCADE)
DELETE FROM orders
WHERE order_date < DATE_SUB(CURDATE(), INTERVAL 3 YEAR);

-- Alternative approach using JOIN (when no CASCADE)
DELETE oi, o
FROM order_items oi
JOIN orders o ON oi.order_id = o.id
WHERE o.order_date < DATE_SUB(CURDATE(), INTERVAL 3 YEAR);
```

**Output**:
```
Query OK, 150 rows affected (0.05 sec)
(Includes 50 orders + 100 order_items deleted via CASCADE)
```

**Explanation**: The first query relies on `ON DELETE CASCADE` on the `order_items` foreign key — deleting parent orders automatically removes child items. The alternative query uses a multi-table `DELETE` to remove from both tables in one statement.

## 🏢 Real World Use Case
A GDPR compliance script runs monthly to delete user data for accounts that requested deletion. It uses a transaction: `START TRANSACTION; DELETE FROM user_sessions WHERE user_id = ?; DELETE FROM user_profiles WHERE user_id = ?; DELETE FROM users WHERE id = ?; COMMIT;`. Each step is logged for audit.

## 🎯 Interview Questions
1. **Q**: What is the difference between `DELETE` and `TRUNCATE`?  
   **A**: `DELETE` is DML (logged per row, can have WHERE, resets auto-increment only for InnoDB). `TRUNCATE` is DDL (drops table, resets auto-increment, cannot use WHERE, faster).
2. **Q**: What happens if you try to delete a parent row with child rows?  
   **A**: By default, MySQL rejects the deletion with a foreign key constraint error. Use `ON DELETE CASCADE` or delete children first.
3. **Q**: Can you use `LIMIT` with `DELETE`?  
   **A**: Yes — `DELETE FROM table WHERE condition LIMIT 100;` deletes only 100 matching rows.
4. **Q**: How do you delete rows from multiple tables at once?  
   **A**: Using `DELETE t1, t2 FROM t1 JOIN t2 ON ... WHERE condition;`
5. **Q**: Does `TRUNCATE` fire triggers?  
   **A**: No — `TRUNCATE` is a DDL operation and does not fire `DELETE` triggers.

## ⚠ Common Errors / Mistakes
- Running `DELETE FROM table` without a WHERE clause (accidentally wiping the table)
- Forgetting foreign key constraints — getting "Cannot delete or update a parent row" errors
- Not testing with `SELECT` before `DELETE`
- Deleting in production without a backup or transaction wrapper
- Assuming `TRUNCATE` resets auto-increment on all storage engines (it does for InnoDB, not for MyISAM)

## 📝 Practice Exercises
**Beginner**
1. Delete a specific employee by `id` from the `employees` table.
2. Delete all products where `stock` is 0.
3. Use `TRUNCATE` to remove all rows from a temporary `temp_log` table.

**Intermediate**
4. Write a safe delete pattern: first `SELECT` the rows to delete, then `DELETE` with the same `WHERE`, using `LIMIT 100`.
5. Delete all customers from `customers` who have not logged in since '2025-01-01' (use a `last_login` column).
6. Use a multi-table DELETE to remove all unshipped orders and their items for a specific customer.

**Advanced**
7. Simulate a cascade delete scenario: create `authors` and `books` with a foreign key and `ON DELETE CASCADE`. Delete an author and verify that all their books are deleted automatically.
8. Write a stored procedure that archives (copies to `orders_archive`) and then deletes orders older than N months, using a transaction to ensure atomicity.
