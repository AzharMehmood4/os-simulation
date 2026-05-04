import React, { useState } from "react";
import {
  fifoPageReplacement,
  lruPageReplacement,
  optPageReplacement
} from "../algorithms/paging";

export default function PagingSimulator() {
  const [pages, setPages] = useState("");
  const [frames, setFrames] = useState(3);
  const [algo, setAlgo] = useState("FIFO");
  const [result, setResult] = useState(null);

  const runPaging = () => {
    const pageArray = pages.split(",").map(Number);

    let res;
    if (algo === "FIFO") res = fifoPageReplacement(pageArray, frames);
    else if (algo === "LRU") res = lruPageReplacement(pageArray, frames);
    else res = optPageReplacement(pageArray, frames);

    setResult(res);
  };

  return (
    <div className="mt-10 p-6 bg-white rounded-xl shadow-lg">

      <h2 className="text-xl font-bold text-center text-green-700 mb-4">
        Paging & Page Replacement (A3)
      </h2>

      {/* INPUT */}
      <div className="flex gap-3 flex-wrap justify-center mb-4">
        <input
          type="text"
          placeholder="Pages (e.g. 7,0,1,2,0,3)"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="number"
          value={frames}
          onChange={(e) => setFrames(Number(e.target.value))}
          className="border p-2 rounded w-20"
        />

        <select
          value={algo}
          onChange={(e) => setAlgo(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="FIFO">FIFO</option>
          <option value="LRU">LRU</option>
          <option value="OPT">OPT</option>
        </select>

        <button
          onClick={runPaging}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Run Paging
        </button>
      </div>

      {/* OUTPUT */}
      {result && (
        <div className="bg-gray-100 p-4 rounded">
          <p className="font-bold">Page Faults: {result.faults}</p>

          {result.log.map((l, i) => (
            <p key={i}>{l}</p>
          ))}
        </div>
      )}

    </div>
  );
}
