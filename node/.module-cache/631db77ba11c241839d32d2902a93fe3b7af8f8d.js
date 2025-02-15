'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.isGraphical = isGraphical;
exports.genIsGraphical = genIsGraphical;
exports.isValidDegreeSequence = isValidDegreeSequence;
exports.genIsValidDegreeSequence = genIsValidDegreeSequence;
exports.isValidDegreeSequenceHavelHakimi = isValidDegreeSequenceHavelHakimi;
exports.genIsValidDegreeSequenceHavelHakimi = genIsValidDegreeSequenceHavelHakimi;
exports.isValidDegreeSequenceErdosGallai = isValidDegreeSequenceErdosGallai;
exports.genIsValidDegreeSequenceErdosGallai = genIsValidDegreeSequenceErdosGallai;

var _internalsDelegate = require('..\\_internals\\delegate');

var _internalsDelegate2 = _interopRequireDefault(_internalsDelegate);

var _exceptions = require('../exceptions');

var _internalsFillArray = require('../_internals/fillArray');

var _internalsFillArray2 = _interopRequireDefault(_internalsFillArray);

/**
 * Returns `true` if `sequence` is a valid degree sequence.
 * A degree sequence is valid if some graph can realize it.
 *
 * ### Example
 *
 * ```
 * var G = jsnx.pathGraph(4);
 * var sequence = G.degree().values();
 * jsnx.isValidDegreeSequence(sequence);
 * // true
 * ```
 *
 * @param {Iterable} sequence A sequence of integer node degrees.
 * @param {string=} optMethod ('eg' | 'hh')
 *      The method used to validate the degree sequence.
 *      "eg" corresponds to the Erdős-Gallai algorithm, and
 *      "hh" to the Havel-Hakimi algorithm.
 * @return {boolean}
 *      `true` if `sequence` is a valid degree sequence and `false` if not.
 */
'use strict';

function isGraphical(sequence) {
  var optMethod = arguments.length <= 1 || arguments[1] === undefined ? 'hh' : arguments[1];

  switch (optMethod) {
    case 'eg':
      return isValidDegreeSequenceErdosGallai(_Array$from(sequence));
    case 'hh':
      return isValidDegreeSequenceHavelHakimi(_Array$from(sequence));
    default:
      throw new _exceptions.JSNetworkXException("`opt_method` must be 'eg' or 'hh'");
  }
}

// We need this instead of just aliasing this so that the async code transform
// kicks in
/**
 * @alias isGraphical
 */

function genIsGraphical(sequence, optMethod) {
  return (0, _internalsDelegate2['default'])('isGraphical', [sequence, optMethod]);
}

function isValidDegreeSequence(sequence, optMethod) {
  return isGraphical(sequence, optMethod);
}

function genIsValidDegreeSequence(sequence, optMethod) {
  return (0, _internalsDelegate2['default'])('isValidDegreeSequence', [sequence, optMethod]);
}

function basicGraphicalTests(sequence) {
  // sort and perform some simple tests on the sequence
  if (!sequence.every(function (x) {
    return Math.floor(x) === x;
  })) {
    // list of positive intengers
    throw new _exceptions.JSNetworkXUnfeasible();
  }

  var numberOfNodes = sequence.length;
  var numDegress = (0, _internalsFillArray2['default'])(numberOfNodes, 0);
  var maxDegree = 0;
  var minDegree = numberOfNodes;
  var degreeSum = 0;
  var n = 0;

  for (var i = 0; i < numberOfNodes; i++) {
    var degree = sequence[i];
    // Reject if degree is negative or larger than the sequence length
    if (degree < 0 || degree >= numberOfNodes) {
      throw new _exceptions.JSNetworkXUnfeasible();
    }
    // process only the non-zero integers
    else if (degree > 0) {
        maxDegree = Math.max(maxDegree, degree);
        minDegree = Math.min(minDegree, degree);
        degreeSum += degree;
        n += 1;
        numDegress[degree] += 1;
      }
  }
  // Reject sequence if it has odd sum or is over-saturated
  if (degreeSum % 2 === 1 || degreeSum > n * (n - 1)) {
    throw new _exceptions.JSNetworkXUnfeasible();
  }
  return [maxDegree, minDegree, degreeSum, n, numDegress];
}

/**
 * Returns `true` if `degreeSequence` cam be realized by a simple graph.
 *
 * The Validation proceeds via the Havel-Hakimi theorem.
 * Worst-case run time is `$O(s)$`, where `$s$` is the sum of the degree
 * sequence.
 *
 * The `$ZZ$` condition says that for the sequence `$d$`, if
 *
 * ```math
 *     |d| >= \frac{(\max(d) + \min(d) + 1)^2}{4*\min(d)}
 * ```
 *
 * then `$d$` is graphical.
 *
 * ### References
 *
 * [1] I.E. Zverovich and V.E. Zverovich. "Contributions to the theory
 *     of graphic sequences", Discrete Mathematics, 105, pp. 292-303 (1992).
 *
 * @param {Iterable} degreeSequence
 *   A list of integers where each element specifies the degree of a node
 *   in a graph.
 * @return {boolean} `true` if `degreeSequence` is graphical and `false` if not.
 */

function isValidDegreeSequenceHavelHakimi(degreeSequence) {
  var _; // eslint-disable-line no-unused-vars
  var maxDegree;
  var minDegree;
  var n;
  var numDegrees;

  try {
    var _basicGraphicalTests = basicGraphicalTests(degreeSequence);

    var _basicGraphicalTests2 = _slicedToArray(_basicGraphicalTests, 5);

    maxDegree = _basicGraphicalTests2[0];
    minDegree = _basicGraphicalTests2[1];
    _ = _basicGraphicalTests2[2];
    n = _basicGraphicalTests2[3];
    numDegrees = _basicGraphicalTests2[4];
  } catch (ex) {
    if (ex instanceof _exceptions.JSNetworkXUnfeasible) {
      return false;
    } else {
      throw ex;
    }
  }
  // Accept if sequence has no non-zero degrees or passes the ZZ condition
  if (n === 0 || 4 * minDegree * n >= Math.pow(maxDegree + minDegree + 1, 2)) {
    return true;
  }

  var modstubs = (0, _internalsFillArray2['default'])(maxDegree + 1, 0);
  // successively reduce degree sequence by removing node of maximum degree
  while (n > 0) {
    // Retrieve the maximum degree in the sequence
    while (numDegrees[maxDegree] === 0) {
      maxDegree -= 1;
    }
    // If there are not enough stubs to connect to, then the sequence is not
    // graphical
    if (maxDegree > n - 1) {
      return false;
    }

    // Remove largest stub in list
    numDegrees[maxDegree] -= 1;
    n -= 1;
    // Reduce the next maxDegree largest stubs
    var mslen = 0;
    var k = maxDegree;
    for (var i = 0; i < maxDegree; i++) {
      while (numDegrees[k] === 0) {
        k -= 1;
      }
      numDegrees[k] -= 1;
      n -= 1;
      if (k > 1) {
        modstubs[mslen] = k - 1;
        mslen += 1;
      }
    }
    // Add back to the list any non-zero stubs that were removed
    for (i = 0; i < mslen; i++) {
      var stub = modstubs[i];
      numDegrees[stub] += 1;
      n += 1;
    }
  }
  return true;
}

/**
 * Returns `true` if `degreeSequence` can be realized by a simple graph.
 * The validation is done using the Erdős-Gallai theorem.
 *
 * This implementation uses an equivalent form of the Erdős-Gallai criterion.
 * Worst-case run time is `$O(n)$` where `$n$` is the length of the sequence.
 *
 * Specifically, a sequence `$d$` is graphical if and only if the sum of the
 * sequence is even and for all strong indices `$k$` in the sequence,
 *
 * ```math
 * \sum_{i=1}^{k} d_i \leq k(k-1) + \sum_{j=k+1}^{n} \min(d_i,k)
 *    = k(n-1) - ( k \sum_{j=0}^{k-1} n_j - \sum_{j=0}^{k-1} j n_j )
 * ```
 *
 * A strong index `$k$` is any index where `$d_k \geq k$` and the value `$n_j$`
 * is the number of occurrences of `$j$` in `$d$`. The maximal strong index is
 * called the Durfee index.
 *
 * This particular rearrangement comes from the proof of Theorem 3 in (2)
 *
 * The `$ZZ$` condition says that for the sequence `$d$`, if
 *
 * ```math
 * |d| >= \frac{(\max(d) + \min(d) + 1)^2}{4*\min(d)}
 * ```
 *
 * then `$d$` is graphical. This was shown in Theorem 6 in (2).
 *
 * ### References
 * [1] A. Tripathi and S. Vijay. "A note on a theorem of Erdős & Gallai",
 *     Discrete Mathematics, 265, pp. 417-420 (2003).
 *
 * [2] I.E. Zverovich and V.E. Zverovich. "Contributions to the theory
 *     of graphic sequences", Discrete Mathematics, 105, pp. 292-303 (1992).
 *
 * @param {Iterable} degreeSequence
 *      A list of integers where each element specifies the degree of a node
 *      in a graph.
 * @return {boolean} `true` if `degreeSequence` is graphical and f`alse` if not.
 */

function genIsValidDegreeSequenceHavelHakimi(degreeSequence) {
  return (0, _internalsDelegate2['default'])('isValidDegreeSequenceHavelHakimi', [degreeSequence]);
}

function isValidDegreeSequenceErdosGallai(degreeSequence) {
  var maxDegree;
  var minDegree;
  var _; // eslint-disable-line no-unused-vars
  var n;
  var numDegrees;

  try {
    var _basicGraphicalTests3 = basicGraphicalTests(degreeSequence);

    var _basicGraphicalTests32 = _slicedToArray(_basicGraphicalTests3, 5);

    maxDegree = _basicGraphicalTests32[0];
    minDegree = _basicGraphicalTests32[1];
    _ = _basicGraphicalTests32[2];
    n = _basicGraphicalTests32[3];
    numDegrees = _basicGraphicalTests32[4];
  } catch (ex) {
    if (ex instanceof _exceptions.JSNetworkXUnfeasible) {
      return false;
    } else {
      throw ex;
    }
  }
  // Accept if sequence has no non-zero degrees or passes the ZZ condition
  if (n === 0 || 4 * minDegree * n >= Math.pow(maxDegree + minDegree + 1, 2)) {
    return true;
  }

  // Perform the EG checks using the reformulation of Zverovich and Zverovich
  var k = 0;
  var degreeSum = 0;
  var sumnj = 0;
  var sumjnj = 0;

  for (var dk = maxDegree; dk >= minDegree; dk -= 1) {
    if (dk < k + 1) {
      // Check if already past Durfee index
      return true;
    }
    if (numDegrees[dk] > 0) {
      var runSize = numDegrees[dk]; // Process a run of identical-valued degrees
      if (dk < k + runSize) {
        // Check if end of run is past Durfee index
        runSize = dk - k; // Adjust back to Durfee index
      }
      degreeSum += runSize * dk;
      for (var v = 0; v < runSize; v++) {
        sumnj += numDegrees[k + v];
        sumjnj += (k + v) * numDegrees[k + v];
      }
      k += runSize;
      if (degreeSum > k * (n - 1) - k * sumnj + sumjnj) {
        return false;
      }
    }
  }
  return true;
}

// TODO: is_multigraphical
// TODO: is_pseudographical
// TODO: is_digraphical

function genIsValidDegreeSequenceErdosGallai(degreeSequence) {
  return (0, _internalsDelegate2['default'])('isValidDegreeSequenceErdosGallai', [degreeSequence]);
}