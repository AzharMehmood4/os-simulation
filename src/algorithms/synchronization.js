export function runMutex(processes) {
  let busyFile = null;
  let log = [];

  processes.forEach(p => {
    if (busyFile === null || busyFile !== p.file) {
      busyFile = p.file;

      log.push(`🔓 ${p.id} accessed ${p.file}`);
      log.push(`⚙️ ${p.id} is ${p.operation} on ${p.file}`);
      log.push(`🔒 ${p.id} released ${p.file}`);

      busyFile = null;
    } else {
      log.push(`⏳ ${p.id} waiting for ${p.file}`);
    }
  });

  return log;
}
