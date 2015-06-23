var isGL2 = require('is-webgl2-context')
var promoted = require('webgl2-core-extensions')
var interfaces = require('./lib/interfaces')
var noInterfaces = require('./lib/no-interfaces')

module.exports = getExtension
function getExtension (gl, ext) {
  if (isGL2(gl) && promoted.indexOf(ext) >= 0) {
    return generate(gl, ext)
  } else {
    return gl.getExtension(ext)
  }
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
