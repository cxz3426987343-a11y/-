const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");

const nodePath = process.execPath;
const projectRoot = path.resolve(__dirname, "..");
const vitePackage = require.resolve("vite/package.json", { paths: [projectRoot] });
const viteBin = path.join(path.dirname(vitePackage), "bin", "vite.js");
const logPath = path.join(projectRoot, "logs", "vite-dev.log");
const errPath = path.join(projectRoot, "logs", "vite-dev.err.log");

fs.mkdirSync(path.dirname(logPath), { recursive: true });

const out = fs.openSync(logPath, "a");
const err = fs.openSync(errPath, "a");

const child = spawn(
  nodePath,
  [viteBin, "--host", "127.0.0.1", "--port", "4176", "--strictPort"],
  {
    detached: true,
    stdio: ["ignore", out, err],
    windowsHide: true,
    cwd: projectRoot,
    env: {
      ...process.env,
      BROWSER: "none",
    },
  },
);

child.unref();
fs.closeSync(out);
fs.closeSync(err);
console.log(`Started Vite dev server with PID ${child.pid}`);
