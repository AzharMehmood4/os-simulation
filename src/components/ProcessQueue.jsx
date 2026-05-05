export default function ProcessQueue({ queue }) {
  return (
    <div className="mt-4 p-3 border rounded">
      <h3 className="font-bold">Process Queue (Execution Order)</h3>

      <div className="flex flex-col gap-2 mt-3">

        {queue.map((p, i) => (
          <div
            key={i}
            className={`p-2 rounded flex justify-between ${
              p.status.includes("ALLOCATED")
                ? "bg-green-200"
                : "bg-yellow-200"
            }`}
          >

            <span>
              {i + 1}. {p.name} (Size: {p.size})
            </span>

            <span className="font-semibold">
              {p.status}
            </span>

          </div>
        ))}

      </div>
    </div>
  );
}