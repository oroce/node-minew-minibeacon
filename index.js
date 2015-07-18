var NobleDevice = require('noble-device');

var AUTHORIZATION_UUID = 'fff6';
var EXPECTED_MANUFACTURER_DATA_LENGTH = 25;
var APPLE_COMPANY_IDENTIFIER = 0x004c; // https://www.bluetooth.org/en-us/specification/assigned-numbers/company-identifiers
var IBEACON_TYPE = 0x02;
var EXPECTED_IBEACON_DATA_LENGTH = 0x15;

function MiniBeacon(peripheral) {
  NobleDevice.call(this, peripheral);

  var manufacturerData = peripheral.advertisement.manufacturerData;
  var rssi = peripheral.rssi;

  if (manufacturerData &&
      EXPECTED_MANUFACTURER_DATA_LENGTH <= manufacturerData.length &&
      APPLE_COMPANY_IDENTIFIER === manufacturerData.readUInt16LE(0) &&
      IBEACON_TYPE === manufacturerData.readUInt8(2) &&
      EXPECTED_IBEACON_DATA_LENGTH === manufacturerData.readUInt8(3)) {

    var uuid = manufacturerData.slice(4, 20).toString('hex');
    var major = manufacturerData.readUInt16BE(20);
    var minor = manufacturerData.readUInt16BE(22);
    var measuredPower = manufacturerData.readInt8(24);

    var accuracy = Math.pow(12.0, 1.5 * ((rssi / measuredPower) - 1));
    var proximity = null;

    if (accuracy < 0) {
      proximity = 'unknown';
    } else if (accuracy < 0.5) {
      proximity = 'immediate';
    } else if (accuracy < 4.0) {
      proximity = 'near';
    } else {
      proximity = 'far';
    }

    this.proximity = proximity;
    this.accuracy = accuracy;
  }
};

MiniBeacon.is = function is(peripheral) {
  return (/^minibeacon/i).test(peripheral.advertisement.localName);
};

// inherit noble device
NobleDevice.Util.inherits(MiniBeacon, NobleDevice);

// you can mixin other existing service classes here too,
// noble device provides battery and device information,
// add the ones your device provides
NobleDevice.Util.mixin(MiniBeacon, NobleDevice.BatteryService);
NobleDevice.Util.mixin(MiniBeacon, NobleDevice.DeviceInformationService);

MiniBeacon.prototype.writeServiceDataCharacteristic = function(uuid, data, callback) {
  this.writeDataCharacteristic('fff0', uuid, data, callback);
};

MiniBeacon.prototype.authorize = function(pin, callback) {
  this.writeServiceDataCharacteristic(AUTHORIZATION_UUID, new Buffer(pin, 'hex'), callback);
};

// export your device
module.exports = MiniBeacon;
