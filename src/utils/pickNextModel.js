// "Randomize 3D" picks least-shown-first: only the models shown the fewest times so far can come
// up, each with equal chance, so every model is seen once before any of them repeats.
// Counts are keyed by model id and never mutated; each helper returns a new object.

// The model on screen at page load counts as shown once
export const createDisplayCounts = (models, initialId) =>
  Object.fromEntries(models.map(({ id }) => [id, id === initialId ? 1 : 0]))

export const incrementCount = (counts, id) => ({ ...counts, [id]: (counts[id] ?? 0) + 1 })

// Returns the id of the next model, or null when there is nothing to pick.
// The model on screen is skipped whenever another one is available; if it was the only one with
// the lowest count, the pick comes from the next least-shown group instead.
// excludedIds: models that failed to load. random: injectable for tests
export const pickNextModelId = ({ models, counts, currentId, excludedIds = [], random = Math.random }) => {
  const available = models.filter(({ id }) => !excludedIds.includes(id))
  const others = available.filter(({ id }) => id !== currentId)
  const eligible = others.length > 0 ? others : available
  if (eligible.length === 0) return null

  const countOf = ({ id }) => counts[id] ?? 0
  const lowest = Math.min(...eligible.map(countOf))
  const pool = eligible.filter((model) => countOf(model) === lowest)
  return pool[Math.floor(random() * pool.length)].id
}
