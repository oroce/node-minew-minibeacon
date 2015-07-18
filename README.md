# Minew's MiniBeacon

I ordered them from alibaba, you can read more about Minew i3 MiniBeacon here: http://www.minewtech.cn/product/60288699842-220649015/bluetooth_beacons_nRF51822_ibeacon_support_google_eddystore_protocol.html
# Usage
```
var MiniBeacon = require('minew-minibeacon');
MiniBeacon.discover(function(device) {
  device.connectAndSetup(function(err) {
    if (err) {
      return console.log('Failed to connect=', err.message);
    }
    console.log('Device is connected');
  });
})
```

For more detailed example see `index.js` in `examples` folder and check [`noble-device`](https://github.com/sandeepmistry/noble-device).
# Test

npm test
