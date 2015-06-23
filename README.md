# gl-extension

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Returns a WebGL extension object for the given string, if it is supported. If the context [is using WebGL 2.0](https://www.npmjs.com/package/is-webgl2-context), core extensions are wrapped with dummy interfaces, so your code does not need to change.

See the [WebGL Extension Registry](https://www.khronos.org/registry/webgl/extensions/) for API details.

#### Example

```js
var getExtension = require('gl-extension')

// see if floats are supported
var hasFloat = getExtension(gl, 'OES_texture_float')
if (hasFloat) {
  console.log("Float textures supported")
}

// vertex array objects
var ext = getExtension(gl, 'OES_vertex_array_object')
if (ext) {
  // copies constants
  console.log(ext.VERTEX_ARRAY_BINDING_OES)
  
  // and wraps functions
  var array = vao.createVertexArrayOES()
}
```

## Usage

[![NPM](https://nodei.co/npm/gl-extension.png)](https://www.npmjs.com/package/gl-extension)

## See Also

- [is-webgl2-context](https://www.npmjs.com/package/is-webgl2-context)
- [webgl2-core-extensions](https://www.npmjs.com/package/webgl2-core-extensions)

## License

MIT, see [LICENSE.md](http://github.com/Jam3/gl-extension/blob/master/LICENSE.md) for details.
