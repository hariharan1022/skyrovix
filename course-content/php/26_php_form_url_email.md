# 26. PHP Form URL/E-mail

## 📘 Introduction
Validating email addresses and URLs is a common requirement in web forms. PHP's `filter_var` with `FILTER_VALIDATE_EMAIL` and `FILTER_VALIDATE_URL` provides built-in validation, while `preg_match` and sanitization filters offer additional control for custom rules.

## 🧠 Key Concepts
- **`FILTER_VALIDATE_EMAIL`**: Validates email format per RFC standards.
- **`FILTER_VALIDATE_URL`**: Validates URL format — requires scheme (http/https) by default.
- **`FILTER_SANITIZE_EMAIL`**: Removes invalid characters from an email address.
- **`FILTER_SANITIZE_URL`**: Removes invalid characters from a URL.
- **`preg_match` for custom validation**: Domain-specific checks (e.g., only `.edu` emails, company domain).
- **Sanitization**: Cleaning data before storage or display.

## 💻 Syntax
```php
// Email validation
$email = "user@example.com";
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Valid email";
}

// URL validation
$url = "https://example.com";
if (filter_var($url, FILTER_VALIDATE_URL)) {
    echo "Valid URL";
}

// URL with required path
$url = "https://example.com/path";
$parts = parse_url($url);
if (isset($parts['scheme']) && isset($parts['host'])) {
    echo "Has scheme and host";
}

// Sanitization
$safeEmail = filter_var($raw, FILTER_SANITIZE_EMAIL);
$safeUrl   = filter_var($raw, FILTER_SANITIZE_URL);

// Custom regex validation
if (preg_match("/^[a-zA-Z0-9._%+-]+@company\.com$/", $email)) {
    echo "Valid company email";
}
```

## ✅ Example 1 - Basic

**Problem:** Validate an email address and a website URL submitted through a form. Sanitize before display.

**Code:**
```php
<?php
$email = $website = '';
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawEmail = $_POST['email'] ?? '';
    $rawUrl   = $_POST['website'] ?? '';

    // Sanitize first (remove invalid chars)
    $email   = filter_var($rawEmail, FILTER_SANITIZE_EMAIL);
    $website = filter_var($rawUrl, FILTER_SANITIZE_URL);

    // Validate
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Invalid email address";
    }
    if (!filter_var($website, FILTER_VALIDATE_URL)) {
        $errors['website'] = "Invalid website URL (include http:// or https://)";
    }

    if (empty($errors)) {
        $safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
        $safeUrl   = htmlspecialchars($website, ENT_QUOTES, 'UTF-8');
        echo "<p>Email: $safeEmail<br>Website: <a href=\"$safeUrl\">$safeUrl</a></p>";
    }
}
?>
<form method="POST" action="">
    Email: <input type="text" name="email" value="<?php echo htmlspecialchars($email); ?>">
    <?php if (isset($errors['email'])): ?><span style="color:red"><?php echo $errors['email']; ?></span><?php endif; ?><br>
    Website: <input type="text" name="website" value="<?php echo htmlspecialchars($website); ?>">
    <?php if (isset($errors['website'])): ?><span style="color:red"><?php echo $errors['website']; ?></span><?php endif; ?><br>
    <button type="submit">Submit</button>
</form>
```

**Explanation:** `FILTER_SANITIZE_EMAIL` removes dangerous characters; `FILTER_VALIDATE_EMAIL` checks format. For URLs, `FILTER_SANITIZE_URL` cleans the input, and `FILTER_VALIDATE_URL` ensures a valid URL structure.

## 🚀 Example 2 - Intermediate

**Problem:** Validate that an email domain is from an allowed list and that a URL's path points to a valid product page.

**Code:**
```php
<?php
$errors = [];
$email = $productUrl = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email     = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $productUrl = filter_var(trim($_POST['product_url'] ?? ''), FILTER_SANITIZE_URL);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email format';
    } else {
        // Extract domain and check against allowed list
        $domain = substr(strrchr($email, "@"), 1);
        $allowedDomains = ['gmail.com', 'outlook.com', 'company.org'];
        if (!in_array(strtolower($domain), $allowedDomains)) {
            $errors['email'] = "Only @gmail.com, @outlook.com, or @company.org allowed";
        }
    }

    if (!filter_var($productUrl, FILTER_VALIDATE_URL)) {
        $errors['product_url'] = 'Invalid URL format';
    } else {
        // Check URL path starts with /products/
        $path = parse_url($productUrl, PHP_URL_PATH);
        if (!preg_match("#^/products/#", $path ?? '')) {
            $errors['product_url'] = 'URL must be a product page (/products/...)';
        }
    }
}
?>
```

**Explanation:** After sanitization and basic validation, the email domain is extracted with `substr(strrchr($email, "@"), 1)` and checked against an allow list. The URL path is extracted with `parse_url` and validated with `preg_match` to ensure it matches a specific pattern.

## 🏢 Real World Use Case
**User Profile Page:** Users update their contact info and social links. Email must be unique (checked against DB) and non-disposable domains. URLs must point to known social platforms.

```php
<?php
function validateContactInput(string $email, string $twitterUrl): array {
    $errors = [];
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email';
    } elseif (preg_match('/@(mailinator|guerrillamail|10minutemail)\./i', $email)) {
        $errors['email'] = 'Disposable emails not allowed';
    }

    if (!empty($twitterUrl)) {
        $twitterUrl = filter_var($twitterUrl, FILTER_SANITIZE_URL);
        if (!filter_var($twitterUrl, FILTER_VALIDATE_URL) ||
            !preg_match('#^https?://(www\.)?twitter\.com/#i', $twitterUrl)) {
            $errors['twitter'] = 'Invalid Twitter URL';
        }
    }

    return $errors;
}
?>
```

## 🎯 Interview Questions

**1. Does `FILTER_VALIDATE_EMAIL` guarantee the email exists?**  
No. It only validates the format. To verify existence, you would need to send a confirmation email or use an email verification service.

**2. How does `FILTER_VALIDATE_URL` determine a valid URL?**  
It requires a scheme (e.g., `http://`, `https://`, `ftp://`) followed by a valid hostname. It does not validate that the URL is reachable.

**3. What does `FILTER_SANITIZE_EMAIL` remove?**  
It removes all characters except letters, digits, and these special chars: `!#$%&'*+-/=?^_`{|}~@.[]`.

**4. How can you make a URL validation accept URLs without a scheme?**  
Prefix the URL with `https://` before validation: `if (!filter_var($url, FILTER_VALIDATE_URL)) { $url = "https://$url"; }`.

**5. Why use `parse_url` after `filter_var` validation?**  
`filter_var` checks general URL validity but not specific parts. `parse_url` lets you examine the scheme, host, path, and query separately for custom rules.

## ⚠ Common Errors / Mistakes
- **Not sanitizing before validation**: Email with trailing whitespace or hidden characters will fail validation.
- **Assuming `FILTER_VALIDATE_URL` validates reachability**: It only checks format, not if the server responds.
- **Rejecting valid emails with `+` sign**: `user+tag@domain.com` is valid per RFC and passes `FILTER_VALIDATE_EMAIL`.
- **Forgetting to lowercase the domain**: Domains are case-insensitive; always compare in lowercase.

## 📝 Practice Exercises

**Beginner**
1. Write a script that validates an email address using `filter_var` and displays "Valid" or "Invalid".
2. Create a form that accepts a website URL, sanitizes it, validates it, and displays it as a clickable link.
3. Build a form that requires both a valid email and a valid URL, showing separate error messages.

**Intermediate**
4. Validate an email address and then extract and display its domain part (e.g., "gmail.com").
5. Create a contact form where the email must end with `.edu` (valid academic email) and the website must be an HTTPS URL.
6. Build a function that checks a URL against a blocklist of domains using `parse_url` and `preg_match`.

**Advanced**
7. Implement a full email validation pipeline: sanitize, format validate, DNS MX record check (via `checkdnsrr`), and disposable email detection.
8. Build a social link validator that accepts URLs from specific platforms (LinkedIn, GitHub, Twitter, Facebook) using regex per platform and validates the URL structure.
