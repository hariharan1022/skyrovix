## 2. MySQL Database

## 📘 Introduction
In MySQL, a database is a container that holds tables, views, stored procedures, and other database objects. Managing databases — creating, dropping, selecting, and inspecting them — is a foundational skill. MySQL also provides `information_schema`, a virtual database containing metadata about all other databases.

## 🧠 Key Concepts
- **CREATE DATABASE**: Creates a new database
- **DROP DATABASE**: Permanently deletes a database and all its objects
- **USE**: Selects a database as the default for subsequent queries
- **SHOW DATABASES**: Lists all databases on the server
- **information_schema**: System catalog with metadata (tables, columns, privileges)
- **Character Set**: Defines which characters can be stored (e.g., utf8mb4)
- **Collation**: Rules for comparing/sorting characters (e.g., utf8mb4_unicode_ci)

## 💻 Syntax
```sql
-- Create database
CREATE DATABASE database_name;

-- Create with character set and collation
CREATE DATABASE database_name
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Drop database
DROP DATABASE database_name;

-- Select database
USE database_name;

-- Show databases
SHOW DATABASES;

-- Show current database
SELECT DATABASE();
```

## ✅ Example 1 - Basic

**Problem**: Create a database called `shop`, select it, and verify it is active.

**SQL Query**:
```sql
CREATE DATABASE shop;
USE shop;
SELECT DATABASE() AS 'Active Database';
```

**Output**:
```
+------------------+
| Active Database  |
+------------------+
| shop             |
+------------------+
```

**Explanation**: `CREATE DATABASE` creates the database shell. `USE` sets it as the active database. `SELECT DATABASE()` confirms the selection.

## 🚀 Example 2 - Intermediate

**Problem**: List all databases on the server and inspect the default character set of a specific database via `information_schema`.

**SQL Query**:
```sql
SHOW DATABASES;

SELECT SCHEMA_NAME, DEFAULT_CHARACTER_SET_NAME, DEFAULT_COLLATION_NAME
FROM information_schema.SCHEMATA
WHERE SCHEMA_NAME = 'shop';
```

**Output**:
```
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| shop               |
| sys                |
+--------------------+

+-------------+----------------------------+------------------------+
| SCHEMA_NAME | DEFAULT_CHARACTER_SET_NAME | DEFAULT_COLLATION_NAME |
+-------------+----------------------------+------------------------+
| shop        | utf8mb4                    | utf8mb4_0900_ai_ci     |
+-------------+----------------------------+------------------------+
```

**Explanation**: `SHOW DATABASES` returns every database the user can access. Querying `information_schema.SCHEMATA` provides metadata — showing this database inherited the server's default `utf8mb4` character set and `utf8mb4_0900_ai_ci` collation.

## 🏢 Real World Use Case
A SaaS company creates a new database per tenant (customer) for strong data isolation. Using `CREATE DATABASE IF NOT EXISTS tenant_123 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;` ensures each tenant's data is properly encoded and isolated.

## 🎯 Interview Questions
1. **Q**: What does `USE` do?  
   **A**: It sets the default database for subsequent SQL statements without requiring schema-qualified table names.
2. **Q**: How do you avoid an error when creating a database that already exists?  
   **A**: Use `CREATE DATABASE IF NOT EXISTS db_name;`
3. **Q**: What is `information_schema`?  
   **A**: A system database (SQL standard) containing metadata about all other databases, tables, columns, privileges, etc.
4. **Q**: Can you recover a dropped database?  
   **A**: Not from MySQL itself — you need a backup (mysqldump, binary logs, or file-system snapshot).
5. **Q**: What is the difference between `CHARACTER SET` and `COLLATION`?  
   **A**: Character set defines what characters are allowed; collation defines how they are sorted and compared.

## ⚠ Common Errors / Mistakes
- Forgetting to run `USE` before querying tables (fix: use `db_name.table_name`)
- Dropping a database without a backup (irreversible)
- Using `latin1` instead of `utf8mb4` — causes character corruption with emoji or non-Latin scripts
- Creating databases with spaces or special characters in names (use backticks)

## 📝 Practice Exercises
**Beginner**
1. Create a database named `library` with `CHARACTER SET utf8mb4`.
2. Use `SHOW DATABASES` and confirm `library` appears in the list.
3. Select the `library` database and run `SELECT DATABASE();`.

**Intermediate**
4. Query `information_schema.SCHEMATA` to list all databases and their default collations.
5. Create a database `test_db`, then drop it. Verify it is removed with `SHOW DATABASES`.
6. Query `information_schema.TABLES` to find how many tables exist in the `mysql` system database.

**Advanced**
7. Write a query that generates `CREATE DATABASE` statements dynamically for all databases on the server, excluding system databases.
8. Create a stored procedure that accepts a database name as a parameter, checks if it exists (using `information_schema.SCHEMATA`), creates it if not, and returns the status.
