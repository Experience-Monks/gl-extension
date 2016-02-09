var isGL2 = require('is-webgl2-context')
var promoted = require('webgl2-core-extensions')
var interfaces = require('./lib/interfaces')
var noInterfaces = require('./lib/no-interfaces')

module.exports = getExtension
module.exports.patch = patch;

function patch (gl) {
  var glGetExtension = gl.getExtension;
  gl.getExtension = function (ext) {
    if (shouldGenerate(gl, ext)) {
      return generate(gl, ext)
    } else {
      return glGetExtension.call(this, ext)
    }
  }
}

function getExtension (gl, ext) {
  if (shouldGenerate(gl, ext)) {
    return generate(gl, ext)
  } else {
    return gl.getExtension(ext)
  }
}

function shouldGenerate (gl, ext) {
  return isGL2(gl) && promoted.indexOf(ext) >= 0;
}

function trimEnd (name) {
  return name.replace(/\_?(EXT|OES|WEBGL|ANGLE)$/, '')
}

function generate (gl, name) {
  // dummy interface, no features
  if (name in noInterfaces) {
    return new (noInterfaces[name])()
  }

  // interface with some constants / functions
  var data = interfaces[name]
  if (!data) {
    // found a "core" extension but no interfaces
    // yet defined for it
    throw new Error('found a "core" extension ' + name
        + ' but no interface exists yet to wrap it')
  }
  var Ctor = data[0]
  var constants = data[1]
  var funcs = data[2]

  var obj = new Ctor()
  if (constants) {
    constants.forEach(function (k) {
      var constant = gl[trimEnd(k)]
      Object.defineProperty(obj, k, {
        enumerable: true,
        configurable: false,
        writable: false,
        value: constant
      })
    })
  }
  if (funcs) {
    funcs.forEach(function (k) {
      var name = trimEnd(k)
      obj[k] = gl[name].bind(gl)
    })
  }
  return obj
}
