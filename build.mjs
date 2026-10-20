/*
 * Builds MooMod: wraps src/moomod.js (the readable source) in a Tampermonkey
 * userscript header and writes moomod.user.js — the file you install.
 *
 * It's dependency-free (plain Node, no npm install needed). The userscript
 * @requires the loader, which does the undetectable WebSocket hooking and
 * exposes the API MooMod is built on; MooMod itself stays readable.
 *
 *   node build.mjs                 # default loader @require
 *   node build.mjs <loaderUrl>     # point @require at your own loader upload
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const VERSION = "1.3.1";
const loaderUrl = process.argv[2] || "https://update.greasyfork.org/scripts/600256/1966644/MooMoo-js.js";

const src = fs.readFileSync(path.join(here, "src", "moomod.js"), "utf8");

const HEADER = `// ==UserScript==
// @name         MooMod
// @namespace    moomoo.js
// @version      ${VERSION}
// @description  MooMoo.io mod: instakill, biome auto-gear, click hats, legit auto heal, place spammers, arrows, reload bars, minimap. Press the menu key (default O).
// @author       al007ex
// @match        *://*/*
// @run-at       document-start
// @inject-into  page
// @require      ${loaderUrl}?v=${VERSION}
// @grant        none
// ==/UserScript==
//
// This @requires the loader above. Tampermonkey caches @require files; the ?v=
// part makes it refetch when the loader is updated. Edit @match to your server's
// origin if you want to scope it to one site.
`;

fs.writeFileSync(path.join(here, "moomod.user.js"), HEADER + "\n" + src + "\n");
console.log("wrote moomod.user.js  (@require " + loaderUrl + ")");
