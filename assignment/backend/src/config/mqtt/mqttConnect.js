class MQTTClient {
  static #instance;
  static #initialize = false;

  constructor() {
    if (!MQTTClient.#initialize) {
      throw new Error('The constructor is private, please use getInstance.');
    }

    this.defineField();
    this.client.on('connect', () => {
      this.feeds_key.forEach((feed) => {
        this.client.subscribe(`dinhluu/feeds/${feed}`);
      });
    });

    MQTTClient.#initialize = false;
  }

  static getInstance() {
    if (!this.#instance) {
      MQTTClient.#initialize = true;
      this.#instance = new MQTTClient();
    }
    return this.#instance;
  }

  defineField() {
    this.feeds = ['Temperature', 'LuX', 'Humidity', 'Pump', 'OxygenPump'];
    this.feeds_key = ['temperature', 'lux', 'humidity', 'oxygenpump', 'pump'];
    this.moment = require('moment');
    this.mqtt = require('mqtt');
    this.username = 'dinhluu';
    this.port = 1883;
    this.key = 'aio_Ttqa9160vpvtT0qvL9N2rB3zHxCl';
    this.url = `mqtts://${this.username}:${this.key}@io.adafruit.com`;
    this.client = this.mqtt.connect(this.url, this.port);
  }

  on(event, callback) {
    this.client.on(event, callback);
  }

  subscribe(topic) {
    this.client.subscribe(topic);
  }

  publish(topic, message) {
    this.client.publish(topic, message);
  }
}

module.exports = MQTTClient;
