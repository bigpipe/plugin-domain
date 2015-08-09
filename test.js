'use strict';

var EventEmitter = require('events').EventEmitter
  , File = require('bigpipe/lib/file')
  , BigPipe = require('bigpipe')
  , assume = require('assume')
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
          pathname: '/',
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
      bigpipe._compiler.emit('register', file, done);
    });

    it('supports full server configurations and pathname only', function (done) {
      var location = file.location;

      options = function get() {
        return '/test';
      };

      domain.server(bigpipe, options);
      bigpipe._compiler.emit('register', file, function () {
        assume(bigpipe._compiler.buffer).to.have.property('/test'+ location);
        assume(bigpipe._compiler.buffer['/test'+ location]).to.equal(file);
        done();
      });
    });
  });
});