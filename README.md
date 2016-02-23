# phm-device [![Build Status](https://travis-ci.org/tabman83/phm-device.svg?branch=master)](https://travis-ci.org/tabman83/phm-device)

Sensor/Actuator device for personal-heating-manager

## Environment variables
- MQTT_CLIENT_ID (required) client id
- POLLING_INTERVAL (optional) polling interval of the sensors in seconds (default is 5)
- SENSOR_GPIO (optional) GPIO pin to which the sensor is attached (default is 4)
- MQTT_HOST (optional) MQTT host name (default is localhost)
- MQTT_PORT (optional) MQTT host port (default is 1883)
- MQTT_USERNAME (optional) MQTT username (default is none)
- MQTT_PASSWORD (optional) MQTT password (default is none)

## Prerequisites
For DHT11/DHT22/AM2302 sensors, you need to download and install the [BCM2835](http://www.airspayce.com/mikem/bcm2835/) library.

```
wget http://www.airspayce.com/mikem/bcm2835/bcm2835-1.49.tar.gz
tar zxvf bcm2835-1.49.tar.gz
cd bcm2835-1.49
./configure
make
sudo make check
sudo make install
```

Install specific Node.js version, as required by [node-dht-sensor](https://github.com/momenso/node-dht-sensor) v. 0.0.11
```
wget http://node-arm.herokuapp.com/node_latest_armhf.deb 
sudo dpkg -i node_latest_armhf.deb
```

## Notes
Loads protobuf definitions from https://github.com/tabman83/phm-messages.git
