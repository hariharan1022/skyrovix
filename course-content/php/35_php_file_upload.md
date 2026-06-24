## 35. PHP File Upload

## 📘 Introduction
PHP makes it straightforward to accept file uploads from users through HTML forms. However, handling file uploads securely requires understanding the `$_FILES` superglobal, validation techniques, error constants, and strict security measures to prevent malicious files from compromising your server.

## 🧠 Key Concepts
- **`$_FILES`**: A superglobal associative array containing uploaded file information — `name`, `type`, `tmp_name`, `error`, `size`.
- **`enctype="multipart/form-data"`**: Required form attribute for file uploads.
- **`move_uploaded_file()`**: Moves the uploaded file from the temp directory to a permanent location. Safer than `copy()` or `rename()`.
- **Upload error constants**: `UPLOAD_ERR_OK` (0), `UPLOAD_ERR_INI_SIZE` (1), `UPLOAD_ERR_FORM_SIZE` (2), `UPLOAD_ERR_PARTIAL` (3), `UPLOAD_ERR_NO_FILE` (4), `UPLOAD_ERR_NO_TMP_DIR` (6), `UPLOAD_ERR_CANT_WRITE` (7), `UPLOAD_ERR_EXTENSION` (8).
- **Validation**: Check file size (`$_FILES['file']['size']`), MIME type (`finfo` or `mime_content_type`), and file extension.
- **Security**: Validate extensions against a whitelist, randomize filenames, limit file size, disable execution permissions on upload directory.
- **php.ini settings**: `upload_max_filesize`, `post_max_size`, `max_file_uploads`, `upload_tmp_dir`.

## 💻 Syntax
```php
<?php
// HTML form
// <form action="upload.php" method="post" enctype="multipart/form-data">
//     <input type="file" name="document">
//     <input type="submit">
// </form>

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['document'])) {
    $file = $_FILES['document'];
    
    // Check for errors
    if ($file['error'] !== UPLOAD_ERR_OK) {
        die("Upload error code: " . $file['error']);
    }
    
    // Validate extension
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $allowed = ['jpg', 'png', 'pdf'];
    if (!in_array($ext, $allowed)) {
        die("Invalid file type.");
    }
    
    // Randomize filename
    $newName = bin2hex(random_bytes(16)) . '.' . $ext;
    $dest = __DIR__ . '/uploads/' . $newName;
    
    if (move_uploaded_file($file['tmp_name'], $dest)) {
        echo "Uploaded: $newName";
    }
}
?>
```

## ✅ Example 1 - Basic
**Problem**: Create a simple file upload form that accepts images and validates file size and type.

**Code** (`upload.php`):
```php
<?php
$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $file = $_FILES['profile_image'] ?? null;
    
    if (!$file || $file['error'] === UPLOAD_ERR_NO_FILE) {
        $message = 'Please select a file.';
    } elseif ($file['error'] !== UPLOAD_ERR_OK) {
        $message = 'Upload failed with error code: ' . $file['error'];
    } elseif ($file['size'] > 2 * 1024 * 1024) {
        $message = 'File too large. Max 2MB.';
    } else {
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (!in_array($ext, ['jpg', 'jpeg', 'png', 'gif'])) {
            $message = 'Only JPG, PNG, GIF allowed.';
        } else {
            $newName = uniqid('img_', true) . '.' . $ext;
            $dest = __DIR__ . '/uploads/' . $newName;
            
            if (move_uploaded_file($file['tmp_name'], $dest)) {
                $message = "Uploaded: <a href='uploads/$newName'>$newName</a>";
            } else {
                $message = 'Failed to move uploaded file.';
            }
        }
    }
}
?>
<form method="post" enctype="multipart/form-data">
    <input type="file" name="profile_image" accept="image/*">
    <button type="submit">Upload</button>
</form>
<p><?= $message ?></p>
```

**Output** (after successful upload):
```
Uploaded: img_6789abc0d1e2f3.1.jpg  [link to file]
```

**Explanation**: The form uses `enctype="multipart/form-data"`. On POST, we check the error code, validate size (2MB limit), whitelist the extension, generate a unique filename with `uniqid`, and move the file with `move_uploaded_file`.

## 🚀 Example 2 - Intermediate
**Problem**: Handle multiple file uploads with comprehensive validation and security.

**Code** (`multi_upload.php`):
```php
<?php
$allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
$maxSize = 5 * 1024 * 1024; // 5MB
$uploadDir = __DIR__ . '/uploads/';
$results = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['documents'])) {
    $files = $_FILES['documents'];
    $count = count($files['name']);
    
    for ($i = 0; $i < $count; $i++) {
        $file = [
            'name'     => $files['name'][$i],
            'type'     => $files['type'][$i],
            'tmp_name' => $files['tmp_name'][$i],
            'error'    => $files['error'][$i],
            'size'     => $files['size'][$i],
        ];
        
        if ($file['error'] !== UPLOAD_ERR_OK) {
            $results[] = "{$file['name']}: Error code {$file['error']}";
            continue;
        }
        
        // Validate MIME type using finfo
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);
        
        if (!in_array($mime, $allowedTypes)) {
            $results[] = "{$file['name']}: Invalid MIME type ($mime)";
            continue;
        }
        
        if ($file['size'] > $maxSize) {
            $results[] = "{$file['name']}: Too large";
            continue;
        }
        
        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
        $newName = bin2hex(random_bytes(16)) . '.' . $ext;
        
        if (move_uploaded_file($file['tmp_name'], $uploadDir . $newName)) {
            $results[] = "{$file['name']}: Uploaded as $newName";
        } else {
            $results[] = "{$file['name']}: Move failed";
        }
    }
}
?>
<form method="post" enctype="multipart/form-data">
    <input type="file" name="documents[]" multiple>
    <button type="submit">Upload All</button>
</form>
<?php foreach ($results as $r): ?>
    <p><?= htmlspecialchars($r) ?></p>
<?php endforeach; ?>
```

**Output**:
```
report.pdf: Uploaded as a1b2c3d4e5f6a7b8c9d0e1f2.pdf
photo.png: Uploaded as 0f1e2d3c4b5a69788796a5b4.png
evil.exe: Invalid MIME type (application/x-msdownload)
```

**Explanation**: Multiple files use array notation (`documents[]`). `finfo` reads the actual MIME type from file content (not the user-supplied `$_FILES['type']` which can be spoofed). `random_bytes(16)` generates a cryptographically secure random filename.

## 🏢 Real World Use Case
**Document Management System**: A SaaS platform accepts resumes, contracts, and invoices. Files are uploaded via a multi-file form, validated for type (PDF, DOCX, JPG) and size (max 10MB), renamed with UUIDs, stored outside the webroot, and served via a download script that checks user permissions. EXIF data is stripped from images, and a virus scan is triggered via a background job.

## 🎯 Interview Questions
1. What is the purpose of `move_uploaded_file()` and why is it safer than `rename()`?
2. How can you validate the actual file type rather than relying on the file extension?
3. What are the common `$_FILES` error constants and what do they indicate?
4. How do you handle multiple file uploads with the same form field name?
5. What security measures should you take when handling file uploads?

## ⚠ Common Errors / Mistakes
- **Trusting `$_FILES['file']['type']`**: This value is sent by the client and can be spoofed. Always validate with `finfo`.
- **Not checking `UPLOAD_ERR_OK`**: Without error checking, you may try to move a file that failed to upload.
- **Upload directory inside webroot with execution enabled**: Attackers could upload a `.php` file and execute it. Store uploads outside webroot or disable script execution with `.htaccess`.
- **Using original filename**: Attackers may use path traversal names like `../../evil.php`. Always generate a new name.
- **Ignoring `post_max_size` vs `upload_max_filesize`**: `post_max_size` must be larger than `upload_max_filesize` or larger uploads silently fail.

## 📝 Practice Exercises
**Beginner:**
1. Create a single-file upload form that accepts only `.txt` files and saves them to an `uploads/` directory.
2. Display a user-friendly error message if the uploaded file exceeds 1MB.
3. Show the original filename and file size after a successful upload.

**Intermediate:**
4. Build a profile picture uploader that resizes images to 200x200 pixels using GD or Imagick after upload.
5. Create a multi-file uploader with drag-and-drop UI (HTML5) that validates each file's MIME type server-side and reports results per file.
6. Implement an upload progress bar using JavaScript `XMLHttpRequest` and PHP's `session.upload_progress`.

**Advanced:**
7. Build a secure file upload system that stores files outside the webroot, serves them through a PHP download script with access control, and implements rate limiting per IP.
8. Create a chunked upload handler that accepts large files (1GB+) by splitting them into 5MB chunks on the client and reassembling them server-side with integrity checks (SHA-256 hash verification).
