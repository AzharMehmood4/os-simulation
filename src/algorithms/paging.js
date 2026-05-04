/* ================= FIFO ================= */
export function fifoPageReplacement(pages, frames) {
  let memory = [];
  let faults = 0;
  let log = [];

  pages.forEach((page) => {
    if (!memory.includes(page)) {
      if (memory.length < frames) {
        memory.push(page);
      } else {
        memory.shift(); // remove oldest
        memory.push(page);
      }
      faults++;
      log.push(`❌ Page ${page} caused FAULT → [${memory.join(", ")}]`);
    } else {
      log.push(`✅ Page ${page} HIT → [${memory.join(", ")}]`);
    }
  });

  return { faults, log };
}

/* ================= LRU ================= */
export function lruPageReplacement(pages, frames) {
  let memory = [];
  let faults = 0;
  let log = [];

  pages.forEach((page, i) => {
    if (!memory.includes(page)) {
      if (memory.length < frames) {
        memory.push(page);
      } else {
        let lruIndex = 0;
        let farthest = i;

        memory.forEach((m, idx) => {
          let lastUse = pages.slice(0, i).lastIndexOf(m);
          if (lastUse < farthest) {
            farthest = lastUse;
            lruIndex = idx;
          }
        });

        memory[lruIndex] = page;
      }
      faults++;
      log.push(`❌ ${page} FAULT → [${memory.join(", ")}]`);
    } else {
      log.push(`✅ ${page} HIT → [${memory.join(", ")}]`);
    }
  });

  return { faults, log };
}

/* ================= OPTIMAL ================= */
export function optPageReplacement(pages, frames) {
  let memory = [];
  let faults = 0;
  let log = [];

  pages.forEach((page, i) => {
    if (!memory.includes(page)) {
      if (memory.length < frames) {
        memory.push(page);
      } else {
        let indexToReplace = -1;
        let farthest = -1;

        memory.forEach((m, idx) => {
          let nextUse = pages.slice(i + 1).indexOf(m);

          if (nextUse === -1) {
            indexToReplace = idx;
            return;
          }

          if (nextUse > farthest) {
            farthest = nextUse;
            indexToReplace = idx;
          }
        });

        memory[indexToReplace] = page;
      }

      faults++;
      log.push(`❌ ${page} FAULT → [${memory.join(", ")}]`);
    } else {
      log.push(`✅ ${page} HIT → [${memory.join(", ")}]`);
    }
  });

  return { faults, log };
}
