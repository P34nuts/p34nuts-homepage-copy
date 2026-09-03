import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const mediaRoot = process.env.GITHUB_PAGES_MEDIA_DIR || path.join(projectRoot, "github-pages-media");
const outputRoot = path.join(projectRoot, "dist", "public");
const outputMediaRoot = path.join(outputRoot, "manus-storage");
const siteOrigin = (process.env.GITHUB_PAGES_SITE_ORIGIN || "").replace(/\/$/, "");
const manusOrigin = "https://p34nutsart-jjmeco2k.manus.space";

if (!siteOrigin) {
  throw new Error("GITHUB_PAGES_SITE_ORIGIN must be set for the GitHub Pages build.");
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async entry => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectFiles(entryPath);
    if (entry.isFile()) return [entryPath];
    return [];
  }));
  return files.flat();
}

function unversionedName(assetName) {
  return assetName.replace(/_[0-9a-f]{8}(\.[^.]+)$/i, "$1");
}

const sourceFiles = [
  path.join(projectRoot, "client", "src", "data", "artistData.ts"),
  path.join(projectRoot, "client", "index.html"),
];
const basicSoftstyleManifestPath = path.join(mediaRoot, "basic-softstyle-mockups-manifest.json");
const finishedProductManifestPath = path.join(mediaRoot, "finished-product-mockups-manifest.json");
const mugCrewneckManifestPath = path.join(mediaRoot, "mug-crewneck-corrected-manifest.json");
const pillowHoodie18500ManifestPath = path.join(mediaRoot, "pillow-hoodie18500-corrected-manifest.json");
const zipHoodieMissingColorManifestPath = path.join(mediaRoot, "zip-hoodie-missing-color-mockups-manifest.json");
const shopHeroPortraitManifestPath = path.join(mediaRoot, "shop-hero-portraits-manifest.json");
const crewneckYouthFinishedManifestPath = path.join(mediaRoot, "crewneck-youth-finished-mockups-manifest.json");
const tankTopFinishedManifestPath = path.join(mediaRoot, "tank-top-finished-mockups-manifest.json");

const sourceText = await Promise.all(sourceFiles.map(file => readFile(file, "utf8")));
const referencedAssets = [...new Set(sourceText
  .flatMap(text => [...text.matchAll(/\/manus-storage\/([A-Za-z0-9._-]+)/g)].map(match => match[1])))]
  .sort();

const availableMedia = new Map();
for (const file of await collectFiles(mediaRoot)) {
  availableMedia.set(path.basename(file), file);
}

await rm(outputMediaRoot, { recursive: true, force: true });
await mkdir(outputMediaRoot, { recursive: true });

const unresolved = [];
for (const assetName of referencedAssets) {
  const source = availableMedia.get(unversionedName(assetName));
  if (!source) {
    unresolved.push(assetName);
    continue;
  }
  await cp(source, path.join(outputMediaRoot, assetName));
}

if (unresolved.length > 0) {
  throw new Error(`Missing GitHub Pages media: ${unresolved.join(", ")}`);
}

// The merch shop references real Printful front mockups through the same
// permanent Pages origin. The manifest is generated from the validated task
// ledger and guards against accidentally publishing arbitrary media files.
const basicSoftstyleManifest = JSON.parse(await readFile(basicSoftstyleManifestPath, "utf8"));
if (basicSoftstyleManifest.entryCount !== 1205 || basicSoftstyleManifest.records?.length !== 1205)
  throw new Error("Expected exactly 1205 verified Basic Softstyle mockup assets.");
const basicPaths = new Set();
for (const record of basicSoftstyleManifest.records) {
  if (typeof record.relativePath !== "string" || !record.relativePath.startsWith("basic-softstyle-mockups/"))
    throw new Error("Invalid Basic Softstyle mockup asset path in manifest.");
  if (basicPaths.has(record.relativePath))
    throw new Error(`Duplicate Basic Softstyle mockup asset path: ${record.relativePath}`);
  basicPaths.add(record.relativePath);
  const source = path.join(mediaRoot, record.relativePath);
  const destination = path.join(outputMediaRoot, record.relativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(source, destination);
}

const finishedProductManifest = JSON.parse(await readFile(finishedProductManifestPath, "utf8"));
if (finishedProductManifest.entryCount !== 1538 || finishedProductManifest.records?.length !== 1538)
  throw new Error("Expected exactly 1538 verified finished product mockup assets.");
const finishedProductPaths = new Set();
for (const record of finishedProductManifest.records) {
  if (typeof record.relativePath !== "string" || !record.relativePath.startsWith("finished-product-mockups/"))
    throw new Error("Invalid finished product mockup asset path in manifest.");
  if (!Number.isInteger(record.syncProductId) || !["front", "back"].includes(record.imageRole))
    throw new Error("Invalid finished product mockup identity or image role in manifest.");
  if (finishedProductPaths.has(record.relativePath))
    throw new Error(`Duplicate finished product mockup asset path: ${record.relativePath}`);
  finishedProductPaths.add(record.relativePath);
  const source = path.join(mediaRoot, record.relativePath);
  const destination = path.join(outputMediaRoot, record.relativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(source, destination);
}

const mugCrewneckManifest = JSON.parse(await readFile(mugCrewneckManifestPath, "utf8"));
if (mugCrewneckManifest.entryCount !== 581 || mugCrewneckManifest.entries?.length !== 581 || mugCrewneckManifest.errors?.length !== 0)
  throw new Error("Expected exactly 581 verified Mug/Crewneck correction assets without errors.");
const mugCrewneckPaths = new Set();
for (const record of mugCrewneckManifest.entries) {
  if (typeof record.relativePath !== "string" || !record.relativePath.startsWith("mug-crewneck-corrected/") || record.imageRole !== "front")
    throw new Error("Invalid Mug/Crewneck correction asset path or image role in manifest.");
  if (!Number.isInteger(record.syncProductId) || !record.key || !["https://files.cdn.printful.com/", "https://printful-upload.s3-accelerate.amazonaws.com/"].some(prefix => record.sourceUrl?.startsWith(prefix)))
    throw new Error("Invalid Mug/Crewneck correction asset identity or source URL in manifest.");
  if (mugCrewneckPaths.has(record.relativePath))
    throw new Error(`Duplicate Mug/Crewneck correction asset path: ${record.relativePath}`);
  mugCrewneckPaths.add(record.relativePath);
  const source = path.join(mediaRoot, record.relativePath);
  const destination = path.join(outputMediaRoot, record.relativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(source, destination);
}

const pillowHoodie18500Manifest = JSON.parse(await readFile(pillowHoodie18500ManifestPath, "utf8"));
if (pillowHoodie18500Manifest.entryCount !== 575 || pillowHoodie18500Manifest.entries?.length !== 575 || pillowHoodie18500Manifest.errors?.length !== 0)
  throw new Error("Expected exactly 575 verified Pillow/Gildan 18500 correction assets without errors.");
const pillowHoodie18500Paths = new Set();
for (const record of pillowHoodie18500Manifest.entries) {
  if (typeof record.relativePath !== "string" || !record.relativePath.startsWith("pillow-hoodie18500-corrected/") || !["front", "back"].includes(record.imageRole))
    throw new Error("Invalid Pillow/Gildan 18500 correction asset path or image role in manifest.");
  if (!Number.isInteger(record.syncProductId) || !record.key || !["basic_pillow", "hoodie18500"].includes(record.family) || !["https://files.cdn.printful.com/", "https://printful-upload.s3-accelerate.amazonaws.com/"].some(prefix => record.sourceUrl?.startsWith(prefix)))
    throw new Error("Invalid Pillow/Gildan 18500 correction asset identity or source URL in manifest.");
  if (pillowHoodie18500Paths.has(record.relativePath))
    throw new Error(`Duplicate Pillow/Gildan 18500 correction asset path: ${record.relativePath}`);
  pillowHoodie18500Paths.add(record.relativePath);
  const source = path.join(mediaRoot, record.relativePath);
  const destination = path.join(outputMediaRoot, record.relativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(source, destination);
}

const zipHoodieMissingColorManifest = JSON.parse(await readFile(zipHoodieMissingColorManifestPath, "utf8"));
if (zipHoodieMissingColorManifest.entryCount !== 26 || zipHoodieMissingColorManifest.records?.length !== 26)
  throw new Error("Expected exactly 26 verified Zip Hoodie missing-color mockup assets.");
const expectedZipSyncProducts = new Set([457350442, 457351299]);
const zipHoodieMissingColorPaths = new Set();
for (const record of zipHoodieMissingColorManifest.records) {
  if (typeof record.relativePath !== "string" || !record.relativePath.startsWith("zip-hoodie-missing-color-mockups/") || record.imageRole !== "back")
    throw new Error("Invalid Zip Hoodie missing-color mockup asset path or image role in manifest.");
  if (!expectedZipSyncProducts.has(record.syncProductId) || record.sourceType !== "printful_basic_mockup_download" || record.format !== "JPEG" || record.width !== 2000 || record.height !== 2000)
    throw new Error("Invalid Zip Hoodie missing-color mockup identity, provenance, or technical metadata in manifest.");
  if (zipHoodieMissingColorPaths.has(record.relativePath))
    throw new Error(`Duplicate Zip Hoodie missing-color mockup asset path: ${record.relativePath}`);
  zipHoodieMissingColorPaths.add(record.relativePath);
  const source = path.join(mediaRoot, record.relativePath);
  const destination = path.join(outputMediaRoot, record.relativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(source, destination);
}

const shopHeroPortraitManifest = JSON.parse(await readFile(shopHeroPortraitManifestPath, "utf8"));
if (shopHeroPortraitManifest.entryCount !== 10 || shopHeroPortraitManifest.records?.length !== 10)
  throw new Error("Expected exactly 10 transparent shop hero portrait assets.");
const expectedHeroPortraitPaths = new Set([
  "shop-hero-portraits/p34nuts-hero-sit-forward.png",
  "shop-hero-portraits/p34nuts-hero-crouch-forward.png",
  "shop-hero-portraits/p34nuts-hero-back-arms.png",
  "shop-hero-portraits/p34nuts-hero-throne.png",
  "shop-hero-portraits/p34nuts-hero-crown-seat.png",
  "shop-hero-portraits/p34nuts-hero-microphone.png",
  "shop-hero-portraits/p34nuts-hero-kneel.png",
  "shop-hero-portraits/p34nuts-hero-back-glass.png",
  "shop-hero-portraits/p34nuts-hero-back-wings.png",
  "shop-hero-portraits/p34nuts-hero-back-logo.png",
]);
const shopHeroPortraitPaths = new Set();
for (const record of shopHeroPortraitManifest.records) {
  if (typeof record.relativePath !== "string" || !expectedHeroPortraitPaths.has(record.relativePath) || record.hasAlpha !== true)
    throw new Error("Invalid shop hero portrait asset manifest record.");
  if (shopHeroPortraitPaths.has(record.relativePath))
    throw new Error(`Duplicate shop hero portrait asset path: ${record.relativePath}`);
  shopHeroPortraitPaths.add(record.relativePath);
  const source = path.join(mediaRoot, record.relativePath);
  const destination = path.join(outputMediaRoot, record.relativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(source, destination);
}
if (shopHeroPortraitPaths.size !== expectedHeroPortraitPaths.size)
  throw new Error("Shop hero portrait manifest does not contain the complete approved asset set.");

const crewneckYouthFinishedManifest = JSON.parse(await readFile(crewneckYouthFinishedManifestPath, "utf8"));
if (crewneckYouthFinishedManifest.entryCount !== 40 || crewneckYouthFinishedManifest.entries?.length !== 40 || crewneckYouthFinishedManifest.errors?.length !== 0)
  throw new Error("Expected exactly 40 verified Crew Neck/Youth Classic correction assets without errors.");
const crewneckYouthFinishedPaths = new Set();
for (const record of crewneckYouthFinishedManifest.entries) {
  if (typeof record.relativePath !== "string" || !record.relativePath.startsWith("crewneck-youth-finished-mockups/") || record.imageRole !== "front")
    throw new Error("Invalid Crew Neck/Youth Classic correction asset path or image role in manifest.");
  if (!Number.isInteger(record.syncProductId) || !record.color || record.sourceType !== "printful_mockup_generator" || !record.sourceUrl?.startsWith("https://printful-upload.s3-accelerate.amazonaws.com/"))
    throw new Error("Invalid Crew Neck/Youth Classic correction asset identity or provenance in manifest.");
  if (crewneckYouthFinishedPaths.has(record.relativePath))
    throw new Error(`Duplicate Crew Neck/Youth Classic correction asset path: ${record.relativePath}`);
  crewneckYouthFinishedPaths.add(record.relativePath);
  const source = path.join(mediaRoot, record.relativePath);
  const destination = path.join(outputMediaRoot, record.relativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(source, destination);
}

const tankTopFinishedManifest = JSON.parse(await readFile(tankTopFinishedManifestPath, "utf8"));
if (!Number.isInteger(tankTopFinishedManifest.entryCount) || tankTopFinishedManifest.entryCount < 10 || tankTopFinishedManifest.entries?.length !== tankTopFinishedManifest.entryCount || tankTopFinishedManifest.errors?.length !== 0)
  throw new Error("Expected a non-empty, internally consistent Tank-Top finished-mockup manifest without errors.");
const tankTopFinishedPaths = new Set();
for (const record of tankTopFinishedManifest.entries) {
  if (typeof record.relativePath !== "string" || !record.relativePath.startsWith("tank-top-finished-mockups/") || record.imageRole !== "front")
    throw new Error("Invalid Tank-Top correction asset path or image role in manifest.");
  if (!Number.isInteger(record.syncProductId) || !record.color || record.sourceType !== "printful_mockup_generator" || !record.sourceUrl?.startsWith("https://printful-upload.s3-accelerate.amazonaws.com/") || record.format !== "JPEG" || record.width < 400 || record.height < 400)
    throw new Error("Invalid Tank-Top correction asset identity, provenance, or technical metadata in manifest.");
  if (tankTopFinishedPaths.has(record.relativePath))
    throw new Error(`Duplicate Tank-Top correction asset path: ${record.relativePath}`);
  tankTopFinishedPaths.add(record.relativePath);
  const source = path.join(mediaRoot, record.relativePath);
  const destination = path.join(outputMediaRoot, record.relativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(source, destination);
}

const indexPath = path.join(outputRoot, "index.html");
const index = await readFile(indexPath, "utf8");
await writeFile(indexPath, index.replaceAll(manusOrigin, siteOrigin));

const outputMediaCount = (await collectFiles(outputMediaRoot)).length;
const expectedMediaCount = referencedAssets.length + basicPaths.size + finishedProductPaths.size + mugCrewneckPaths.size + pillowHoodie18500Paths.size + zipHoodieMissingColorPaths.size + shopHeroPortraitPaths.size + crewneckYouthFinishedPaths.size + tankTopFinishedPaths.size;
if (outputMediaCount !== expectedMediaCount) {
  throw new Error(`Expected ${expectedMediaCount} media files, found ${outputMediaCount}.`);
}

const outputInfo = await stat(indexPath);
if (outputInfo.size === 0) {
  throw new Error("GitHub Pages index.html is empty.");
}

console.log(`Prepared ${outputMediaCount} GitHub Pages media files for ${siteOrigin}, including ${basicPaths.size} verified Basic Softstyle mockups, ${finishedProductPaths.size} verified finished product mockups, ${mugCrewneckPaths.size} corrected Mug/Crewneck previews, ${pillowHoodie18500Paths.size} corrected Pillow/Gildan 18500 previews, ${zipHoodieMissingColorPaths.size} verified Zip Hoodie missing-color previews, ${shopHeroPortraitPaths.size} transparent shop hero portraits, and ${crewneckYouthFinishedPaths.size} corrected Crew Neck/Youth Classic previews, plus ${tankTopFinishedPaths.size} verified Tank-Top previews.`);
