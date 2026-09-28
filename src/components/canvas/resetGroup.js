// Shares one "return to the starting view" timer between several ResettingControls.
// Touching any member restarts the countdown; when it runs out, every member glides back together.
export const createResetGroup = (delay = 5000) => {
  const members = new Set()
  let timer = null

  return {
    add(member) {
      members.add(member)
      return () => members.delete(member)
    },
    start() {
      clearTimeout(timer)
    },
    end() {
      clearTimeout(timer)
      timer = setTimeout(() => members.forEach((member) => member.reset()), delay)
    },
    dispose() {
      clearTimeout(timer)
    },
  }
}
