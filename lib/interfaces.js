var range = require('array-range')

module.exports = {
  EXT_sRGB: [
    function EXTsRGB () {},
    ['SRGB_EXT', 'SRGB_ALPHA_EXT', 'SRGB8_ALPHA8_EXT', 'FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT']
  ],
  OES_element_index_uint: [
    function OESElementIndexUint () {},
    ['MIN_EXT', 'MAX_EXT']
  ],
  ANGLE_instanced_arrays: [
    function ANGLEInstancedArrays () {},
    ['VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE'],
    ['drawArraysInstancedANGLE', 'drawElementsInstancedANGLE', 'vertexAttribDivisorANGLE']
  ],
  OES_standard_derivatives: [
    function OESStandardDerivatives () {},
    ['FRAGMENT_SHADER_DERIVATIVE_HINT_OES']
  ],
  OES_texture_half_float: [
    function OESTextureHalfFloat () {},
    ['HALF_FLOAT_OES']
  ],
  OES_vertex_array_object: [
    function OESVertexArrayObject () {},
    ['VERTEX_ARRAY_BINDING_OES'],
    ['createVertexArrayOES', 'deleteVertexArrayOES', 'isVertexArrayOES', 'bindVertexArrayOES']
  ],
  WEBGL_depth_texture: [
    function WEBGLDepthTexture () {},
    ['UNSIGNED_INT_24_8_WEBGL']
  ],
  WEBGL_draw_buffers: [
    function WEBGLDrawBuffers () {},
    [
      'MAX_COLOR_ATTACHMENTS_WEBGL', 'MAX_DRAW_BUFFERS_WEBGL'
    ].concat(getColorAttachments(16)),
    ['drawBuffersWEBGL']
  ]
}

function getColorAttachments (n) {
  var a = range(n).map(function (x) {
    return 'DRAW_BUFFER' + x + '_WEBGL'
  })
  var b = range(n).map(function (x) {
    return 'COLOR_ATTACHMENT' + x + '_WEBGL'
  })
  return a.concat(b)
}
