export function fcfs(processes) {
  let sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  let currentTime = 0;
  let gantt = [];

  sorted.forEach((p) => {
    if (currentTime < p.arrivalTime) currentTime = p.arrivalTime;

    let start = currentTime;
    let end = start + p.burstTime;

    p.completionTime = end;
    p.turnaroundTime = end - p.arrivalTime;
    p.waitingTime = p.turnaroundTime - p.burstTime;

    gantt.push({ id: p.id, start, end });
    currentTime = end;
  });

  return { processes: sorted, gantt, totalTime: currentTime };
}
