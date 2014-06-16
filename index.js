var UniformsTextureResolver = require("uniforms-texture-resolver");

function GlslioTextureResolver (loadImage) {
  UniformsTextureResolver.call(this, function (path) {
    var url = null;
    if (!path.match(/\//)) {
      url = "http://staging.glsl.io/assets/textures/"+encodeURIComponent(path);
    }
    if (!url) throw new Error("invalid path");
    return loadImage(url);
  });
}

GlslioTextureResolver.prototype = Object.create(UniformsTextureResolver.prototype);

module.exports = GlslioTextureResolver;
