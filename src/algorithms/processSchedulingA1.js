// =========================
// FCFS
// =========================
export function fcfs(processes) {
  let sorted = [...processes].sort(
    (a, b) => a.arrivalTime - b.arrivalTime
  );

  let currentTime = 0;
  let gantt = [];

  sorted.forEach((p) => {
    if (currentTime < p.arrivalTime) {
      currentTime = p.arrivalTime;
    }

    let start = currentTime;
    let end = start + p.burstTime;

    p.completionTime = end;
    p.turnaroundTime = end - p.arrivalTime;
    p.waitingTime = p.turnaroundTime - p.burstTime;

    gantt.push({
      id: p.id,
      start,
      end,
    });

    currentTime = end;
  });

  return {
    processes: sorted,
    gantt,
    totalTime: currentTime,
  };
}

// =========================
// SJN 
// =========================
export function sjn(processes) {
  let procs = processes.map((p) => ({
    ...p,
    done: false,
  }));

  let completed = [];
  let currentTime = 0;
  let gantt = [];

  while (completed.length < procs.length) {
    let available = procs.filter(
      (p) => !p.done && p.arrivalTime <= currentTime
    );

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

    gantt.push({
      id: p.id,
      start,
      end,
    });

    currentTime = end;
    completed.push(p);
  }

  return {
    processes: procs,
    gantt,
    totalTime: currentTime,
  };
}

// =========================
// PRIORITY SCHEDULING
// =========================
export function priorityScheduling(processes) {
  let procs = processes.map((p) => ({
    ...p,
    done: false,
  }));

  let completed = [];
  let currentTime = 0;
  let gantt = [];

  while (completed.length < procs.length) {
    let available = procs.filter(
      (p) => !p.done && p.arrivalTime <= currentTime
    );

    if (available.length === 0) {
      currentTime++;
      continue;
    }

    available.sort(
      (a, b) =>
        a.priority - b.priority ||
        a.arrivalTime - b.arrivalTime
    );

    let p = available[0];

    let start = currentTime;
    let end = start + p.burstTime;

    p.completionTime = end;
    p.turnaroundTime = end - p.arrivalTime;
    p.waitingTime = p.turnaroundTime - p.burstTime;
    p.done = true;

    gantt.push({
      id: p.id,
      start,
      end,
    });

    currentTime = end;
    completed.push(p);
  }

  return {
    processes: procs,
    gantt,
    totalTime: currentTime,
  };
}

// =========================
// ROUND ROBIN
// =========================
export function roundRobin(processes, quantum) {
  let procs = processes.map((p) => ({
    ...p,
    remaining: p.burstTime,
  }));

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

      gantt.push({
        id: p.id,
        start,
        end: time,
      });

      if (p.remaining > 0) {
        queue.push(p);
      } else {
        p.completionTime = time;
        p.turnaroundTime = time - p.arrivalTime;
        p.waitingTime = p.turnaroundTime - p.burstTime;
      }
    }
  }

  return {
    processes: procs,
    gantt,
    totalTime: time,
  };
}