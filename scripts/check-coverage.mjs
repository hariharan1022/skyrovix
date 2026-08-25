import fs from "fs";
const constants = fs.readFileSync("src/lib/constants.ts", "utf8");
const details = fs.readFileSync("src/lib/internship-detail-content.ts", "utf8");
const tasks = fs.readFileSync("src/lib/tasks-data.ts", "utf8");
const images1 = fs.readFileSync("src/routes/domains.index.tsx", "utf8");
const images2 = fs.readFileSync("src/routes/domains.$slug.tsx", "utf8");

const domainSlugs = [...constants.matchAll(/slug: "([^"]+)"/g)].map(m => m[1]);
const detailSlugs = [...details.matchAll(/^  (\w+): detail\(/gm)].map(m => m[1]);
const taskSlugs = [...tasks.matchAll(/slug: "([^"]+)"/g)].map(m => m[1]);
const imgSlugs1 = [...images1.matchAll(/^\s+(\w+):/gm)].map(m => m[1]).filter(s => s !== "Record");
const imgSlugs2 = [...images2.matchAll(/^\s+(\w+):/gm)].map(m => m[1]).filter(s => s !== "Record");

console.log("DOMAINS:", domainSlugs.length, domainSlugs);
console.log("DETAILS:", detailSlugs.length);
console.log("TASKS:", taskSlugs.length);
console.log("IMG_LIST:", imgSlugs1.length);
console.log("IMG_DETAIL:", imgSlugs2.length);

const missingDetails = domainSlugs.filter(s => !detailSlugs.includes(s));
const missingTasks = domainSlugs.filter(s => !taskSlugs.includes(s));
const missingImg1 = domainSlugs.filter(s => !imgSlugs1.includes(s));
const missingImg2 = domainSlugs.filter(s => !imgSlugs2.includes(s));

if (missingDetails.length) console.log("MISSING DETAILS:", missingDetails);
if (missingTasks.length) console.log("MISSING TASKS:", missingTasks);
if (missingImg1.length) console.log("MISSING IMG_LIST:", missingImg1);
if (missingImg2.length) console.log("MISSING IMG_DETAIL:", missingImg2);

if (!missingDetails.length && !missingTasks.length && !missingImg1.length && !missingImg2.length)
  console.log("ALL COVERAGE OK");
