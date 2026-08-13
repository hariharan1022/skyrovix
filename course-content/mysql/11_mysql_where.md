## 11. MySQL Where

## 📘 Introduction
The `WHERE` clause filters rows before they are returned by a query. It supports comparison operators, logical operators, pattern matching with `LIKE`, range checks with `BETWEEN`, set membership with `IN`, and NULL checking with `IS NULL`. Filtering at the database level (rather than in application code) is vastly more efficient.

## 🧠 Key Concepts
- **Comparison Operators**: `=`, `!=` (or `<>`), `>`, `<`, `>=`, `<=`
- **Logical Operators**: `AND`, `OR`, `NOT` — combine multiple conditions
- **IN**: Checks if a value matches any in a list
- **BETWEEN**: Checks if a value falls within a range (inclusive)
- **LIKE**: Pattern matching with `%` (any sequence) and `_` (single character)
- **IS NULL / IS NOT NULL**: Checks for NULL values (cannot use `= NULL`)
- **Date Comparisons**: MySQL allows `DATE`, `DATETIME` column comparisons with string literals in `'YYYY-MM-DD'` format

## 💻 Syntax
```sql
-- Basic comparison
SELECT * FROM table WHERE column = value;
SELECT * FROM table WHERE column != value;

-- Logical operators
SELECT * FROM table WHERE col1 = 'A' AND col2 > 10;
SELECT * FROM table WHERE col1 = 'A' OR col2 > 10;
SELECT * FROM table WHERE NOT col1 = 'A';

-- IN, BETWEEN, LIKE
SELECT * FROM table WHERE col IN (1, 2, 3);
SELECT * FROM table WHERE col BETWEEN 10 AND 20;
SELECT * FROM table WHERE col LIKE '%pattern%';

-- NULL checks
SELECT * FROM table WHERE col IS NULL;
SELECT * FROM table WHERE col IS NOT NULL;

-- Date comparison
SELECT * FROM table WHERE date_col >= '2026-01-01';
```

## ✅ Example 1 - Basic

**Problem**: Find all active customers in New York who spent more than $100.

**SQL Query**:
```sql
SELECT name, city, total_spent
FROM customers
WHERE city = 'New York'
  AND status = 'active'
  AND total_spent > 100
ORDER BY total_spent DESC;
```

**Output**:
```
+----------+----------+-------------+
| name     | city     | total_spent |
+----------+----------+-------------+
| John Doe | New York |      550.00 |
| Jane Roe | New York |      320.00 |
+----------+----------+-------------+
```

**Explanation**: Three conditions combined with `AND` — all must be true for a row to be included. `city = 'New York'`, `status = 'active'`, and `total_spent > 100`. Results are sorted from highest spender.

## 🚀 Example 2 - Intermediate

**Problem**: Search for products with mixed criteria — matching a pattern, within a price range, and in specific categories.

**SQL Query**:
```sql
SELECT name, category, price, stock
FROM products
WHERE (name LIKE '%phone%' OR name LIKE '%tablet%')
  AND price BETWEEN 100 AND 1500
  AND category IN ('Electronics', 'Accessories')
  AND stock IS NOT NULL
ORDER BY price;
```

**Output**:
```
+-------------+-------------+-------+-------+
| name        | category    | price | stock |
+-------------+-------------+-------+-------+
| Smartphone  | Electronics | 799.99|    50 |
| Tablet Pro  | Electronics | 999.99|    25 |
| Phone Case  | Accessories | 149.99|   200 |
+-------------+-------------+-------+-------+
```

**Explanation**: This query demonstrates combining multiple filter techniques. `LIKE` matches partial names, `BETWEEN` checks price range, `IN` filters categories, and `IS NOT NULL` ensures stock data exists. Parentheses group the OR conditions properly.

## 🏢 Real World Use Case
An HR system filters employees for payroll: `WHERE status = 'active' AND hire_date <= '2026-05-01' AND department_id IN (SELECT id FROM departments WHERE location = 'Chicago') AND salary IS NOT NULL`. This ensures only eligible employees are processed.

## 🎯 Interview Questions
1. **Q**: Why can't you use `column = NULL`?  
   **A**: NULL represents unknown/missing data. `= NULL` always evaluates to unknown (falsy). Use `IS NULL` or `IS NOT NULL`.
2. **Q**: What is the difference between `WHERE` and `HAVING`?  
   **A**: `WHERE` filters rows before aggregation; `HAVING` filters groups after aggregation.
3. **Q**: What do `%` and `_` mean in `LIKE` patterns?  
   **A**: `%` matches zero or more characters; `_` matches exactly one character.
4. **Q**: Is `BETWEEN` inclusive?  
   **A**: Yes — `BETWEEN 10 AND 20` includes 10 and 20.
5. **Q**: What is operator precedence between `AND` and `OR`?  
   **A**: `AND` has higher precedence than `OR`. Use parentheses to control evaluation order.

## ⚠ Common Errors / Mistakes
- Using `= NULL` or `!= NULL` instead of `IS NULL` / `IS NOT NULL`
- Forgetting parentheses when mixing `AND` and `OR` — produces wrong logic
- Using `LIKE` without wildcards (use `=` instead for exact match)
- Comparing strings case-sensitively when collation is `_ci` (case-insensitive)
- Using `BETWEEN` for dates with time components — `BETWEEN '2026-01-01' AND '2026-01-31'` excludes `2026-01-31 12:00:00`

## 📝 Practice Exercises
**Beginner**
1. Select all employees with salary greater than 50000.
2. Select products where category is 'Electronics' AND price is less than 100.
3. Select customers where city is 'London' OR city is 'Paris'.

**Intermediate**
4. Find all orders where `order_date` is between '2026-01-01' and '2026-03-31' AND `status` is 'pending'.
5. Search for users whose email ends with '@gmail.com' AND whose name contains 'john' (case-insensitive).
6. Select employees where `department_id` IS NULL OR `manager_id` IS NOT NULL.

**Advanced**
7. Write a query using WHERE with a subquery: find all products that have been ordered more than 10 times (use `WHERE id IN (SELECT product_id FROM order_items GROUP BY product_id HAVING SUM(qty) > 10)`).
8. Create a query that uses a CASE expression inside WHERE: find all orders where the total is either 'high' (>1000), 'medium' (500-1000), or 'low' (<500).
