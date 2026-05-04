import React, { useState } from "react";
import ProcessForm from "./components/ProcessForm";
import AlgorithmSelector from "./components/AlgorithmSelector";
import ResultsTable from "./components/ResultsTable";
import GanttChart from "./components/GanttChart";
import MetricsCard from "./components/MetricsCard";

import { fcfs } from "./algorithms/fcfs";
import { sjn } from "./algorithms/sjn";
import { priorityScheduling } from "./algorithms/priority";
import { roundRobin } from "./algorithms/roundRobin";
import DeadlockSimulator from "./components/DeadlockSimulator";
import MemoryManager from "./components/MemoryManager";

export default function App() {
  const [view, setView] = useState("SCHEDULING");
  const [processes, setProcesses] = useState([]);
  const [result, setResult] = useState(null);
  const [algorithm, setAlgorithm] = useState("FCFS");
  const [quantum, setQuantum] = useState(2);

  const addProcess = (p) => setProcesses([...processes,p]);

  const runAlgorithm = () => {
    let output;
    if (algorithm === "FCFS") output = fcfs(processes);
    else if (algorithm === "SJN") output = sjn(processes);
    else if (algorithm === "Priority") output = priorityScheduling(processes);
    else if (algorithm === "RR") output = roundRobin(processes, quantum);
    setResult(output);
  };

  // return (
  //   <div className="min-h-screen bg-gray-100 p-6">
  //     <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
  //       <h1 className="text-3xl font-bold mb-4 text-center">OS Scheduling Simulator (Assignment 1)</h1>
  //       <ProcessForm onAdd={addProcess} />
  //       <AlgorithmSelector algorithm={algorithm} setAlgorithm={setAlgorithm} quantum={quantum} setQuantum={setQuantum} />
  //       <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={runAlgorithm}>Run Algorithm</button>

  //       {result && (
  //         <>
  //           <ResultsTable processes={result.processes} />
  //           <GanttChart gantt={result.gantt} />
  //           <MetricsCard processes={result.processes} totalTime={result.totalTime} />
  //           <DeadlockSimulator processes={processes} />
  //         </>
  //       )}
  //     </div>
  //   </div>
  // );
  return (
  <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">

      <h1 className="text-3xl font-bold mb-6 text-center">
        OS Simulation Tool
      </h1>

      {/* 🔷 NAVIGATION */}
      <div className="flex justify-center gap-4 mb-6">

        <button
          onClick={() => setView("SCHEDULING")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Scheduling (A1)
        </button>

        <button
          onClick={() => setView("DEADLOCK")}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Deadlock (A2)
        </button>

        <button
          onClick={() => setView("MEMORY")}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Memory (A3)
        </button>

      </div>

      {/* 🔷 SCHEDULING VIEW */}
      {view === "SCHEDULING" && (
        <>
          <ProcessForm onAdd={addProcess} />

          <AlgorithmSelector
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
            quantum={quantum}
            setQuantum={setQuantum}
          />

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={runAlgorithm}
          >
            Run Algorithm
          </button>

          {result && (
            <>
              <ResultsTable processes={result.processes} />
              <GanttChart gantt={result.gantt} />
              <MetricsCard
                processes={result.processes}
                totalTime={result.totalTime}
              />
            </>
          )}
        </>
      )}

      {/* 🔷 DEADLOCK VIEW */}
      {view === "DEADLOCK" && (
        <DeadlockSimulator processes={processes} />
      )}

      {/* 🔷 MEMORY VIEW */}
      {view === "MEMORY" && (
        <MemoryManager processes={processes} />
      )}

    </div>
  </div>
);

}
