'use strict';

var EventEmitter = require('events').EventEmitter
  , File = require('bigpipe/lib/file')
  , BigPipe = require('bigpipe')
  , assume = require('assume')
  , http = require('http')
  , domain = require('./')
  , bigpipe, file, options;

describe('BigPipe - Plugin domain', function () {
  describe('is module', function () {
    it('which exports name domain', function () {
      assume(domain.name).to.be.a('string');
      assume(domain.name).to.equal('domain');
    });

    it('which exports server side plugin', function () {
      assume(domain.server).to.be.a('function');
      assume(domain.server.length).to.equal(2);
    });
  });

  describe('server side plugin', function () {
    beforeEach(function () {
      options = function get() {
        return {
          hostname: 'localhost',
          protocol: 'http',
          pathname: '/test',
          port: 8080
        };
      };

      file = new File;
      bigpipe = new BigPipe;
    });

    afterEach(function () {
      file = bigpipe = null;
    });

    it('waits for register event', function (done) {
      domain.server(bigpipe, options);

      assume(bigpipe._compiler._events).to.have.property('register');
      bigpipe._compiler.emit('register', file, false, done);
    });

    it('supports pathname configurations', function (done) {
      var location = file.location;

      options = function get() {
        return '/test';
      };

      domain.server(bigpipe, options);
      bigpipe._compiler.emit('register', file, false, function () {
        assume(bigpipe._compiler.buffer).to.have.property('/test'+ location);
        assume(bigpipe._compiler.buffer['/test'+ location]).to.equal(file);
        done();
      });
    });

    it('exposes the compiled core library under the same domain', function (done) {
      bigpipe = BigPipe.createServer({
        plugins: [ domain ],
        domain: options(),
        listen: false
      });

      bigpipe.listen(8080, function () {
        assume(bigpipe._compiler.buffer).to.have.property('/test/bigpipe.js');

        http.get('http://localhost:8080/test/bigpipe.js', function(res) {
          assume(res.statusCode).to.equal(200);
          done();
        }).on('error', done);
      });
    });
  });
});