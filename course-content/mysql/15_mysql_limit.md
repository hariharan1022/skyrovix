## 15. MySQL Limit Data

## 📘 Introduction
`LIMIT` restricts the number of rows returned by a query. When combined with `OFFSET`, it enables pagination — fetching a specific "page" of results. `LIMIT` is also useful with `ORDER BY` for top-N queries and can be applied to `UPDATE` and `DELETE` for batch processing. Proper indexing is essential for good LIMIT/OFFSET performance on large datasets.

## 🧠 Key Concepts
- **LIMIT**: `LIMIT count` — returns at most `count` rows
- **LIMIT with OFFSET**: `LIMIT offset, count` or `LIMIT count OFFSET offset` — skips `offset` rows, then returns `count` rows
- **Pagination**: `LIMIT 10 OFFSET 0` = page 1, `LIMIT 10 OFFSET 10` = page 2, etc.
- **ORDER BY with LIMIT**: Required for consistent pagination — without ORDER BY, which rows are returned is undefined
- **LIMIT with DELETE/UPDATE**: Restricts the number of rows affected
- **Performance Optimization**: Large OFFSET values are slow — use keyset pagination (WHERE id > last_seen) for better performance

## 💻 Syntax
```sql
-- Simple limit
SELECT * FROM table LIMIT 10;

-- Limit with offset (syntax 1)
SELECT * FROM table LIMIT 10 OFFSET 20;

-- Limit with offset (syntax 2 — shorter)
SELECT * FROM table LIMIT 20, 10;  -- OFFSET=20, ROWS=10

-- Pagination pattern
SELECT * FROM table
ORDER BY id
LIMIT 10 OFFSET 0;  -- Page 1

SELECT * FROM table
ORDER BY id
LIMIT 10 OFFSET 10; -- Page 2

-- Limit with DELETE/UPDATE
DELETE FROM table WHERE condition LIMIT 100;
UPDATE table SET col = val WHERE condition LIMIT 50;
```

## ✅ Example 1 - Basic

**Problem**: Fetch the 5 most expensive products for a "Top Products" widget.

**SQL Query**:
```sql
SELECT name, price, category
FROM products
ORDER BY price DESC
LIMIT 5;
```

**Output**:
```
+-----------------+--------+-------------+
| name            | price  | category    |
+-----------------+--------+-------------+
| MacBook Pro     | 2499.99| Electronics |
| iPad Pro        | 1099.99| Electronics |
| Smart Watch     |  399.99| Electronics |
| Designer Bag    |  299.99| Accessories |
| Wireless Earbuds|  199.99| Electronics |
+-----------------+--------+-------------+
```

**Explanation**: `ORDER BY price DESC` sorts products from most to least expensive. `LIMIT 5` returns only the first 5 rows. This is the pattern for "top N" queries — always combine `LIMIT` with `ORDER BY` for deterministic results.

## 🚀 Example 2 - Intermediate

**Problem**: Implement pagination for a product listing with 25 products per page, and compare traditional LIMIT/OFFSET with keyset pagination.

**SQL Query**:
```sql
-- Traditional pagination (page 3: rows 51-75)
SELECT id, name, price
FROM products
ORDER BY id
LIMIT 25 OFFSET 50;

-- Keyset pagination (faster for large offsets)
-- On page load, remember the last id from previous page
SELECT id, name, price
FROM products
WHERE id > 50   -- last_seen_id from previous page
ORDER BY id
LIMIT 25;
```

**Output**:
```
-- Traditional (OFFSET 50, LIMIT 25):
+-----+-----------------+--------+
| id  | name            | price  |
+-----+-----------------+--------+
|  51 | Product 51      |  45.00 |
|  52 | Product 52      |  12.00 |
| ... | ...             | ...    |
|  75 | Product 75      |  99.00 |
+-----+-----------------+--------+

-- Keyset (WHERE id > 50, LIMIT 25): same results, but faster
```

**Explanation**: Traditional `LIMIT/OFFSET` must scan and skip 50 rows before returning results — slower on large offsets. Keyset pagination uses `WHERE id > last_seen` to jump directly to the correct position, using the index. This scales to millions of rows without performance degradation.

## 🏢 Real World Use Case
A social media feed loads 20 posts per page using `SELECT * FROM posts WHERE user_id IN (friends_list) ORDER BY created_at DESC LIMIT 20 OFFSET ?`. After page 10, the app switches to keyset pagination (`WHERE created_at < last_post_time`) to maintain performance as the user scrolls.

## 🎯 Interview Questions
1. **Q**: What is the purpose of `LIMIT` in MySQL?  
   **A**: It restricts the number of rows returned or affected by a query.
2. **Q**: What is the difference between `LIMIT 10 OFFSET 20` and `LIMIT 10, 20`?  
   **A**: `LIMIT 10 OFFSET 20` means 10 rows starting after 20 rows. `LIMIT 10, 20` means 20 rows after skipping 10 — the first number is OFFSET, the second is row count (confusing; use OFFSET syntax for clarity).
3. **Q**: Why is `LIMIT` without `ORDER BY` problematic?  
   **A**: Without `ORDER BY`, MySQL may return rows in any order. The same query could return different rows on different executions.
4. **Q**: How does `LIMIT` affect query performance?  
   **A**: MySQL stops scanning once it has found enough rows. With proper indexing, LIMIT can dramatically reduce I/O.
5. **Q**: What is keyset pagination and why is it faster?  
   **A**: Keyset pagination uses `WHERE id > ?` instead of `OFFSET`. It leverages the index to skip directly to the starting point, avoiding scanning skipped rows.

## ⚠ Common Errors / Mistakes
- Using `LIMIT` without `ORDER BY` — inconsistent results
- Confusing `LIMIT a, b` parameter order (offset vs count)
- Using large OFFSET values on big tables — performance degrades because MySQL still scans all skipped rows
- Assuming `LIMIT 1` guarantees a specific row without ORDER BY
- Using `LIMIT` in subqueries when not needed or supported
- Not indexing columns used in ORDER BY + LIMIT patterns

## 📝 Practice Exercises
**Beginner**
1. Select the first 10 employees from the `employees` table.
2. Select employees 11 through 20 using `LIMIT 10 OFFSET 10`.
3. Select the top 3 highest salaries using `ORDER BY salary DESC LIMIT 3`.

**Intermediate**
4. Implement pagination for products: write queries for page 1 (LIMIT 10 OFFSET 0), page 2, and page 3.
5. Use `ORDER BY created_at DESC LIMIT 5` to find the 5 most recent orders.
6. Write a `DELETE` statement that removes only the 50 oldest log entries (use `ORDER BY created_at ASC LIMIT 50` in a subquery).

**Advanced**
7. Compare performance of `LIMIT 10 OFFSET 100000` vs keyset pagination (`WHERE id > 100000 LIMIT 10`) on a table with 1 million rows. Use `EXPLAIN ANALYZE` to document the difference.
8. Write a query that uses a window function (`ROW_NUMBER()`) to paginate with exact row numbering, and compare it to traditional LIMIT/OFFSET pagination.
