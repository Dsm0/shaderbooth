var osc = require("osc"),
    os = require("os");

const getIPAddresses = () => {
    interfaces = os.networkInterfaces(),
        ipAddresses = [];

    for (var deviceName in interfaces) {
        var addresses = interfaces[deviceName];
        for (var i = 0; i < addresses.length; i++) {
            var addressInfo = addresses[i];
            if (addressInfo.family === "IPv4" && !addressInfo.internal) {
                ipAddresses.push(addressInfo.address);
            }
        }
    }

    return ipAddresses;
};

var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57130
});

udpPort.on("ready", () => {

    var ipAddresses = getIPAddresses();
    console.log("Listening for OSC over UDP.");
    ipAddresses.forEach((address) => {
        console.log(" Host:", address + ", Port:", udpPort.options.localPort);
    });
    // console.log("To start the demo, go to http://localhost:8081 in your web browser.");
});

udpPort.on("message", (oscMsg, timeTag, info) => {
    console.log("An OSC message just arrived!", oscMsg);
    console.log("Remote info is: ", info);
});


module.exports = { udpPort };