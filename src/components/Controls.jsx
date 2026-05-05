export default function Controls({ setAlgo }) {
  return (
    <div className="mt-4">
      <select
        onChange={e => setAlgo(e.target.value)}
        className="border p-2"
      >
        <option value="first">First Fit</option>
        <option value="best">Best Fit</option>
        <option value="worst">Worst Fit</option>
      </select>
    </div>
  );
}