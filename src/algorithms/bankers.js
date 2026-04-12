export function bankers(processes, available) {
  let n = processes.length;
  let m = available.length;

  let work = [...available];
  let finish = Array(n).fill(false);
  let safeSequence = [];

  let need = processes.map(p =>
    p.max.map((max, i) => max - p.allocation[i])
  );

  let found = true;

  while (safeSequence.length < n && found) {
    found = false;

    for (let i = 0; i < n; i++) {
      if (!finish[i]) {
        let canRun = true;

        for (let j = 0; j < m; j++) {
          if (need[i][j] > work[j]) {
            canRun = false;
            break;
          }
        }

        if (canRun) {
          for (let j = 0; j < m; j++) {
            work[j] += processes[i].allocation[j];
          }

          safeSequence.push(processes[i].id);
          finish[i] = true;
          found = true;
        }
      }
    }
  }

  if (safeSequence.length === n) {
    return { safe: true, sequence: safeSequence };
  } else {
    return { safe: false };
  }
}
