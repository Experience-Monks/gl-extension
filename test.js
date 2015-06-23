var extension = require('./')
var test = require('tape')
var getContext = require('get-canvas-context')

test('normalizes an extension object so it works in WebGL2', function (t) {
  var gl1 = getContext('webgl')
  var gl2 = getContext('webgl2')

  var ext1, ext2
  ext1 = extension(gl1, 'EXT_sRGB')
  ext2 = extension(gl2, 'EXT_sRGB')
  t.deepEqual(ext1.SRGB_EXT, ext2.SRGB_EXT)

  ext1 = extension(gl1, 'WEBGL_draw_buffers')
  ext2 = extension(gl2, 'WEBGL_draw_buffers')
  t.deepEqual(ext1.COLOR_ATTACHMENT13_WEBGL, ext2.COLOR_ATTACHMENT13_WEBGL, 'color attachments')
  t.equal(typeof ext1.drawBuffersWEBGL, 'function')
  t.equal(typeof ext2.drawBuffersWEBGL, 'function')

  ext1 = extension(gl1, 'WEBGL_draw_buffers')
  ext2 = extension(gl2, 'WEBGL_draw_buffers')
  t.deepEqual(ext1.COLOR_ATTACHMENT13_WEBGL, ext2.COLOR_ATTACHMENT13_WEBGL, 'color attachments')
  t.equal(typeof ext1.drawBuffersWEBGL, 'function')
  t.equal(typeof ext2.drawBuffersWEBGL, 'function')

  ext1 = extension(gl1, 'OES_vertex_array_object')
  ext2 = extension(gl2, 'OES_vertex_array_object')
  t.equal(ext1.VERTEX_ARRAY_BINDING_OES, ext2.VERTEX_ARRAY_BINDING_OES)
  var obj1 = ext1.createVertexArrayOES()
  var obj2 = ext2.createVertexArrayOES()

  // just a rough check on names to make sure we're getting something decent
  t.equal(obj1.constructor.name, 'WebGLVertexArrayObjectOES', 'gets OES webgl1 VAO')
  t.equal(obj2.constructor.name, 'WebGLVertexArrayObject', 'gets native webgl2 VAO')

  // could validate first for stronger check here
  t.equal(ext1.isVertexArrayOES(obj1), false, 'invalidated flag is set')
  t.equal(ext2.isVertexArrayOES(obj2), false, 'invalidated flag is set')

  t.equal(extension(gl1, 'EXT_frag_depth').constructor.name, 'EXTFragDepth')
  t.equal(extension(gl2, 'EXT_frag_depth').constructor.name, 'FragDepth')

  t.end()
})
