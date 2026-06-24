## 14. MySQL Update Data

## 📘 Introduction
`UPDATE` modifies existing rows in a table. The `SET` clause specifies which columns to change and their new values. A `WHERE` clause determines which rows to update — omitting it updates every row. MySQL supports updating multiple columns, using joins, subqueries, and `LIMIT` for controlled updates.

## 🧠 Key Concepts
- **UPDATE ... SET**: Changes column values in matching rows
- **UPDATE with WHERE**: Only updates rows that satisfy the condition
- **Updating Multiple Columns**: `SET col1 = val1, col2 = val2`
- **UPDATE with JOIN**: Updates rows in one table based on values in another table
- **UPDATE with Subquery**: Uses a subquery to determine the new value
- **LIMIT with UPDATE**: Controls how many rows are updated
- **Safe Update Mode**: MySQL's `sql_safe_updates` prevents UPDATE/DELETE without WHERE or LIMIT

## 💻 Syntax
```sql
-- Basic update
UPDATE table_name SET column = value WHERE condition;

-- Multiple columns
UPDATE table_name SET col1 = val1, col2 = val2 WHERE condition;

-- Update with JOIN
UPDATE t1
JOIN t2 ON t1.id = t2.ref_id
SET t1.col = t2.col
WHERE t2.status = 'active';

-- Update with subquery
UPDATE table_name
SET column = (SELECT MAX(col) FROM other_table)
WHERE condition;

-- Update with LIMIT
UPDATE table_name SET column = value WHERE condition LIMIT 10;
```

## ✅ Example 1 - Basic

**Problem**: Give a 10% salary increase to all employees in the Engineering department.

**SQL Query**:
```sql
UPDATE employees
SET salary = salary * 1.10,
    updated_at = NOW()
WHERE department = 'Engineering';
```

**Output**:
```
Query OK, 3 rows affected (0.01 sec)
Rows matched: 3  Changed: 3  Warnings: 0
```

**Explanation**: The `SET` clause multiplies each employee's salary by 1.10 (10% raise) and sets `updated_at` to the current timestamp. Only Engineering employees are affected. MySQL reports 3 rows matched and 3 rows actually changed.

## 🚀 Example 2 - Intermediate

**Problem**: Update product prices based on supplier price changes, using a JOIN.

**SQL Query**:
```sql
-- Setup: supplier_price_list table
CREATE TABLE supplier_prices (
    product_id INT PRIMARY KEY,
    new_price DECIMAL(10, 2)
);

INSERT INTO supplier_prices VALUES (1, 180.00), (2, 25.00), (3, 229.99);

-- Update products with new prices from supplier, plus 30% markup
UPDATE products p
JOIN supplier_prices sp ON p.id = sp.product_id
SET p.price = ROUND(sp.new_price * 1.30, 2),
    p.updated_at = NOW()
WHERE sp.new_price != p.price / 1.30;
-- Only update if the price actually needs to change
```

**Output**:
```
Query OK, 2 rows affected (0.01 sec)
Rows matched: 3  Changed: 2  Warnings: 0
```

**Explanation**: The `JOIN` connects products to their new supplier prices. The price is recalculated with a 30% markup. The `WHERE` clause ensures only products with actual price changes are updated (avoids unnecessary writes). 3 rows matched, but only 2 actually had different values.

## 🏢 Real World Use Case
An inventory management system updates stock quantities when orders are placed:
`UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?`
The `WHERE` clause also checks sufficient stock — if `stock < quantity`, no rows are affected and the application knows to reject the order.

## 🎯 Interview Questions
1. **Q**: What happens if you run `UPDATE` without a `WHERE` clause?  
   **A**: Every row in the table is updated. This is rarely intentional and can be catastrophic.
2. **Q**: What is `sql_safe_updates`?  
   **A**: A session setting that requires `WHERE` or `LIMIT` in UPDATE/DELETE statements — prevents accidental mass updates.
3. **Q**: Can you use a subquery in SET?  
   **A**: Yes — `SET col = (SELECT expr FROM ...)`. However, you cannot use the same table being updated in the subquery.
4. **Q**: How does `LIMIT` interact with `UPDATE`?  
   **A**: `UPDATE ... LIMIT N` only updates N rows that match the WHERE clause. Useful for batch processing.
5. **Q**: Can you update a table using values from another table?  
   **A**: Yes — use multi-table `UPDATE` with `JOIN` or a correlated subquery.

## ⚠ Common Errors / Mistakes
- Forgetting `WHERE` — accidentally updating all rows
- Using `WHERE` with wrong condition — updating unintended rows
- Updating a column used in the WHERE clause (e.g., `UPDATE t SET id = id + 1 WHERE id = 5`)
- Not testing with `SELECT` first to verify which rows match
- Updating without considering foreign key constraints

## 📝 Practice Exercises
**Beginner**
1. Update an employee's salary to 75000 where `id = 5`.
2. Change the status of all orders placed before '2025-01-01' to 'archived'.
3. Increase all product prices by 5% using `SET price = price * 1.05`.

**Intermediate**
4. Update `employees` to set `manager_id` to 1 for all employees in the department where the manager's department matches.
5. Write an UPDATE with a JOIN to set `customers.total_spent` to the sum of their orders (aggregate from `orders` table).
6. Use `UPDATE` with `LIMIT 5` to batch-assign the oldest unassigned support tickets to a specific agent.

**Advanced**
7. Write a query that uses a subquery to update product prices based on the average price of products in the same category (e.g., set each product's price to the category average).
8. Create a stored procedure that safely updates inventory: it decrements stock for an order, but rolls back if any product has insufficient stock (use `ROW_COUNT()` to verify affected rows).
