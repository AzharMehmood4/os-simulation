import React from "react";

export default function AlgorithmSelector({ algorithm, setAlgorithm, quantum, setQuantum }) {
  return (
    <div className="flex gap-3 mb-4">
      <select className="border p-2 rounded" value={algorithm} onChange={e=>setAlgorithm(e.target.value)}>
        <option value="FCFS">FCFS</option>
        <option value="SJN">SJN</option>
        <option value="Priority">Priority</option>
        <option value="RR">Round Robin</option>
      </select>
      {algorithm === "RR" && (
        <input type="number" className="border p-2 rounded" placeholder="Quantum" value={quantum} onChange={e=>setQuantum(Number(e.target.value))}/>
      )}
    </div>
  );
}
