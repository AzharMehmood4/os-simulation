import React from "react";

export default function MemoryVisualizer({ memory }) {
  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        Memory Blocks
      </h2>

      <div className="flex flex-wrap justify-center gap-6">

        {memory.map((block, i) => (
          <div
            key={i}
            className={`w-44 h-40 rounded-2xl shadow-xl border
            transition-all duration-300
            flex flex-col justify-center items-center

            ${
              block.free
                ? "bg-gradient-to-br from-green-100 to-green-300 border-green-400"
                : "bg-gradient-to-br from-red-100 to-red-300 border-red-400"
            }`}
          >

            <h1 className="text-xl font-bold text-gray-800">
              Block {i + 1}
            </h1>

            <p className="mt-2 text-lg font-semibold text-gray-700">
              {block.size} KB
            </p>

            <div className="mt-4">

              {block.free ? (
                <span className="bg-green-600 text-white
                px-4 py-1 rounded-full text-sm font-semibold">
                  Free
                </span>
              ) : (
                <span className="bg-red-600 text-white
                px-4 py-1 rounded-full text-sm font-semibold">
                  {block.process}
                </span>
              )}

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}