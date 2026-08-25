import fs from "fs";
const file = "C:\\Users\\HARIHARAN S\\.gemini\\antigravity-ide\\brain\\b59e9b15-d5c9-4466-bf49-518806391ebf\\.system_generated\\logs\\transcript_full.jsonl";
const lines = fs.readFileSync(file, "utf-8").split("\n");
for (const l of lines) {
  if (l.includes('"step_index":421') || l.includes('"step_index":508') || l.includes('"step_index":420')) {
    console.log(l);
  }
}
