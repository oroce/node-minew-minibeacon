var test = require('tap').test;
var MiniBeacon = require('..');

test('MiniBeacon.is', function(t) {
  t.ok(MiniBeacon.is({
    advertisement: {
      localName: 'minibeacon'
    }
  }), 'Should accept `minibeacon` localName');

  t.ok(MiniBeacon.is({
    advertisement: {
      localName: 'MiniBeacon_0666'
    }
  }), 'Should accept `MiniBeacon_0666` localName');

  t.notOk(MiniBeacon.is({
    advertisement: {
      localName: 'BigMiniBeacon_0666'
    }
  }), 'Should not accept `BigMiniBeacon_0666` localName');

  t.end();
});
