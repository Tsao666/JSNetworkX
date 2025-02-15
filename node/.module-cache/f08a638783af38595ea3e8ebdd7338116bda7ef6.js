'use strict';

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.couldBeIsomorphic = couldBeIsomorphic;
exports.genCouldBeIsomorphic = genCouldBeIsomorphic;
exports.fastCouldBeIsomorphic = fastCouldBeIsomorphic;
exports.genFastCouldBeIsomorphic = genFastCouldBeIsomorphic;
exports.fasterCouldBeIsomorphic = fasterCouldBeIsomorphic;
exports.genFasterCouldBeIsomorphic = genFasterCouldBeIsomorphic;

var _internalsDelegate = require('..\\..\\_internals\\delegate');

var _internalsDelegate2 = _interopRequireDefault(_internalsDelegate);

var _clique = require('../clique');

var _cluster = require('../cluster');

/**
 * Returns `false` if graphs are definitely not isomorphic.
 * `true` does **not** guarantee isomorphism.
 *
 * Checks for matching degree, triangle, and number of cliques sequences.
 *
 * @param {!Graph} G1
 * @param {!Graph} G2
 * @return {boolean}  `false` if graphs are definitely not isomorphic.
 */
'use strict';

function couldBeIsomorphic(G1, G2) {
  // Check global properties
  if (G1.order() !== G2.order()) {
    return false;
  }

  // Check local properties
  var degree1 = G1.degree();
  var triangles1 = (0, _cluster.triangles)(G1);
  var cliques1 = (0, _clique.numberOfCliques)(G1);
  var props1 = [];
  degree1.forEach(function (_, v) {
    props1.push([degree1.get(v), triangles1.get(v), cliques1.get(v)]);
  });
  props1.sort(function (a, b) {
    return a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
  });

  var degree2 = G2.degree();
  var triangles2 = (0, _cluster.triangles)(G2);
  var cliques2 = (0, _clique.numberOfCliques)(G2);
  var props2 = [];
  degree2.forEach(function (_, v) {
    props2.push([degree2.get(v), triangles2.get(v), cliques2.get(v)]);
  });
  props2.sort(function (a, b) {
    return a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
  });

  return props1.every(function (a, i) {
    var b = props2[i];
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  });
}

/**
 * Returns `false` if graphs are definitely not isomorphic.
 * `true` does **not** guarantee isomorphism.
 *
 * Checks for matching degree and triangle sequences.
 *
 * @param {!Graph} G1
 * @param {!Graph} G2
 * @return {boolean}  `false` if graphs are definitely not isomorphic.
 */

function genCouldBeIsomorphic(G1, G2) {
  return (0, _internalsDelegate2['default'])('couldBeIsomorphic', [G1, G2]);
}

function fastCouldBeIsomorphic(G1, G2) {
  // Check global properties
  if (G1.order() !== G2.order()) {
    return false;
  }

  // Check local properties
  var degree1 = G1.degree();
  var triangles1 = (0, _cluster.triangles)(G1);
  var props1 = [];
  degree1.forEach(function (_, v) {
    props1.push([degree1.get(v), triangles1.get(v)]);
  });
  props1.sort(function (a, b) {
    return a[0] - b[0] || a[1] - b[1];
  });

  var degree2 = G2.degree();
  var triangles2 = (0, _cluster.triangles)(G2);
  var props2 = [];
  degree2.forEach(function (_, v) {
    props2.push([degree2.get(v), triangles2.get(v)]);
  });
  props2.sort(function (a, b) {
    return a[0] - b[0] || a[1] - b[1];
  });

  return props1.every(function (a, i) {
    var b = props2[i];
    return a[0] === b[0] && a[1] === b[1];
  });
}

/**
 * Returns `false` if graphs are definitely not isomorphic.
 * `true` does **not** guarantee isomorphism.
 *
 * Checks for matching degree sequences.
 *
 * @param {!Graph} G1
 * @param {!Graph} G2
 *
 * @return {boolean}  False if graphs are definitely not isomorphic.
 *
 * @export
 */

function genFastCouldBeIsomorphic(G1, G2) {
  return (0, _internalsDelegate2['default'])('fastCouldBeIsomorphic', [G1, G2]);
}

function fasterCouldBeIsomorphic(G1, G2) {
  // Check global properties
  if (G1.order() !== G2.order()) {
    return false;
  }

  // Check local properties
  var degree1 = _Array$from(G1.degree().values());
  degree1.sort(function (a, b) {
    return a - b;
  });

  var degree2 = _Array$from(G2.degree().values());
  degree2.sort(function (a, b) {
    return a - b;
  });

  return degree1.every(function (v, i) {
    return v === degree2[i];
  });
}

//TODO: is_isomorphic

function genFasterCouldBeIsomorphic(G1, G2) {
  return (0, _internalsDelegate2['default'])('fasterCouldBeIsomorphic', [G1, G2]);
}