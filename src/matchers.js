export function selectID (graph, n, id) {
  return graph.node(n).id === id
}

export function selectAddition (graph, n) {
  const node = graph.node(n)

  if ('inputPorts' in node) {
    for (var index in node.inputPorts) {
      if (node.inputPorts[index] === 'number') {
        return true
      }
    }
  }
  return false
}
