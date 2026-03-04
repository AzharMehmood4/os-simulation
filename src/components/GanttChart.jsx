import React from "react";

export default function GanttChart({ gantt }) {
  
  const cumulativeGantt = gantt.reduce((acc, b) => {
    const start = acc.length > 0 ? acc[acc.length - 1].end : 0;
    const duration = b.end - b.start;
    const end = start + duration;
    acc.push({ ...b, start: start, end: end });
    return acc;
  }, []);

  return (
    <div className="flex mt-4 gap-1 items-center">
      {cumulativeGantt.map((b, i) => (
        <div
          key={i}
          className="bg-purple-500 text-center text-white font-bold flex items-center justify-center"
          style={{
            width: 80,      
            height: 50,     
            borderRadius: 5,
          }}
        >
          {b.id} ({b.start},{b.end})
        </div>
      ))}
    </div>
  );
}
