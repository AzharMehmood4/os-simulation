export function firstFit(blocks, size) {
  return blocks.findIndex(b => !b.allocated && b.size >= size);
}

export function bestFit(blocks, size) {
  let best = -1;
  blocks.forEach((b, i) => {
    if (!b.allocated && b.size >= size) {
      if (best === -1 || b.size < blocks[best].size) best = i;
    }
  });
  return best;
}

export function worstFit(blocks, size) {
  let worst = -1;
  blocks.forEach((b, i) => {
    if (!b.allocated && b.size >= size) {
      if (worst === -1 || b.size > blocks[worst].size) worst = i;
    }
  });
  return worst;
}