import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, RotateCcw, AlertTriangle, Code2, Terminal, HelpCircle } from "lucide-react";
import { toast } from "sonner";

// Basic default code templates per language
const CODE_TEMPLATES: Record<string, string> = {
  javascript: `// Write your JavaScript code here
const message = "Hello from JavaScript!";
console.log(message);

function add(a, b) {
  return a + b;
}
console.log("Sum of 10 and 20:", add(10, 20));
`,
  python: `# Write your Python code here
message = "Hello from Python!"
print(message)

# Basic calculations
x = 10
y = 20
total = x + y
print("Total sum:", total)

# Basic loop
print("Counting from 0 to 4:")
for i in range(5):
    print("Number:", i)

# Simple condition
if total > 15:
    print("Sum is greater than 15!")
else:
    print("Sum is 15 or less")
`,
  html: `<!-- Write your HTML & CSS here -->
<div class="card">
  <h1>Skyrovix Sandbox</h1>
  <p>Edit this HTML to see real-time updates.</p>
  <button id="btn">Click Me</button>
</div>

<style>
  body {
    font-family: 'Inter', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 150px;
    background: #f1f5f9;
    margin: 0;
  }
  .card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    text-align: center;
  }
  h1 { color: #07284a; margin: 0 0 10px 0; font-size: 1.25rem; }
  p { color: #64748b; font-size: 0.875rem; margin: 0 0 15px 0; }
  button {
    background: #1d4ed8;
    color: white;
    border: 0;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
  }
  button:hover { background: #1e40af; }
</style>

<script>
  document.getElementById('btn').addEventListener('click', () => {
    alert('Hello from sandbox script!');
  });
</script>
`,
  java: `// Java snippet runner (boilerplate is auto-handled)
public class Main {
    public static void main(String[] args) {
        String msg = "Hello from Java!";
        System.out.println(msg);
        
        int x = 40;
        int y = 2;
        System.out.println("Result: " + (x + y));
    }
}
`,
  php: `<?php
// Write your PHP code here
$greeting = "Hello from PHP!";
echo $greeting;
echo "\\n";

$a = 5;
$b = 15;
$sum = $a + $b;
echo "Sum is: " . $sum;
`,
  sql: `-- SQL interactive query interface
-- Supported tables: Employees, Inventory
-- Try SELECT * FROM Employees;
-- Try SELECT item_name, stock FROM Inventory WHERE stock < 50;

SELECT * FROM Employees WHERE salary > 80000;
`
};

// Simulated mock database for SQL
const MOCK_DB: Record<string, any[]> = {
  employees: [
    { id: 1, name: "Aravind", role: "Full Stack Developer", salary: 80000, dept: "Engineering" },
    { id: 2, name: "Bhavana", role: "UI/UX Designer", salary: 70000, dept: "Design" },
    { id: 3, name: "Chaitanya", role: "Data Scientist", salary: 95000, dept: "Analytics" },
    { id: 4, name: "Divya", role: "Cyber Security Analyst", salary: 85000, dept: "Security" },
    { id: 5, name: "Eshwar", role: "Cloud Architect", salary: 110000, dept: "Engineering" }
  ],
  inventory: [
    { item_id: 101, item_name: "Laptop", stock: 45, price: 65000 },
    { item_id: 102, item_name: "Monitor", stock: 120, price: 12000 },
    { item_id: 103, item_name: "Keyboard", stock: 300, price: 1500 },
    { item_id: 104, item_name: "Mouse", stock: 0, price: 800 },
    { item_id: 105, item_name: "Headphones", stock: 15, price: 3000 }
  ]
};

interface CodeEditorProps {
  language: string;
  initialCode?: string | null;
}

export function CodeEditor({ language = "javascript", initialCode }: CodeEditorProps) {
  const normalizedLang = language.toLowerCase();
  const [code, setCode] = useState(() => initialCode || CODE_TEMPLATES[normalizedLang] || "");
  const [output, setOutput] = useState<string[]>([]);
  const [sqlResult, setSqlResult] = useState<any[] | null>(null);
  const [iframeKey, setIframeKey] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const isHtml = normalizedLang === "html";

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  // If initialCode changes, update the editor value
  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    }
  }, [initialCode]);

  // Transpilation/Execution Engine
  const runCode = () => {
    setIsRunning(true);
    setOutput([]);
    setSqlResult(null);

    // Give a slight visual feedback delay
    setTimeout(() => {
      try {
        if (normalizedLang === "javascript") {
          runJS(code);
        } else if (normalizedLang === "python") {
          runPython(code);
        } else if (normalizedLang === "java") {
          runJava(code);
        } else if (normalizedLang === "php") {
          runPHP(code);
        } else if (normalizedLang === "sql") {
          runSQL(code);
        } else if (isHtml) {
          // Trigger iframe update
          setIframeKey((k) => k + 1);
        }
      } catch (err: any) {
        setOutput([`Execution Error: ${err.message}`]);
      }
      setIsRunning(false);
    }, 400);
  };

  const runJS = (jsCode: string) => {
    const logs: string[] = [];
    const originalLog = console.log;
    
    // Override console.log temporarily
    console.log = (...args) => {
      logs.push(
        args
          .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg)))
          .join(" ")
      );
    };

    try {
      // Execute standard JavaScript
      const fn = new Function(jsCode);
      fn();
      setOutput(logs.length > 0 ? logs : ["Code executed successfully (no console output)."]);
    } catch (err: any) {
      setOutput([...logs, `Error: ${err.message}`]);
    } finally {
      console.log = originalLog;
    }
  };

  const runPython = (pyCode: string) => {
    // Basic Python to JS Transpiler
    const logs: string[] = [];
    const pyLines = pyCode.split("\n");
    const jsLines: string[] = [];
    const indentStack: number[] = [0];

    // Transpilation logic
    for (let i = 0; i < pyLines.length; i++) {
      const line = pyLines[i];
      const trimmed = line.trim();

      // Comment or empty lines
      if (trimmed.startsWith("#") || trimmed === "") {
        jsLines.push(line.replace("#", "//"));
        continue;
      }

      // Check indentation changes
      const currentIndent = line.length - line.trimStart().length;
      while (currentIndent < indentStack[indentStack.length - 1]) {
        indentStack.pop();
        const parentIndent = indentStack[indentStack.length - 1];
        jsLines.push(" ".repeat(parentIndent) + "}");
      }

      let parsedLine = line;

      // Swap booleans & none
      parsedLine = parsedLine.replace(/\bTrue\b/g, "true");
      parsedLine = parsedLine.replace(/\bFalse\b/g, "false");
      parsedLine = parsedLine.replace(/\bNone\b/g, "null");

      // print(...) -> console.log(...)
      parsedLine = parsedLine.replace(/print\((.*)\)/g, "console.log($1)");

      // if condition:
      if (trimmed.startsWith("if ") && trimmed.endsWith(":")) {
        const cond = trimmed.substring(3, trimmed.length - 1).trim();
        parsedLine = parsedLine.replace(trimmed, `if (${cond}) {`);
        indentStack.push(currentIndent + 4);
      } else if (trimmed.startsWith("elif ") && trimmed.endsWith(":")) {
        const cond = trimmed.substring(5, trimmed.length - 1).trim();
        parsedLine = parsedLine.replace(trimmed, `else if (${cond}) {`);
        indentStack.push(currentIndent + 4);
      } else if (trimmed === "else:") {
        parsedLine = parsedLine.replace("else:", "else {");
        indentStack.push(currentIndent + 4);
      }

      // Loops
      if (trimmed.startsWith("for ") && trimmed.endsWith(":")) {
        const header = trimmed.substring(4, trimmed.length - 1).trim();
        const parts = header.split(" in ");
        if (parts.length === 2) {
          const varName = parts[0].trim();
          const iterable = parts[1].trim();
          if (iterable.startsWith("range(")) {
            const rangeArgs = iterable.substring(6, iterable.length - 1).split(",").map(s => s.trim());
            let start = "0", end = "0", step = "1";
            if (rangeArgs.length === 1) end = rangeArgs[0];
            else if (rangeArgs.length === 2) { start = rangeArgs[0]; end = rangeArgs[1]; }
            else if (rangeArgs.length === 3) { start = rangeArgs[0]; end = rangeArgs[1]; step = rangeArgs[2]; }
            parsedLine = parsedLine.replace(trimmed, `for (let ${varName} = ${start}; ${varName} < ${end}; ${varName} += ${step}) {`);
          } else {
            parsedLine = parsedLine.replace(trimmed, `for (let ${varName} of ${iterable}) {`);
          }
          indentStack.push(currentIndent + 4);
        }
      }

      // functions
      if (trimmed.startsWith("def ") && trimmed.endsWith(":")) {
        const funcHeader = trimmed.substring(4, trimmed.length - 1).trim();
        parsedLine = parsedLine.replace(trimmed, `function ${funcHeader} {`);
        indentStack.push(currentIndent + 4);
      }

      jsLines.push(parsedLine);
    }

    // Close remaining brackets
    while (indentStack.length > 1) {
      indentStack.pop();
      const parentIndent = indentStack[indentStack.length - 1];
      jsLines.push(" ".repeat(parentIndent) + "}");
    }

    // Execute transpiled script
    const finalJs = jsLines.join("\n");
    const originalLog = console.log;
    console.log = (...args) => {
      logs.push(args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg))).join(" "));
    };

    try {
      const fn = new Function(finalJs);
      fn();
      setOutput(logs.length > 0 ? logs : ["Code executed successfully (no console output)."]);
    } catch (err: any) {
      setOutput([...logs, `Transpilation/Runtime Error: ${err.message}`]);
    } finally {
      console.log = originalLog;
    }
  };

  const runJava = (javaCode: string) => {
    // Strip Class Main boilerplate and extract main body
    let body = javaCode;
    const mainRegex = /public\s+static\s+void\s+main\s*\(\s*String\s*\[\s*\]\s+args\s*\)\s*\{([\s\S]*)\}\s*\}\s*$/m;
    const match = javaCode.match(mainRegex);
    if (match && match[1]) {
      body = match[1];
    } else {
      // Try mapping standard body
      body = body.replace(/public\s+class\s+\w+\s*\{/g, "")
                 .replace(/public\s+static\s+void\s+main\s*\(.*\)\s*\{/g, "");
      // strip matching ending braces
      body = body.substring(0, body.lastIndexOf("}"));
      body = body.substring(0, body.lastIndexOf("}"));
    }

    // Translate System.out.println
    body = body.replace(/System\.out\.println\s*\((.*)\)\s*;/g, "console.log($1);");
    body = body.replace(/System\.out\.print\s*\((.*)\)\s*;/g, "console.log($1);");
    // Translate standard declarations
    body = body.replace(/\bString\s+/g, "let ")
               .replace(/\bint\s+/g, "let ")
               .replace(/\bdouble\s+/g, "let ")
               .replace(/\bboolean\s+/g, "let ");

    runJS(body);
  };

  const runPHP = (phpCode: string) => {
    let body = phpCode.replace("<?php", "").replace("?>", "").trim();
    // Replace echo with console.log
    body = body.replace(/echo\s+(.*)\s*;/g, "console.log($1);");
    // Replace variables (e.g. $x -> x)
    body = body.replace(/\$(\w+)/g, "$1");
    // Replace string concatenations (e.g. "x" . y -> "x" + y)
    body = body.replace(/\s+\.\s+/g, " + ");

    runJS(body);
  };

  const runSQL = (sqlCode: string) => {
    const cleanSql = sqlCode.trim().replace(/;$/, "");
    // Basic regex: SELECT columns FROM table [WHERE conditions]
    const selectRegex = /^SELECT\s+(.+?)\s+FROM\s+([a-zA-Z0-9_]+)(?:\s+WHERE\s+(.+?))?(?:\s+ORDER\s+BY\s+(.+?))?$/i;
    const match = cleanSql.match(selectRegex);

    if (!match) {
      setOutput([
        "Error: Query syntax unsupported.",
        "Ensure query format matches: SELECT columns FROM Table WHERE condition"
      ]);
      return;
    }

    const [, colsStr, tableName, whereCond, orderByStr] = match;
    const tableKey = tableName.toLowerCase().trim();
    const rows = MOCK_DB[tableKey];

    if (!rows) {
      setOutput([`Error: Table '${tableName}' not found. Try queries on 'Employees' or 'Inventory'.`]);
      return;
    }

    let filtered = [...rows];

    // Filter WHERE
    if (whereCond) {
      try {
        const jsCond = whereCond
          .replace(/=/g, "==")
          .replace(/\band\b/gi, "&&")
          .replace(/\bor\b/gi, "||")
          .trim();

        // Create a function evaluator for the row context
        filtered = filtered.filter((row) => {
          try {
            // Build sandbox environment variables for evaluate
            const keys = Object.keys(row);
            const vals = Object.values(row);
            const fn = new Function(...keys, `return (${jsCond});`);
            return fn(...vals);
          } catch {
            return false; // exclude on error
          }
        });
      } catch (err: any) {
        setOutput([`WHERE Clause Error: ${err.message}`]);
        return;
      }
    }

    // Sort ORDER BY
    if (orderByStr) {
      const parts = orderByStr.trim().split(" ");
      const colName = parts[0];
      const isDesc = parts[1]?.toLowerCase() === "desc";
      filtered.sort((a, b) => {
        const valA = a[colName];
        const valB = b[colName];
        if (typeof valA === "number" && typeof valB === "number") {
          return isDesc ? valB - valA : valA - valB;
        }
        return isDesc
          ? String(valB).localeCompare(String(valA))
          : String(valA).localeCompare(String(valB));
      });
    }

    // Select Columns
    const cols = colsStr.split(",").map((c) => c.trim().toLowerCase());
    const finalData = filtered.map((row) => {
      if (cols.includes("*")) return row;
      const res: Record<string, any> = {};
      cols.forEach((col) => {
        if (row[col] !== undefined) res[col] = row[col];
        // match specific keys (e.g. item_id, item_name)
        else {
          const matchKey = Object.keys(row).find(k => k.toLowerCase() === col);
          if (matchKey) res[col] = row[matchKey];
        }
      });
      return res;
    });

    setSqlResult(finalData);
    setOutput([`Query returned ${finalData.length} row(s).`]);
  };

  const resetCode = () => {
    setCode(CODE_TEMPLATES[normalizedLang] || "");
    setOutput([]);
    setSqlResult(null);
  };

  return (
    <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-4 w-full h-[520px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/80 shadow-xl bg-white dark:bg-[#090d16]">
      {/* Code Editor Panel */}
      <div className="flex flex-col h-full border-r border-slate-100 dark:border-slate-800/60 bg-[#fafafa] dark:bg-[#0c101d]">
        <div className="flex items-center justify-between px-5 py-3 bg-slate-50 dark:bg-[#0d1321] border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-2">
            <Code2 className="size-4 text-blue-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{normalizedLang} Code Editor</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 rounded-lg text-xs gap-1 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350"
              onClick={resetCode}
            >
              <RotateCcw className="size-3.5" />
              Reset
            </Button>
            <Button
              size="sm"
              className="h-8 rounded-lg text-xs gap-1.5 brand-gradient text-white border-0 shadow-md font-semibold hover:opacity-90 active:scale-95 transition-all duration-150 px-4"
              onClick={runCode}
              disabled={isRunning}
            >
              {isRunning ? (
                <>
                  <span className="size-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="size-3.5 fill-current" />
                  Run Code
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Text Area Code Editor with Line Numbers */}
        <div className="flex-1 flex overflow-hidden bg-white dark:bg-[#0a0e1a]">
          {/* Line Numbers Column */}
          <div
            ref={lineNumbersRef}
            className="select-none text-right pr-3 pl-4 py-4 text-slate-400/50 dark:text-slate-600 font-mono text-[13px] leading-relaxed bg-[#fbfcfd] dark:bg-[#080c16]/50 border-r border-slate-100 dark:border-slate-800/40 overflow-hidden whitespace-pre pointer-events-none min-w-[3.2rem]"
          >
            {Array.from({ length: code.split("\n").length }, (_, i) => i + 1).join("\n")}
          </div>

          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onScroll={handleScroll}
            className="flex-1 h-full p-4 pl-3 font-mono text-[13px] leading-relaxed resize-none border-0 outline-none focus:ring-0 bg-transparent text-slate-850 dark:text-slate-200 placeholder-muted-foreground/30 selection:bg-blue-600/10"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Output Panel */}
      <div className="flex flex-col h-full bg-[#030712] text-slate-350">
        <div className="flex items-center gap-1.5 px-5 py-3 bg-black/40 border-b border-white/5">
          <Terminal className="size-3.5 text-emerald-500" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Output Console</span>
        </div>

        <div className="flex-1 overflow-auto p-5 font-mono text-xs space-y-2">
          {/* HTML Iframe Preview */}
          {isHtml ? (
            <div className="w-full h-full bg-white rounded-lg overflow-hidden border border-white/5">
              <iframe
                key={iframeKey}
                srcDoc={code}
                title="HTML Preview Sandbox"
                sandbox="allow-scripts"
                className="w-full h-full border-0"
              />
            </div>
          ) : sqlResult && sqlResult.length > 0 ? (
            // SQL Result View
            <div className="overflow-x-auto rounded-lg border border-white/5">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    {Object.keys(sqlResult[0]).map((key) => (
                      <th key={key} className="px-3 py-1.5 text-slate-400 capitalize font-semibold border-r border-white/5">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sqlResult.map((row, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                      {Object.values(row).map((val: any, vidx) => (
                        <td key={vidx} className="px-3 py-1.5 text-slate-300 border-r border-white/5">{typeof val === "object" ? JSON.stringify(val) : String(val)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // Standard console log outputs
            <div className="space-y-1.5 select-text selection:bg-emerald-500/20">
              {output.length > 0 ? (
                output.map((line, idx) => {
                  const isError = line.startsWith("Error:") || line.startsWith("Transpilation/Runtime Error:") || line.startsWith("Execution Error:");
                  return (
                    <div key={idx} className={isError ? "text-red-400 font-semibold" : "text-emerald-400"}>
                      {line}
                    </div>
                  );
                })
              ) : (
                <div className="text-slate-500 text-xs flex flex-col items-center justify-center h-full py-16 gap-3 select-none">
                  <div className="size-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-450 border border-slate-800">
                    <Terminal className="size-5" />
                  </div>
                  <p className="font-semibold text-slate-450">Console Idle</p>
                  <p className="text-[11px] text-slate-500 text-center max-w-[200px]">Run your script to display output and debug errors here.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
