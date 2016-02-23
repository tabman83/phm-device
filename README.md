# phm-device [![Build Status](https://travis-ci.org/tabman83/phm-device.svg?branch=master)](https://travis-ci.org/tabman83/phm-device)

Sensor/Actuator device for personal-heating-manager

## Environment variables
- MQTT_CLIENT_ID (required) client id
- POLLING_INTERVAL (optional) polling interval of the sensors (seconds)
- MQTT_HOST (optional) MQTT host name
- MQTT_PORT (optional) MQTT host port
- MQTT_USERNAME (optional) MQTT username
- MQTT_PASSWORD (optional) MQTT password

## Notes
Loads protobuf definitions from https://github.com/tabman83/phm-messages.git
