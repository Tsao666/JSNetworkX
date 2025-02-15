'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.triangles = triangles;
exports.genTriangles = genTriangles;
exports.averageClustering = averageClustering;
exports.genAverageClustering = genAverageClustering;
exports.clustering = clustering;
exports.genClustering = genClustering;
exports.transitivity = transitivity;
exports.genTransitivity = genTransitivity;
exports.squareClustering = squareClustering;
exports.genSquareClustering = genSquareClustering;
var marked0$0 = [trianglesAndDegreeIter, weightedTrianglesAndDegreeIter].map(_regeneratorRuntime.mark);

var _internalsDelegate = require('..\\_internals\\delegate');

var _internalsDelegate2 = _interopRequireDefault(_internalsDelegate);

var _exceptionsJSNetworkXError = require('../exceptions/JSNetworkXError');

var _exceptionsJSNetworkXError2 = _interopRequireDefault(_exceptionsJSNetworkXError);

var _internals = require('../_internals');

/**
 * Compute the number of triangles.
 *
 * Finds the number of triangles that include a node as one vertex.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.completeGraph(5);
 * jsnx.triangles(G, 0);
 * // 6
 * jsnx.triangles(G);
 * Map {0: 6, 1: 6, 2: 6, 3: 6, 4: 6}
 * Array.from(jsnx.triangles(G, [0,1]).values());
 * // [6, 6]
 * ```
 *
 * ### Notes
 *
 * When computing triangles for the entire graph each triangle is counted
 * three times, once at each node.  Self loops are ignored.
 *
 * @param {Graph} G A JSnetworkX graph
 * @param {Iterable=} optNodes (default: all nodes)
 *      Compute triangles for nodes in this container.
 *
 * @return {!(Map|number)} Number of triangles keyed by node label.
 */
'use strict';

function triangles(G, optNodes) {
  if (G.isDirected()) {
    throw new _exceptionsJSNetworkXError2['default']('triangles() is not defined for directed graphs.');
  }

  if (optNodes != null && G.hasNode(optNodes)) {
    // return single value
    return Math.floor((0, _internals.next)(trianglesAndDegreeIter(G, optNodes))[2] / 2);
  }

  return new _internals.Map((0, _internals.mapIterator)(trianglesAndDegreeIter(G, optNodes),
  /* eslint-disable no-unused-vars */
  function (_ref) {
    var _ref2 = _slicedToArray(_ref, 3);

    var v = _ref2[0];
    var _ = _ref2[1];
    var triangles = _ref2[2];
    return (0, _internals.tuple2)(v, Math.floor(triangles / 2), v);
  }
  /* eslint-enable no-unused-vars */
  ));
}

/**
 * Return an iterator of (node, degree, triangles).
 *
 * This double counts triangles so you may want to divide by 2.
 * See `degree()` and `triangles()` for definitions and details.
 *
 * @param {Graph} G A jsnetworkx graph
 * @param {Iterable=} optNodes (default: all nodes)
 *      Compute triangles for nodes in this container.
 *
 * @return {!Iterator<Array>}
 */

function genTriangles(G, optNodes) {
  return (0, _internalsDelegate2['default'])('triangles', [G, optNodes]);
}

function trianglesAndDegreeIter(G, optNodes) {
  var nodesNbrs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, v, vNbrs, vset, ntriangles, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, w, wset;

  return _regeneratorRuntime.wrap(function trianglesAndDegreeIter$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!G.isMultigraph()) {
          context$1$0.next = 2;
          break;
        }

        throw new _exceptionsJSNetworkXError2['default']('Not defined for multigraphs.');

      case 2:
        nodesNbrs = (0, _internals.mapIterator)(optNodes == null ? G : G.nbunchIter(optNodes), function (n) {
          return (0, _internals.tuple2)(n, G.get(n));
        });
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 6;
        _iterator = _getIterator(nodesNbrs);

      case 8:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 39;
          break;
        }

        _step$value = _slicedToArray(_step.value, 2);
        v = _step$value[0];
        vNbrs = _step$value[1];
        vset = new _internals.Set(vNbrs.keys());

        vset['delete'](v);
        ntriangles = 0;
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 18;

        for (_iterator2 = _getIterator(vset); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          w = _step2.value;
          wset = new _internals.Set(G.get(w).keys());

          wset['delete'](w);
          ntriangles += vset.intersection(wset).size;
        }
        context$1$0.next = 26;
        break;

      case 22:
        context$1$0.prev = 22;
        context$1$0.t0 = context$1$0['catch'](18);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t0;

      case 26:
        context$1$0.prev = 26;
        context$1$0.prev = 27;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 29:
        context$1$0.prev = 29;

        if (!_didIteratorError2) {
          context$1$0.next = 32;
          break;
        }

        throw _iteratorError2;

      case 32:
        return context$1$0.finish(29);

      case 33:
        return context$1$0.finish(26);

      case 34:
        context$1$0.next = 36;
        return (0, _internals.tuple3)(v, vset.size, ntriangles);

      case 36:
        _iteratorNormalCompletion = true;
        context$1$0.next = 8;
        break;

      case 39:
        context$1$0.next = 45;
        break;

      case 41:
        context$1$0.prev = 41;
        context$1$0.t1 = context$1$0['catch'](6);
        _didIteratorError = true;
        _iteratorError = context$1$0.t1;

      case 45:
        context$1$0.prev = 45;
        context$1$0.prev = 46;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 48:
        context$1$0.prev = 48;

        if (!_didIteratorError) {
          context$1$0.next = 51;
          break;
        }

        throw _iteratorError;

      case 51:
        return context$1$0.finish(48);

      case 52:
        return context$1$0.finish(45);

      case 53:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this, [[6, 41, 45, 53], [18, 22, 26, 34], [27,, 29, 33], [46,, 48, 52]]);
}

/**
 * Return an iterator of `(node, degree, weightedTriangles)`.
 *
 * Used for weighted clustering.
 *
 * @param {Graph} G A JSnetworkX graph
 * @param {Iterable=} optNodes (default: all nodes)
 *      Compute triangles for nodes in this container.
 * @param {string=} opt_weight (default: 'weight')
 *      The name of edge weight attribute.
 *
 * @return {Iterator<Array>}
 */
function weightedTrianglesAndDegreeIter(G, optNodes) {
  var optWeight = arguments.length <= 2 || arguments[2] === undefined ? 'weight' : arguments[2];

  var maxWeight, nodesNbrs, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _step3$value, i, nbrs, inbrs, weightedTriangles, seen, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, j, weightij, jnbrs, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, k, weightjk, weightki;

  return _regeneratorRuntime.wrap(function weightedTrianglesAndDegreeIter$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!G.isMultigraph()) {
          context$1$0.next = 2;
          break;
        }

        throw new _exceptionsJSNetworkXError2['default']('Not defined for multigraphs.');

      case 2:
        maxWeight = optWeight == null || G.edges().length === 0 ? 1 : (0, _internals.max)((0, _internals.mapIterator)(G.edgesIter(true),
        /* eslint-disable no-unused-vars */
        function (_ref3) {
          var _ref32 = _slicedToArray(_ref3, 3);

          var u = _ref32[0];
          var v = _ref32[1];
          var data = _ref32[2];
          return (0, _internals.getDefault)(data[optWeight], 1);
        }
        /* eslint-enable no-unused-vars */
        ));
        nodesNbrs = (0, _internals.mapIterator)(optNodes == null ? G : G.nbunchIter(optNodes), function (n) {
          return (0, _internals.tuple2)(n, G.get(n));
        });
        _iteratorNormalCompletion3 = true;
        _didIteratorError3 = false;
        _iteratorError3 = undefined;
        context$1$0.prev = 7;
        _iterator3 = _getIterator(nodesNbrs);

      case 9:
        if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
          context$1$0.next = 67;
          break;
        }

        _step3$value = _slicedToArray(_step3.value, 2);
        i = _step3$value[0];
        nbrs = _step3$value[1];
        inbrs = new _internals.Set(nbrs.keys()).difference([i]);
        weightedTriangles = 0;
        seen = new _internals.Set();
        _iteratorNormalCompletion4 = true;
        _didIteratorError4 = false;
        _iteratorError4 = undefined;
        context$1$0.prev = 19;
        _iterator4 = _getIterator(inbrs);

      case 21:
        if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
          context$1$0.next = 48;
          break;
        }

        j = _step4.value;
        weightij = (0, _internals.getDefault)(nbrs.get(j)[optWeight], 1) / maxWeight;

        seen.add(j);
        jnbrs = new _internals.Set(G.get(j).keys()).difference(seen);
        _iteratorNormalCompletion5 = true;
        _didIteratorError5 = false;
        _iteratorError5 = undefined;
        context$1$0.prev = 29;

        for (_iterator5 = _getIterator(inbrs.intersection(jnbrs)); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          k = _step5.value;
          weightjk = (0, _internals.getDefault)(G.get(j).get(k)[optWeight], 1) / maxWeight;
          weightki = (0, _internals.getDefault)(nbrs.get(k)[optWeight], 1) / maxWeight;

          weightedTriangles += Math.pow(weightij * weightjk * weightki, 1 / 3);
        }
        context$1$0.next = 37;
        break;

      case 33:
        context$1$0.prev = 33;
        context$1$0.t0 = context$1$0['catch'](29);
        _didIteratorError5 = true;
        _iteratorError5 = context$1$0.t0;

      case 37:
        context$1$0.prev = 37;
        context$1$0.prev = 38;

        if (!_iteratorNormalCompletion5 && _iterator5['return']) {
          _iterator5['return']();
        }

      case 40:
        context$1$0.prev = 40;

        if (!_didIteratorError5) {
          context$1$0.next = 43;
          break;
        }

        throw _iteratorError5;

      case 43:
        return context$1$0.finish(40);

      case 44:
        return context$1$0.finish(37);

      case 45:
        _iteratorNormalCompletion4 = true;
        context$1$0.next = 21;
        break;

      case 48:
        context$1$0.next = 54;
        break;

      case 50:
        context$1$0.prev = 50;
        context$1$0.t1 = context$1$0['catch'](19);
        _didIteratorError4 = true;
        _iteratorError4 = context$1$0.t1;

      case 54:
        context$1$0.prev = 54;
        context$1$0.prev = 55;

        if (!_iteratorNormalCompletion4 && _iterator4['return']) {
          _iterator4['return']();
        }

      case 57:
        context$1$0.prev = 57;

        if (!_didIteratorError4) {
          context$1$0.next = 60;
          break;
        }

        throw _iteratorError4;

      case 60:
        return context$1$0.finish(57);

      case 61:
        return context$1$0.finish(54);

      case 62:
        context$1$0.next = 64;
        return (0, _internals.tuple3)(i, inbrs.size, weightedTriangles * 2);

      case 64:
        _iteratorNormalCompletion3 = true;
        context$1$0.next = 9;
        break;

      case 67:
        context$1$0.next = 73;
        break;

      case 69:
        context$1$0.prev = 69;
        context$1$0.t2 = context$1$0['catch'](7);
        _didIteratorError3 = true;
        _iteratorError3 = context$1$0.t2;

      case 73:
        context$1$0.prev = 73;
        context$1$0.prev = 74;

        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }

      case 76:
        context$1$0.prev = 76;

        if (!_didIteratorError3) {
          context$1$0.next = 79;
          break;
        }

        throw _iteratorError3;

      case 79:
        return context$1$0.finish(76);

      case 80:
        return context$1$0.finish(73);

      case 81:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[1], this, [[7, 69, 73, 81], [19, 50, 54, 62], [29, 33, 37, 45], [38,, 40, 44], [55,, 57, 61], [74,, 76, 80]]);
}

/**
 * Compute the average clustering coefficient for the graph G.
 *
 * The clustering coefficient for the graph is the average,
 *
 * ```math
 * C = \frac{1}{n}\sum_{v \in G} c_v
 * ```
 *
 * where `$n$` is the number of nodes in `$G$`.
 *
 * ### Example
 *
 * ```
 * var G = jsnx.completeGraph(5);
 * jsnx.averageClustering(G);
 * // 1
 * ```
 *
 * ### Notes
 *
 * Self loops are ignored.
 *
 *
 * ### References
 *
 * [1] [Generalizations of the clustering coefficient to weighted
 *     complex networks by J. Saramäki, M. Kivelä, J.-P. Onnela,
 *     K. Kaski, and J. Kertész, Physical Review E, 75 027105 (2007).][1]
 * [1]: http://jponnela.com/web_documents/a9.pdf
 * [2] [Marcus Kaiser,  Mean clustering coefficients: the role of isolated
 *     nodes and leafs on clustering measures for small-world networks.][2]
 * [2]:http://arxiv.org/abs/0802.2512
 *
 * @param {Graph} G graph
 * @param {?Iterable} optNodes (default: all nodes)
 *    Compute average clustering for nodes in this container.
 * @param {?string=} optWeight (default: null)
 *    The edge attribute that holds the numerical value used as a weight.
 *    If `null`, then each edge has weight `1`.
 * @param {?boolean=} optCountZeros
 *    If `false` include only the nodes with nonzero clustering in the average.
 * @return {number}
 */

function averageClustering(G, optNodes, optWeight) {
  var optCountZeros = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

  var clusters = _Array$from(clustering(G, optNodes, optWeight).values());

  if (!optCountZeros) {
    clusters = clusters.filter(function (v) {
      return v > 0;
    });
  }
  return clusters.reduce(function (s, x) {
    return s + x;
  }, 0) / clusters.length;
}

/**
 * Compute the clustering coefficient for nodes.
 *
 * For unweighted graphs the clustering of each node `$u$`
 * is the fraction of possible triangles through that node that exist,
 *
 * ```math
 * c_u = \frac{2 T(u)}{deg(u)(deg(u)-1)}
 * ```
 *
 * where `$T(u)$` is the number of triangles through node `$u$` and `$deg(u)$`
 * is the degree of `$u$`.
 *
 * For weighted graphs the clustering is defined as the geometric average of
 * the subgraph edge weights,
 *
 * ```math
 * c_u = \frac{1}{deg(u)(deg(u)-1)}
 *       \sum_{uv} (\hat{w}_{uv} \hat{w}_{uw} \hat{w}_{vw})^{1/3}
 * ```
 *
 * The edge weights `$\hat{w}_{uv}$` are normalized by the maximum weight in the
 * network `$\hat{w}_{uv} = w_{uv}/\max(2)$`.
 *
 * The value `$c_u$` is assigned to `$0$` if `$deg(u) < 2$`.
 *
 * ### Example
 *
 * ```
 * var G = jsnx.completeGraph(5);
 * jsnx.clustering(G, 0);
 * // 1
 * jsnx.clustering(G);
 * // Map {0: 1, 1: 1, 2: 1, 3: 1, 4: 1}
 * ```
 *
 * @param {Graph} G graph
 * @param {?Iterable=} optNodes (default: all nodes)
 *      Compute average clustering for nodes in this container.
 * @param {?string=} optWeight (default: null)
 *  If the edge attribute that holds the numerical value used as a weight.
 *  If `null`, then each edge has weight `1`.
 *
 * @return {!(number|Map)} Clustering coefficient at specified nodes
 */

function genAverageClustering(G, optNodes, optWeight, optCountZeros) {
  return (0, _internalsDelegate2['default'])('averageClustering', [G, optNodes, optWeight, optCountZeros]);
}

function clustering(G, optNodes, optWeight) {
  if (G.isDirected()) {
    throw new _exceptionsJSNetworkXError2['default']('Clustering algorithms are not defined for directed graphs.');
  }

  var trianglesIter = optWeight == null ? trianglesAndDegreeIter(G, optNodes) : weightedTrianglesAndDegreeIter(G, optNodes, optWeight);

  var clusters = new _internals.Map((0, _internals.mapIterator)(trianglesIter, function (_ref4) {
    var _ref42 = _slicedToArray(_ref4, 3);

    var node = _ref42[0];
    var degree = _ref42[1];
    var triangles = _ref42[2];

    return (0, _internals.tuple2)(node, triangles === 0 ? 0 : triangles / (degree * (degree - 1)));
  }));

  return G.hasNode(optNodes) ? (0, _internals.next)(clusters.values()) : clusters;
}

/**
 * Compute graph transitivity, the fraction of all possible triangles
 * present in G.
 *
 * Possible triangles are identified by the number of "triads"
 * (two edges with a shared vertex).
 *
 * The transitivity is
 *
 * ```math
 * T = 3\frac{\#triangles}{\#triads}
 * ```
 *
 * ### Example
 *
 * ```
 * var G = jsnx.completeGraph(5);
 * jsnx.transitivity(G);
 * // 1
 * ```
 *
 * @param {Graph} G graph
 * @return {number} Transitivity
 */

function genClustering(G, optNodes, optWeight) {
  return (0, _internalsDelegate2['default'])('clustering', [G, optNodes, optWeight]);
}

function transitivity(G) {
  /* eslint-disable no-shadow */
  var triangles = 0; // 6 times number of triangles
  /* eslint-enable no-shadow */
  var triples = 0; // 2 times number of connected triples

  /* eslint-disable no-unused-vars */
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = _getIterator(trianglesAndDegreeIter(G)), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var _step6$value = _slicedToArray(_step6.value, 3);

      var node = _step6$value[0];
      var degree = _step6$value[1];
      var triangles_ = _step6$value[2];

      /* eslint-enable no-unused-vars */
      triples += degree * (degree - 1);
      triangles += triangles_;
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6['return']) {
        _iterator6['return']();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  return triangles === 0 ? 0 : triangles / triples;
}

/**
 * Compute the squares clustering coefficient for nodes.
 *
 * For each node return the faction of possible squares that exist at the node
 *
 * ```math
 * C_4(v) = \frac{ \sum_{u=1}^{k_v}
 * \sum_{w=u+1}^{k_v} q_v(u,w) }{ \sum_{u=1}^{k_v}
 * \sum_{w=u+1}^{k_v} [a_v(u,w) + q_v(u,w)]}
 * ```
 *
 * where `$q_v(u,w)$` are the number of common neighbors of `$u$` and `$v$`
 * other than `$v$` (i.e. squares), and
 * `$a_v(u,w) = (k_u-(1+q_v(u,w)+\theta_{uv}))(k_w-(1+q_v(u,w)+\theta_{uw}))$`
 * where `$\theta_{uw} = 1$` if `$u$` and `$w$` are  connected and `$0$`
 * otherwise.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.completeGraph(5);
 * jsnx.squareClustering(G, 0);
 * // 1
 * jsnx.squareClustering(G);
 * // Map {0: 1, 1: 1, 2: 1, 3: 1, 4: 1}
 * ```
 *
 * ### Notes
 *
 * While `$C_3(v)$` (triangle clustering) gives the probability that
 * two neighbors of node `$v$` are connected with each other, `$C_4(v)$` is
 * the probability that two neighbors of node `$v$` share a common
 * neighbor different from `$v$`. This algorithm can be applied to both
 * bipartite and unipartite networks.
 *
 * @param {Graph} G graph
 * @param {Iterable=} opt_nodes (default: all)
 *   Compute clustering for nodes in this container.
 *
 * @return {!(Map|number)}
 *      A dictionary keyed by node with the square clustering coefficient value.
 */

function genTransitivity(G) {
  return (0, _internalsDelegate2['default'])('transitivity', [G]);
}

function squareClustering(G, optNodes) {
  var nodesIter = optNodes == null ? G : G.nbunchIter(optNodes);
  var clustering = new _internals.Map(); // eslint-disable-line no-shadow

  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = _getIterator(nodesIter), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var v = _step7.value;

      clustering.set(v, 0);
      var potential = 0;

      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = _getIterator((0, _internals.genCombinations)(G.get(v).keys(), 2)), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var _step8$value = _slicedToArray(_step8.value, 2);

          var u = _step8$value[0];
          var w = _step8$value[1];

          var squares = new _internals.Set(G.get(u).keys()).intersection(new _internals.Set(G.get(w).keys()));
          squares['delete'](v);
          squares = squares.size;

          clustering.set(v, clustering.get(v) + squares);
          var degm = squares + 1;
          if (G.get(u).has(w)) {
            degm += 1;
          }
          potential += (G.get(u).size - degm) * (G.get(w).size - degm) + squares;
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8['return']) {
            _iterator8['return']();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      if (potential > 0) {
        clustering.set(v, clustering.get(v) / potential);
      }
    }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7['return']) {
        _iterator7['return']();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  if (G.hasNode(optNodes)) {
    return (0, _internals.next)(clustering.values()); // return single value
  }
  return clustering;
}

function genSquareClustering(G, optNodes) {
  return (0, _internalsDelegate2['default'])('squareClustering', [G, optNodes]);
}

/*jshint ignore:start*/

/*jshint ignore:end*/