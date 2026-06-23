import { useRef, useEffect, useState } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { php } from "@codemirror/lang-php";
import { sql } from "@codemirror/lang-sql";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Copy, Check } from "lucide-react";

type Lang = "javascript" | "python" | "java" | "html" | "css" | "php" | "sql";

const LANG_EXT: Record<Lang, ReturnType<typeof javascript>> = {
  javascript: javascript(),
  python: python(),
  java: java(),
  html: html(),
  css: css(),
  php: php(),
  sql: sql(),
};

const LANG_BOILERPLATE: Record<Lang, string> = {
  javascript: '// Write your JavaScript code here\n\nconsole.log("Hello, World!");',
  python: '# Write your Python code here\n\nprint("Hello, World!")',
  java: '// Write your Java code here\n\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}',
  html: '<!-- Write your HTML here -->\n\n<h1>Hello, World!</h1>\n<p>Start coding...</p>',
  css: '/* Write your CSS here */\n\nbody {\n  background: #f0f0f0;\n  font-family: sans-serif;\n}',
  php: '<?php\n// Write your PHP code here\n\necho "Hello, World!";\n?>',
  sql: '-- Write your SQL here\n\nSELECT "Hello, World!" AS greeting;',
};

interface CodeEditorProps {
  code?: string;
  language?: Lang;
  readOnly?: boolean;
  showRun?: boolean;
  onChange?: (code: string) => void;
}

const SIMULATED_OUTPUTS: Record<string, string> = {
  'console.log': 'Hello, World!\n',
  'print(': 'Hello, World!\n',
  'System.out.println': 'Hello, World!\n',
  'echo "': 'Hello, World!\n',
  "echo '": 'Hello, World!\n',
  'SELECT': ' greeting\n-----------\nHello, World!\n(1 row)',
  '<h1>': '<h1>Hello, World!</h1>\n<p>Start coding...</p>',
  'body {': '/* CSS parsed successfully */\nbody { background: #f0f0f0; font-family: sans-serif; }',
};

export function CodeEditor({ code, language = "javascript", readOnly, showRun = true, onChange }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [output, setOutput] = useState<string>("");
  const [showOutput, setShowOutput] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!editorRef.current) return;
    if (viewRef.current) {
      viewRef.current.destroy();
    }
    const startCode = code ?? LANG_BOILERPLATE[language];
    const state = EditorState.create({
      doc: startCode,
      extensions: [
        basicSetup,
        oneDark,
        LANG_EXT[language],
        EditorView.editable.of(!readOnly),
        EditorView.updateListener.of((u) => {
          if (u.docChanged && onChange) {
            onChange(u.state.doc.toString());
          }
        }),
      ],
    });
    const view = new EditorView({ state, parent: editorRef.current });
    viewRef.current = view;
    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [language, readOnly]);

  const getCode = () => viewRef.current?.state.doc.toString() ?? "";

  const handleRun = () => {
    const c = getCode();
    const lines = c.split("\n");
    let result = "";

    for (const [key, val] of Object.entries(SIMULATED_OUTPUTS)) {
      if (c.includes(key)) {
        result = val;
        break;
      }
    }

    if (language === "html") {
      result = "▶ HTML rendered in browser (simulated)";
    } else if (!result) {
      result = "✓ Code executed successfully (no output)\n";
    }

    setOutput(result);
    setShowOutput(true);
  };

  const handleReset = () => {
    if (!viewRef.current) return;
    viewRef.current.dispatch({
      changes: { from: 0, to: viewRef.current.state.doc.length, insert: LANG_BOILERPLATE[language] },
    });
    setOutput("");
    setShowOutput(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-border/50 overflow-hidden bg-[#1e1e1e]">
      <div className="flex items-center justify-between px-3 py-2 bg-[#252526] border-b border-white/10">
        <span className="text-[11px] text-gray-400 font-mono uppercase tracking-wider">{language}</span>
        <div className="flex items-center gap-1">
          {showRun && (
            <Button size="sm" variant="ghost" className="h-7 text-[11px] gap-1 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30"
              onClick={handleRun}>
              <Play className="size-3" /> Run
            </Button>
          )}
          <Button size="sm" variant="ghost" className="h-7 text-[11px] gap-1 text-gray-400 hover:text-white" onClick={handleReset}>
            <RotateCcw className="size-3" /> Reset
          </Button>
          <Button size="sm" variant="ghost" className="h-7 text-[11px] gap-1 text-gray-400 hover:text-white" onClick={handleCopy}>
            {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>
      <div ref={editorRef} className="text-sm" />
      {showOutput && (
        <div className="border-t border-white/10">
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#1a1a1a]">
            <span className="text-[10px] text-gray-500 font-mono uppercase">Output</span>
            <button onClick={() => setShowOutput(false)} className="text-[10px] text-gray-500 hover:text-white">&times;</button>
          </div>
          <pre className="px-4 py-3 text-xs font-mono text-green-400 bg-[#121212] overflow-x-auto whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
}
