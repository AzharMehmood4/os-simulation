export const TOTAL_BLOCKS = 50;

export const createDisk = () => {
  return Array(TOTAL_BLOCKS).fill(null);
};

// =========================
// CONTIGUOUS ALLOCATION
// =========================
export const allocateContiguous = (disk, fileName, size) => {
  let start = -1;
  let count = 0;

  for (let i = 0; i < disk.length; i++) {
    if (disk[i] === null) {
      if (start === -1) start = i;
      count++;

      if (count === size) {
        const blocks = [];

        for (let j = start; j < start + size; j++) {
          disk[j] = fileName;
          blocks.push(j);
        }

        return blocks;
      }
    } else {
      start = -1;
      count = 0;
    }
  }

  return null;
};

// =========================
// LINKED ALLOCATION
// =========================
export const allocateLinked = (disk, fileName, size) => {
  const freeBlocks = [];

  for (let i = 0; i < disk.length; i++) {
    if (disk[i] === null) {
      freeBlocks.push(i);
    }
  }

  if (freeBlocks.length < size) return null;

  const blocks = [];

  for (let i = 0; i < size; i++) {
    const block = freeBlocks[i];
    disk[block] = fileName;
    blocks.push(block);
  }

  return blocks;
};

// =========================
// INDEXED ALLOCATION
// =========================
export const allocateIndexed = (disk, fileName, size) => {
  const freeBlocks = [];

  for (let i = 0; i < disk.length; i++) {
    if (disk[i] === null) {
      freeBlocks.push(i);
    }
  }

  if (freeBlocks.length < size + 1) return null;

  const indexBlock = freeBlocks[0];
  disk[indexBlock] = `${fileName}-INDEX`;

  const blocks = [];

  for (let i = 1; i <= size; i++) {
    disk[freeBlocks[i]] = fileName;
    blocks.push(freeBlocks[i]);
  }

  return {
    indexBlock,
    blocks,
  };
};

// =========================
// DELETE FILE
// =========================
export const deleteFileBlocks = (disk, fileName) => {
  for (let i = 0; i < disk.length; i++) {
    if (
      disk[i] === fileName ||
      disk[i] === `${fileName}-INDEX`
    ) {
      disk[i] = null;
    }
  }
};

// =========================
// METRICS
// =========================
export const calculateDiskUsage = (disk) => {
  const used = disk.filter((b) => b !== null).length;
  return ((used / disk.length) * 100).toFixed(2);
};

export const calculateFragmentation = (disk) => {

  let fragments = 0;

  let insideFreeSpace = false;

  for (let i = 0; i < disk.length; i++) {

    // START OF FREE SPACE
    if (disk[i] === null && !insideFreeSpace) {

      fragments++;

      insideFreeSpace = true;
    }

    // END OF FREE SPACE
    else if (disk[i] !== null) {

      insideFreeSpace = false;
    }
  }

  return fragments;
};


 