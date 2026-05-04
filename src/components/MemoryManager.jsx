import React, { useState } from "react";
import { firstFit, bestFit, worstFit } from "../algorithms/memory";
import MemoryVisualizer from "./MemoryVisualizer";
import PagingSimulator from "./PagingSimulator";

export default function MemoryManager({ processes }) {
  const [algo, setAlgo] = useState("FIRST");
  const [result, setResult] = useState(null);

  const memoryBlocks = [100, 500, 200, 300, 600];

  const runMemory = () => {
    let res;

    if (algo === "FIRST") res = firstFit(processes, memoryBlocks);
    else if (algo === "BEST") res = bestFit(processes, memoryBlocks);
    else res = worstFit(processes, memoryBlocks);

    setResult(res);
  };

  return (
    <div className="mt-10 p-6 bg-white rounded-xl shadow-lg">

      <h1 className="text-2xl font-bold text-center text-purple-700 mb-6">
        Memory Management Simulator (A3)
      </h1>

      {/* PROCESS LIST */}
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Processes:</h2>

        {processes.length === 0 ? (
          <p className="text-gray-500">No processes available</p>
        ) : (
          <div className="flex gap-2 flex-wrap">
            {processes.map((p, i) => (
              <span key={i} className="bg-blue-100 px-3 py-1 rounded">
                {p.id} (Mem: {p.memory})
              </span>
            ))}
          </div>
        )}
      </div>

      {/* CONTROLS */}
      <div className="flex gap-4 justify-center mb-6">
        <select
          value={algo}
          onChange={(e) => setAlgo(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="FIRST">First Fit</option>
          <option value="BEST">Best Fit</option>
          <option value="WORST">Worst Fit</option>
        </select>

        <button
          onClick={runMemory}
          className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded"
        >
          Run Memory
        </button>
      </div>

      {/* OUTPUT */}
      {result && (
        <>
          <MemoryVisualizer memory={result.memory} />

          <div className="mt-4 bg-gray-100 p-4 rounded">
            {result.log.map((l, i) => (
              <p key={i}>{l}</p>
            ))}
          </div>

          {result.waiting && result.waiting.length > 0 && (
            <div className="mt-3 text-red-600">
              Waiting Queue: {result.waiting.join(", ")}
            </div>
          )}
        </>
      )}
      <PagingSimulator />
    </div>
    
  );
}
