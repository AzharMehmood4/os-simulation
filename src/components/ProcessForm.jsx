import React, { useState } from "react";

export default function ProcessForm({ onAdd, files }) {
  const [arrival, setArrival] = useState("");
  const [burst, setBurst] = useState("");
  const [priority, setPriority] = useState("");
  const [file, setFile] = useState("");        
  const [counter, setCounter] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Select Any file
    // if (!file) {
    //   alert("Please select a file!");
    //   return;
    // }

    onAdd({
      id: "P" + counter,
      arrivalTime: Number(arrival),
      burstTime: Number(burst),
      priority: Number(priority),
      file,
    });

    setCounter(counter + 1);

    // Form reset
    setArrival("");
    setBurst("");
    setPriority("");
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-2xl p-5 mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Process Scheduling Algorithms Simulation (Assignment)
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

        {/* Select File */}
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

        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          type="submit"
        >
          Add Process
        </button>
      </form>
    </>
  );
}