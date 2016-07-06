import {walk, utils} from '@buggyorg/graphtools'
import * as constants from './constants'

export function selectID (graph, n, id) {
  return graph.node(n).id === id
}

export function selectFloor (graph, n) {
  const node = graph.node(n)
  var targets = []
  if (node.id === 'math/floor') {
    for (var port in node.outputPorts) {
      walk.successor(graph, n, port).forEach((edge) => {
        if (utils.portType(graph, edge.node, edge.port) !== constants.abstract_int_type) {
          targets.push(edge)
        }
      })
    }
  }
  if (targets.length === 0) {
    return false
  }
  return targets
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
