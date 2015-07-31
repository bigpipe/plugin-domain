# BigPipe - Plugin Domain

[![Version npm][version]](http://browsenpm.org/package/bigpipe-domain)[![Build Status][build]](https://travis-ci.org/bigpipe/plugin-domain)[![Dependencies][david]](https://david-dm.org/bigpipe/plugin-domain)[![Coverage Status][cover]](https://coveralls.io/r/bigpipe/plugin-domain?branch=master)

[version]: http://img.shields.io/npm/v/bigpipe-domain.svg?style=flat-square
[build]: http://img.shields.io/travis/bigpipe/plugin-domain/master.svg?style=flat-square
[david]: https://img.shields.io/david/bigpipe/plugin-domain.svg?style=flat-square
[cover]: http://img.shields.io/coveralls/bigpipe/plugin-domain/master.svg?style=flat-square

BigPipe's CSS/JS resources are exposed on `/` by default. It's possible to serve
resources from another server or scoped domain with this plugin.

### Install

```bash
npm install bigpipe-domain --save
```

### Usage

Configure a domain on which bigpipe resources will be supplied. The `pathname` of
the file is merged with the `pathname` of the `domain` configuration. For example,
the configuration below will serve `1fb1d9e0d989a5673eb0d69c904b804b3a38f483.js` as
`https://subdomain.bigpipe.com:1337/path/to/sub/1fb1d9e0d989a5673eb0d69c904b804b3a38f483.js`.

```js
var domain = require('bigpipe-domain')
  , BigPipe = require('bigpipe');

BigPipe.createServer(1337, {
  plugins: [ domain ],
  domain: {
    pathname: '/path/to/sub',
    hostname: 'subdomain.bigpipe.com',
    protocol: 'https'
  }
});
```

**Note:** the `port` and `hostname` are extracted from the running bigpipe server
and do not have to be explicitly configured.

### License

MIT