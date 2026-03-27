const machineImageModules = import.meta.glob(
  [
    '../assets/machine_png/**/*.png',
    '../assets/machine_png/**/*.jpg',
    '../assets/machine_png/**/*.jpeg',
  ],
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
  const folder = segments[segments.length - 2] ?? '';
  const fileName = segments[segments.length - 1] ?? '';

  return {
    folder: normalize(folder),
    name: normalize(fileName),
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
