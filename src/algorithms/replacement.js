export function fifo(pages, capacity) {
  let memory = [], queue = [], faults = 0;

  pages.forEach(p => {
    if (!memory.includes(p)) {
      faults++;
      if (memory.length >= capacity) {
        const removed = queue.shift();
        memory = memory.filter(x => x !== removed);
      }
      memory.push(p);
      queue.push(p);
    }
  });

  return faults;
}

export function lru(pages, capacity) {
  let memory = [], faults = 0;

  pages.forEach(p => {
    const index = memory.indexOf(p);

    if (index === -1) {
      faults++;
      if (memory.length >= capacity) memory.shift();
    } else {
      memory.splice(index, 1);
    }

    memory.push(p);
  });

  return faults;
}

export function opt(pages, capacity) {
  let memory = [], faults = 0;

  for (let i = 0; i < pages.length; i++) {
    let p = pages[i];

    if (!memory.includes(p)) {
      faults++;

      if (memory.length < capacity) {
        memory.push(p);
      } else {
        let farthest = -1, idx = -1;

        for (let j = 0; j < memory.length; j++) {
          let k;
          for (k = i + 1; k < pages.length; k++) {
            if (memory[j] === pages[k]) break;
          }
          if (k > farthest) {
            farthest = k;
            idx = j;
          }
        }

        memory[idx] = p;
      }
    }
  }

  return faults;
}