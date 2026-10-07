/* WebP only, on purpose. The supplier PNGs are 1.5-2.6MB each and globbing
   both formats made Vite emit both, shipping ~150MB of unused PNGs. Every
   source file has a committed .webp sibling, produced by
   `npm run optimize:machines`, which also runs as part of `npm run build`. */
const machineImageModules = import.meta.glob(
  ['../assets/machine_png/**/*.webp'],
  { eager: true, import: 'default' }
) as Record<string, string>;

type MachineImageEntry = {
  folder: string;
  name: string;
  src: string;
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const machineImageEntries: MachineImageEntry[] = Object.entries(machineImageModules).map(([path, src]) => {
  const segments = path.split('/');

  return {
    folder: normalize(segments[segments.length - 2] ?? ''),
    name: normalize(segments[segments.length - 1] ?? ''),
    src,
  };
});

export type MachineAsset = {
  folder: string;
  name: string;
  src: string;
};

export const getAllMachineImages = (): MachineAsset[] =>
  machineImageEntries
    .map((entry) => ({
      folder: entry.folder,
      name: entry.name,
      src: entry.src,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

const matchesFolder = (entryFolder: string, requestedFolder: string) =>
  entryFolder === requestedFolder ||
  entryFolder.includes(requestedFolder) ||
  requestedFolder.includes(entryFolder);

const matchesName = (entryName: string, requestedName: string) =>
  entryName === requestedName ||
  entryName.includes(requestedName) ||
  requestedName.includes(entryName);

export const getMachineImage = (folderCandidates: string[], nameCandidates: string[]) => {
  const folders = folderCandidates.map(normalize);
  const names = nameCandidates.map(normalize);

  const folderMatches = machineImageEntries.filter((entry) =>
    folders.some((folder) => matchesFolder(entry.folder, folder))
  );

  const exactMatch = folderMatches.find((entry) => names.some((name) => entry.name === name));
  if (exactMatch) return exactMatch.src;

  const partialMatch = folderMatches.find((entry) => names.some((name) => matchesName(entry.name, name)));
  if (partialMatch) return partialMatch.src;

  const fallbackMatch = machineImageEntries.find((entry) =>
    names.some((name) => matchesName(entry.name, name))
  );

  return fallbackMatch?.src;
};
