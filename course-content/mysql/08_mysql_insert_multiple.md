## 8. MySQL Insert Multiple

## 📘 Introduction
Inserting multiple rows efficiently is critical for performance. MySQL offers several approaches: multi-row `VALUES` lists, prepared statements with batch execution, and `LOAD DATA INFILE` for bulk imports. Understanding when to use each method — and how transactions affect them — is key for high-throughput applications.

## 🧠 Key Concepts
- **Multi-row INSERT**: `INSERT INTO t (col) VALUES (1), (2), (3)` — single statement, many rows
- **Prepared Statements**: Re-use a query template with different parameters; reduces parsing overhead
- **LOAD DATA INFILE**: Fastest method for bulk importing from a file
- **Performance**: Multi-row INSERT ~10x faster than single-row INSERTs; LOAD DATA INFILE ~100x faster
- **Transaction Handling**: Wrap batch inserts in transactions for atomicity and performance (commit every N rows)

## 💻 Syntax
```sql
-- Multi-row VALUES
INSERT INTO products (name, price) VALUES
    ('Widget', 9.99),
    ('Gadget', 24.99),
    ('Doohickey', 14.99);

-- Wrapped in transaction
START TRANSACTION;
INSERT INTO products (name, price) VALUES ('A', 1.00), ('B', 2.00);
INSERT INTO products (name, price) VALUES ('C', 3.00), ('D', 4.00);
COMMIT;

-- LOAD DATA INFILE
LOAD DATA INFILE '/path/to/data.csv'
INTO TABLE products
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(name, price);
```

## ✅ Example 1 - Basic

**Problem**: Insert 100 products using a single multi-row INSERT statement.

**SQL Query**:
```sql
INSERT INTO products (name, price, category) VALUES
    ('Product 1', 10.00, 'A'),
    ('Product 2', 15.50, 'A'),
    ('Product 3', 22.00, 'B'),
    ('Product 4', 8.75, 'A'),
    ('Product 5', 99.99, 'C');
```

**Output** (after `SELECT COUNT(*) FROM products`):
```
+----------+
| COUNT(*) |
+----------+
|        5 |
+----------+
```

**Explanation**: A single `INSERT` with 5 value tuples inserts all rows in one round-trip. The statement is atomic — either all 5 rows are inserted or none. This is much faster than 5 separate `INSERT` statements.

## 🚀 Example 2 - Intermediate

**Problem**: Use a transaction with batched inserts and compare performance with LOAD DATA INFILE.

**SQL Query** (batched transaction insert):
```sql
-- Batch insert 1000 rows in a transaction
START TRANSACTION;
SET @i = 1;
WHILE @i <= 1000 DO
    INSERT INTO logs (message, created_at)
    VALUES (CONCAT('Log entry ', @i), NOW());
    SET @i = @i + 1;
END WHILE;
COMMIT;
```

**SQL Query** (LOAD DATA INFILE approach):
```sql
LOAD DATA INFILE '/tmp/logs_1000.csv'
INTO TABLE logs
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
(message, @var_created)
SET created_at = NOW();
```

**Output** (time comparison):
```
+------------------------+----------+
| Method                 | Time (s) |
+------------------------+----------+
| Single-row INSERTs     |  12.340  |
| Batch transaction      |   0.850  |
| LOAD DATA INFILE       |   0.045  |
+------------------------+----------+
```

**Explanation**: Multi-row/transactional inserts dramatically reduce overhead by batching commits. `LOAD DATA INFILE` is the fastest because it bypasses SQL parsing and writes directly to table storage.

## 🏢 Real World Use Case
A data warehouse loads millions of sales transactions nightly. A Python script aggregates data into CSV files, then uses `LOAD DATA INFILE` to import into staging tables. The import is wrapped in a transaction, committed every 100k rows to avoid excessive undo log size.

## 🎯 Interview Questions
1. **Q**: What is the maximum number of rows in a single INSERT statement?  
   **A**: Limited by `max_allowed_packet` (default 64MB) — typically thousands to tens of thousands.
2. **Q**: Why is multi-row INSERT faster than many single-row INSERTs?  
   **A**: Fewer round-trips, reduced SQL parsing overhead, and one transaction log flush instead of many.
3. **Q**: What is `LOAD DATA INFILE` and when should you use it?  
   **A**: A MySQL command to read data from a text file directly into a table. Use for bulk imports of thousands+ rows.
4. **Q**: Should you wrap batch inserts in a transaction?  
   **A**: Yes — for atomicity and performance. Without explicit transaction, each INSERT auto-commits, which is slow.
5. **Q**: What is `max_allowed_packet` and how does it affect batch inserts?  
   **A**: It limits the size of a single SQL packet. Very large batch INSERTs may exceed this limit and fail.

## ⚠ Common Errors / Mistakes
- Exceeding `max_allowed_packet` with enormous INSERT statements
- Not wrapping batch inserts in transactions (each row auto-commits)
- Using `LOAD DATA INFILE` without proper file permissions or `LOCAL` option
- Forgetting `IGNORE 1 ROWS` when CSV has a header row
- Mixing column order between the INSERT clause and VALUES tuples

## 📝 Practice Exercises
**Beginner**
1. Insert 3 products into `products` using a single multi-row INSERT.
2. Insert 10 employees into `employees` in one INSERT statement.
3. Use `START TRANSACTION` and `COMMIT` around a batch insert of 5 departments.

**Intermediate**
4. Create a table `sensor_readings(id INT AUTO_INCREMENT, sensor_id INT, value DECIMAL(10,2), recorded_at TIMESTAMP)`. Insert 1000 random readings in batches of 100 using a transaction.
5. Write a PHP PDO script that inserts 5000 rows using prepared statements in batches of 500 with a commit per batch.
6. Create a CSV file with 100 rows and import it using `LOAD DATA INFILE` into a table.

**Advanced**
7. Compare performance of inserting 100k rows using: (a) single-row INSERTs, (b) multi-row INSERTs of 1000 each, (c) LOAD DATA INFILE. Record and analyze the timing.
8. Write a stored procedure that accepts a JSON array of products and inserts them using a loop with multi-row INSERTs, handling duplicates with `INSERT IGNORE`.
