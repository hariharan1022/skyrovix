import fs from "fs";
const file = "C:\\Users\\HARIHARAN S\\.gemini\\antigravity-ide\\brain\\9d023e3c-0527-40db-af25-d5395eace784\\.system_generated\\logs\\transcript_full.jsonl";
const lines = fs.readFileSync(file, "utf-8").split("\n");
for (const l of lines) {
  if (l.includes('"step_index":115') || l.includes('"step_index":117') || l.includes('"step_index":141') || l.includes('"step_index":158')) {
    const obj = JSON.parse(l);
    console.log(`=== STEP ${obj.step_index} ===`);
    console.log(JSON.stringify(obj.content || obj.tool_calls, null, 2));
  }
}
