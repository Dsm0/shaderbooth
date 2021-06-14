var socketIO = require("socket.io");

const startServer = () => {
    "use strict";

    socketIO.SocketWebOsc = () => {
        this.oscPort = new osc.WebSocketPort({
            url: "ws://localhost:8081"
        });

        this.listen();
        this.oscPort.open();

    };

    socketIO.SocketWebOsc.prototype.listen = () => {

        this.oscPort.on("message", (msg) => {

            console.log(msg)

        });

    };

};

module.exports = { startServer }

