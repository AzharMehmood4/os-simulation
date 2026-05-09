// import React, { useState } from "react";

import {
  //   createDisk,
  allocateContiguous,
  allocateLinked,
  allocateIndexed,
  deleteFileBlocks,
  calculateDiskUsage,
  calculateFragmentation,
} from "../algorithms/fileSystem";

export default function FileSystemSimulator({
  processes,

  disk,
  setDisk,

  files,
  setFiles,

  logs,
  setLogs,

  message,
  setMessage,

  fileName,
  setFileName,

  fileSize,
  setFileSize,

  fileContent,
  setFileContent,

  allocationType,
  setAllocationType,

  selectedProcess,
  setSelectedProcess,

  selectedFile,
  setSelectedFile,

  writeContent,
  setWriteContent,
}) {
  // =========================
  // LOG FUNCTION
  // =========================
  const addLog = (text) => {
    setLogs((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] ${text}`,
    ]);
  };

  // =========================
  // CREATE FILE
  // =========================
  const createFile = () => {
    if (!fileName || !fileSize) {
      setMessage("Enter file details");
      return;
    }

    const newDisk = [...disk];

    let allocationResult;

    if (allocationType === "Contiguous") {
      allocationResult = allocateContiguous(
        newDisk,
        fileName,
        Number(fileSize),
      );
    } else if (allocationType === "Linked") {
      allocationResult = allocateLinked(newDisk, fileName, Number(fileSize));
    } else {
      allocationResult = allocateIndexed(newDisk, fileName, Number(fileSize));
    }

    if (!allocationResult) {
      setMessage("Disk Full");
      return;
    }

    const newFile = {
      name: fileName,
      size: Number(fileSize),

      content: fileContent,

      allocation: allocationType,

      blocks:
        allocationType === "Indexed"
          ? allocationResult.blocks
          : allocationResult,

      indexBlock:
        allocationType === "Indexed" ? allocationResult.indexBlock : null,

      lockedBy: null,

      accessCount: 0,

      lastAccessTime: "-",
    };

    setFiles([...files, newFile]);

    setDisk(newDisk);

    addLog(`File ${fileName} created`);

    setMessage("( Creation ) \n File Created");

    setFileName("");
    setFileSize("");
    setFileContent("");
  };

  // =========================
  // DELETE FILE
  // =========================
  const deleteFile = (name) => {
    const newDisk = [...disk];

    deleteFileBlocks(newDisk, name);

    setDisk(newDisk);

    setFiles(files.filter((f) => f.name !== name));

    addLog(`File ${name} deleted`);

    setMessage("( Deletion ) \n File Deleted");
  };

  // =========================
  // READ FILE
  // =========================
  const readFile = () => {
    const file = files.find((f) => f.name === selectedFile);

    if (!file) return;

    if (file.lockedBy && file.lockedBy !== selectedProcess) {
      addLog(`${selectedProcess} waiting to READ ${file.name}`);

      setMessage("File Locked");

      return;
    }

    const updatedFiles = files.map((f) => {
      if (f.name === file.name) {
        return {
          ...f,
          accessCount: f.accessCount + 1,
          lastAccessTime: new Date().toLocaleTimeString(),
        };
      }

      return f;
    });

    setFiles(updatedFiles);

    addLog(`${selectedProcess} READ ${file.name}`);

    setMessage(`( Reading )\n Content : ${file.content}`);
  };

  // =========================
  // WRITE FILE
  // =========================
  const writeFile = () => {
    const file = files.find((f) => f.name === selectedFile);

    if (!file) return;

    // LOCK CHECK
    if (file.lockedBy && file.lockedBy !== selectedProcess) {
      addLog(`${selectedProcess} waiting to WRITE ${file.name}`);

      setMessage("Deadlock Risk / File Locked");

      return;
    }

    // APPLY LOCK
    const updatedFiles = files.map((f) => {
      if (f.name === file.name) {
        return {
          ...f,

          lockedBy: selectedProcess,

          content: writeContent,

          accessCount: f.accessCount + 1,

          lastAccessTime: new Date().toLocaleTimeString(),
        };
      }

      return f;
    });

    setFiles(updatedFiles);

    addLog(`${selectedProcess} WRITE ${file.name}`);

    setMessage("( Writing )\n Write successful");

    // RELEASE LOCK AFTER 3 SEC
    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) => {
          if (f.name === file.name) {
            return {
              ...f,
              lockedBy: null,
            };
          }

          return f;
        }),
      );

      addLog(`${selectedProcess} released ${file.name}`);
    }, 3000);
  };

  // =========================
  // DEADLOCK DETECTION
  // =========================
  const detectDeadlock = () => {
    const lockedFiles = files.filter((f) => f.lockedBy);

    if (lockedFiles.length >= 2) {
      setMessage("Deadlock Detected! Resolving...");

      addLog("Deadlock Detected");

      // RESOLVE
      const resolved = files.map((f, index) => {
        if (index === 0) {
          return {
            ...f,
            lockedBy: null,
          };
        }

        return f;
      });

      setFiles(resolved);

      addLog("Deadlock Resolved by releasing first lock");
    } else {
      setMessage("(Deadlock Checking )\n No Deadlock");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* HEADER */}
      <div className="bg-white shadow-md rounded-2xl p-5 mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          File System Simulation (A4)
        </h2>
        <p className="text-gray-500">
          Contiguous | Linked | Indexed Allocation + Process Access
        </p>
      </div>

      {/* SYSTEM STATUS (ALWAYS VISIBLE) */}
      <div className="bg-white shadow rounded-2xl p-4 mb-6">
        <h3 className="text-lg font-bold text-gray-700 mb-2">System Status</h3>

        <div className="bg-gray-100 p-3 rounded-lg text-gray-800 whitespace-pre-line">
          {message || "No operation performed yet"}
        </div>
      </div>

      {/* CREATE FILE */}
      <div className="bg-white shadow rounded-2xl p-5 mb-6">
        <h3 className="text-xl font-semibold mb-4">Create File</h3>

        <div className="grid md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="File Name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="border p-2 rounded-lg"
          />

          <input
            type="number"
            placeholder="File Size"
            value={fileSize}
            onChange={(e) => setFileSize(e.target.value)}
            className="border p-2 rounded-lg"
          />

          <input
            type="text"
            placeholder="Initial Content"
            value={fileContent}
            onChange={(e) => setFileContent(e.target.value)}
            className="border p-2 rounded-lg"
          />

          <select
            value={allocationType}
            onChange={(e) => setAllocationType(e.target.value)}
            className="border p-2 rounded-lg"
          >
            <option>Contiguous</option>
            <option>Linked</option>
            <option>Indexed</option>
          </select>
        </div>

        <button
          onClick={createFile}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          Create File
        </button>
      </div>

      {/* FILE ACCESS */}
      <div className="bg-white shadow rounded-2xl p-5 mb-6">
        <h3 className="text-xl font-semibold mb-4">Process File Access</h3>

        <div className="grid md:grid-cols-3 gap-4">
          <select
            value={selectedProcess}
            onChange={(e) => setSelectedProcess(e.target.value)}
            className="border p-2 rounded-lg"
          >
            <option value="">Select Process</option>
            {processes.map((p, i) => (
              <option key={i} value={p.id}>
                {p.id}
              </option>
            ))}
          </select>

          <select
            value={selectedFile}
            onChange={(e) => setSelectedFile(e.target.value)}
            className="border p-2 rounded-lg"
          >
            <option value="">Select File</option>
            {files.map((f, i) => (
              <option key={i} value={f.name}>
                {f.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Write Content"
            value={writeContent}
            onChange={(e) => setWriteContent(e.target.value)}
            className="border p-2 rounded-lg"
          />
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={readFile}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            READ
          </button>

          <button
            onClick={writeFile}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
          >
            WRITE
          </button>

          <button
            onClick={detectDeadlock}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            DEADLOCK CHECK
          </button>
        </div>
      </div>

      {/* FILE TABLE (UNCHANGED COLUMNS) */}
      <div className="bg-white shadow rounded-2xl p-5 mb-6 overflow-auto">
        <h3 className="text-xl font-semibold mb-4">File Table</h3>

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 w-[12%]">File</th>
              <th className="w-[12%]">Allocation</th>
              <th className="w-[25%]">Blocks</th>
              <th className="w-[12%]">Access Count</th>
              <th className="w-[18%]">Last Access</th>
              <th className="w-[12%]">Locked By</th>
              <th className="w-[9%]">Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, i) => (
              <tr key={i} className="text-center border-t">
                <td className="p-2">{file.name}</td>
                <td>{file.allocation}</td>
                <td>{file.blocks.join(", ")}</td>
                <td>{file.accessCount}</td>
                <td>{file.lastAccessTime}</td>

                <td>
                  {file.lockedBy ? (
                    <span className="text-red-500">Locked</span>
                  ) : (
                    "Free"
                  )}
                </td>

                <td>
                  <button
                    onClick={() => deleteFile(file.name)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DISK VISUALIZATION */}
      <div className="bg-white shadow rounded-2xl p-5 mb-6">
        <h3 className="text-xl font-semibold mb-4">Disk Visualization</h3>

        <div className="grid grid-cols-10 gap-2">
          {disk.map((block, index) => (
            <div
              key={index}
              className={`h-12 flex items-center justify-center text-xs font-bold rounded
            ${
              block === null
                ? "bg-green-200"
                : block.includes("INDEX")
                  ? "bg-yellow-400"
                  : "bg-blue-500 text-white"
            }`}
            >
              {block || index}
            </div>
          ))}
        </div>
      </div>

      {/* METRICS */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-purple-100 p-4 rounded-xl">
          <h3 className="font-bold">Disk Usage</h3>
          <p>{calculateDiskUsage(disk)}%</p>
        </div>

        <div className="bg-pink-100 p-4 rounded-xl">
          <h3 className="font-bold">Fragmentation</h3>
          <p>{calculateFragmentation(disk)}</p>
        </div>

        <div className="bg-green-100 p-4 rounded-xl">
          <h3 className="font-bold">Free Blocks</h3>
          <p>{disk.filter((b) => b === null).length}</p>
        </div>
      </div>

      {/* LOGS */}
      <div className="bg-black text-green-400 p-4 rounded-2xl">
        <h3 className="text-white font-bold mb-7">System Logs</h3>

        <div className="h-48 overflow-auto text-sm">
          {logs.map((log, i) => (
            <p key={i}>→ {log}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
