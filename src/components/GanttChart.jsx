import React from "react";

export default function GanttChart({ gantt }) {
  return (
    <div className="flex mt-4 gap-1">
      {gantt.map((b,i)=>(
        <div key={i} className="bg-purple-300 text-center text-white p-2" style={{width:(b.end-b.start)*40}}>
          {b.id}
        </div>
      ))}
    </div>
  );
}
