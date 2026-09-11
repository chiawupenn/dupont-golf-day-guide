import { copyFile, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";
import { transformWithEsbuild } from "vite";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectDirectory = resolve(scriptDirectory, "..");
const outputDirectory = join(projectDirectory, "docs");
const publicDirectory = join(projectDirectory, "public");

const pageSource = await readFile(join(projectDirectory, "app/guide.tsx"), "utf8");
const transformed = await transformWithEsbuild(pageSource, "app/guide.tsx", {
  format: "esm",
  jsx: "automatic",
  loader: "tsx",
  target: "es2022",
});

const jsxRuntimeUrl = import.meta.resolve("react/jsx-runtime");
const executablePage = transformed.code.replace(
  'from "react/jsx-runtime"',
  `from ${JSON.stringify(jsxRuntimeUrl)}`,
);
const pageModule = await import(
  `data:text/javascript;base64,${Buffer.from(executablePage).toString("base64")}`
);
const basePath = "/dupont-golf-day-guide";
const siteUrl = `https://chiawupenn.github.io${basePath}/`;
function renderDocument(courseId, route) {
const courseName = courseId === "nemours" ? "Nemours Course" : "Championship Course";
const pageUrl = `${siteUrl}${route}`;
const pageMarkup = renderToStaticMarkup(pageModule.default({ courseId, basePath }));
return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#003366" />
    <title>DuPont ${courseName} | Guest Arrival Guide</title>
    <meta name="description" content="Our ${courseName} round: driving range, course-specific parking, starters shed directions, and tee distances." />
    <link rel="canonical" href="${pageUrl}" />
    <link rel="icon" href="${basePath}/favicon.svg" />
    <link rel="stylesheet" href="${basePath}/styles.css" />
    <meta property="og:title" content="DuPont ${courseName} | Guest Arrival Guide" />
    <meta property="og:description" content="Our ${courseName} round: warm up, re-park, and arrive 10 minutes early." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:image" content="${siteUrl}og.png" />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  <body>${pageMarkup}</body>
</html>
`;
}

const globalStyles = await readFile(join(projectDirectory, "app/globals.css"), "utf8");
const pageStyles = globalStyles
  .replace('@import "tailwindcss";\n', "")
  .replaceAll('url("/', 'url("./');

await rm(outputDirectory, { force: true, recursive: true });
await mkdir(outputDirectory, { recursive: true });
await writeFile(join(outputDirectory, "index.html"), renderDocument("championship", ""));
for (const courseId of ["championship", "nemours"]) {
  await mkdir(join(outputDirectory, courseId), { recursive: true });
  await writeFile(join(outputDirectory, courseId, "index.html"), renderDocument(courseId, `${courseId}/`));
}
await writeFile(join(outputDirectory, "styles.css"), pageStyles);
await writeFile(join(outputDirectory, ".nojekyll"), "");

for (const entry of await readdir(publicDirectory, { withFileTypes: true })) {
  if (entry.isFile()) {
    await copyFile(join(publicDirectory, entry.name), join(outputDirectory, entry.name));
  }
}

console.log(`GitHub Pages files written to ${outputDirectory}`);
