'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.eigenvectorCentrality = eigenvectorCentrality;
exports.genEigenvectorCentrality = genEigenvectorCentrality;

var _internalsDelegate = require('..\\..\\_internals\\delegate');

var _internalsDelegate2 = _interopRequireDefault(_internalsDelegate);

var _exceptions = require('../../exceptions');

var _internals = require('../../_internals');

/**
 * Compute the eigenvector centrality for `G`.
 *
 * Eigenvector centrality computes the centrality for a node based on the
 * centrality of its neighbors. The eigenvector centrality for node `i` is
 *
 * ```math
 * Ax = \lambda x
 * ```
 *
 * where `$A$` is the adjacency matrix of the graph `G` with eigenvalue
 * `$\lambda$`. By virtue of the Perron-Frobinus theorem, there is a unique and
 * positive solution if `$\lambda$` is the largest eigenvalue associated with
 * the eigenvector of the adjacency matrix `$A$`. ([2])
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(4);
 * jsnx.eigenvectorCentrality(G);
 * // Map {0: 0.37, 1: 0.6, 2: 0.6, 3: 0.37}
 * ```
 *
 * ### Notes
 *
 * The measure was introduced by ([1][]).
 *
 * The eigenvector calculation is done by the power iteration method and has
 * no guarantee of convergence. The iteration will stop after `maxIter`
 * iterations or an error tolerance of `numberOfNodes(G) * tol` has been
 * reached.
 *
 * For directed graphs this is "left" eigenvector centrality which corresponds
 * to the in-edges in the graph. For out-edges eigenvector centrality
 * first reverse the graph with `G.reverse()`.
 *
 * ### References
 *
 * [1] [Phillip Bonacich:
 *     Power and Centrality: A Family of Measures.
 *     American Journal of Sociology 92(5):1170–1182, 1986](1)
 * [1]: http://www.leonidzhukov.net/hse/2014/socialnetworks/papers/Bonacich-Centrality.pdf
 * [2] Mark E. J. Newman:
 *     Networks: An Introduction.
 *     Oxford University Press, USA, 2010, pp. 169.
 *
 * @see pagerank
 * @see hits
 *
 * @param {Graph} G
 * @param {{maxIter: ?number, tolerance: ?number, nstart: ?Map, weight: ?string}} optParameters
 *   - maxIter: Maximum number of iterations in power method.
 *   - tolerance: Error tolerance used to check convergence in power method
 *     iteration.
 *   - nstart: Starting value of eigenvector iteration for each node.
 *   - weight: If not defined, all edge weights are considered equal. Otherwise
 *     holds the name of the edge attribute used as weight.
 * @return {Map} Map of nodes with eigenvector centrality as the value
 */
'use strict';

function eigenvectorCentrality(G) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var _ref$maxIter = _ref.maxIter;
  var maxIter = _ref$maxIter === undefined ? 100 : _ref$maxIter;
  var _ref$tolerance = _ref.tolerance;
  var tolerance = _ref$tolerance === undefined ? 1e-6 : _ref$tolerance;
  var nstart = _ref.nstart;
  var weight = _ref.weight;

  var sqrt = Math.sqrt;
  var pow = Math.pow;
  var abs = Math.abs;

  if (G.isMultigraph()) {
    throw new _exceptions.JSNetworkXException('Not defined for multigraphs.');
  }

  if (G.order() === 0) {
    throw new _exceptions.JSNetworkXException('Empty graph.');
  }

  var x = undefined;
  var zeroMap = new _internals.Map();
  if (!nstart) {
    // choose starting vector with entries of 1/#G
    var start = 1 / G.order();
    x = new _internals.Map();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(G), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var n = _step.value;

        x.set(n, start);
        zeroMap.set(n, 0);
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
  } else {
    x = nstart;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _getIterator(x.keys()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var n = _step2.value;

        zeroMap.set(n, 0);
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

  // normalize starting vector
  var sum = 0;
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = _getIterator(x.values()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var v = _step3.value;

      sum += v;
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

  sum = 1 / sum;

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = _getIterator(x), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var _step4$value = _slicedToArray(_step4.value, 2);

      var k = _step4$value[0];
      var v = _step4$value[1];

      x.set(k, v * sum);
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

  tolerance = G.order() * tolerance;
  // make up to maxIter iterations
  for (var i = 0; i < maxIter; i++) {
    var xlast = x;
    x = new _internals.Map(zeroMap);

    // do the multiplication y^T = x^T A
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = _getIterator(x), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var _step5$value = _slicedToArray(_step5.value, 2);

        var n = _step5$value[0];
        var v = _step5$value[1];
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = _getIterator(G.get(n)), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var _step8$value = _slicedToArray(_step8.value, 2);

            var nbr = _step8$value[0];
            var data = _step8$value[1];

            x.set(nbr, x.get(nbr) + xlast.get(n) * (0, _internals.getDefault)(weight && data[weight], 1));
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
      }

      // normalize vector
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

    var _sum = 0;
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = _getIterator(x.values()), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var v = _step6.value;

        _sum += pow(v, 2);
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

    _sum = sqrt(_sum);
    // this should never be zero?
    _sum = _sum === 0 ? 1 : 1 / _sum;

    var error = 0;
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
      for (var _iterator7 = _getIterator(x), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
        var _step7$value = _slicedToArray(_step7.value, 2);

        var n = _step7$value[0];
        var v = _step7$value[1];

        v = v * _sum;
        x.set(n, v);
        // check error convergence
        error += abs(v - xlast.get(n));
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

    if (error < tolerance) {
      return x;
    }
  }

  throw new _exceptions.JSNetworkXError('eigenvectorCentrality(): power iteration failed to converge in ' + (maxIter + ' iterations.'));
}

// not ported:
// eigenvectorCentralityNumpy

function genEigenvectorCentrality(G, _maxIter$tolerance$nstart$weight) {
  return (0, _internalsDelegate2['default'])('eigenvectorCentrality', [G, _maxIter$tolerance$nstart$weight]);
}