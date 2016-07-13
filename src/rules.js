import { rule } from '@buggyorg/nitro/lib/rewrite/rewrite' // TODO this will change in later versions
import * as matchers from './matchers'
import {utils} from '@buggyorg/graphtools'
import _ from 'lodash'
import * as constants from './constants'

function resolveFloor (graph, n, match) {
  var edge
  for (var edge_number in match) {
    edge = match[edge_number]
    utils.setPortType(graph, edge.node, edge.port, constants.abstract_int_type)
  }
}

function resolveAddition (graph, n, match) {
  const node = graph.node(n)
  if (allInputsOfTypes(node.inputPorts, constants.integer_types)) {
    for (var portindex in node.outputPorts) {
      node.outputPorts[portindex] = constants.integer_types[0]
    }
  }
}

function resolveMultiply (graph, n, match) {
  const node = graph.node(n)
  if (allInputsOfTypes(node.inputPorts, constants.integer_types)) {
    for (var portindex in node.outputPords) {
      node.outputPorts[portindex] = constants.integer_types[0]
    }
  }
}

function allInputsOfTypes (ports, types) {
  var input_type
  for (var index in ports) {
    input_type = ports[index]
    if (constants.integer_types.indexOf(input_type) === -1) {
      return false
    }
  }
  return true
}

export const rewriteAddition = rule(
  matchers.selectAddition,
  resolveAddition
)

export const rewriteFloor = rule(
  matchers.selectFloor,
  resolveFloor
)

export const rewriteMultiply = rule(
  _.partial(matchers.selectID, _, _, 'math/multiply'),
  resolveMultiply
)

export default [
  rewriteAddition,
  rewriteFloor,
  rewriteMultiply
]
