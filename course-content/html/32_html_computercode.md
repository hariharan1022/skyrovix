## 32. HTML Computercode
## 📘 Introduction
HTML provides special elements for displaying computer code, keyboard input, program output, and variables. These elements use monospace fonts and semantic markup to clearly distinguish technical content from regular text.

## 🧠 Key Concepts
- `<code>` - displays a fragment of computer code (inline)
- `<kbd>` - represents keyboard input (e.g., Ctrl+C)
- `<samp>` - represents sample output from a program
- `<var>` - represents a variable in programming or math
- `<pre>` - preserves whitespace and line breaks (preformatted text)
- `<pre><code>` is the standard combination for multi-line code blocks
- These elements do not add syntax highlighting (use CSS or JS libraries for that)

## 💻 Syntax
```html
<!-- Inline code -->
<p>Use the <code>print()</code> function in Python.</p>

<!-- Keyboard input -->
<p>Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.</p>

<!-- Sample output -->
<samp>Hello, World!</samp>

<!-- Variable -->
<p>The value of <var>username</var> is entered by the user.</p>

<!-- Preformatted code block -->
<pre>
  <code>
    function hello() {
      console.log("Hello!");
    }
  </code>
</pre>
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Display a code snippet with proper formatting on a tutorial page.

**Code:**
```html
<p>To print to the console in JavaScript, use:</p>
<pre><code>console.log("Hello, World!");</code></pre>

<p>Save the file with <kbd>Ctrl</kbd> + <kbd>S</kbd>.</p>
<p>You should see <samp>Hello, World!</samp> in the console.</p>
```

**Output:** The code appears in monospace font with preserved spacing. Keyboard shortcuts are visually distinct. Sample output is styled differently.

**Explanation:** `<pre>` preserves indentation. `<code>` applies a monospace font. `<kbd>` often renders in a special keyboard-like style. `<samp>` indicates program output.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Create a styled code block with line numbers using HTML and CSS.

**Code:**
```html
<style>
  .code-block {
    background: #1e1e1e;
    color: #d4d4d4;
    padding: 16px;
    border-radius: 6px;
    font-family: 'Consolas', monospace;
    line-height: 1.5;
    overflow-x: auto;
  }
  .code-block code { font-family: inherit; }
  .keyword { color: #569cd6; }
  .string { color: #ce9178; }
</style>

<pre class="code-block"><code>
<span class="keyword">function</span> greet(name) {
  <span class="keyword">let</span> message = <span class="string">"Hello, "</span> + name;
  console.log(message);
}

greet(<span class="string">"Student"</span>);
</code></pre>
```

**Output:** A dark-themed code block with syntax-colored keywords and strings.

**Explanation:** `<span>` elements with CSS classes provide custom syntax highlighting. The `<pre>` preserves formatting. The `overflow-x: auto` ensures horizontal scrolling for long lines.

## 🏢 Real World Use Case
Documentation websites (MDN, W3Schools), coding tutorial platforms, blog posts with code examples, API references, and README files use these elements for technical content presentation.

## 🎯 Interview Questions (5 with answers)
**1. What is the difference between `<code>` and `<pre>`?**
`<code>` is for inline code snippets (single line within text). `<pre>` preserves whitespace and line breaks for multi-line blocks. They are often combined as `<pre><code>`.

**2. What does the `<kbd>` element represent?**
It represents keyboard input - text that the user should type or keys they should press. Browsers often render it in a monospace font.

**3. What is the purpose of the `<samp>` element?**
It represents sample or quoted output from a computer program, helping readers distinguish program output from regular text.

**4. How do you display a variable name in mathematical or programming context?**
Use the `<var>` element. Example: `<var>x</var> = 5` renders the `x` as a variable, typically in italic.

**5. Does HTML provide built-in syntax highlighting for code?**
No. HTML only provides semantic markup. Syntax highlighting requires CSS or JavaScript libraries like Prism.js or Highlight.js.

## ⚠ Common Errors / Mistakes
- Using `<code>` for multi-line code without wrapping in `<pre>` (whitespace is collapsed)
- Not escaping HTML entities inside code (use `&lt;` for `<` and `&gt;` for `>`)
- Using `<pre>` without `<code>` for code blocks (less semantic)
- Adding manual line breaks instead of letting `<pre>` handle formatting
- Forgetting monospace font-family for code elements

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Display a short inline code snippet using `<code>`.
2. Show a keyboard shortcut using `<kbd>` for copy (Ctrl+C).
3. Create a preformatted block of text using `<pre>`.

**Intermediate:**
4. Create a code block with `<pre><code>` that shows a complete HTML document (remember to escape `<` and `>`).
5. Style a code block with a dark background, monospace font, and rounded corners using CSS.
6. Use `<var>` and `<samp>` together to show a programming example with variables and their output.

**Advanced:**
7. Implement Prism.js or Highlight.js on a page to add automatic syntax highlighting to code blocks.
8. Build a custom code block component with a "Copy to Clipboard" button and line numbers using CSS counters.
