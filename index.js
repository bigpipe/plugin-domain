'use strict';

var debug = require('diagnostics')('bigpipe-domain')
  , merge = require('lodash.merge')
  , format = require('url').format
  , path = require('path');

//
// Plugin name.
//
exports.name = 'domain';

//
// Override the default behavior of BigPipe's compiler html function.
// This is used to set the correct path for dependencies.
//
exports.server = function server(bigpipe, options) {
  var registerProxy = bigpipe._compiler.register
    , pageletProxy = bigpipe._compiler.pagelet
    , domain = options('domain', {
        hostname: 'localhost',
        protocol: 'http',
        pathname: '/',
        port: 8080
      });

  /**
   * Join the filename with the provided pathname.
   *
   * @param {String} file Filename
   * @returns {String} Joined path.
   * @api private
   */
  function join(file) {
    return path.join(domain.pathname, file);
  }

  /**
   * Prepend the filename.
   *
   * @param {String} file Hashed filename.
   * @returns {String} Fully parsed url.
   * @api private
   */
  function prepend(file) {
    var url = merge({}, domain);

    url.pathname = join(file);
    return format(url);
  }

  //
  // Extract address and port form the running server.
  //
  bigpipe.once('listening', function update() {
    var server = bigpipe._server.address();

    domain.hostname = server.address;
    domain.port = server.port;
  });

  //
  // Remove the buffer reference that was registered and update
  // it with the updated file path based on the url.
  //
  bigpipe._compiler.on('register', function register(file, next) {
    if (!file.location) return next();

    this.buffer[join(file.location)] = file;

    next();
  });

  //
  // Overrule the asset resolver of pagelets to prepend the location.
  //
  bigpipe._compiler.pagelet = function pagelet() {
    var assets = pageletProxy.apply(bigpipe._compiler, arguments);

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