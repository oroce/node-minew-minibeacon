var MiniBeacon = require('..');
var async = require('async');

MiniBeacon.discover(function(device) {
  console.log('got device=%s with distance of %sm', device.uuid, device.accuracy);

  device.on('disconnect', function() {
    console.log('disconnected! (%s)', new Date());
    process.exit(0);
  });

  async.series([
    function(callback) {
      console.log('connectAndSetup');
      device.connectAndSetup(callback);
    },
    function(callback) {
      console.log('readModelNumber');
      device.readModelNumber(function(err, modelNumber) {
        console.log('\tmodel name = ' + modelNumber);
        callback();
      });
     },
    function(callback) {
      console.log('readSerialNumber');
      device.readSerialNumber(function(err, serialNumber) {
       console.log('\tserial name = ' + serialNumber);
       callback();
      });
    },
    function(callback) {
      console.log('readFirmwareRevision');
      device.readFirmwareRevision(function(err, firmwareRevision) {
       console.log('\tfirmware revision = ' + firmwareRevision);
       callback();
      });
    },
    function(callback) {
      console.log('readHardwareRevision');
      device.readHardwareRevision(function(err, hardwareRevision) {
       console.log('\thardware revision = ' + hardwareRevision);
       callback();
      });
    },
    function(callback) {
      console.log('readSoftwareRevision');
      device.readSoftwareRevision(function(err, softwareRevision) {
       console.log('\tsoftware revision = ' + softwareRevision);
       callback();
      });
    },
    function(callback) {
      console.log('readManufacturerName');
      device.readManufacturerName(function(err, manufacturerName) {
       console.log('\tmanufacturer name = ' + manufacturerName);
       callback();
      });
    },
    function(callback) {
      console.log('readBattery');
      device.readBatteryLevel(function(err, level) {
        console.log('\tbattery level=', level);
        callback();
      });
    },
    function(callback) {
      var pin = 'minew123';

      console.log('authorize: ' + pin);
      device.authorize(pin, callback);
    },
  ], function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
      return;
    }
    process.exit(0);
  });

});
