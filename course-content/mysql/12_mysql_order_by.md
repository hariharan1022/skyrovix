## 12. MySQL Order By

## 📘 Introduction
`ORDER BY` sorts query results. By default, sorting is ascending (`ASC`). You can sort by one or more columns, use expressions, control NULL placement, and combine with `LIMIT` for top-N queries. Sorting can be done on column aliases but with certain restrictions.

## 🧠 Key Concepts
- **ASC / DESC**: Ascending (default A-Z, 0-9) or descending (Z-A, 9-0)
- **Multiple Columns**: `ORDER BY col1 ASC, col2 DESC` — sorts by col1, then by col2 within ties
- **Expressions**: Sort by computed values (`ORDER BY salary * 12 DESC`)
- **NULL Handling**: By default NULLs sort before non-NULLs in ASC, after in DESC
- **NULLS FIRST / LAST**: MySQL-specific syntax to control NULL placement (`ORDER BY col ASC NULLS LAST`)
- **ORDER BY with LIMIT**: Returns top or bottom N rows
- **Sorting by Alias**: Allowed in MySQL (`ORDER BY annual_salary DESC`)

## 💻 Syntax
```sql
-- Single column ascending
SELECT * FROM table ORDER BY column;

-- Single column descending
SELECT * FROM table ORDER BY column DESC;

-- Multiple columns
SELECT * FROM table ORDER BY col1 ASC, col2 DESC;

-- With expression
SELECT name, salary FROM employees ORDER BY salary * 12 DESC;

-- With alias
SELECT name, salary * 12 AS annual FROM employees ORDER BY annual DESC;

-- NULL placement
SELECT * FROM table ORDER BY column ASC NULLS LAST;

-- With LIMIT
SELECT * FROM table ORDER BY column DESC LIMIT 10;
```

## ✅ Example 1 - Basic

**Problem**: List employees sorted by department (ascending) and salary (descending within the same department).

**SQL Query**:
```sql
SELECT name, department, salary
FROM employees
ORDER BY department ASC, salary DESC;
```

**Output**:
```
+---------+------------+--------+
| name    | department | salary |
+---------+------------+--------+
| Alice   | Engineering|  95000 |
| Bob     | Engineering|  85000 |
| Charlie | Engineering|  75000 |
| Diana   | Marketing  |  70000 |
| Eve     | Marketing  |  65000 |
+---------+------------+--------+
```

**Explanation**: Rows are first sorted by `department` alphabetically (A-Z). Within each department, employees are sorted by `salary` from highest to lowest. This is the standard grouped-ranking output.

## 🚀 Example 2 - Intermediate

**Problem**: Find the top 5 highest-paid employees, and show how NULL salaries sort.

**SQL Query**:
```sql
-- Create data with NULL salaries
INSERT INTO employees (name, salary) VALUES
    ('Unpaid Intern', NULL),
    ('CEO', 200000),
    ('CTO', 180000),
    ('CFO', 175000),
    ('VP Eng', 160000),
    ('VP Mktg', 150000);

-- Default NULL sorting (NULLs appear first in ASC)
SELECT name, COALESCE(salary, 0) AS salary
FROM employees
ORDER BY salary DESC
LIMIT 5;

-- With explicit NULL handling
SELECT name, salary
FROM employees
ORDER BY salary DESC NULLS LAST
LIMIT 5;
```

**Output**:
```
+---------+--------+
| name    | salary |
+---------+--------+
| CEO     | 200000 |
| CTO     | 180000 |
| CFO     | 175000 |
| VP Eng  | 160000 |
| VP Mktg | 150000 |
+---------+--------+

-- Without NULLS LAST the unpaid intern might appear first
```

**Explanation**: `ORDER BY salary DESC LIMIT 5` returns the top 5 salaries. `COALESCE(salary, 0)` replaces NULLs with 0 for display. `NULLS LAST` ensures NULL salaries don't interfere with top-N queries.

## 🏢 Real World Use Case
An e-commerce product listing page sorts by relevance (default), price (low to high), or customer rating. Each sort option maps to an `ORDER BY` clause: `ORDER BY price ASC`, `ORDER BY rating DESC, review_count DESC`. Pagination with `LIMIT` and `OFFSET` ensures fast page loads.

## 🎯 Interview Questions
1. **Q**: What is the default sort order in MySQL?  
   **A**: Ascending (`ASC`).
2. **Q**: Can you sort by a column that is not in the SELECT list?  
   **A**: Yes — `ORDER BY` can reference any column in the table, even if not selected.
3. **Q**: How are NULLs ordered by default?  
   **A**: In ascending order, NULLs appear first (treated as smallest). In descending order, NULLs appear last.
4. **Q**: What is the difference between `ORDER BY` and `GROUP BY`?  
   **A**: `ORDER BY` sorts rows; `GROUP BY` groups rows for aggregation.
5. **Q**: Can you use an alias in `ORDER BY`?  
   **A**: Yes — MySQL evaluates SELECT before ORDER BY, so aliases defined in SELECT are available.

## ⚠ Common Errors / Mistakes
- Forgetting `DESC` when descending sort is intended
- Sorting by VARCHAR columns expecting numeric order (`'10' < '2'` because it's string comparison)
- Using `ORDER BY` without `LIMIT` on large tables (sorts all rows in memory/disk)
- Assuming sort order of rows without `ORDER BY` (no guaranteed order)
- Using `ORDER BY RAND()` for large tables (extremely slow)

## 📝 Practice Exercises
**Beginner**
1. Select all products ordered by price ascending.
2. Select employees ordered by hire_date descending.
3. Select customers ordered by last_name ascending, then first_name ascending.

**Intermediate**
4. Select the top 3 most expensive products using `ORDER BY price DESC LIMIT 3`.
5. Sort employees by salary descending, but place NULL salaries last using `NULLS LAST`.
6. Order products by a calculated column: `price * (1 - discount)` as `final_price` descending.

**Advanced**
7. Write a query that orders customers by their total order value (SUM of order totals) descending, showing only the top 10.
8. Use ORDER BY with a CASE expression to implement custom sort logic: sort products by a priority list ('Electronics' first, 'Clothing' second, everything else last).
