import fs from "fs";
import path from "path";

const rootDir = "C:\\Users\\HARIHARAN S\\.gemini\\antigravity-ide\\brain";

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== "node_modules" && file !== ".git") {
        results = results.concat(walk(fullPath));
      }
    } else {
      if (file.endsWith(".jsonl") || file.endsWith(".log") || file.endsWith(".txt")) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

try {
  console.log("Scanning brain logs recursively...");
  const files = walk(rootDir);
  console.log(`Found ${files.length} log files to scan.`);
  
  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    if (content.includes('"github_url"') && content.includes('"notes"')) {
      console.log(`Found submissions print in: ${file}`);
      // let's extract a sample or write it to a file
      fs.writeFileSync("restored_raw_submissions.txt", content);
      console.log("Wrote matching log to restored_raw_submissions.txt");
      break;
    }
  }
} catch (e) {
  console.error(e);
}
