'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.betweennessCentrality = betweennessCentrality;
exports.genBetweennessCentrality = genBetweennessCentrality;
exports.edgeBetweennessCentrality = edgeBetweennessCentrality;
exports.genEdgeBetweennessCentrality = genEdgeBetweennessCentrality;

var _internalsDelegate = require('..\\..\\_internals\\delegate');

var _internalsDelegate2 = _interopRequireDefault(_internalsDelegate);

var _internals = require('../../_internals');

/**
 * Compute the shortest-path betweenness centrality for nodes.
 *
 * Betweenness centrality of a node `$v$` is the sum of the
 * fraction of all-pairs shortest paths that pass through `$v$`:
 *
 * ```math
 * c_B(v) = \sum_{s,t \in V} \frac{\sigma(s, t|v)}{\sigma(s, t)}
 * ```
 *
 * where `$V$` is the set of nodes, `$\sigma(s, t)$` is the number of
 * shortest `$(s, t)$`-paths,  and `$\sigma(s, t|v)$` is the number of those
 * paths  passing through some  node `$v$` other than `$s, t$`.
 * If `$s = t$`, `$\sigma(s, t) = 1$`, and if `$v \in {s, t}$`,
 * `$\sigma(s, t|v) = 0$` ([2][]).
 *
 * ### Notes
 *
 * The algorithm is from Ulrik Brandes ([1][]):
 *
 * See ([2][]) for details on algorithms for variations and related metrics.
 *
 * For approximate betweenness calculations set `k=#samples` to use
 * `k` nodes ("pivots") to estimate the betweenness values. For an estimate
 * of the number of pivots needed see ([3][]).
 *
 * For weighted graphs the edge weights must be greater than zero.
 * Zero edge weights can produce an infinite number of equal length
 * paths between pairs of nodes.
 *
 * ### References
 *
 * [1] [A Faster Algorithm for Betweenness Centrality.
 *    Ulrik Brandes,
 *    Journal of Mathematical Sociology 25(2):163-177, 2001.][1]
 * [1]: http://www.inf.uni-konstanz.de/algo/publications/b-fabc-01.pdf
 *
 * [2] [Ulrik Brandes: On Variants of Shortest-Path Betweenness
 *    Centrality and their Generic Computation.
 *    Social Networks 30(2):136-145, 2008.][2]
 * [2]: http://www.inf.uni-konstanz.de/algo/publications/b-vspbc-08.pdf
 *
 * [3] [Ulrik Brandes and Christian Pich:
 *    Centrality Estimation in Large Networks.
 *    International Journal of Bifurcation and Chaos 17(7):2303-2318, 2007.][3]
 * [3]: http://www.inf.uni-konstanz.de/algo/publications/bp-celn-06.pdf
 *
 * @see edgeBetweennessCentrality
 * @see loadCentrality
 *
 * @param {!Graph} G A JSNetworkX graph
 * @param {{k: ?number, normalized: ?bool, weight: ?string,endpoints: ?bool}=} optParameters
 *   - `k` (int)
 *
 *     If `k` is defined use `k` node samples to estimate betweenness.
 *     The value of `k <= n` where `n` is the number of nodes in the graph.
 *     Higher values give better approximation.
 *   - `normalized` (bool)
 *
 *     If `true`, the betweenness values are normalized by `2/((n-1)(n-2))`
 *     for graphs and `1/((n-1)(n-2))` for directed graphs where `n` is the
 *     number of nodes in G.
 *   - `weight` (default=null)
 *
 *     If null, all edge weights are considered equal.
 *     Otherwise holds the name of the edge attribute used as weight.
 *
 *   - `endpoints` (default=false)
 *
 *     If true include the endpoints in the shortest path counts.
 *
 * @return {Map} object with node keys with betweenness centrality as the value.
 */
/*eslint max-len:[1, 94]*/
'use strict';

function betweennessCentrality(G) {
  // istanbul ignore next

  var _this = this;

  var optArgDict = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  // TODO: Use destructuring defaults once 6to5 supports it
  // {k=null, normalized=true, weight=null, endpoints=false}
  var k = optArgDict.k;
  var normalized = optArgDict.normalized;
  var weight = optArgDict.weight;
  var endpoints = optArgDict.endpoints;

  normalized = normalized == null ? true : normalized;
  endpoints = endpoints == null ? false : endpoints;

  var v;
  var betweenness = new _internals.Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _v;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          context$2$0.prev = 3;
          _iterator = _getIterator(G);

        case 5:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _v = _step.value;
          context$2$0.next = 9;
          return (0, _internals.tuple2)(_v, 0);

        case 9:
          _iteratorNormalCompletion = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t0 = context$2$0['catch'](3);
          _didIteratorError = true;
          _iteratorError = context$2$0.t0;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, _this, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());

  var nodes = G.nodes();
  if (k != null) {
    nodes = _internals.Arrays.sample(nodes, k);
  }

  nodes.forEach(function (s) {
    // single source shortest paths

    var _ref = weight == null ? singleSourceShortestPathBasic(G, s) : // use BFS
    singleSourceDijkstraPathBasic(G, s, weight);

    var _ref2 = _slicedToArray(_ref, 3);

    var S = _ref2[0];
    var P = _ref2[1];
    var sigma = _ref2[2];
    // use Dijkstra's algorithm
    // accumulation
    betweenness = endpoints ? accumulateEndpoints(betweenness, S, P, sigma, s) : accumulateBasic(betweenness, S, P, sigma, s);
  });
  // rescaling
  return rescale(betweenness, G.order(), normalized, G.isDirected(), k);
}

/**
 * Compute betweenness centrality for edges.
 *
 * Betweenness centrality of an edge `$e$` is the sum of the
 * fraction of all-pairs shortest paths that pass through `$e$`:
 *
 * ```math
 * c_B(v) = \sum_{s,t \in V} \frac{\sigma(s, t|e)}{\sigma(s, t)}
 * ```
 *
 * where `$V$` is the set of nodes, `$\sigma(s, t)$` is the number of
 * shortest `$(s, t)$`-paths, and `$\sigma(s, t|e)$` is the number of
 * those paths passing through edge `$e$` ([2][]).
 *
 * ### Notes
 *
 * The algorithm is from Ulrik Brandes ([1][]).
 *
 * For weighted graphs the edge weights must be greater than zero.
 * Zero edge weights can produce an infinite number of equal length
 * paths between pairs of nodes.
 *
 * ### References
 *
 * [1] [A Faster Algorithm for Betweenness Centrality. Ulrik Brandes,
 *    Journal of Mathematical Sociology 25(2):163-177, 2001.][1]
 * [1]: http://www.inf.uni-konstanz.de/algo/publications/b-fabc-01.pdf
 * [2] [Ulrik Brandes: On Variants of Shortest-Path Betweenness
 *    Centrality and their Generic Computation.
 *    Social Networks 30(2):136-145, 2008.][2]
 * [2]: http://www.inf.uni-konstanz.de/algo/publications/b-vspbc-08.pdf
 *
 * @see betweennessCentrality
 * @see edgeLoad
 *
 * @param {!Graph} G A NetworkX graph
 * @param {{normalized: bool=, weight: string=}=} optArgDict
 *   - `normalized` (default=false)
 *
 *     If true the betweenness values are normalized by `2/(n(n-1))`
 *     for graphs, and `1/(n(n-1))` for directed graphs where `n`
 *     is the number of nodes in G.
 *
 *   - `weight` (default=null)
 *
 *     If null, all edge weights are considered equal.
 *     Otherwise holds the name of the edge attribute used as weight.
 *
 * @return {Map} object with edge keys with betweenness centrality as the value.
*/

function genBetweennessCentrality(G, optArgDict) {
  return (0, _internalsDelegate2['default'])('betweennessCentrality', [G, optArgDict]);
}

function edgeBetweennessCentrality(G) {
  // istanbul ignore next

  var _this2 = this;

  var optArgDict = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  // TODO: Use destructuring defaults once 6to5 supports it
  var normalized = optArgDict.normalized;
  var weight = optArgDict.weight;

  normalized = normalized == null ? true : normalized;

  var v;
  var betweenness = new _internals.Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _v2;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          context$2$0.prev = 3;
          _iterator2 = _getIterator(G);

        case 5:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _v2 = _step2.value;
          context$2$0.next = 9;
          return (0, _internals.tuple2)(_v2, 0);

        case 9:
          _iteratorNormalCompletion2 = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t0 = context$2$0['catch'](3);
          _didIteratorError2 = true;
          _iteratorError2 = context$2$0.t0;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError2) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError2;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, _this2, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = _getIterator(G.edgesIter()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var edge = _step3.value;

      betweenness.set(edge, 0);
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

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = _getIterator(G), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var s = _step4.value;

      // single source shortest paths

      var _ref3 = weight == null ? singleSourceShortestPathBasic(G, s) : // use BFS
      singleSourceDijkstraPathBasic(G, s, weight);

      var _ref32 = _slicedToArray(_ref3, 3);

      var S = _ref32[0];
      var P = _ref32[1];
      var sigma = _ref32[2];
      // use Dijkstra's algorithm
      // accumulation
      betweenness = accumulateEdges(betweenness, S, P, sigma, s);
    }
    // rescaling
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

  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = _getIterator(G), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var n = _step5.value;

      betweenness['delete'](n);
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5['return']) {
        _iterator5['return']();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  return rescaleE(betweenness, G.order(), normalized, G.isDirected());
}

// helpers for betweenness centrality

function genEdgeBetweennessCentrality(G, optArgDict) {
  return (0, _internalsDelegate2['default'])('edgeBetweennessCentrality', [G, optArgDict]);
}

function singleSourceShortestPathBasic(G, s) {
  // istanbul ignore next

  var _this3 = this;

  var S = [];
  var P = new _internals.Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, _v3;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion6 = true;
          _didIteratorError6 = false;
          _iteratorError6 = undefined;
          context$2$0.prev = 3;
          _iterator6 = _getIterator(G);

        case 5:
          if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _v3 = _step6.value;
          context$2$0.next = 9;
          return (0, _internals.tuple2)(_v3, []);

        case 9:
          _iteratorNormalCompletion6 = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t0 = context$2$0['catch'](3);
          _didIteratorError6 = true;
          _iteratorError6 = context$2$0.t0;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion6 && _iterator6['return']) {
            _iterator6['return']();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError6) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError6;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, _this3, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());
  var sigma = new _internals.Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, _v4;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion7 = true;
          _didIteratorError7 = false;
          _iteratorError7 = undefined;
          context$2$0.prev = 3;
          _iterator7 = _getIterator(G);

        case 5:
          if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _v4 = _step7.value;
          context$2$0.next = 9;
          return (0, _internals.tuple2)(_v4, 0);

        case 9:
          _iteratorNormalCompletion7 = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t0 = context$2$0['catch'](3);
          _didIteratorError7 = true;
          _iteratorError7 = context$2$0.t0;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion7 && _iterator7['return']) {
            _iterator7['return']();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError7) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError7;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, _this3, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());
  var D = new _internals.Map();

  sigma.set(s, 1);
  D.set(s, 0);
  var Q = [s];
  while (Q.length > 0) {
    // use BFS to find shortest paths
    var v = Q.shift();
    S.push(v);
    var Dv = D.get(v);
    var sigmav = sigma.get(v);
    /* eslint-disable no-loop-func */
    G.neighbors(v).forEach(function (w) {
      if (!D.has(w)) {
        Q.push(w);
        D.set(w, Dv + 1);
      }
      if (D.get(w) === Dv + 1) {
        // this is a shortest path, count paths
        sigma.set(w, sigma.get(w) + sigmav);
        P.get(w).push(v); // predecessors
      }
    });
    /* eslint-enable no-loop-func */
  }
  return [S, P, sigma];
}

function singleSourceDijkstraPathBasic(G, s) {
  // istanbul ignore next

  var _this4 = this;

  var weight = arguments.length <= 2 || arguments[2] === undefined ? 'weight' : arguments[2];

  // modified from Eppstein
  var S = [];
  var P = new _internals.Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, _v5;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion8 = true;
          _didIteratorError8 = false;
          _iteratorError8 = undefined;
          context$2$0.prev = 3;
          _iterator8 = _getIterator(G);

        case 5:
          if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _v5 = _step8.value;
          context$2$0.next = 9;
          return (0, _internals.tuple2)(_v5, []);

        case 9:
          _iteratorNormalCompletion8 = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t0 = context$2$0['catch'](3);
          _didIteratorError8 = true;
          _iteratorError8 = context$2$0.t0;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion8 && _iterator8['return']) {
            _iterator8['return']();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError8) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError8;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, _this4, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());
  var sigma = new _internals.Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, _v6;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion9 = true;
          _didIteratorError9 = false;
          _iteratorError9 = undefined;
          context$2$0.prev = 3;
          _iterator9 = _getIterator(G);

        case 5:
          if (_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _v6 = _step9.value;
          context$2$0.next = 9;
          return (0, _internals.tuple2)(_v6, 0);

        case 9:
          _iteratorNormalCompletion9 = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t0 = context$2$0['catch'](3);
          _didIteratorError9 = true;
          _iteratorError9 = context$2$0.t0;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion9 && _iterator9['return']) {
            _iterator9['return']();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError9) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError9;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, _this4, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());
  var D = new _internals.Map();

  sigma.set(s, 1);
  var seen = new _internals.Map([(0, _internals.tuple2)(s, 0)]);
  // use Q as heap with (distance,node id) tuples
  var Q = new _internals.PriorityQueue();
  Q.enqueue(0, [s, s]);
  while (Q.size > 0) {
    var _Q$dequeue = Q.dequeue();

    var _Q$dequeue2 = _slicedToArray(_Q$dequeue, 2);

    var dist = _Q$dequeue2[0];

    var _Q$dequeue2$1 = _slicedToArray(_Q$dequeue2[1], 2);

    var pred = _Q$dequeue2$1[0];
    var v = _Q$dequeue2$1[1];

    if (D.has(v)) {
      continue; // already searched this node.
    }
    sigma.set(v, sigma.get(v) + sigma.get(pred)); // count paths
    S.push(v);
    D.set(v, dist);

    var _iteratorNormalCompletion10 = true;
    var _didIteratorError10 = false;
    var _iteratorError10 = undefined;

    try {
      for (var _iterator10 = _getIterator(G.get(v)), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
        var _step10$value = _slicedToArray(_step10.value, 2);

        var w = _step10$value[0];
        var edgedata = _step10$value[1];

        var vwDist = dist + (0, _internals.getDefault)(edgedata[weight], 1);
        if (!D.has(w) && (!seen.has(w) || vwDist < seen.get(w))) {
          seen.set(w, vwDist);
          Q.enqueue(vwDist, [v, w]);
          sigma.set(w, 0);
          P.set(w, [v]);
        } else if (vwDist === seen.get(w)) {
          // handle equal paths
          sigma.set(w, sigma.get(w) + sigma.get(v));
          P.get(w).push(v);
        }
      }
    } catch (err) {
      _didIteratorError10 = true;
      _iteratorError10 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion10 && _iterator10['return']) {
          _iterator10['return']();
        }
      } finally {
        if (_didIteratorError10) {
          throw _iteratorError10;
        }
      }
    }
  }
  return [S, P, sigma];
}

function accumulateBasic(betweenness, S, P, sigma, s) {
  // istanbul ignore next

  var _this5 = this;

  var delta = new _internals.Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, _s;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion11 = true;
          _didIteratorError11 = false;
          _iteratorError11 = undefined;
          context$2$0.prev = 3;
          _iterator11 = _getIterator(S);

        case 5:
          if (_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _s = _step11.value;
          context$2$0.next = 9;
          return (0, _internals.tuple2)(_s, 0);

        case 9:
          _iteratorNormalCompletion11 = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t0 = context$2$0['catch'](3);
          _didIteratorError11 = true;
          _iteratorError11 = context$2$0.t0;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion11 && _iterator11['return']) {
            _iterator11['return']();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError11) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError11;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, _this5, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());

  while (S.length > 0) {
    var w = S.pop();
    var coeff = (1 + delta.get(w)) / sigma.get(w);
    /* eslint-disable no-loop-func */
    P.get(w).forEach(function (v) {
      delta.set(v, delta.get(v) + sigma.get(v) * coeff);
    });
    /* eslint-enable no-loop-func */
    // handle object nodes
    if (w !== s || typeof w === 'object' && w.toString() !== s.toString()) {
      betweenness.set(w, betweenness.get(w) + delta.get(w));
    }
  }
  return betweenness;
}

function accumulateEndpoints(betweenness, S, P, sigma, s) {
  // istanbul ignore next

  var _this6 = this;

  betweenness.set(s, betweenness.get(s) + S.length - 1);
  var delta = new _internals.Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, _s2;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion12 = true;
          _didIteratorError12 = false;
          _iteratorError12 = undefined;
          context$2$0.prev = 3;
          _iterator12 = _getIterator(S);

        case 5:
          if (_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _s2 = _step12.value;
          context$2$0.next = 9;
          return (0, _internals.tuple2)(_s2, 0);

        case 9:
          _iteratorNormalCompletion12 = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t0 = context$2$0['catch'](3);
          _didIteratorError12 = true;
          _iteratorError12 = context$2$0.t0;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion12 && _iterator12['return']) {
            _iterator12['return']();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError12) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError12;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, _this6, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());

  while (S.length > 0) {
    var w = S.pop();
    var coeff = (1 + delta.get(w)) / sigma.get(w);
    /* eslint-disable no-loop-func */
    P.get(w).forEach(function (v) {
      delta.set(v, delta.get(v) + sigma.get(v) * coeff);
    });
    /* eslint-enable no-loop-func */
    // handle object nodes
    if (w !== s || typeof w === 'object' && w.toString() !== s.toString()) {
      betweenness.set(w, betweenness.get(w) + delta.get(w) + 1);
    }
  }
  return betweenness;
}

function accumulateEdges(betweenness, S, P, sigma, s) {
  // istanbul ignore next

  var _this7 = this;

  var delta = new _internals.Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion13, _didIteratorError13, _iteratorError13, _iterator13, _step13, _s3;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion13 = true;
          _didIteratorError13 = false;
          _iteratorError13 = undefined;
          context$2$0.prev = 3;
          _iterator13 = _getIterator(S);

        case 5:
          if (_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _s3 = _step13.value;
          context$2$0.next = 9;
          return (0, _internals.tuple2)(_s3, 0);

        case 9:
          _iteratorNormalCompletion13 = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t0 = context$2$0['catch'](3);
          _didIteratorError13 = true;
          _iteratorError13 = context$2$0.t0;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion13 && _iterator13['return']) {
            _iterator13['return']();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError13) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError13;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, _this7, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());

  while (S.length > 0) {
    var w = S.pop();
    var coeff = (1 + delta.get(w)) / sigma.get(w);
    /* eslint-disable no-loop-func */
    P.get(w).forEach(function (v) {
      var c = sigma.get(v) * coeff;
      var edge = [v, w];
      if (!betweenness.has(edge)) {
        edge = [w, v];
      }
      betweenness.set(edge, betweenness.get(edge) + c);
      delta.set(v, delta.get(v) + c);
    });
    /* eslint-enable no-loop-func */
    // handle object nodes
    if (w !== s || typeof w === 'object' && w.toString() !== s.toString()) {
      betweenness.set(w, betweenness.get(w) + delta.get(w));
    }
  }
  return betweenness;
}

function rescale(betweenness, n, optNormalized, optDirected, optK) {
  if (optDirected === undefined) optDirected = false;

  var scale;
  if (optNormalized) {
    scale = n <= 2 ? null : 1 / ((n - 1) * (n - 2));
  } else {
    // rescale by 2 for undirected graphs
    scale = !optDirected ? 1 / 2 : null;
  }
  if (scale != null) {
    if (optK != null) {
      scale = scale * n / optK;
    }
    betweenness.forEach(function (v, k) {
      return betweenness.set(k, v * scale);
    });
  }
  return betweenness;
}

function rescaleE(betweenness, n, optNormalized, optDirected) {
  var scale;
  if (optNormalized) {
    scale = n <= 1 ? null : 1 / (n * (n - 1));
  } else {
    // rescale by 2 for undirected graphs
    scale = !optDirected ? 1 / 2 : null;
  }
  if (scale != null) {
    betweenness.forEach(function (v, k) {
      return betweenness.set(k, v * scale);
    });
  }
  return betweenness;
}