## 4. MySQL Create DB

## 📘 Introduction
The `CREATE DATABASE` statement creates a new database as a schema namespace for tables, views, and other objects. MySQL allows specifying character set and collation at creation time. `ALTER DATABASE` can modify these later. Understanding these options ensures proper text encoding and sorting behavior.

## 🧠 Key Concepts
- **CREATE DATABASE**: Creates a new database with optional `IF NOT EXISTS`
- **Character Set (utf8mb4)**: Supports all Unicode characters including emoji
- **Collation (utf8mb4_unicode_ci)**: Case-insensitive comparison based on Unicode rules
- **SHOW CREATE DATABASE**: Shows the exact statement used to create the database
- **ALTER DATABASE**: Modifies database-level options (charset, collation) after creation
- **Default Settings**: If omitted, MySQL uses server-level defaults

## 💻 Syntax
```sql
-- Basic create
CREATE DATABASE database_name;

-- Safe create (skip if exists)
CREATE DATABASE IF NOT EXISTS database_name;

-- Create with options
CREATE DATABASE database_name
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Show creation statement
SHOW CREATE DATABASE database_name;

-- Alter existing database
ALTER DATABASE database_name
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

## ✅ Example 1 - Basic

**Problem**: Create a database `university` with explicit character set and collation, then verify the creation statement.

**SQL Query**:
```sql
CREATE DATABASE IF NOT EXISTS university
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

SHOW CREATE DATABASE university;
```

**Output**:
```
+------------+-----------------------------------------------------------------------+
| Database   | Create Database                                                       |
+------------+-----------------------------------------------------------------------+
| university | CREATE DATABASE `university` /*!40100 DEFAULT CHARACTER SET utf8mb4  |
|            |   COLLATE utf8mb4_unicode_ci */                                       |
+------------+-----------------------------------------------------------------------+
```

**Explanation**: `IF NOT EXISTS` prevents error if `university` already exists. `SHOW CREATE DATABASE` reveals the full creation DDL, including the comment-style syntax MySQL uses to record charset and collation.

## 🚀 Example 2 - Intermediate

**Problem**: Create a database, then alter its collation after creation, and confirm the change.

**SQL Query**:
```sql
CREATE DATABASE IF NOT EXISTS blog
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

ALTER DATABASE blog
  COLLATE utf8mb4_unicode_ci;

SELECT DEFAULT_CHARACTER_SET_NAME, DEFAULT_COLLATION_NAME
FROM information_schema.SCHEMATA
WHERE SCHEMA_NAME = 'blog';
```

**Output**:
```
+----------------------------+------------------------+
| DEFAULT_CHARACTER_SET_NAME | DEFAULT_COLLATION_NAME |
+----------------------------+------------------------+
| utf8mb4                    | utf8mb4_unicode_ci     |
+----------------------------+------------------------+
```

**Explanation**: The database was created with `utf8mb4_general_ci` but altered to `utf8mb4_unicode_ci`. The collation changes only the default for future tables — existing tables retain their original collation unless explicitly altered.

## 🏢 Real World Use Case
A multi-lingual content management system sets `utf8mb4` and `utf8mb4_unicode_ci` at database creation to store Arabic, Chinese, and emoji characters correctly. The collation ensures case-insensitive search and proper Unicode sorting for all languages.

## 🎯 Interview Questions
1. **Q**: Why is `utf8mb4` preferred over `utf8` in MySQL?  
   **A**: MySQL's `utf8` only supports up to 3-byte characters (no emoji). `utf8mb4` supports full 4-byte Unicode including emoji and rare CJK characters.
2. **Q**: What is the difference between `utf8mb4_general_ci` and `utf8mb4_unicode_ci`?  
   **A**: `unicode_ci` follows the Unicode standard for sorting and comparison (more accurate for multi-language); `general_ci` is faster but less accurate.
3. **Q**: Does `ALTER DATABASE` affect existing tables?  
   **A**: No — it only changes the default for new tables created in that database.
4. **Q**: What does `/*!40100 ... */` mean in `SHOW CREATE DATABASE`?  
   **A**: It's a MySQL conditional comment — the code inside runs only if MySQL version >= 4.01.00.
5. **Q**: Can you rename a database in MySQL?  
   **A**: No direct `RENAME DATABASE`. You must dump and reimport, or create a new DB and move tables.

## ⚠ Common Errors / Mistakes
- Using `utf8` (alias for utf8mb3) instead of `utf8mb4` — causes data loss for 4-byte characters
- Forgetting `IF NOT EXISTS` when running scripts idempotently
- Thinking `ALTER DATABASE` charset changes existing tables
- Using case-sensitive collation (`_cs`) by mistake when case-insensitive (`_ci`) is intended

## 📝 Practice Exercises
**Beginner**
1. Create a database named `school` with `CHARACTER SET utf8mb4`.
2. Run `SHOW CREATE DATABASE school;` and note the output.
3. Drop the `school` database, then recreate it with `IF NOT EXISTS`.

**Intermediate**
4. Create a database `ecommerce` with `utf8mb4` and `utf8mb4_unicode_ci`. Alter it to use `utf8mb4_unicode_520_ci`.
5. Write a query that uses `information_schema.SCHEMATA` to list all databases created by the user (exclude system databases `mysql`, `sys`, `performance_schema`, `information_schema`).
6. Create two databases — one with `latin1` and one with `utf8mb4`. Insert the same text containing an emoji into each and observe the behavior.

**Advanced**
7. Write a script that generates `ALTER DATABASE ... CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci` for every database that does not already use `utf8mb4`.
8. Create a procedure that accepts a database name, checks charset via `information_schema`, and prints a warning if the charset is not `utf8mb4`.
