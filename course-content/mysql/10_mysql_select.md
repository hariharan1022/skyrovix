## 10. MySQL Select Data

## 📘 Introduction
`SELECT` is the most frequently used SQL statement — it retrieves data from tables. MySQL supports selecting specific columns, all columns with `*`, distinct values, aliases, expressions, calculations, and string concatenation. Mastering `SELECT` is essential for any data retrieval task.

## 🧠 Key Concepts
- **SELECT * FROM**: Returns all columns (avoid in production — fetches unnecessary data)
- **Specific Columns**: `SELECT col1, col2 FROM table` — only request what you need
- **DISTINCT**: Removes duplicate rows from results
- **Alias (AS)**: Renames a column or table in the result set
- **Expressions**: Perform calculations directly in SELECT (`price * qty AS total`)
- **CONCAT()**: Joins string columns together
- **LIMIT**: Restricts number of rows returned (covered in depth later)

## 💻 Syntax
```sql
-- All columns
SELECT * FROM table_name;

-- Specific columns
SELECT col1, col2 FROM table_name;

-- Distinct values
SELECT DISTINCT col1 FROM table_name;

-- Column alias
SELECT col1 AS 'Custom Name' FROM table_name;

-- Expressions
SELECT col1, col2, col1 * col2 AS product FROM table_name;

-- Concatenation
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM table_name;
```

## ✅ Example 1 - Basic

**Problem**: Retrieve employee names and their monthly salaries with an annual projection.

**SQL Query**:
```sql
SELECT
    name,
    salary AS 'Monthly Salary',
    salary * 12 AS 'Annual Salary',
    salary * 0.10 AS 'Tax (10%)'
FROM employees;
```

**Output**:
```
+------------+----------------+---------------+------------+
| name       | Monthly Salary | Annual Salary | Tax (10%)  |
+------------+----------------+---------------+------------+
| Alice      |        5000.00 |      60000.00 |     500.00 |
| Bob        |        6000.00 |      72000.00 |     600.00 |
| Carol      |        4500.00 |      54000.00 |     450.00 |
+------------+----------------+---------------+------------+
```

**Explanation**: The `SELECT` clause formats the output with calculated columns. `salary * 12` computes annual salary. `salary * 0.10` computes estimated tax. Aliases make column headers readable.

## 🚀 Example 2 - Intermediate

**Problem**: Get unique product categories and a formatted product catalog with concatenated descriptions.

**SQL Query**:
```sql
SELECT DISTINCT category
FROM products;

SELECT
    CONCAT(UPPER(LEFT(name, 1)), LOWER(SUBSTRING(name, 2))) AS 'Product',
    CONCAT('$', FORMAT(price, 2)) AS 'Price',
    CONCAT(stock, ' units available') AS 'Inventory'
FROM products
ORDER BY price DESC
LIMIT 5;
```

**Output**:
```
+-------------+
| category    |
+-------------+
| Electronics |
| Clothing    |
| Books       |
+-------------+

+----------+--------+-------------------+
| Product  | Price  | Inventory         |
+----------+--------+-------------------+
| Headphones| $199.99| 45 units available|
| Mouse    | $29.99 | 120 units available|
| T-Shirt  | $24.99 | 200 units available|
+----------+--------+-------------------+
```

**Explanation**: `DISTINCT category` returns unique categories. The second query uses `CONCAT`, `UPPER`, `LOWER`, `LEFT`, `SUBSTRING`, and `FORMAT` functions to produce nicely formatted output — simulating a product catalog view.

## 🏢 Real World Use Case
A reporting dashboard runs a SELECT query with aggregated expressions (`SUM(sales) AS total_revenue`, `COUNT(*) AS order_count`, `AVG(amount) AS avg_order_value`) grouped by month. The results feed a chart visible to management.

## 🎯 Interview Questions
1. **Q**: What is the difference between `SELECT *` and selecting specific columns?  
   **A**: `SELECT *` returns all columns, wasting bandwidth and potentially including sensitive data. Specific columns are explicit and efficient.
2. **Q**: What does `DISTINCT` do?  
   **A**: It eliminates duplicate rows from the result set, returning only unique combinations.
3. **Q**: What is an alias and when is it useful?  
   **A**: An alias (`AS`) renames a column or table for the query output. Useful for calculated columns, joining, and improving readability.
4. **Q**: What does `CONCAT()` return if any argument is NULL?  
   **A**: `CONCAT()` returns NULL if any argument is NULL. Use `CONCAT_WS()` or `COALESCE()` to handle NULLs.
5. **Q**: Can you use aliases in the WHERE clause?  
   **A**: No — column aliases cannot be used in WHERE (they are defined after WHERE is evaluated). Use HAVING or a subquery instead.

## ⚠ Common Errors / Mistakes
- Using `SELECT *` in production queries
- Forgetting that `DISTINCT` applies to all selected columns, not just one
- Using alias in WHERE clause (not allowed — use the original column name)
- NULL values in CONCAT causing NULL results
- Not specifying column order (depends on table definition)

## 📝 Practice Exercises
**Beginner**
1. Select all columns from `employees`.
2. Select only `name` and `salary` from `employees`, renaming `salary` as `Income`.
3. Use `SELECT DISTINCT category` on the `products` table.

**Intermediate**
4. Write a query that selects `name`, `salary`, and a calculated column `annual_salary` (salary * 12) from `employees`, sorted by annual salary descending.
5. Select `CONCAT(first_name, ' ', last_name)` as `full_name` and `CONCAT(city, ', ', state)` as `location` from a `users` table.
6. Use expressions to show product name, price, tax (price * 0.08), and total (price * 1.08) from `products`.

**Advanced**
7. Write a SELECT query that uses a subquery in the column list to show each employee's name, their salary, and the average salary of their department — all in one result set.
8. Create a query that pivots order data: `SELECT YEAR(order_date) AS year, MONTH(order_date) AS month, COUNT(*) AS orders, SUM(total) AS revenue FROM orders GROUP BY year, month ORDER BY year, month;`
