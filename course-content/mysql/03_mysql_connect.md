## 3. MySQL Connect

## 📘 Introduction
Connecting to MySQL is the first step before any database operation. MySQL supports multiple connection methods: the command-line client (`mysql`), GUI tools (MySQL Workbench), and programmatic interfaces via PHP (MySQLi, PDO), Python (mysql-connector-python), Java (JDBC), and more. Understanding connection strings, authentication, and common errors is critical.

## 🧠 Key Concepts
- **Host**: The server address (`localhost` for local, IP or domain for remote)
- **Port**: Default MySQL port is `3306`
- **User/Pasword**: MySQL credentials with appropriate privileges
- **Connection String**: A formatted string containing all connection parameters
- **MySQL CLI**: `mysql -u user -p -h host -P port`
- **MySQL Workbench**: GUI tool for visual database management
- **MySQLi**: MySQL improved extension for PHP (procedural and OOP)
- **PDO**: PHP Data Objects — database-agnostic interface
- **Common Errors**: Access denied, Can't connect to MySQL server, Unknown database

## 💻 Syntax
```sql
-- No SQL here — connection uses client-side commands

-- MySQL CLI
mysql -u root -p
mysql -u root -p -h 192.168.1.100 -P 3306

-- Verify connection from SQL
SELECT CONNECTION_ID();
```

## ✅ Example 1 - Basic

**Problem**: Connect to a local MySQL server using the command-line client and verify the connection.

**Command**: `mysql -u root -p`

**Output**:
```
Enter password: ********
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 12
Server version: 8.0.35 MySQL Community Server - GPL
```

**SQL Query** (run after connecting):
```sql
SELECT CONNECTION_ID() AS 'Connection ID', CURRENT_USER() AS 'User';
```

**Output**:
```
+---------------+----------------+
| Connection ID | User           |
+---------------+----------------+
|            12 | root@localhost |
+---------------+----------------+
```

**Explanation**: The CLI prompts for a password, then opens an interactive session. Each connection gets a unique `connection_id`. `CURRENT_USER()` shows the authenticated user and host.

## 🚀 Example 2 - Intermediate

**Problem**: Connect using PHP PDO with error handling, and test the connection.

**PHP Code**:
```php
<?php
$host = 'localhost';
$db   = 'shop';
$user = 'root';
$pass = 'password';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    echo "Connected successfully";
    $stmt = $pdo->query('SELECT CONNECTION_ID() AS id');
    $row = $stmt->fetch();
    echo " | Connection ID: " . $row['id'];
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
```

**Output**:
```
Connected successfully | Connection ID: 15
```

**Explanation**: The PDO connection string (`DSN`) specifies host, database, and charset. Error mode is set to exceptions so connection failures are caught gracefully. `ERRMODE_EXCEPTION` ensures any SQL error throws an exception.

## 🏢 Real World Use Case
A web application's configuration file stores connection parameters (usually via environment variables for security). The app creates a persistent PDO connection at startup and reuses it throughout the request lifecycle. Connection pooling in production avoids the overhead of opening a new connection per request.

## 🎯 Interview Questions
1. **Q**: What is the default MySQL port?  
   **A**: 3306.
2. **Q**: How do you connect to a remote MySQL server from the CLI?  
   **A**: `mysql -u username -p -h remote_host -P 3306`
3. **Q**: What is the difference between MySQLi and PDO?  
   **A**: MySQLi is MySQL-specific; PDO supports 12+ database drivers. PDO offers a more consistent API.
4. **Q**: What does "Can't connect to MySQL server" typically mean?  
   **A**: MySQL service isn't running, the host/port is wrong, or a firewall is blocking the connection.
5. **Q**: How does `localhost` differ from `127.0.0.1` in MySQL connections?  
   **A**: `localhost` uses a Unix socket (or Windows named pipe); `127.0.0.1` forces TCP/IP.

## ⚠ Common Errors / Mistakes
- "Access denied for user" — wrong username/password or user lacks host permission
- "Can't connect to MySQL server" — service not running or wrong host/port
- "Unknown database" — database name misspelled or not created yet
- Storing database passwords in plain text in source code
- Using `localhost` when remote TCP connection is required

## 📝 Practice Exercises
**Beginner**
1. Connect to your local MySQL server using the CLI with `mysql -u root -p`.
2. Run `SELECT USER(), CURRENT_USER(), CONNECTION_ID();` to inspect your session.
3. Disconnect with `EXIT` or `QUIT`.

**Intermediate**
4. Write a PHP MySQLi script that connects to MySQL, checks for connection errors, and prints the server version.
5. Write a PHP PDO script that connects to MySQL, catches exceptions, and prints "Connected" or the error message.
6. Use `mysql -u root -p -e "SHOW DATABASES;"` to run a query without entering interactive mode.

**Advanced**
7. Create a PHP class `Database` that implements a singleton PDO connection with configurable options (persistent connection, error mode, charset).
8. Write a bash script that tests connectivity to a remote MySQL host, retries 3 times on failure, and logs the result with timestamps.
