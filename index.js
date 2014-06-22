var UniformsTextureResolver = require("uniforms-texture-resolver");
var URL = require("url");

var baseUrlGlslIo = typeof window !== "undefined" ? "" : "https://glsl.io";

function resolveUrl (path) {
  var matches;
  var url = URL.parse(path);

  // Attempt to parse a imgur image (for now we only whitelist imgur on GLSL.io, on need we could support more)
  if (url.hostname === "imgur.com" || url.hostname === "i.imgur.com") {
    return path;
  }
  
  // Attempt to parse format of a GLSL.io hosted textures ( relative path like category/texture.png )
  matches = path.split("/");
  if (matches.length === 1) {
    matches = ["luma", path]; // Backwards compatibility. Implicitely using luma textures
  }
  if (matches.length === 2) {
    return baseUrlGlslIo + "/assets/textures/" +
      encodeURIComponent(matches[0]) + "/" + encodeURIComponent(matches[1]);
  }

  throw new Error("unsupported transition texture path = "+path);
}

function GlslioTextureResolver (loadImage) {
  UniformsTextureResolver.call(this, function (path) {
    return loadImage(resolveUrl(path));
  });
}

GlslioTextureResolver.prototype = Object.create(UniformsTextureResolver.prototype);

GlslioTextureResolver.resolveUrl = resolveUrl;

module.exports = GlslioTextureResolver;
