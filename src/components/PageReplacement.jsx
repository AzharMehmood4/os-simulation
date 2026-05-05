import { useState } from "react";

export default function PageReplacement({ runFIFO, runLRU, runOPT, result }) {
  const [pages, setPages] = useState("");
  const [frames, setFrames] = useState("");

  const parsePages = () => pages.split(",").map(Number);

  return (
    <div className="mt-6">
      <input
        placeholder="Pages (e.g. 1,2,3,4)"
        value={pages}
        onChange={e => setPages(e.target.value)}
        className="border p-2 mr-2"
      />

      <input
        type="number"
        placeholder="Frames"
        value={frames}
        onChange={e => setFrames(e.target.value)}
        className="border p-2 mr-2"
      />

      <div className="mt-2">
        <button onClick={() => runFIFO(parsePages(), Number(frames))} className="mr-2 bg-purple-500 text-white px-3 py-1">FIFO</button>
        <button onClick={() => runLRU(parsePages(), Number(frames))} className="mr-2 bg-purple-500 text-white px-3 py-1">LRU</button>
        <button onClick={() => runOPT(parsePages(), Number(frames))} className="bg-purple-500 text-white px-3 py-1">OPT</button>
      </div>

      <h2 className="mt-4 font-bold">Page Faults: {result}</h2>
    </div>
  );
}