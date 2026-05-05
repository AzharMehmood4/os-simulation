import React, { useState } from "react";

export default function ProcessForm({ onAdd }) {
  const [arrival, setArrival] = useState("");
  const [burst, setBurst] = useState("");
  const [priority, setPriority] = useState("");
  const [file, setFile] = useState("FileA");
  const [operation, setOperation] = useState("Read");
  const [counter, setCounter] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({
      id: "P" + counter,  
      arrivalTime: Number(arrival),
      burstTime: Number(burst),
      priority: Number(priority),
      file,
      operation
    });

    setCounter(counter + 1);  

    setArrival("");
    setBurst("");
    setPriority("");
  };

  return (
    <form className="flex flex-wrap gap-3 mb-4" onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Arrival Time"
        value={arrival}
        onChange={e => setArrival(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <input
        type="number"
        placeholder="Burst Time"
        value={burst}
        onChange={e => setBurst(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <input
        type="number"
        placeholder="Priority"
        value={priority}
        onChange={e => setPriority(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <select
        value={file}
        onChange={e => setFile(e.target.value)}
        className="border p-2 rounded"
      >
        <option>FileA</option>
        <option>FileB</option>
        <option>FileC</option>
      </select>

      <select
        value={operation}
        onChange={e => setOperation(e.target.value)}
        className="border p-2 rounded"
      >
        <option>Read</option>
        <option>Write</option>
      </select>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        type="submit"
      >
        Add Process
      </button>
    </form>
  );
}