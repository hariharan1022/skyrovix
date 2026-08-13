## 54. PHP XML Parsers

## 📘 Introduction
PHP provides several powerful XML parsing libraries. **SimpleXML** offers the easiest API for reading and manipulating XML, **DOMDocument** provides a full W3C DOM implementation for complex manipulation, **XMLReader** streams large XML files efficiently, and **XMLWriter** builds XML documents programmatically.

## 🧠 Key Concepts
- **SimpleXML** — `simplexml_load_string()`, `simplexml_load_file()` — converts XML to objects you can traverse with `->` and loop with `foreach`
- **DOMDocument** — full DOM implementation with `load()`, `saveXML()`, `createElement()`, `getElementsByTagName()`
- **XMLReader** — pull-based parser, memory-efficient for large XML files
- **XMLWriter** — push-based XML writer for building XML documents
- **Parsing RSS feeds** — common real-world use of XML parsing
- **SimpleXML vs DOM** — SimpleXML is simpler but limited; DOM is more flexible but verbose
- **Handling XML errors** — use `libxml_use_internal_errors(true)` and `libxml_get_errors()`

## 💻 Syntax

```php
// SimpleXML — load from string
$xml = simplexml_load_string($xmlString);
echo $xml->book->title;

// SimpleXML — load from file
$xml = simplexml_load_file('books.xml');

// DOMDocument
$dom = new DOMDocument();
$dom->load('books.xml');
$titles = $dom->getElementsByTagName('title');

// XMLReader
$reader = new XMLReader();
$reader->open('large.xml');
while ($reader->read()) { /* ... */ }

// XMLWriter
$writer = new XMLWriter();
$writer->openURI('output.xml');
$writer->startDocument('1.0', 'UTF-8');

// Error handling
libxml_use_internal_errors(true);
```

## ✅ Example 1 - Basic: Reading RSS Feed with SimpleXML

**Problem:** Parse an RSS feed (or a simulated XML string) to display recent articles.

```php
<?php
$rssXml = <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
    <channel>
        <title>Tech Blog</title>
        <item>
            <title>PHP 8.4 Released</title>
            <link>https://example.com/php-84</link>
            <pubDate>Mon, 23 Jun 2026 10:00:00 GMT</pubDate>
            <description>Major new features announced</description>
        </item>
        <item>
            <title>Understanding Generators</title>
            <link>https://example.com/generators</link>
            <pubDate>Sun, 22 Jun 2026 08:30:00 GMT</pubDate>
            <description>Deep dive into yield</description>
        </item>
    </channel>
</rss>
XML;

libxml_use_internal_errors(true);

$feed = simplexml_load_string($rssXml);
if ($feed === false) {
    foreach (libxml_get_errors() as $error) {
        echo "XML Error: {$error->message}\n";
    }
    exit;
}

echo "Channel: {$feed->channel->title}\n\n";

foreach ($feed->channel->item as $item) {
    echo "Title: {$item->title}\n";
    echo "Date: {$item->pubDate}\n";
    echo "Link: {$item->link}\n";
    echo "Description: {$item->description}\n";
    echo str_repeat("-", 40) . "\n";
}
?>
```

**Output:**
```
Channel: Tech Blog

Title: PHP 8.4 Released
Date: Mon, 23 Jun 2026 10:00:00 GMT
Link: https://example.com/php-84
Description: Major new features announced
----------------------------------------
Title: Understanding Generators
Date: Sun, 22 Jun 2026 08:30:00 GMT
Link: https://example.com/generators
Description: Deep dive into yield
----------------------------------------
```

**Explanation:** `simplexml_load_string()` converts RSS XML into a `SimpleXMLElement` object. Properties are accessed with `->`. XML child elements become object properties, and multiple children become arrays you can `foreach` over.

## 🚀 Example 2 - Intermediate: Building XML with DOM and Error Handling

**Problem:** Build and manipulate an XML document programmatically using DOMDocument with proper error handling.

```php
<?php
libxml_use_internal_errors(true);

// Build XML document
$dom = new DOMDocument('1.0', 'UTF-8');
$dom->formatOutput = true;

$invoices = $dom->createElement('invoices');
$dom->appendChild($invoices);

// Invoice 1
$invoice1 = $dom->createElement('invoice');
$invoice1->setAttribute('id', 'INV-001');
$invoices->appendChild($invoice1);

$customer1 = $dom->createElement('customer', 'Alice Johnson');
$invoice1->appendChild($customer1);

$total1 = $dom->createElement('total', '150.00');
$invoice1->appendChild($total1);

// Invoice 2
$invoice2 = $dom->createElement('invoice');
$invoice2->setAttribute('id', 'INV-002');
$invoices->appendChild($invoice2);

$customer2 = $dom->createElement('customer', 'Bob Smith');
$invoice2->appendChild($customer2);

$total2 = $dom->createElement('total', '275.50');
$invoice2->appendChild($total2);

$xmlOutput = $dom->saveXML();
echo $xmlOutput . "\n";

// Now parse it back and extract data
$parsed = simplexml_load_string($xmlOutput);
foreach ($parsed->invoice as $inv) {
    $id = (string)$inv['id'];
    $customer = (string)$inv->customer;
    $total = (float)$inv->total;
    echo "Invoice $id: $customer — \$$total\n";
}

// Demonstrate XML error handling
$badXml = "<root><broken></root>";
$parsed = simplexml_load_string($badXml);
if ($parsed === false) {
    echo "\nErrors found:\n";
    foreach (libxml_get_errors() as $error) {
        printf("  Line %d: %s", $error->line, $error->message);
    }
    libxml_clear_errors();
}
?>
```

**Output:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<invoices>
  <invoice id="INV-001">
    <customer>Alice Johnson</customer>
    <total>150.00</total>
  </invoice>
  <invoice id="INV-002">
    <customer>Bob Smith</customer>
    <total>275.50</total>
  </invoice>
</invoices>

Invoice INV-001: Alice Johnson — $150
Invoice INV-002: Bob Smith — $275.5

Errors found:
  Line 1: Opening and ending tag mismatch: broken line 1 and root
```

**Explanation:** `DOMDocument` builds XML from the ground up with `createElement()`, `appendChild()`, and `setAttribute()`. The result is formatted with `formatOutput`. The parsed data is read back with SimpleXML. Broken XML triggers `libxml_get_errors()` for detailed diagnostics.

## 🏢 Real World Use Case
E-commerce platforms receive XML product feeds from suppliers, parse them with XMLReader (streaming, memory-efficient for thousands of products), transform data, and import into the database. XMLWriter generates sitemaps (`sitemap.xml`) for SEO. DOMDocument is used in template engines to manipulate HTML/XML documents server-side.

```php
// Streaming parse of a large XML product feed
$reader = new XMLReader();
$reader->open('supplier_feed.xml');
while ($reader->read() && $reader->name !== 'product');
while ($reader->name === 'product') {
    $product = simplexml_import_dom($reader->expand());
    echo $product->sku . "\n";
    $reader->next('product');
}
$reader->close();
```

## 🎯 Interview Questions

**1. What is the difference between SimpleXML and DOMDocument?**
SimpleXML provides an intuitive object-oriented interface (properties/foreach) but cannot modify XML structure easily. DOMDocument is the full W3C DOM — more verbose but supports reading, writing, modifying, XPath, and complex manipulations.

**2. How do you handle malformed XML in PHP?**
Enable `libxml_use_internal_errors(true)` before parsing, then use `libxml_get_errors()` to retrieve error objects with line numbers and messages. Call `libxml_clear_errors()` after handling.

**3. When should you use XMLReader instead of SimpleXML?**
For very large XML files. XMLReader is a streaming pull parser — it reads node by node without loading the entire document into memory. SimpleXML and DOM load the whole DOM tree.

**4. How do you convert a SimpleXML object to a DOMElement?**
Use `dom_import_simplexml($simpleXmlElement)`. Conversely, `simplexml_import_dom($domElement)` converts DOM to SimpleXML.

**5. What is XPath and how do you use it in PHP?**
XPath is a query language for selecting nodes in XML. In SimpleXML: `$xml->xpath('//book/title')`. In DOM: `$dom->xpath->query('//book/title')`.

## ⚠ Common Errors / Mistakes

- **Forgetting `libxml_use_internal_errors(true)`** — malformed XML triggers warnings/errors instead of graceful handling.
- **Not casting SimpleXML values** — `$xml->price` returns a `SimpleXMLElement`, not a float; cast explicitly: `(float)$xml->price`.
- **Assuming all XML elements exist** — accessing non-existent elements returns null; check with `isset()` first.
- **Memory issues with DOM on large files** — DOM loads everything into memory; use XMLReader for files > 10MB.
- **Namespace issues** — SimpleXML requires `->children('http://namespace')` for namespaced elements.

## 📝 Practice Exercises

**Beginner**
1. Parse this XML with SimpleXML: `<book><title>PHP Basics</title><author>John Doe</author><price>29.99</price></book>` and display each field.
2. Use SimpleXML to load an RSS feed from a URL (`simplexml_load_file`). Loop through items and print titles and links.
3. Generate an XML sitemap with XMLWriter containing 3 URLs with `<loc>`, `<lastmod>`, `<priority>` elements.

**Intermediate**
4. Build a product catalog XML with DOMDocument: `<products>` containing multiple `<product>` elements with id attribute, name, price, and category children. Save to file and load it back for display.
5. Parse a large XML file (simulate with 1000+ items) using XMLReader. Extract product SKUs and prices without loading the entire file into memory.
6. Create a script that converts an XML document to a PHP array recursively using SimpleXML. Handle attributes and nested elements.

**Advanced**
7. Build an XML validator: accept an XML string and an XSD schema file. Use `DOMDocument::schemaValidate()` to validate. Report all validation errors with line numbers using `libxml_get_errors()`.
8. Implement a two-way XML transformer: read an XML invoice format, transform it to a different XML schema using XSLT (`XSLTProcessor`), and output the result. Include error handling for both parsing and transformation.
