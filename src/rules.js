import {rewrite} from './const-rewrite.bundle.js'
import * as matchers from './matchers'
import {walk, utils} from '@buggyorg/graphtools'
import _ from 'lodash'

function resolveFloor (graph, n, match) {
  const node = graph.node(n)
  for (var port in node.outputPorts) {
    walk.successor(graph, n, port).forEach((edge) => {
      utils.setPortType(graph, edge.node, edge.port, 'int')
    })
  }
}

function resolveAddition (graph, n, match) {
  const node = graph.node(n)
  console.log('Resolved!' + node.id)

  const integer_types = ['int64', 'int32']

  var all_inputs_integer = true
  var input_type
  for (var index in node.inputPorts) {
    input_type = node.inputPorts[index]
    if (integer_types.indexOf(input_type) === -1) {
      all_inputs_integer = false
      break
    }
  }
  if (all_inputs_integer) {
    for (var portindex in node.outputPorts) {
      node.outputPorts[portindex] = integer_types[0]
    }
  }
}

export const rewriteAddition = rewrite.rule(
  matchers.selectAddition,
  resolveAddition
)

export const rewriteFloor = rewrite.rule(
  _.partial(matchers.selectID, _, _, 'math/floor'),
  resolveFloor
)

export default [
  rewriteAddition,
  rewriteFloor
]
