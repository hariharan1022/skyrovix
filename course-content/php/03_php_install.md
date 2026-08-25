## 3. PHP Install

## 📘 Introduction
To run PHP on your local machine, you need a web server (Apache/Nginx), PHP interpreter, and often a database (MySQL). All-in-one packages like XAMPP, WAMP, and MAMP bundle these together for easy setup.

## 🧠 Key Concepts
- **XAMPP** (Cross-Platform): Apache, MySQL, PHP, Perl. Available for Windows, macOS, Linux. Includes phpMyAdmin.
- **WAMP** (Windows-only): Apache, MySQL, PHP. Integrated tray icon for managing services.
- **MAMP** (macOS/Windows): Apache, MySQL, PHP. macOS-native interface.
- **php.ini**: Main PHP configuration file. Controls error reporting, extensions, upload limits, memory limits, timezone, etc.
- **Built-in PHP Server**: PHP 5.4+ includes a development server (`php -S localhost:8000`) — no Apache needed for simple testing.
- **localhost**: `http://localhost` maps to the server's document root (e.g., `C:\xampp\htdocs`).

## 💻 Syntax
```bash
# Built-in PHP server
php -S localhost:8000

# Specify document root
php -S localhost:8000 -t public/

# Run a single PHP file without a server
php script.php
```

## ✅ Example 1 - Basic
**Problem**: Install XAMPP and run your first PHP file on localhost.

**Steps**:
1. Download XAMPP from apachefriends.org and install it.
2. Open the XAMPP Control Panel and start Apache.
3. Navigate to the `htdocs` folder (e.g., `C:\xampp\htdocs`).
4. Create a file `test.php` with `<?php phpinfo(); ?>`.
5. Open a browser and visit `http://localhost/test.php`.

**Output**: A detailed PHP information page showing version, configuration, extensions, environment variables, and more.

**Explanation**: `phpinfo()` outputs a comprehensive table of the PHP environment. It confirms PHP is installed, which version, what extensions are loaded, and how `php.ini` is configured. Never leave `phpinfo()` on a production server.

## 🚀 Example 2 - Intermediate
**Problem**: Use the built-in PHP development server to run a project from a custom directory without installing Apache.

**Code** (`start-server.bat` / `start-server.sh`):
```bash
php -S localhost:8080 -t C:\Projects\my-app\public
```

With a router file for clean URLs:
```php
<?php
// router.php
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if (file_exists(__DIR__ . '/public' . $uri)) {
    return false; // serve static files directly
}
$_GET['_url'] = $uri;
include 'public/index.php';
```
```bash
php -S localhost:8080 router.php
```

**Output**: The PHP server starts and logs each request:
```
Listening on http://localhost:8080
Document root is C:\Projects\my-app\public
Press Ctrl-C to quit.
[Mon Jun 23 21:15:32 2025] ::1:54321 GET / - 200
```

**Explanation**: The built-in server is single-threaded — only for development. The router file lets you implement URL rewriting. `return false` tells PHP to serve the static file directly; otherwise the request is forwarded to the front controller.

## 🏢 Real World Use Case
**Local Development Workflow**: Developers run XAMPP or Docker-based PHP environments locally to build and test websites before deploying to production Linux servers. Tools like Laravel Valet (macOS) and Laravel Homestead (Vagrant) provide pre-configured PHP environments matching production.

## 🎯 Interview Questions
**Q1:** What is the difference between XAMPP, WAMP, and MAMP?
**A:** All bundle Apache, MySQL, and PHP. XAMPP is cross-platform and includes Perl. WAMP is Windows-only. MAMP is macOS-first. XAMPP is the most commonly used cross-platform solution.

**Q2:** How do you check which PHP version is installed?
**A:** Run `php -v` in the terminal, or create a file with `<?php phpinfo(); ?>` and open it in a browser.

**Q3:** What is the purpose of `php.ini`?
**A:** It configures PHP behavior: error reporting level, memory limit (`memory_limit`), max upload size (`upload_max_filesize`), timezone (`date.timezone`), extension loading, and more.

**Q4:** How do you start PHP's built-in development server?
**A:** Run `php -S localhost:8000` from the project directory. Add `-t docroot` to set a different document root. Optionally provide a router PHP file.

**Q5:** Why should you use `phpinfo()` only for development?
**A:** It exposes sensitive server information: document root, environment variables, loaded extensions, and configuration paths. Attackers can exploit this knowledge.

## ⚠ Common Errors / Mistakes
- **Forgetting to start Apache/WAMP**: Visiting `localhost` gives "Connection refused" — always verify the server is running.
- **Port conflicts**: Skype or another application may use port 80/443. Change Apache's port in `httpd.conf` or stop the conflicting service.
- **Editing the wrong `php.ini`**: The CLI and web server often use different `php.ini` files. Use `phpinfo()` to find the loaded path.
- **Not restarting the server after config changes**: `php.ini` changes require a web server restart to take effect.

## 📝 Practice Exercises
**Beginner:**
1. Install XAMPP, start Apache, and create a `phpinfo()` page. Identify the Loaded Configuration File path and PHP version.
2. Change the `date.timezone` in `php.ini` to your local timezone, restart Apache, and verify the change using `phpinfo()`.
3. Use the built-in PHP server to serve a simple "Hello World" page on port 8888.

**Intermediate:**
4. Set up a virtual host in XAMPP so `http://myapp.local` points to `C:\xampp\htdocs\myapp` (edit `httpd-vhosts.conf` and hosts file).
5. Increase `upload_max_filesize` and `post_max_size` to 32MB in `php.ini`, restart Apache, and verify via `phpinfo()`.
6. Create a router file for the built-in server that serves static files from `/public` and routes everything else to `index.php`.

**Advanced:**
7. Set up a multi-site environment in XAMPP using virtual hosts with different domains, separate document roots, and different PHP settings per site (using `.htaccess` or `php_value`).
8. Install PHP via the command line (without a package manager) on Windows — configure paths, enable extensions (curl, mysqli, gd), and verify with `php -m`.
