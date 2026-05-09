// =========================
// MUTEX SIMULATION
// =========================
export function runMutex(processes) {
  let busyFile = null;
  let log = [];

  processes.forEach((p) => {
    if (busyFile === null || busyFile !== p.file) {
      busyFile = p.file;

      log.push(`${p.id} accessed ${p.file}`);
      log.push(`${p.id} is ${p.operation} on ${p.file}`);
      log.push(`${p.id} released ${p.file}`);

      busyFile = null;
    } else {
      log.push(`⏳ ${p.id} waiting for ${p.file}`);
    }
  });

  return log;
}

// =========================
// BANKER'S ALGORITHM
// =========================
export function bankers(processes, available) {
  let n = processes.length;
  let m = available.length;

  let work = [...available];
  let finish = Array(n).fill(false);

  let safeSequence = [];
  let steps = [];

  // Calculate Need Matrix
  let need = processes.map((p) =>
    p.max.map((max, i) => max - p.allocation[i])
  );

  steps.push(`Available Resources: [${work.join(", ")}]`);

  let found = true;

  while (safeSequence.length < n && found) {
    found = false;

    for (let i = 0; i < n; i++) {
      if (!finish[i]) {
        let canRun = true;

        // Check Need <= Available
        for (let j = 0; j < m; j++) {
          if (need[i][j] > work[j]) {
            canRun = false;
            break;
          }
        }

        if (canRun) {
          steps.push(`${processes[i].id} can execute`);

          // Release allocated resources
          for (let j = 0; j < m; j++) {
            work[j] += processes[i].allocation[j];
          }

          steps.push(`Updated Available: [${work.join(", ")}]`);

          safeSequence.push(processes[i].id);

          finish[i] = true;
          found = true;
        } else {
          steps.push(
            `${processes[i].id} cannot execute (Need > Available)`
          );
        }
      }
    }
  }

  // SAFE STATE
  if (safeSequence.length === n) {
    steps.push(``);
    steps.push(`Safe Sequence: ${safeSequence.join(" → ")}`);
    steps.push(`System is SAFE (No Deadlock)`);

    return {
      safe: true,
      steps,
    };
  }

  // UNSAFE STATE
  else {
    steps.push(``);
    steps.push(`System is NOT in safe state`);
    steps.push(`Deadlock detected due to insufficient resources`);

    return {
      safe: false,
      steps,
    };
  }
}