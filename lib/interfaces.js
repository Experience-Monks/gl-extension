/* format: [ constructor, constants, functions ]  */

var depthTexture = [
  function DepthTexture () {},
  ['UNSIGNED_INT_24_8_WEBGL']
]

module.exports = {
  EXT_sRGB: [
    function sRGB () {},
    ['SRGB_EXT', 'SRGB_ALPHA_EXT',
    'SRGB8_ALPHA8_EXT',
    'FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT']
  ],
  EXT_blend_minmax: [
    function BlendMinMax () {},
    ['MIN_EXT', 'MAX_EXT']
  ],
  ANGLE_instanced_arrays: [
    function InstancedArrays () {},
    ['VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE'],
    ['drawArraysInstancedANGLE', 'drawElementsInstancedANGLE',
    'vertexAttribDivisorANGLE']
  ],
  OES_standard_derivatives: [
    function StandardDerivatives () {},
    ['FRAGMENT_SHADER_DERIVATIVE_HINT_OES']
  ],
  OES_texture_half_float: [
    function TextureHalfFloat () {},
    ['HALF_FLOAT_OES']
  ],
  OES_vertex_array_object: [
    function VertexArrayObject () {},
    ['VERTEX_ARRAY_BINDING_OES'],
    ['createVertexArrayOES', 'deleteVertexArrayOES',
    'isVertexArrayOES', 'bindVertexArrayOES']
  ],
  WEBGL_depth_texture: depthTexture,
  WEBKIT_WEBGL_depth_texture: depthTexture,
  WEBGL_draw_buffers: [
    function DrawBuffers () {},
    [ 'MAX_COLOR_ATTACHMENTS_WEBGL', 'MAX_DRAW_BUFFERS_WEBGL' ]
      .concat(getColorAttachments(16)),
    ['drawBuffersWEBGL']
  ]
}

function getColorAttachments (n) {
  var a = [], b = []
  for (var i = 0; i < n; i++) {
    a.push('DRAW_BUFFER' + i + '_WEBGL')
    b.push('COLOR_ATTACHMENT' + i + '_WEBGL')
  }
  return a.concat(b)
}
