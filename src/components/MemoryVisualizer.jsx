import React from "react";

export default function MemoryVisualizer({ memory }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mt-4">
      {memory.map((block, i) => (
        <div
          key={i}
          className={`w-24 h-20 flex flex-col items-center justify-center rounded shadow
          ${block.free ? "bg-green-200" : "bg-red-300"}`}
        >
          <span className="font-bold">{block.size}</span>
          <span className="text-sm">
            {block.free ? "Free" : `P${block.process}`}
          </span>
        </div>
      ))}
    </div>
  );
}
