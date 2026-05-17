import { writeFile } from "node:fs/promises";

const contactPhone = String(process.env.CONTACT_PHONE || "").replace(/\D/g, "");

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
