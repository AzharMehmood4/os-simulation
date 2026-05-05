export default function MemoryBlocks({ blocks }) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6">

      {blocks.map((b, i) => (
        <div
          key={i}
          className={`p-4 rounded text-white ${
            b.allocated ? "bg-red-500" : "bg-green-500"
          }`}
        >
          <p className="font-bold">Block {i + 1}</p>
          <p>Size: {b.size}</p>

          {/* 👇 IMPROVED DISPLAY */}
          {b.allocated ? (
            <div className="mt-2">
              <p>Process: {b.process.name}</p>
              <p>Process Size: {b.process.size}</p>
            </div>
          ) : (
            <p className="mt-2">Free</p>
          )}
        </div>
      ))}

    </div>
  );
}