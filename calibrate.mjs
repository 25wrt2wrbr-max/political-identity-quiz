/* Recalibrate ARCHETYPES vectors in quiz.html to reachable centroids.
   Usage: node calibrate.mjs            (report only)
          node calibrate.mjs --write    (rewrite quiz.html) */
import fs from "fs";
const path = "quiz.html";
const html = fs.readFileSync(path, "utf8");
const js = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const cut = js.indexOf("/* ------------------------------------------------------------------ *\n * UI");
let core = js.slice(0, cut);
core += "\nexport function setAnswers(a){ answers = a; }\nexport { AXES, AXIS_KEYS, QUESTIONS, score, ARCHETYPES };";
fs.writeFileSync("/tmp/piq_calibmod.mjs", core);
const { AXES, AXIS_KEYS, QUESTIONS, score, setAnswers, ARCHETYPES } = await import("/tmp/piq_calibmod.mjs");

const centroid = a => { setAnswers(a); const s = score(); const c = {}; AXIS_KEYS.forEach(k => c[k] = s.raw[k]); return c; };

function solve(intent, iters = 400) {
  const a = {};
  QUESTIONS.forEach((q, i) => {
    let best = 0, bs = Infinity;
    q.o.forEach((o, j) => {
      let d = 0;
      AXIS_KEYS.forEach(k => { d += Math.pow((o.codes[k] || 0) / 2 - intent[k] / 100, 2); });
      if (d < bs) { bs = d; best = j; }
    });
    a[i] = best;
  });
  const dist = c => { let d = 0; AXIS_KEYS.forEach(k => { d += Math.pow(c[k] - intent[k], 2); }); return Math.sqrt(d / AXIS_KEYS.length); };
  let cur = dist(centroid(a));
  for (let it = 0; it < iters; it++) {
    let any = false;
    for (let i = 0; i < QUESTIONS.length; i++) {
      const orig = a[i]; let b = orig, bd = cur;
      for (let o = 0; o < QUESTIONS[i].o.length; o++) {
        if (o === orig) continue;
        a[i] = o;
        const d = dist(centroid(a));
        if (d < bd - 0.01) { bd = d; b = o; }
      }
      a[i] = b;
      if (bd < cur - 0.01) { cur = bd; any = true; }
    }
    if (!any) break;
  }
  return { a, c: centroid(a), d: dist(centroid(a)) };
}

const results = [];
for (const arch of ARCHETYPES) {
  const r = solve(arch.v);
  const v = {}; AXIS_KEYS.forEach(k => v[k] = Math.round(r.c[k]));
  setAnswers(r.a);
  const s = score();
  const ok = s.ranked[0].n === arch.n;
  results.push({ n: arch.n, v, ok });
  console.log((ok ? "ok  " : "MISS") + " " + arch.n.slice(0, 40).padEnd(42) + JSON.stringify(v) + "  d=" + r.d.toFixed(1));
}

// pairwise separation
const pairs = [];
for (let i = 0; i < results.length; i++) for (let j = i + 1; j < results.length; j++) {
  let d = 0; AXIS_KEYS.forEach(k => d += Math.pow(results[i].v[k] - results[j].v[k], 2));
  pairs.push([Math.sqrt(d), results[i].n, results[j].n]);
}
pairs.sort((a, b) => a[0] - b[0]);
console.log("\nCLOSEST PAIRS:");
pairs.slice(0, 6).forEach(p => console.log("  " + p[0].toFixed(1).padStart(6) + "  " + p[1] + " <-> " + p[2]));

if (process.argv.includes("--write")) {
  let out = html;
  for (const r of results) {
    const re = new RegExp(`(\\{n:"${r.n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}",[\\s\\S]*?v:\\{)[^}]*(\\})`);
    out = out.replace(re, `$1${AXIS_KEYS.map(k => k + ":" + r.v[k]).join(",")}$2`);
  }
  fs.writeFileSync(path, out);
  console.log("\nWROTE calibrated vectors to quiz.html");
}
