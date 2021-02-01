var mqtt = require('mqtt');
var client = mqtt.connect("mqtt://test.mosquitto.org")

var options = {
    retain: true,
    qos: 1
};

var topic1 = "/client2_send";
var topic2 = "/client1_send";
var topic3 = "/client1_send_thermometer";
var message = {
    type: 'switch',
    btn: 'on',
    btn_color: 'green'
}

var thermometer_message = {
    type: 'thermometer',
    value: 10
}


client.on("connect", function () {
    client.publish(topic1, JSON.stringify(message), options)
    client.publish(topic3, JSON.stringify(thermometer_message), options)
    client.subscribe(topic2)
})

client.on("error", function (error) {
    console.log("Can't connect" + error);
})

client.on('message', function (topic, message) {
    console.log(topic)
    console.log(message.toString())
})


