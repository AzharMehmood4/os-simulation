export function sjn(processes) {
  let procs = processes.map(p => ({ ...p, done: false }));
  let completed = [];
  let currentTime = 0;
  let gantt = [];

  while (completed.length < procs.length) {
    let available = procs.filter(p => !p.done && p.arrivalTime <= currentTime);
    if (available.length === 0) {
      currentTime++;
      continue;
    }

    available.sort((a, b) => a.burstTime - b.burstTime);
    let p = available[0];

    let start = currentTime;
    let end = start + p.burstTime;

    p.completionTime = end;
    p.turnaroundTime = end - p.arrivalTime;
    p.waitingTime = p.turnaroundTime - p.burstTime;
    p.done = true;

    gantt.push({ id: p.id, start, end });
    currentTime = end;
    completed.push(p);
  }

  return { processes: procs, gantt, totalTime: currentTime };
}
