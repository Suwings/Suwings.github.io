/**
 * Functions for managing packets used by the RCON protocol
 */
class Packet {
    /**
     * Generate a unique max 32 bit ID integer
     * @return {Number} Generated ID
     */
    static id() {
        return Number.parseInt(Math.random().toString(2).substring(2, 32), 2);
    }
    /**
     * Create a new packet buffer with given ID, type and payload
     * @param  {Number} id A unique max 32 bit client generated request ID
     * @param  {[type]} type Type of the packet
     * @param  {String} payload Data to be sent encoded in 'ASCII'
     * @return {Buffer} Created packet
     */
    static write(id, type, payload) {
        // Length of payload in bytes when encoded in ASCII
        const length = Buffer.byteLength(payload, 'ascii');
        // 14 bytes for the length, ID, type and 2-byte padding
        const buffer = Buffer.allocUnsafe(14 + length);
        // Offsets are hardcoded for speed
        buffer.writeInt32LE(10 + length, 0); // Length
        buffer.writeInt32LE(id, 4); // Request ID
        buffer.writeInt32LE(type, 8); // Type
        buffer.write(payload, 12, 'ascii'); // Payload
        buffer.writeInt16LE(0, 12 + length); // Two null bytes of padding
        return buffer;
    }
    /**
     * Parse the given packet into a JSON object
     * @param  {Buffer} packet
     * @return {Object} Parsed packet
     */
    static read(packet) {
        // Length of the rest of the packet
        const length = packet.readInt32LE(0);
        // Check if we have a valid packet with 2 null bytes of padding in the end
        if (packet.length === 4 + length && !packet.readInt16LE(packet.length - 2)) {
            // Offsets are hardcoded for speed
            return {
                length: length,
                id: packet.readInt32LE(4),
                type: packet.readInt32LE(8),
                payload: packet.toString('ascii', 12, packet.length - 2)
            };
        } else {
            throw new Error(`Invalid packet! [${packet}]`);
        }
    }
}
/**
 * RCON packet type Integers understood by the Mineccraft Server
 * https://wiki.vg/RCON#Packets
 * @type {Object}
 */
Packet.type = {
    AUTH: 3,
    AUTH_RES: 2,
    COMMAND: 2,
    COMMAND_RES: 0,
    // Invalid type that can be used to detect when the full response has been received
    COMMAND_END: 255
};
/**
 * Predefined responses the Minecraft Server can send
 * @type {Object}
 */
Packet.payload = {
    // Response the server sends after receiving a packet with above invalid type
    COMMAND_END: `Unknown request ${Packet.type['COMMAND_END'].toString(16)}`
};



const net = require('net');
const EventEmitter = require('events');

/**
 * Used to create and send commands through a console using the RCON protocol
 */
class RCON {
    /**
     * @param {Number} [timeout=3000] Timeout for connections and responses
     */
    constructor(timeout = 3000) {
        this.timeout = timeout;
        this.online = false;
        this.authenticated = false;
        this.queue = {
            drained: true,
            sending: [],
            pending: {}
        };
        this.events = new EventEmitter()
            .on('removeListener', (id, listener) => {
                clearTimeout(this.queue.pending[id].timer);
                delete this.queue.pending[id];
            })
            .on('newListener', (id, listener) => {
                this.queue.pending[id] = {
                    timer: setTimeout(() => {
                        this.events.emit(id, new Error(`Packet timed out!`));
                        this.events.off(id, listener);
                    }, this.timeout),
                    payloads: []
                };
            });
    }
    /**
     * Ends the connection, but doesn't destroy it
     */
    end() {
        this.socket.end();
    }
    /**
     * Immediately sends out as many queued packets as possible
     */
    drain() {
        while (this.queue.drained && this.queue.sending.length > 0) {
            this.queue.drained = this.socket.write(this.queue.sending.shift());
        }
    }
    /**
     * Connects and authenticates the RCON instance
     * @param  {String} server IP from where to find the server
     * @param  {Number} port Port from where to connect
     * @param  {String} password Password with which to connect
     * @return {Promise} Resolves if succesful or Rejects an Error if one occured
     */
    connect(server, port, password) {
        return new Promise((resolve, reject) => {
            let data = Buffer.allocUnsafe(0);
            this.socket = net.connect({ host: server, port: port })
                .on('data', (chunk) => {
                    data = Buffer.concat([data, chunk]);
                    try {
                        let length = data.readInt32LE(0);
                        while (data.length >= 4 + length) {
                            const response = Packet.read(data.slice(0, 4 + length));
                            this.events.emit('' + response.id, response);
                            data = data.slice(4 + length);
                            length = data.readInt32LE(0);
                        }
                    } catch (error) { /* We don't have enough data yet */ }
                })
                .on('drain', () => { this.drain(); })
                .on('close', () => { this.authenticated = false; this.online = false; })
                .on('error', error => { throw error; })
                .setTimeout(this.timeout, () => {
                    this.socket.destroy();
                    reject(new Error(`Socket timed out when connecting to [${server}:${port}]`));
                })
                .once('connect', () => {
                    this.online = true;
                    this.socket.setTimeout(0);
                    // Send and process authentication packet
                    this.socket.write(Packet.write(0, Packet.type['AUTH'], password));
                    this.events.on(0, result => {
                        if (result instanceof Error) {
                            reject(result);
                        } else {
                            if (result.type !== Packet.type['AUTH_RES']) {
                                reject(new Error(`Packet is of wrong type! [${result.type}]`));
                            } else {
                                this.events.removeAllListeners(0);
                                if (result.id === -1) {
                                    reject(new Error(`Authentication failed!`));
                                } else {
                                    this.authenticated = true;
                                    resolve();
                                }
                            }
                        }
                    });
                });
        });
    }
    /**
     * Send the given command through authenticated RCON connection
     * @param  {String} command
     * @return {Promise} Resolves to response or Rejects an Error if one occured
     */
    send(command) {
        if (!this.online || !this.authenticated) {
            return Promise.reject(new Error('The connection needs to be made and authenticated first!'));
        } else {
            return new Promise((resolve, reject) => {
                const id = Packet.id();
                this.queue.sending.push(Packet.write(id, Packet.type['COMMAND'], command));
                this.queue.sending.push(Packet.write(id, Packet.type['COMMAND_END'], ''));
                this.drain();
                this.events.on(id, result => {
                    if (result instanceof Error) {
                        reject(result);
                    } else {
                        if (result.type !== Packet.type['COMMAND_RES']) {
                            reject(new Error(`Packet is of wrong type! [${result.type}]`));
                        } else {
                            if (result.payload === Packet.payload['COMMAND_END']) {
                                const response = this.queue.pending[result.id].payloads
                                    .reduce((data, chunk) => data + chunk);
                                this.events.removeAllListeners(id);
                                resolve(response);
                            } else {
                                this.queue.pending[result.id].payloads.push(result.payload);
                            }
                        }
                    }
                });
            });
        }
    }
};


var rcon = new RCON();
//test
rcon.connect('localhost', 32330, 'kvixFUSOaUEyDVZF')
    .then(() => {
        console.log('Connected and authenticated.');
        // return rcon.send('/op superman');

        return rcon.send('DestroyAllEnemies');

    })
    .then(response => {
        console.log(`Result of op: ${response}`);
    })
    .catch(error => {
        console.error(`An error occured: ${error}`);
    });
