import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(root, "src");
const publicRoot = path.join(root, "public");
const assetRoot = path.join(publicRoot, "assets");
const githubLimit = 100 * 1024 * 1024;

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

const references = new Set();
for (const sourceFile of walk(sourceRoot)) {
  const content = fs.readFileSync(sourceFile, "utf8");
  for (const match of content.matchAll(/\/assets\/[^\s"'`)]+/g)) {
    references.add(match[0]);
  }
}

const missing = [...references].filter((reference) => {
  const relativePath = reference.replace(/^\//, "").split("/").join(path.sep);
  return !fs.existsSync(path.join(publicRoot, relativePath));
});

const largeFiles = walk(assetRoot)
  .map((file) => ({ file, size: fs.statSync(file).size }))
  .filter(({ size }) => size >= githubLimit)
  .sort((a, b) => b.size - a.size);

console.log(`Asset references: ${references.size}`);
console.log(`Missing assets: ${missing.length}`);
console.log(`Files requiring Git LFS (>100 MB): ${largeFiles.length}`);

for (const reference of missing) console.error(`MISSING ${reference}`);
for (const { file, size } of largeFiles) {
  const relative = path.relative(root, file);
  console.log(`LFS ${(size / 1024 / 1024).toFixed(2)} MB ${relative}`);
}

if (missing.length > 0) process.exitCode = 1;

