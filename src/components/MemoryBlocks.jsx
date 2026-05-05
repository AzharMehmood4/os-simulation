// export default function MemoryBlocks({ blocks }) {
//   return (
//     <div className="grid grid-cols-3 gap-4 mt-4">
//       {blocks.map((b, i) => (
//         <div
//           key={i}
//           className={`p-4 rounded-xl text-white ${
//             b.allocated ? "bg-red-500" : "bg-green-500"
//           }`}
//         >
//           <p>Block {i}</p>
//           <p>Size: {b.size}</p>
//           <p>{b.allocated ? "Allocated" : "Free"}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

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
          <p>Block {i + 1}</p>
          <p>Size: {b.size}</p>

          {b.allocated ? (
            <p>Process: {b.process}</p>
          ) : (
            <p>Free</p>
          )}
        </div>
      ))}

    </div>
  );
}