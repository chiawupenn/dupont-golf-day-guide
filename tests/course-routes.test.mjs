import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import test from "node:test";

const variants = [
  { id: "championship", name: "Championship Course", map: "qXsCyQuoFHJtH1ZU9", image: "clubhouse-parking-map.jpg" },
  { id: "nemours", name: "Nemours Course", map: "GgVCGg45UCLiYESKA", image: "nemours-parking-map.png" },
];

function checkGuide(html, course, basePath) {
  html = html.replaceAll("<!-- -->", "");
  assert.ok(html.includes(`Playing</span> ${course.name}`));
  assert.ok(html.includes(`href="${basePath}/${course.id}/#clubhouse" aria-current="page"`));
  assert.ok(html.includes(`data-copy-course-link="${basePath}/${course.id}/"`));
  assert.ok(html.includes('class="course-tabs header-nav"'));
  assert.ok(html.includes('class="map-link course-copy-button"'));
  assert.ok(html.includes('grid-template-columns:repeat(auto-fit, minmax(min(100%, 240px), 1fr))'));
  const parking = html.split('id="clubhouse"')[1].split("</article>")[0];
  assert.ok(parking.includes(`https://maps.app.goo.gl/${course.map}`));
  assert.ok(parking.includes(`src="${basePath}/${course.image}"`));
  const other = variants.find((variant) => variant.id !== course.id);
  assert.ok(!parking.includes(other.map));
  assert.ok(!parking.includes(other.image));
  assert.ok(html.includes("BMGBEW9VfpXXGxVp7"));
  assert.ok(html.includes("10 minutes before"));
  assert.ok(html.includes("Jericho Wu"));
}

for (const course of variants) {
  test(`GitHub ${course.name} URL renders the correct parking without JavaScript`, async () => {
    const html = await readFile(new URL(`../docs/${course.id}/index.html`, import.meta.url), "utf8");
    checkGuide(html, course, "/dupont-golf-day-guide");
    assert.ok(html.includes(`<title>DuPont ${course.name} | Guest Arrival Guide</title>`));
    assert.ok(html.includes(`href="https://chiawupenn.github.io/dupont-golf-day-guide/${course.id}/"`));
    await access(new URL(`../docs/${course.image}`, import.meta.url));
  });

  test(`Sites ${course.name} deep link renders the correct parking`, async () => {
    const { default: worker } = await import("../dist/server/index.js");
    const response = await worker.fetch(
      new Request(`http://localhost/${course.id}`, { headers: { accept: "text/html" } }),
      { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} },
    );
    assert.equal(response.status, 200);
    checkGuide(await response.text(), course, "");
  });
}

test("legacy root link still defaults to Championship", async () => {
  const html = await readFile(new URL("../docs/index.html", import.meta.url), "utf8");
  checkGuide(html, variants[0], "/dupont-golf-day-guide");
});
