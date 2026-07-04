import { copyFile, cp, mkdir, rm, writeFile } from "node:fs/promises";

const contactPhone = String(process.env.CONTACT_PHONE || "").replace(/\D/g, "");
const isVercelBuild = process.env.VERCEL === "1";

if (isVercelBuild && !contactPhone) {
  throw new Error("CONTACT_PHONE is not set for this Vercel deployment.");
}

const filesToCopy = [
  "index.html",
  "experiences.html",
  "gallery.html",
  "blogs.html",
  "history-of-gokarna.html",
  "beaches-of-gokarna.html",
  "best-time-to-visit-gokarna.html",
  "gokarna-in-monsoon.html",
  "gokarna-trip-planning-guide.html",
  "contact.html",
  "styles.css",
  "script.js",
  "sitemap.xml",
  "sitemap_index.xml",
  "robots.txt",
  "llms.txt",
];

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });

await Promise.all(filesToCopy.map((file) => copyFile(file, `dist/${file}`)));
await cp("assets", "dist/assets", { recursive: true });
await copyFile("assets/logo.png", "dist/logo.png");
await copyFile("assets/favicon.ico", "dist/favicon.ico");

await writeFile(
  "dist/env-config.js",
  `window.DISCOVER_GOKARNA_CONFIG = ${JSON.stringify({ contactPhone }, null, 2)};\n`,
  "utf8"
);

if (!contactPhone) {
  console.warn("CONTACT_PHONE is not set. WhatsApp links will be disabled.");
}
