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
        return {};
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
  });
});