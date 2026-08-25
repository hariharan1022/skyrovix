import fs from "fs";

try {
  let content;
  try {
    content = fs.readFileSync("complete_setup.sql", "utf-8");
  } catch (e) {
    content = fs.readFileSync("complete_setup.sql", "utf-16le");
  }
  
  const lines = content.split("\n");
  lines.forEach((line, idx) => {
    if (line.toLowerCase().includes("create table")) {
      console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
  });
} catch (e) {
  console.error(e);
}
