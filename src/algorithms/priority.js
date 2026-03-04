export function priorityScheduling(processes) {
  // Make a copy and add `done` flag
  let procs = processes.map(p => ({ ...p, done: false }));
  let completed = [];
  let currentTime = 0;
  let gantt = [];

  while (completed.length < procs.length) {
    // Find all available processes at current time
    let available = procs.filter(p => !p.done && p.arrivalTime <= currentTime);

    if (available.length === 0) {
      currentTime++;
      continue;
    }

    // Sort by priority (smaller number = higher priority), then by arrival time
    available.sort((a, b) => a.priority - b.priority || a.arrivalTime - b.arrivalTime);
    let p = available[0]; 

    let start = currentTime;
    let end = start + p.burstTime;

    // Calculate metrics
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
