'use strict';

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.dijkstraPath = dijkstraPath;
exports.genDijkstraPath = genDijkstraPath;
exports.dijkstraPathLength = dijkstraPathLength;
exports.genDijkstraPathLength = genDijkstraPathLength;
exports.singleSourceDijkstraPath = singleSourceDijkstraPath;
exports.genSingleSourceDijkstraPath = genSingleSourceDijkstraPath;
exports.singleSourceDijkstraPathLength = singleSourceDijkstraPathLength;
exports.genSingleSourceDijkstraPathLength = genSingleSourceDijkstraPathLength;
exports.singleSourceDijkstra = singleSourceDijkstra;
exports.genSingleSourceDijkstra = genSingleSourceDijkstra;
exports.allPairsDijkstraPathLength = allPairsDijkstraPathLength;
exports.genAllPairsDijkstraPathLength = genAllPairsDijkstraPathLength;
exports.allPairsDijkstraPath = allPairsDijkstraPath;
exports.genAllPairsDijkstraPath = genAllPairsDijkstraPath;

var _internalsDelegate = require('..\\..\\_internals\\delegate');

var _internalsDelegate2 = _interopRequireDefault(_internalsDelegate);

var _internals = require('../../_internals');

var _exceptionsJSNetworkXNoPath = require('../../exceptions/JSNetworkXNoPath');

var _exceptionsJSNetworkXNoPath2 = _interopRequireDefault(_exceptionsJSNetworkXNoPath);

/**
 * Returns the shortest path from `source` to `target` in a weighted graph G.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * jsnx.dijkstraPath(G, {source: 0, target: 4});
 * // [0, 1, 2, 3, 4]
 * ```
 *
 * ### Notes
 *
 * Edge weight attributes must be numerical. Distances are calculated as sums
 * of weighted edges traversed.
 *
 * @see bidirectionalDijkstra
 *
 * @param {Graph} G
 * @param {{source: Node, target: Node, weight: ?string}} parameters
 *   - source: Starting node
 *   - target: Ending node
 *   - weight(='weight'): Edge data key corresponding to the edge weight
 * @return {Array} List of nodes in a shortest path
 */
'use strict';

function dijkstraPath(G, _ref3) {
  var source = _ref3.source;
  var target = _ref3.target;
  var _ref3$weight = _ref3.weight;
  var weight = _ref3$weight === undefined ? 'weight' : _ref3$weight;

  var _singleSourceDijkstra = // eslint-disable-line no-unused-vars
  singleSourceDijkstra(G, { source: source, target: target, weight: weight });

  var _singleSourceDijkstra2 = _slicedToArray(_singleSourceDijkstra, 2);

  var distances = _singleSourceDijkstra2[0];
  var paths = _singleSourceDijkstra2[1];

  var path = paths.get(target);
  if (!path) {
    throw new _exceptionsJSNetworkXNoPath2['default']((0, _internals.sprintf)('Node %j is not reachable from %j', source, target));
  }
  return path;
}

/**
 * Returns the shortest path length from `source` to `target` in a weighted
 * graph.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * jsnx.dijkstraPathLength(G, {source: 0, target: 4});
 * // 4
 * ```
 *
 * ### Notes
 *
 * Edge weight attributes must be numerical. Distances are calculated as sums
 * of weighted edges traversed.
 *
 * @see bidirectionalDijkstra
 *
 * @param {Graph} G
 * @param {{source: Node, target: Node, weight: ?string}} parameters
 *   - source: Starting node
 *   - target: Ending node
 *   - weight(='weight'): Edge data key corresponding to the edge weight
 * @return {number} Shortest path length
 */

function genDijkstraPath(G, _source$target$weight) {
  return (0, _internalsDelegate2['default'])('dijkstraPath', [G, _source$target$weight]);
}

function dijkstraPathLength(G, _ref4) {
  var source = _ref4.source;
  var target = _ref4.target;
  var _ref4$weight = _ref4.weight;
  var weight = _ref4$weight === undefined ? 'weight' : _ref4$weight;

  var distances = singleSourceDijkstraPathLength(G, { source: source, weight: weight });
  var distance = distances.get(target);
  if (distance == null) {
    throw new _exceptionsJSNetworkXNoPath2['default']((0, _internals.sprintf)('Node %j is not reachable from %j', source, target));
  }
  return distance;
}

function genDijkstraPathLength(G, _source$target$weight2) {
  return (0, _internalsDelegate2['default'])('dijkstraPathLength', [G, _source$target$weight2]);
}

function minMultiEdgeWeight(keydata, weight) {
  var minweight = Infinity;
  for (var key in keydata) {
    var edgeWeight = (0, _internals.getDefault)(keydata[key][weight], 1);
    if (edgeWeight < minweight) {
      minweight = edgeWeight;
    }
  }
  return minweight;
}

/**
 * Compute shortest path between source and all other reachable nodes for a
 * weighted graph.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * var path = jsnx.singleSourceDijkstraPath(G, {source: 0});
 * path.get(4);
 * // [0, 1, 2, 3, 4]
 * ```
 *
 * ### Notes
 *
 * Edge weight attributes must be numerical. Distances are calculated as sums
 * of weighted edges traversed.
 *
 * @see singleSourceDijkstra
 *
 * @param {Graph} G
 * @param {{source: Node, weight: ?string, cutoff: ?number}} parameters
 *   - source: Starting node for path
 *   - weight: Edge data key corresponding to the edge weight
 *   - cutoff: Depth to stop the search. Only paths of length <= cutoff are
 *     returned.
 * @return {Map} Map of shortest paths keyed by target
 */

function singleSourceDijkstraPath(G, _ref5) {
  var source = _ref5.source;
  var cutoff = _ref5.cutoff;
  var _ref5$weight = _ref5.weight;
  var weight = _ref5$weight === undefined ? 'weight' : _ref5$weight;

  var _singleSourceDijkstra3 = // eslint-disable-line no-unused-vars
  singleSourceDijkstra(G, { source: source, cutoff: cutoff, weight: weight });

  var _singleSourceDijkstra32 = _slicedToArray(_singleSourceDijkstra3, 2);

  var length = _singleSourceDijkstra32[0];
  var path = _singleSourceDijkstra32[1];

  return path;
}

/**
 * Compute the shortest path length between source and all other reachable
 * nodes for a weighted graph.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * var length = jsnx.singleSourceDijkstraPathLength(G, {source: 0});
 * length.get(4);
 * // 4
 * length
 * // Map {0: 0, 1: 1, 2: 2, 3: 3, 4: 4}
 * ```
 *
 * ### Notes
 *
 * Edge weight attributes must be numerical. Distances are calculated as sums
 * of weighted edges traversed.
 *
 * @see singleSourceDijkstra
 *

 * @param {Graph} G
 * @param {{source: Node, weight: ?string, cutoff: ?number}} parameters
 *   - source: Starting node for path
 *   - weight: Edge data key corresponding to the edge weight
 *   - cutoff: Depth to stop the search. Only paths of length <= cutoff are
 *     returned.
 * @return {Map} Map of shortest paths keyed by target
 */

function genSingleSourceDijkstraPath(G, _source$cutoff$weight) {
  return (0, _internalsDelegate2['default'])('singleSourceDijkstraPath', [G, _source$cutoff$weight]);
}

function singleSourceDijkstraPathLength(G, _ref6) {
  var source = _ref6.source;
  var cutoff = _ref6.cutoff;
  var _ref6$weight = _ref6.weight;
  var weight = _ref6$weight === undefined ? 'weight' : _ref6$weight;

  var distances = new _internals.Map();
  var seen = new _internals.Map([[source, 0]]);
  var fringe = new _internals.PriorityQueue();
  var i = 0;
  fringe.enqueue(0, [i++, source]);
  while (fringe.size > 0) {
    var _fringe$dequeue = fringe.dequeue();

    var _fringe$dequeue2 = _slicedToArray(_fringe$dequeue, 2);

    var d = _fringe$dequeue2[0];

    var _fringe$dequeue2$1 = _slicedToArray(_fringe$dequeue2[1], 2);

    var _ = _fringe$dequeue2$1[0];
    var v = _fringe$dequeue2$1[1];
    // eslint-disable-line no-unused-vars
    if (distances.has(v)) {
      continue; // already searched this node
    }
    distances.set(v, d);
    var edata = undefined;
    if (G.isMultigraph()) {
      edata = (0, _internals.mapIterator)(G.get(v), function (_ref7) {
        var _ref72 = _slicedToArray(_ref7, 2);

        var w = _ref72[0];
        var keydata = _ref72[1];
        // eslint-disable-line no-loop-func
        return [w, _defineProperty({}, weight, minMultiEdgeWeight(keydata, weight))];
      });
    } else {
      edata = G.get(v);
    }
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(edata), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2);

        var w = _step$value[0];
        var edgeData = _step$value[1];

        var vwDistance = d + (0, _internals.getDefault)(edgeData[weight], 1);
        if (cutoff != null) {
          if (vwDistance > cutoff) {
            continue;
          }
        }
        if (distances.has(w)) {
          if (vwDistance < distances.get(w)) {
            throw new Error('Contradictory paths found: negative weights?');
          }
        } else if (!seen.has(w) || vwDistance < seen.get(w)) {
          seen.set(w, vwDistance);
          fringe.enqueue(vwDistance, [i++, w]);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  return distances;
}

/**
 * Compute shortest paths and lengths in a weighted graph G.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * var [lengths, paths] = jsnx.singleSourceDijkstra(G, {source: 0});
 * lengths.get(4);
 * // 4
 * lengths
 * // Map {0: 0, 1: 1, 2: 2, 3: 3, 4: 4}
 * paths.get(4);
 * // [0, 1, 2, 3, 4]
 * ```
 *
 * ### Notes
 *
 * Edge weight attributes must be numerical.
 * Distances are calculated as sums of weighted edges traversed.
 *
 * This algorithm is not guaranteed to work if edge weights are negative or are
 * floating point numbers (overflows and roundoff errors can cause problems).
 *
 * @see singleSourceDijkstraPath
 * @see singleSourceDijkstraPathLength
 *
 * @param {Graph} G
 * @param {{source: Node, target: ?Node, cutoff: ?number, weight: ?string}}
 *   parameters
 *   - source: Starting node for path
 *   - target: Ending node in the path (optional)
 *   - weight: Edge data key corresponding to the edge weight
 *   - cutoff: Depth to stop the search. Only paths of length <= cutoff are
 *     returned.
 * @return {Array<Map>}
 *   Returns a tuple of two Maps keyed by node. The first Map stores distances
 *   from the source. The second one stores the path from the source to that
 *   node.
 */

function genSingleSourceDijkstraPathLength(G, _source$cutoff$weight2) {
  return (0, _internalsDelegate2['default'])('singleSourceDijkstraPathLength', [G, _source$cutoff$weight2]);
}

function singleSourceDijkstra(G, _ref8) {
  var source = _ref8.source;
  var target = _ref8.target;
  var cutoff = _ref8.cutoff;
  var _ref8$weight = _ref8.weight;
  var weight = _ref8$weight === undefined ? 'weight' : _ref8$weight;

  if ((0, _internals.nodesAreEqual)(source, target)) {
    return [new _internals.Map([[source, 0]]), new _internals.Map([[source, target]])];
  }
  var pred = _defineProperty({}, source, []); // add for all_shortest_paths
  var distances = new _internals.Map();
  var paths = new _internals.Map([[source, [source]]]);
  var seen = new _internals.Map([[source, 0]]);
  var fringe = new _internals.PriorityQueue();
  var i = 0;
  fringe.enqueue(0, [i++, source]);
  while (fringe.size > 0) {
    var _fringe$dequeue3 = fringe.dequeue();

    var _fringe$dequeue32 = _slicedToArray(_fringe$dequeue3, 2);

    var d = _fringe$dequeue32[0];

    var _fringe$dequeue32$1 = _slicedToArray(_fringe$dequeue32[1], 2);

    var _ = _fringe$dequeue32$1[0];
    var v = _fringe$dequeue32$1[1];
    // eslint-disable-line no-unused-vars
    if (distances.has(v)) {
      continue; // already searched this node
    }
    distances.set(v, d);
    if ((0, _internals.nodesAreEqual)(v, target)) {
      break;
    }
    var edata = undefined;
    if (G.isMultigraph()) {
      edata = (0, _internals.mapIterator)(G.get(v), function (_ref9) {
        var _ref92 = _slicedToArray(_ref9, 2);

        var w = _ref92[0];
        var keydata = _ref92[1];
        // eslint-disable-line no-loop-func
        return [w, _defineProperty({}, weight, minMultiEdgeWeight(keydata, weight))];
      });
    } else {
      edata = G.get(v);
    }
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _getIterator(edata), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _step2$value = _slicedToArray(_step2.value, 2);

        var w = _step2$value[0];
        var edgeData = _step2$value[1];

        var vwDistance = d + (0, _internals.getDefault)(edgeData[weight], 1);
        if (cutoff != null) {
          if (vwDistance > cutoff) {
            continue;
          }
        }
        if (distances.has(w)) {
          if (vwDistance < distances.get(w)) {
            throw new Error('Contradictory paths found: negative weights?');
          } else if (vwDistance === distances.get(w)) {
            pred[w].push(v);
          }
        } else if (!seen.has(w) || vwDistance < seen.get(w)) {
          seen.set(w, vwDistance);
          fringe.enqueue(vwDistance, [i++, w]);
          paths.set(w, paths.get(v).concat([w]));
          pred[w] = [v];
        } else if (vwDistance === seen.get(w)) {
          pred[w].push(v);
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  return [distances, paths, pred];
}

// TODO dijkstraPredecessorAndDistance

/**
 * Compute shortest path lengths between all nodes in a weighted graph.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * var path = jsnx.allPairsDijkstraPath(G);
 * path.get(1).get(4);
 * // 3
 * path.get(1);
 * // Map {0: 1, 1: 0, 2: 1, 3: 2, 4: 3}
 * ```
 *
 * ### Notes
 *
 * Edge weight attributes must be numerical.
 * Distances are calculated as sums of weighted edges traversed.
 *
 * The Map returned only has keys for reachable node pairs.
 *
 * @param {Graph} G
 * @param {{weight: ?string, cutoff: ?number}=} optParameters
 *   - weight: Edge data key corresponding to the edge weight
 *   - cutoff: Depth to stop the search. Only paths of length <= cutoff are
 *     returned.
 * @return {Map} A Map of Maps of shortest path lengths
 */

function genSingleSourceDijkstra(G, _source$target$cutoff$weight) {
  return (0, _internalsDelegate2['default'])('singleSourceDijkstra', [G, _source$target$cutoff$weight]);
}

function allPairsDijkstraPathLength(G) {
  var _ref10 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var cutoff = _ref10.cutoff;
  var _ref10$weight = _ref10.weight;
  var weight = _ref10$weight === undefined ? 'weight' : _ref10$weight;

  var distances = new _internals.Map();
  var parameters = { weight: weight, cutoff: cutoff };
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = _getIterator(G), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var source = _step3.value;

      parameters.source = source;
      distances.set(source, singleSourceDijkstraPathLength(G, parameters));
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3['return']) {
        _iterator3['return']();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return distances;
}

/**
 * Compute shortest paths between all nodes in a weighted graph.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * var path = jsnx.allPairsDijkstraPath(G);
 * path.get(0).get(4);
 * // [0, 1, 2, 3, 4]
 * ```
 *
 * ### Notes
 *
 * Edge weight attributes must be numerical.
 * Distances are calculated as sums of weighted edges traversed.
 *
 * @param {Graph} G
 * @param {{weight: ?string, cutoff: ?number}=} optParameters
 *   - weight: Edge data key corresponding to the edge weight
 *   - cutoff: Depth to stop the search. Only paths of length <= cutoff are
 *     returned.
 * @return {Map} A Map of Maps of shortest paths.
 */

function genAllPairsDijkstraPathLength(G, _cutoff$weight) {
  return (0, _internalsDelegate2['default'])('allPairsDijkstraPathLength', [G, _cutoff$weight]);
}

function allPairsDijkstraPath(G) {
  var _ref11 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var cutoff = _ref11.cutoff;
  var _ref11$weight = _ref11.weight;
  var weight = _ref11$weight === undefined ? 'weight' : _ref11$weight;

  var paths = new _internals.Map();
  var parameters = { weight: weight, cutoff: cutoff };
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = _getIterator(G), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var source = _step4.value;

      parameters.source = source;
      paths.set(source, singleSourceDijkstraPath(G, parameters));
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4['return']) {
        _iterator4['return']();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return paths;
}

// TODO bellmanFord
// TODO goldbergRadzik
// TODO negativeEdgeCycle
// TODO bidirectionalDijkstra

function genAllPairsDijkstraPath(G, _cutoff$weight2) {
  return (0, _internalsDelegate2['default'])('allPairsDijkstraPath', [G, _cutoff$weight2]);
}