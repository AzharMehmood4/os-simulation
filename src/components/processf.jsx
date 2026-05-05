import { useState } from "react";

export default function ProcessForm({ addProcess }) {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");

  return (
    <div className="p-4 border rounded">

      <h2 className="font-bold text-lg mb-2">Add Process</h2>

      <input
        placeholder="Process Name (P1, P2...)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mr-2"
      />

      <input
        type="number"
        placeholder="Size"
        value={size}
        onChange={(e) => setSize(e.target.value)}
        className="border p-2 mr-2"
      />

      <button
        onClick={() => {
          addProcess(name, Number(size));
          setName("");
          setSize("");
        }}
        className="bg-blue-500 text-white px-3 py-2"
      >
        Add process
      </button>

    </div>
  );
}