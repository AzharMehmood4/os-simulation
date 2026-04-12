import React, { useState } from "react";
import { runMutex } from "../algorithms/synchronization";
import { bankers } from "../algorithms/bankers";

export default function DeadlockSimulator({ processes }) {
  const [output, setOutput] = useState([]);
  const [title, setTitle] = useState("No Simulation Run");

  // ✅ Mutex using A1 processes
  const handleMutex = () => {
    if (processes.length === 0) {
      setOutput(["⚠️ No processes available (Add from A1 first)"]);
      return;
    }

    const simpleProcesses = processes.map(p => ({
      id: p.id,
      file: p.file,
      operation: p.operation
    }));

    const result = runMutex(simpleProcesses);

    setTitle("Mutex Synchronization");
    setOutput(result);
  };

  // ✅ Banker using A1 processes
  const handleBanker = () => {
    if (processes.length === 0) {
      setOutput(["⚠️ No processes available (Add from A1 first)"]);
      return;
    }

    // create dummy allocation & max (based on A1 count)
    const bankerProcesses = processes.map((p, i) => ({
      id: p.id,
      allocation: [i % 2, 1], // simple dynamic values
      max: [i + 2, 2]
    }));

    const available = [1, 1];

    const result = bankers(bankerProcesses, available);

    setTitle("Banker's Algorithm");

    if (result.safe) {
      setOutput([`✅ Safe Sequence: ${result.sequence.join(" → ")}`]);
    } else {
      setOutput(["❌ Deadlock Detected"]);
    }
  };

  return (
    <div className="mt-10 p-6 bg-white rounded-xl shadow-lg">

      {/* 🔥 A2 HEADING */}
      <h1 className="text-2xl font-bold text-center text-purple-700 mb-6">
        OS Synchronization & Deadlock Simulator (Assignment 2)
      </h1>

      {/* Show Processes from A1 */}
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Processes from A1:</h2>
        {processes.length === 0 ? (
          <p className="text-gray-500">No processes added yet</p>
        ) : (
          <div className="flex gap-2 flex-wrap">
            {processes.map((p, i) => (
              <span key={i} className="bg-blue-100 px-3 py-1 rounded">
                {p.id} ({p.file}-{p.operation})
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-center mb-6">
        <button
          onClick={handleMutex}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded"
        >
          Run Mutex
        </button>

        <button
          onClick={handleBanker}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded"
        >
          Run Banker
        </button>
      </div>

      {/* Output */}
      <div className="bg-gray-100 p-4 rounded min-h-28">
        <h3 className="font-semibold mb-2">{title}</h3>

        {output.length === 0 ? (
          <p className="text-gray-500">Click a button to run simulation</p>
        ) : (
          output.map((line, i) => (
            <p key={i}>{line}</p>
          ))
        )}
      </div>
    </div>
  );
}
