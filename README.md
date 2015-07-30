# BigPipe - Plugin Domain

[![Version npm][version]](http://browsenpm.org/package/bigpipe-domain)[![Build Status][build]](https://travis-ci.org/bigpipe/plugin-domain)[![Dependencies][david]](https://david-dm.org/bigpipe/plugin-domain)[![Coverage Status][cover]](https://coveralls.io/r/bigpipe/plugin-domain?branch=master)

[version]: http://img.shields.io/npm/v/bigpipe-domain.svg?style=flat-square
[build]: http://img.shields.io/travis/bigpipe/plugin-domain/master.svg?style=flat-square
[david]: https://img.shields.io/david/bigpipe/plugin-domain.svg?style=flat-square
[cover]: http://img.shields.io/coveralls/bigpipe/plugin-domain/master.svg?style=flat-square



### Install

To install the plugin with the default minification tools:

```bash
npm install bigpipe-domain --save
```

### Usage

```js
var domain = require('bigpipe-domain')
  , BigPipe = require('bigpipe');

BigPipe.createServer(8080, {
  domain: '/path/to/sub',
  plugins: [ domain ]
});
```

### License

MIT