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

## Notes
Loads protobuf definitions from https://github.com/tabman83/phm-messages.git
