## 1. MySQL HOME

## 📘 Introduction
MySQL is an open-source relational database management system (RDBMS) that uses Structured Query Language (SQL). Developed by Oracle Corporation, it is one of the most popular databases for web applications, powering platforms like Facebook, Twitter, YouTube, and WordPress. MySQL stores data in tables with rows and columns, enforcing relationships between data entities.

## 🧠 Key Concepts
- **Relational Database**: Data organized into tables with relationships defined via foreign keys
- **SQL**: Standard language for querying and managing relational databases
- **ACID Compliance**: Atomicity, Consistency, Isolation, Durability
- **Client-Server Model**: MySQL server manages data; clients connect to query
- **Storage Engines**: InnoDB (default), MyISAM, Memory, etc.
- **MySQL vs NoSQL**: MySQL uses fixed schemas and joins; NoSQL (MongoDB) uses flexible documents and scales horizontally
- **MySQL vs PostgreSQL**: MySQL is faster for read-heavy workloads; PostgreSQL supports advanced data types and better concurrency
- **MySQL vs SQLite**: MySQL is client-server with multi-user support; SQLite is embedded file-based, single-user

## 💻 Syntax
```sql
-- Basic connection
mysql -u username -p

-- Check MySQL version
SELECT VERSION();

-- Show available databases
SHOW DATABASES;

-- Show current user
SELECT USER();
```

## ✅ Example 1 - Basic

**Problem**: Connect to MySQL server and verify the installation.

**SQL Query**:
```sql
SELECT VERSION() AS 'MySQL Version', NOW() AS 'Current Time', USER() AS 'Connected User';
```

**Output**:
```
+---------------+---------------------+----------------+
| MySQL Version | Current Time        | Connected User  |
+---------------+---------------------+----------------+
| 8.0.35        | 2026-06-23 21:00:00 | root@localhost  |
+---------------+---------------------+----------------+
```

**Explanation**: This query checks the MySQL server version, current timestamp, and the authenticated user — confirming a successful live connection.

## 🚀 Example 2 - Intermediate

**Problem**: Compare MySQL's storage engines and list available ones on your server.

**SQL Query**:
```sql
SHOW ENGINES;
```

**Output** (truncated):
```
+--------------------+---------+------------------------------------------------------------+
| Engine             | Support | Comment                                                    |
+--------------------+---------+------------------------------------------------------------+
| InnoDB             | DEFAULT | Supports transactions, row-level locking, and foreign keys |
| MyISAM             | YES     | Non-transactional, table-level locking                     |
| MEMORY             | YES     | Hash-based, stored in memory                               |
| CSV                | YES     | Stores data in CSV files                                   |
+--------------------+---------+------------------------------------------------------------+
```

**Explanation**: `SHOW ENGINES` lists every available storage engine and whether it's supported. InnoDB is the default with full ACID compliance, foreign key support, and crash recovery.

## 🏢 Real World Use Case
An e-commerce platform (e.g., WooCommerce on WordPress) uses MySQL to manage product catalogs, customer accounts, orders, and inventory. High-traffic sites use replication (primary-replica) to scale reads and optimize query performance with proper indexing.

## 🎯 Interview Questions
1. **Q**: What is MySQL and how does it differ from SQL?  
   **A**: MySQL is an RDBMS — the database software. SQL is the query language used to interact with it.
2. **Q**: Explain the difference between MyISAM and InnoDB.  
   **A**: InnoDB supports transactions, foreign keys, and row-level locking; MyISAM does not. InnoDB is crash-safe; MyISAM is not.
3. **Q**: What are ACID properties?  
   **A**: Atomicity (all-or-nothing), Consistency (valid state), Isolation (concurrent transactions don't interfere), Durability (committed data survives failures).
4. **Q**: When would you choose MySQL over MongoDB?  
   **A**: When the data is highly structured with clear relationships, requires joins, or needs ACID transactions.
5. **Q**: What is a storage engine in MySQL?  
   **A**: A component that handles SQL operations for tables. Different engines provide different capabilities (transactions, full-text search, memory tables).

## ⚠ Common Errors / Mistakes
- Forgetting to start the MySQL service before connecting
- Using MyISAM when transactions or foreign keys are needed
- Not setting proper character sets (sticking with latin1 instead of utf8mb4)
- Confusing MySQL with SQL — MySQL is the server, SQL is the language

## 📝 Practice Exercises
**Beginner**
1. Connect to your MySQL server and run `SELECT 'Hello, MySQL!' AS greeting;`
2. Execute `SHOW STATUS LIKE 'Uptime';` to see how long the server has been running.
3. List all databases currently available on the server using `SHOW DATABASES;`.

**Intermediate**
4. Use `SHOW VARIABLES LIKE 'version%';` to retrieve all version-related configuration variables.
5. Run `SELECT engine, support, comment FROM information_schema.ENGINES WHERE support = 'DEFAULT';` to identify the default storage engine.
6. Query `information_schema.TABLES` to count how many tables exist across all databases.

**Advanced**
7. Write a query using `information_schema` to find all tables that use the MyISAM engine and their sizes.
8. Compare the performance impact of using InnoDB vs MyISAM by creating two identical tables with different engines, inserting 100k rows each, and measuring `SELECT COUNT(*)` time.
