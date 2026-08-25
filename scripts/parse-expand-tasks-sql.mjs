import fs from "fs";

try {
  const content = fs.readFileSync("migrations-expand-tasks.sql", "utf-8");
  const lines = content.split("\n");
  const matched = [];
  const allowedSlugs = ["fullstack", "python", "java", "mernstack", "meanstack", "aiml", "datascience", "uiux", "cybersecurity"];
  
  for (const line of lines) {
    if (line.includes("INSERT INTO public.tasks")) {
      const match = allowedSlugs.some(slug => line.includes(`'${slug}'`));
      if (match) {
        matched.push(line.trim());
      }
    }
  }
  
  console.log(`Found ${matched.length} insert statements for allowed domains.`);
  // print first 20
  console.log(matched.slice(0, 20).join("\n"));
} catch (e) {
  console.error(e);
}
