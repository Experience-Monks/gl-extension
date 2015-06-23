# gl-extension

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Grabs an extension from the specified WebGL context.

If the context [is using WebGL 2.0](https://www.npmjs.com/package/is-webgl2-context), core functions and contexts are wrapped with dummy interfaces, so your code does not need to change.

#### Example

```js
var getExtension = require('gl-extension')

// get an extension
var ext = getExtension(gl, 'OES_vertex_array_object')
if (ext) {
  // this will work even when gl is a WebGL 2.0 context
  var array = ext.createVertexArrayOES()
  console.log(ext.VERTEX_ARRAY_BINDING_OES)  
}
```

## Install

```sh
npm install gl-extension --save
```

## Usage

[![NPM](https://nodei.co/npm/gl-extension.png)](https://www.npmjs.com/package/gl-extension)

#### `ext = getExtension(gl, name)`

If `gl` is a WebGL 1.0 instance, or if the extension is not part of core in WebGL 2.0, this is the same as calling `gl.getExtension(name)`. 

If `gl` is a WebGL 2.0 instance and `name` is an extension that has been promoted to core, a new wrapper object will be returned mimicing the API and constants of the WebGL 1 extension.

See the [WebGL Extension Registry](https://www.khronos.org/registry/webgl/extensions/) for extension details.

## See Also

- [is-webgl2-context](https://www.npmjs.com/package/is-webgl2-context)
- [webgl2-core-extensions](https://www.npmjs.com/package/webgl2-core-extensions)

## License

MIT, see [LICENSE.md](http://github.com/Jam3/gl-extension/blob/master/LICENSE.md) for details.
