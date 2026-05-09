import React, { useState } from "react";

import ProcessScheduling from "./components/ProcessSchedulingA1";
import DeadlockSimulator from "./components/DeadlockSimulatorA2";
import MemoryManager from "./components/MemoryManager";
import FileSystemSimulator from "./components/FileSystemSimulatorA4";
import { createDisk } from "./algorithms/fileSystemA4";
import {
  fcfs,
  sjn,
  priorityScheduling,
  roundRobin,
} from "./algorithms/processSchedulingA1";
export default function App() {
  const [view, setView] = useState("SCHEDULING");

  const [processes, setProcesses] = useState([]);
  const [result, setResult] = useState(null);

  const [algorithm, setAlgorithm] = useState("FCFS");
  const [quantum, setQuantum] = useState(2);

  // FILE SYSTEM STATES
  const [fileDisk, setFileDisk] = useState(createDisk());
  const [fileList, setFileList] = useState([]);
  const [fileLogs, setFileLogs] = useState([]);
  const [fileMessage, setFileMessage] = useState("");

  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [fileContent, setFileContent] = useState("");

  const [allocationType, setAllocationType] = useState("Contiguous");

  const [selectedProcess, setSelectedProcess] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [writeContent, setWriteContent] = useState("");

  // ADD PROCESS
  const addProcess = (p) => setProcesses([...processes, p]);

  // CPU SCHEDULING Algos
  const runAlgorithm = () => {
    let output;

    if (algorithm === "FCFS") output = fcfs(processes);
    else if (algorithm === "SJN") output = sjn(processes);
    else if (algorithm === "Priority") output = priorityScheduling(processes);
    else if (algorithm === "RR") output = roundRobin(processes, quantum);

    setResult(output);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          OS Simulation Tool
        </h1>

        {/* NAVIGATION */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setView("SCHEDULING")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Scheduling (A1)
          </button>

          <button
            onClick={() => setView("DEADLOCK")}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            SYNCHRONIZATION (A2)
          </button>

          <button
            onClick={() => setView("MEMORY")}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            Memory (A3)
          </button>

          <button
            onClick={() => setView("FILESYSTEM")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            File System (A4)
          </button>
        </div>

        {/* =========================
            SCHEDULING 
        ========================= */}
        {view === "SCHEDULING" && (
          <ProcessScheduling
            processes={processes}
            setProcesses={setProcesses}
            result={result}
            setResult={setResult}
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
            quantum={quantum}
            setQuantum={setQuantum}
            runAlgorithm={runAlgorithm}
            addProcess={addProcess}
            fileList={fileList}
          />
        )}

        {/* DEADLOCK VIEW */}
        {view === "DEADLOCK" && <DeadlockSimulator processes={processes} />}

        {/* MEMORY VIEW */}
        {view === "MEMORY" && <MemoryManager processes={processes} />}

        {/* FILE SYSTEM VIEW */}
        {view === "FILESYSTEM" && (
          <FileSystemSimulator
            processes={processes}
            disk={fileDisk}
            setDisk={setFileDisk}
            files={fileList}
            setFiles={setFileList}
            logs={fileLogs}
            setLogs={setFileLogs}
            message={fileMessage}
            setMessage={setFileMessage}
            fileName={fileName}
            setFileName={setFileName}
            fileSize={fileSize}
            setFileSize={setFileSize}
            fileContent={fileContent}
            setFileContent={setFileContent}
            allocationType={allocationType}
            setAllocationType={setAllocationType}
            selectedProcess={selectedProcess}
            setSelectedProcess={setSelectedProcess}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            writeContent={writeContent}
            setWriteContent={setWriteContent}
          />
        )}
      </div>
    </div>
  );
}
