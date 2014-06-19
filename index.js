var UniformsTextureResolver = require("uniforms-texture-resolver");

var baseUrlGlslIo = typeof window !== "undefined" ? "" : "https://glsl.io";

function GlslioTextureResolver (loadImage) {
  UniformsTextureResolver.call(this, function (path) {
    var url = null;
    if (!path.match(/\//)) {
      url = baseUrlGlslIo + "/assets/textures/" + encodeURIComponent(path);
    }
    if (!url) throw new Error("invalid path");
    return loadImage(url);
  });
}

GlslioTextureResolver.prototype = Object.create(UniformsTextureResolver.prototype);

module.exports = GlslioTextureResolver;
