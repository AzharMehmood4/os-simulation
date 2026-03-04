import React from "react";

export default function ResultsTable({ processes }) {
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
          <th className="border px-2 py-1">Operation</th>
        </tr>
      </thead>
      <tbody>
        {processes.map(p=>(
          <tr key={p.id}>
            <td className="border px-2 py-1">{p.id}</td>
            <td className="border px-2 py-1">{p.arrivalTime}</td>
            <td className="border px-2 py-1">{p.burstTime}</td>
            <td className="border px-2 py-1">{p.priority}</td>
            <td className="border px-2 py-1">{p.completionTime}</td>
            <td className="border px-2 py-1">{p.turnaroundTime}</td>
            <td className="border px-2 py-1">{p.waitingTime}</td>
            <td className="border px-2 py-1">{p.file}</td>
            <td className="border px-2 py-1">{p.operation}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
