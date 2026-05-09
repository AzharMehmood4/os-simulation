import React, { useState } from "react";

/* =========================
   PROCESS FORM
========================= */
function ProcessForm({ onAdd, files }) {
  const [arrival, setArrival] = useState("");
  const [burst, setBurst] = useState("");
  const [priority, setPriority] = useState("");
  const [file, setFile] = useState("");
  const [counter, setCounter] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({
      id: "P" + counter,
      arrivalTime: Number(arrival),
      burstTime: Number(burst),
      priority: Number(priority),
      file,
    });

    setCounter(counter + 1);
    setArrival("");
    setBurst("");
    setPriority("");
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-2xl p-5 mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Process Scheduling Algorithms Simulation (Assignment 1)
        </h2>
      </div>

      <form className="flex flex-wrap gap-3 mb-4" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Arrival Time"
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Burst Time"
          value={burst}
          onChange={(e) => setBurst(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <select
          value={file}
          onChange={(e) => setFile(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="" disabled>
            Select File
          </option>

          {files.length === 0 ? (
            <option value="" disabled>
              No Files Available
            </option>
          ) : (
            files.map((f, i) => (
              <option key={i} value={f.name}>
                {f.name}
              </option>
            ))
          )}
        </select>

        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Add Process
        </button>
      </form>
    </>
  );
}

/* =========================
   ALGORITHM SELECTOR
========================= */
function AlgorithmSelector({ algorithm, setAlgorithm, quantum, setQuantum }) {
  return (
    <div className="flex gap-3 mb-4">
      <select
        className="border p-2 rounded"
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
      >
        <option value="FCFS">FCFS</option>
        <option value="SJN">SJN</option>
        <option value="Priority">Priority</option>
        <option value="RR">Round Robin</option>
      </select>

      {algorithm === "RR" && (
        <input
          type="number"
          className="border p-2 rounded"
          placeholder="Quantum"
          value={quantum}
          onChange={(e) => setQuantum(Number(e.target.value))}
        />
      )}
    </div>
  );
}

/* =========================
   RESULTS TABLE
========================= */
function ResultsTable({ processes }) {
  return (
    <table className="table-auto w-full border border-gray-400 mt-4">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-2 py-1">ID</th>
          <th className="border px-2 py-1">AT</th>
          <th className="border px-2 py-1">BT</th>
          <th className="border px-2 py-1">Priority</th>
          <th className="border px-2 py-1">CT</th>
          <th className="border px-2 py-1">TAT</th>
          <th className="border px-2 py-1">WT</th>
          <th className="border px-2 py-1">File</th>
        </tr>
      </thead>

      <tbody>
        {processes.map((p) => (
          <tr key={p.id}>
            <td className="border px-2 py-1">{p.id}</td>
            <td className="border px-2 py-1">{p.arrivalTime}</td>
            <td className="border px-2 py-1">{p.burstTime}</td>
            <td className="border px-2 py-1">{p.priority}</td>
            <td className="border px-2 py-1">{p.completionTime}</td>
            <td className="border px-2 py-1">{p.turnaroundTime}</td>
            <td className="border px-2 py-1">{p.waitingTime}</td>
            <td className="border px-2 py-1">{p.file}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* =========================
   GANTT CHART
========================= */
function GanttChart({ gantt }) {
  const cumulativeGantt = gantt.reduce((acc, b) => {
    const start = acc.length > 0 ? acc[acc.length - 1].end : 0;
    const duration = b.end - b.start;
    const end = start + duration;
    acc.push({ ...b, start, end });
    return acc;
  }, []);

  return (
    <div className="flex mt-4 gap-1 items-center">
      {cumulativeGantt.map((b, i) => (
        <div
          key={i}
          className="bg-purple-500 text-center text-white font-bold flex items-center justify-center"
          style={{ width: 80, height: 50, borderRadius: 5 }}
        >
          {b.id} ({b.start},{b.end})
        </div>
      ))}
    </div>
  );
}

/* =========================
   METRICS CARD
========================= */
function MetricsCard({ processes, totalTime }) {
  const avgWT =
    processes.reduce((a, b) => a + b.waitingTime, 0) / processes.length;
  const avgTAT =
    processes.reduce((a, b) => a + b.turnaroundTime, 0) / processes.length;
  const throughput = processes.length / totalTime;

  return (
    <div className="flex gap-4 mt-4">
      <div className="bg-yellow-200 p-3 rounded">
        Avg WT: {avgWT.toFixed(2)}
      </div>
      <div className="bg-green-200 p-3 rounded">
        Avg TAT: {avgTAT.toFixed(2)}
      </div>
      <div className="bg-blue-200 p-3 rounded">
        Throughput: {throughput.toFixed(2)}
      </div>
    </div>
  );
}

/* =========================
   MAIN 
========================= */
export default function ProcessSchedulingA1({
  result,
  algorithm,
  setAlgorithm,
  quantum,
  setQuantum,
  runAlgorithm,
  addProcess,
  fileList,
}) {
  return (
    <>
      <ProcessForm onAdd={addProcess} files={fileList} />

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
  );
}
