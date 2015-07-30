'use strict';

var debug = require('diagnostics')('bigpipe-domain');

//
// Plugin name.
//
exports.name = 'domain';

//
// Override the default behavior of BigPipe's compiler html function.
// This is used to set the correct path for dependencies.
//
exports.server = function server(bigpipe, options) {
  var domain = options('domain', '')
    , old = bigpipe._compiler.pagelet;

  function prepend(file) {
    base.pathname = path.join(domain, file);
    return format(base);
  }

  //
  // Overrule the asset resolver of pagelets to prepend the location.
  //
  bigpipe._compiler.pagelet = function pagelet() {
    var assets = old.apply(bigpipe._compiler, arguments);

    assets.js = assets.js.map(prepend);
    assets.css = assets.css.map(prepend);

    return assets;
  };

  //
  // Overrule the default behavior of the depedencies stringifier.
  //
  bigpipe._compiler.html = function html(file) {
    var location = !file.external
      ? prepend(file.location)
      : file.location;

    switch (file.extname) {
      case '.css': return '<link rel=stylesheet href="'+ location +'" />';
      case '.js': return '<script src="'+ location +'"></script>';
      default: return '';
    }
  };
};