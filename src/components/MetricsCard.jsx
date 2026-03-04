import React from "react";

export default function MetricsCard({ processes, totalTime }) {
  const avgWT = (processes.reduce((a,b)=>a+b.waitingTime,0)/processes.length).toFixed(2);
  const avgTAT = (processes.reduce((a,b)=>a+b.turnaroundTime,0)/processes.length).toFixed(2);
  const throughput = (processes.length / totalTime).toFixed(2);

  return (
    <div className="flex gap-4 mt-4">
      <div className="bg-yellow-200 p-3 rounded">Avg WT: {avgWT}</div>
      <div className="bg-green-200 p-3 rounded">Avg TAT: {avgTAT}</div>
      <div className="bg-blue-200 p-3 rounded">Throughput: {throughput}</div>
    </div>
  );
}
