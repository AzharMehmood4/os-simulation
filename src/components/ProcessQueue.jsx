export default function ProcessQueue({ queue }) {
  return (
    <div className="mt-4 p-3 border rounded">
      <h3 className="font-bold">Process Queue</h3>

      <div className="flex gap-2 mt-2">
        {queue.map((p, i) => (
          <span key={i} className="bg-gray-300 px-2 py-1 rounded">
            {p.name}
          </span>
        ))}
      </div>
    </div>
  );
}