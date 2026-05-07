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
    const pageArray = pages
      .split(",")
      .map(p => Number(p.trim()))
      .filter(p => !isNaN(p));

    if (pageArray.length === 0) return;

    let res;
    if (algo === "FIFO") res = fifoPageReplacement(pageArray, frames);
    else if (algo === "LRU") res = lruPageReplacement(pageArray, frames);
    else res = optPageReplacement(pageArray, frames);

    setResult(res);
  };

  const btnClass = (type) =>
    `px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
      algo === type
        ? "bg-green-600 text-white shadow-md scale-105"
        : "bg-gray-200 hover:bg-gray-300"
    }`;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-xl border">

      {/* TITLE */}
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
         Paging & Page Replacement Simulator
      </h2>

      {/* INPUT SECTION */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Pages Reference String</label>
          <input
            type="text"
            placeholder="e.g. 7,0,1,2,0,3"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Number of Frames</label>
          <input
            type="number"
            value={frames}
            onChange={(e) => setFrames(Number(e.target.value))}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={runPaging}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition"
          >
             Run Simulation
          </button>
        </div>

      </div>

      {/* ALGO SELECTION */}
      <div className="flex gap-3 justify-center mb-6 flex-wrap">
        <button onClick={() => setAlgo("FIFO")} className={btnClass("FIFO")}>
          FIFO
        </button>
        <button onClick={() => setAlgo("LRU")} className={btnClass("LRU")}>
          LRU
        </button>
        <button onClick={() => setAlgo("OPT")} className={btnClass("OPT")}>
          OPT
        </button>
      </div>

      {/* ACTIVE STATUS */}
      <div className="text-center mb-4">
        <span className="text-gray-600">Active Algorithm: </span>
        <span className="font-bold text-green-700">{algo}</span>
      </div>

      {/* RESULT */}
      {result && (
        <div className="bg-white border rounded-xl p-4 shadow-inner">

          <h3 className="text-lg font-bold text-green-700 mb-3">
            📊 Result Analysis
          </h3>

          <p className="mb-2 font-semibold text-red-600">
            Page Faults: {result.faults}
          </p>

          {/* LOG TABLE STYLE */}
          <div className="max-h-64 overflow-y-auto border rounded">
            {result.log.map((item, index) => (
              <div
                key={index}
                className={`px-3 py-2 text-sm border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                {item}
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}