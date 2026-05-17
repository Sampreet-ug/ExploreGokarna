import { writeFile } from "node:fs/promises";

const contactPhone = String(process.env.CONTACT_PHONE || "").replace(/\D/g, "");
const isVercelBuild = process.env.VERCEL === "1";

if (isVercelBuild && !contactPhone) {
  throw new Error("CONTACT_PHONE is not set for this Vercel deployment.");
}

const config = {
  contactPhone,
};

await writeFile(
  "env-config.js",
  `window.DISCOVER_GOKARNA_CONFIG = ${JSON.stringify(config, null, 2)};\n`,
  "utf8"
);

if (!contactPhone) {
  console.warn("CONTACT_PHONE is not set. WhatsApp links will be disabled.");
}
