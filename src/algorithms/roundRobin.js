export function roundRobin(processes, quantum) {
  let procs = processes.map(p => ({ ...p, remaining: p.burstTime }));
  let queue = [...procs];
  let time = 0;
  let gantt = [];

  while (queue.length > 0) {
    let p = queue.shift();
    if (p.remaining > 0) {
      let execTime = Math.min(quantum, p.remaining);
      let start = time;
      time += execTime;
      p.remaining -= execTime;
      gantt.push({ id: p.id, start, end: time });

      if (p.remaining > 0) {
        queue.push(p);
      } else {
        p.completionTime = time;
        p.turnaroundTime = time - p.arrivalTime;
        p.waitingTime = p.turnaroundTime - p.burstTime;
      }
    }
  }

  return { processes: procs, gantt, totalTime: time };
}
