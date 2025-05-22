---
title: Hacking the I2C bus 
created: 2025-03-06
image: "/2025/i2c-scan.png"
imageAlt: "How to find the IC bus wiring?"
tags: 
  - "arduino"
description: >  
  How to find details about the internal wiring in unknown or bad documented devices and boards.
---

Sometimes, when working with devices from overseas suppliers, the documentation can be sparse or even incorrect. In such cases, we need to find out the hardware configuration by investigating the actual wiring.

Here's how to discover the I2C bus configuration using a brute force approach:

1. First, identify which GPIO ports are available for I2C communication. Note that some ports might be unavailable due to hardware restrictions (like ROM connections).

2. Then, systematically test all possible port combinations to find responding I2C devices.

3. As a bonus, this method also reveals the I2C addresses of connected devices.

The following Arduino sketch demonstrates this approach:

``` cpp
/*
  I2C_Scanner.ino
  This sketch scans for devices on the I2C (wire) bus
  using the Arduino I2C implementation.

  Copyright (c) 2025 by Matthias Hertel, http://www.mathertel.de
  This work is licensed under a BSD style license.
  See http://www.mathertel.de/License.aspx

  This sketch is designed to use the ESP8266 but can be adapted to ESP32.
*/

#include <Wire.h>

void setup() {
  Serial.begin(115200);
  delay(4000);

  Serial.println("\nI2C Scanner...");
  Serial.printf("  Default I2C SDA=%d, SCL=%d\n", SDA, SCL);
  Serial.println();
  delay(1000);
}


void scanI2C(int sda, int scl) {
  byte error, address;
  int nDevices;

  Serial.printf("Scanning SDA=%d, SCL=%d\n", sda, scl);
  Wire.begin(sda, scl);

  nDevices = 0;
  for (address = 1; address < 127; address++) {
    // The i2c_scanner uses the return value of the Write.endTransmission
    // function to see if a device did acknowledge to the address.
    Wire.beginTransmission(address);
    error = Wire.endTransmission();

    if (error == 0) {
      Serial.printf("I2C device found at address 0x%02x\n", address);
      nDevices++;

    } else if (error == 4) {
      Serial.printf("Unknown error at address 0x%02x\n", address);
    }
  }

  if (nDevices == 0) {
    Serial.println("No I2C devices found.");
  } else {
    Serial.println("done.");
  }

  delay(50);  // wait for next scan
}

// array of pins meaningful for ESP8266
uint8_t pins[] = { 0, 2, 4, 5, 12, 13, 14, 16 };

// scan all port combinations brute force.
void scanPorts() {
  for (uint8_t d = 0; d < sizeof(pins); d++) {
    for (uint8_t c = 0; c < sizeof(pins); c++) {
      if (d != c) {
        scanI2C(pins[d], pins[c]);
      }
    }
  }
}

void loop() {

  scanPorts();
  Serial.println();

  delay(12000);  // wait 12 seconds for next scan
}

// End.
```

Happy hacking.
