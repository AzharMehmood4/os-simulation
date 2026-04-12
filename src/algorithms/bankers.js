export function bankers(processes, available) {
  let n = processes.length;
  let m = available.length;

  let work = [...available];
  let finish = Array(n).fill(false);
  let safeSequence = [];
  let steps = [];

  let need = processes.map(p =>
    p.max.map((max, i) => max - p.allocation[i])
  );

  steps.push(`Available Resources: [${work.join(", ")}]`);

  let found = true;

  while (safeSequence.length < n && found) {
    found = false;

    for (let i = 0; i < n; i++) {
      if (!finish[i]) {
        let canRun = true;

        // check need vs available
        for (let j = 0; j < m; j++) {
          if (need[i][j] > work[j]) {
            canRun = false;
            break;
          }
        }

        if (canRun) {
          steps.push(`✅ ${processes[i].id} can execute`);

          // release resources after execution
          for (let j = 0; j < m; j++) {
            work[j] += processes[i].allocation[j];
          }

          steps.push(`🔄 Updated Available: [${work.join(", ")}]`);

          safeSequence.push(processes[i].id);
          finish[i] = true;
          found = true;
        } else {
          steps.push(`❌ ${processes[i].id} cannot execute (Need > Available)`);
        }
      }
    }
  }

  if (safeSequence.length === n) {
    steps.push(`\n✅ Safe Sequence: ${safeSequence.join(" → ")}`);
    steps.push("System is SAFE (No Deadlock)");
    return { safe: true, steps };
  } else {
    steps.push("\n❌ System is NOT in safe state");
    steps.push("Deadlock detected due to insufficient resources");
    return { safe: false, steps };
  }
}
