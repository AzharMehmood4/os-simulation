/* ================= FIRST FIT ================= */
export function firstFit(processes, blocks) {
  let memory = blocks.map((size) => ({
    size,
    free: true,
    process: null,
  }));

  let log = [];
  let waiting = [];

  for (let p of processes) {
    let allocated = false;

    for (let i = 0; i < memory.length; i++) {
      if (memory[i].free && memory[i].size >= p.memory) {
        memory[i].free = false;
        memory[i].process = p.id;

        log.push(
          `✅ ${p.id} (${p.memory}KB) allocated to Block ${
            i + 1
          } (${memory[i].size}KB)`
        );

        allocated = true;
        break;
      }
    }

    if (!allocated) {
      log.push(
        `⏳ ${p.id} (${p.memory}KB) waiting (No suitable block)`
      );

      waiting.push(p.id);
    }
  }

  return { memory, log, waiting };
}

/* ================= BEST FIT ================= */
export function bestFit(processes, blocks) {
  let memory = blocks.map((size) => ({
    size,
    free: true,
    process: null,
  }));

  let log = [];
  let waiting = [];

  for (let p of processes) {
    let bestIndex = -1;
    let minDiff = Infinity;

    for (let i = 0; i < memory.length; i++) {
      if (memory[i].free && memory[i].size >= p.memory) {
        let diff = memory[i].size - p.memory;

        if (diff < minDiff) {
          minDiff = diff;
          bestIndex = i;
        }
      }
    }

    if (bestIndex !== -1) {
      memory[bestIndex].free = false;
      memory[bestIndex].process = p.id;

      log.push(
        `✅ ${p.id} (${p.memory}KB) allocated to Block ${
          bestIndex + 1
        } using Best Fit`
      );
    } else {
      log.push(`⏳ ${p.id} (${p.memory}KB) waiting`);

      waiting.push(p.id);
    }
  }

  return { memory, log, waiting };
}

/* ================= WORST FIT ================= */
export function worstFit(processes, blocks) {
  let memory = blocks.map((size) => ({
    size,
    free: true,
    process: null,
  }));

  let log = [];
  let waiting = [];

  for (let p of processes) {
    let worstIndex = -1;
    let maxSize = -1;

    for (let i = 0; i < memory.length; i++) {
      if (memory[i].free && memory[i].size >= p.memory) {
        if (memory[i].size > maxSize) {
          maxSize = memory[i].size;
          worstIndex = i;
        }
      }
    }

    if (worstIndex !== -1) {
      memory[worstIndex].free = false;
      memory[worstIndex].process = p.id;

      log.push(
        `✅ ${p.id} (${p.memory}KB) allocated to Block ${
          worstIndex + 1
        } using Worst Fit`
      );
    } else {
      log.push(`⏳ ${p.id} (${p.memory}KB) waiting`);

      waiting.push(p.id);
    }
  }

  return { memory, log, waiting };
}