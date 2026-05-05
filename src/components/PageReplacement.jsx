import { useState } from "react";

export default function PageReplacement({
  runFIFO,
  runLRU,
  runOPT,
  result,
  pageAlgoStatus
}) {
  const [pages, setPages] = useState("");
  const [frames, setFrames] = useState("");

  const parsePages = () =>
    pages
      .split(",")
      .map(p => Number(p.trim()))
      .filter(p => !isNaN(p));

  return (
    <div className="mt-4 p-4 border rounded">

      {/* TITLE */}
      <h2 className="font-bold text-lg mb-3">
        Page Replacement System
      </h2>

      {/* STATUS BOX ( */}
      {pageAlgoStatus && (
        <div className="mb-3 p-2 bg-blue-100 rounded">
          <p className="font-semibold text-blue-700">
            {pageAlgoStatus}
          </p>
        </div>
      )}

      {/* PAGES INPUT */}
      <label className="block font-semibold mb-1">
        Pages Reference String
      </label>
      <input
        placeholder="e.g. 1,2,3,4,5"
        value={pages}
        onChange={(e) => setPages(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      {/* FRAMES INPUT */}
      <label className="block font-semibold mb-1">
        Number of Frames
      </label>
      <input
        type="number"
        placeholder="e.g. 3"
        value={frames}
        onChange={(e) => setFrames(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      {/* BUTTONS */}
      <div className="mt-2">
        <button
          onClick={() => runFIFO(parsePages(), Number(frames))}
          className="mr-2 bg-purple-500 text-white px-3 py-1"
        >
          FIFO
        </button>

        <button
          onClick={() => runLRU(parsePages(), Number(frames))}
          className="mr-2 bg-purple-500 text-white px-3 py-1"
        >
          LRU
        </button>

        <button
          onClick={() => runOPT(parsePages(), Number(frames))}
          className="bg-purple-500 text-white px-3 py-1"
        >
          OPT
        </button>
      </div>

      {/* RESULT */}
      <h2 className="mt-4 font-bold">
        Page Faults: {result}
      </h2>

    </div>
  );
}