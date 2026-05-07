import React, { useState } from "react";
import { firstFit, bestFit, worstFit } from "../algorithms/memory";
import MemoryVisualizer from "./MemoryVisualizer";
import PagingSimulator from "./PagingSimulator";

export default function MemoryManager({ processes }) {
  const [algo, setAlgo] = useState("FIRST");
  const [result, setResult] = useState(null);

  // STORE MEMORY SIZE OF EACH PROCESS
  const [processMemory, setProcessMemory] = useState({});

  // DYNAMIC MEMORY BLOCKS
  const [memoryBlocks, setMemoryBlocks] = useState([100, 500, 200, 300, 600]);
  const [blockSize, setBlockSize] = useState("");
  const [blockNumber, setBlockNumber] = useState("");

  const runMemory = () => {
    let res;

    // ADD MEMORY SIZE TO PROCESS
    const updatedProcesses = processes.map((p) => ({
      ...p,
      memory: processMemory[p.id] || 0,
    }));

    if (algo === "FIRST") {
      res = firstFit(updatedProcesses, memoryBlocks);
    } else if (algo === "BEST") {
      res = bestFit(updatedProcesses, memoryBlocks);
    } else {
      res = worstFit(updatedProcesses, memoryBlocks);
    }

    setResult(res);
  };

  // ADD BLOCK FUNCTION
  const addBlock = () => {
    if (blockSize === "") return;

    const size = Number(blockSize);
    const updated = [...memoryBlocks];

    if (blockNumber !== "") {
      const index = Number(blockNumber) - 1;
      updated.splice(index, 0, size);
    } else {
      updated.push(size);
    }

    setMemoryBlocks(updated);
    setBlockSize("");
    setBlockNumber("");
  };
  const deleteBlock = (index) => {
  const updated = [...memoryBlocks];
  updated.splice(index, 1);
  setMemoryBlocks(updated);
};
  return (
    <div className="mt-10 p-8 bg-white rounded-2xl shadow-xl">
      
      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">
        Memory Management Simulator (Assignment 3)
      </h1>

      {/* PROCESS SECTION */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Processes
        </h2>

        {processes.length === 0 ? (
          <p className="text-gray-500">No processes available</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {processes.map((p, i) => (
              <div
                key={i}
                className="bg-gradient-to-r from-blue-50 to-purple-50
                border border-purple-100 p-4 rounded-xl shadow-sm
                flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-lg text-purple-700">
                    {p.id}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Arrival: {p.arrivalTime}
                  </p>

                  <p className="text-sm text-gray-500">
                    Burst: {p.burstTime}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">

  <label className="text-sm font-semibold text-gray-600">
    Memory Size
  </label>
                <input
                  type="number"
                  placeholder="Memory Size"
                  value={processMemory[p.id] || ""}
                  onChange={(e) =>
                    setProcessMemory({
                      ...processMemory,
                      [p.id]: Number(e.target.value),
                    })
                  }
                  className="border-2 border-purple-200
                  focus:border-purple-500 outline-none
                  p-2 rounded-lg w-40"
                />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADD BLOCK SECTION */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">

        <h3 className="font-semibold mb-3">Add Memory Block</h3>

        <div className="flex gap-3 flex-wrap">

          <input
            type="number"
            placeholder="Block No (optional)"
            value={blockNumber}
            onChange={(e) => setBlockNumber(e.target.value)}
            className="border p-2 rounded w-40"
          />

          <input
            type="number"
            placeholder="Block Size"
            value={blockSize}
            onChange={(e) => setBlockSize(e.target.value)}
            className="border p-2 rounded w-40"
          />

          <button
            onClick={addBlock}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Block
          </button>
          <button
  onClick={() => setMemoryBlocks([...memoryBlocks])}
  className="hidden"
>
</button>

        </div>
      </div>
{/* DELETE BLOCK SECTION */}
<div className="mt-4 bg-gray-50 p-3 rounded-lg">

  <h3 className="font-semibold mb-2">Delete Memory Blocks</h3>

  {memoryBlocks.length === 0 ? (
    <div className="text-center text-gray-500 py-3 font-medium">
      🚫 No Memory Blocks Available
    </div>
  ) : (
    <div className="flex flex-wrap gap-2">

      {memoryBlocks.map((block, i) => (
        <div
          key={i}
          className="flex items-center gap-2 bg-white px-3 py-1 rounded shadow-sm border"
        >

          <span>
            Block {i + 1} ({block}KB)
          </span>

          <button
            onClick={() => deleteBlock(i)}
            className="text-red-600 font-bold hover:text-red-800"
          >
            ✕
          </button>

        </div>
      ))}

    </div>
  )}

</div>
      {/* MEMORY VISUALIZER */}
      <MemoryVisualizer
        memory={
          result
            ? result.memory
            : memoryBlocks.map((size) => ({
                size,
                free: true,
                process: null,
              }))
        }
      />

      {/* CONTROLS */}
      <div className="flex justify-center mt-8 mb-4">
        <div
          className="bg-gradient-to-r from-purple-600 to-indigo-600
          text-white px-6 py-3 rounded-2xl shadow-lg
          text-lg font-bold tracking-wide"
        >
          Active Algorithm: {" "}
          <span className="text-yellow-300">
            {algo === "FIRST" && "First Fit"}
            {algo === "BEST" && "Best Fit"}
            {algo === "WORST" && "Worst Fit"}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-4 mb-8">
        <select
          value={algo}
          onChange={(e) => setAlgo(e.target.value)}
          className="border-2 border-purple-200
          p-3 rounded-xl outline-none
          focus:border-purple-500 shadow-sm"
        >
          <option value="FIRST">First Fit</option>
          <option value="BEST">Best Fit</option>
          <option value="WORST">Worst Fit</option>
        </select>

        <button
          onClick={runMemory}
          className="bg-purple-600 hover:bg-purple-700
          transition-all duration-300
          text-white px-6 py-3 rounded-xl shadow-md"
        >
          Run Memory Allocation
        </button>
      </div>

      {/* OUTPUT */}
      {result && (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Allocation Logs
          </h2>

          <div className="space-y-3">
            {result.log.map((l, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200
                rounded-lg p-3 shadow-sm"
              >
                {l}
              </div>
            ))}
          </div>

          {result.waiting && result.waiting.length > 0 && (
            <div className="mt-6 bg-red-100 border border-red-300
            text-red-700 p-4 rounded-xl font-semibold">
              Waiting Queue: {result.waiting.join(", ")}
            </div>
          )}
        </div>
      )}

      <div className="mt-10">
        <PagingSimulator />
      </div>

    </div>
  );
}