// create a container entity. does not query API
var Docker = require('dockerode');

var docker = new Docker();

let auxContainer = null;

// auxContainer = await docker.createContainer();

docker.createContainer({
  Image: 'mcsd',
  AttachStdin: true,
  AttachStdout: true,
  AttachStderr: true,
  Tty: true,
  Cmd: ['bash'],
  OpenStdin: true,
  StdinOnce: false,
  ExposedPorts: {
    "25566/tcp": {
    }
  },
  HostConfig: {
    Binds: [
      "/root/mcsm/mcsmanager/server/server_core/Bukkit1.14:/mcsd/"
    ],
    Memory: 1 * 1024 * 1024 * 1024,
    PortBindings: {
      "25566/tcp": [
        {
          HostPort: "23344"
        }
      ]
    },
  }
}).then(function (container) {
  auxContainer = container;
  return auxContainer.start();
}).then(function (data) {
  auxContainer.attach({
    stream: true,
    stdin: true,
    stdout: true
  }, (err, stream) => {
    stream.write("ls -al --color\n")
    console.log('Send Command')
    stream.on('data', (data) => {
      console.log("stdout:" + data)
    });
    stream.on('exit', (data) => {
      console.log("stream exit...")
    });
  });
})


setTimeout(async () => {
  await docker.getContainer(auxContainer.id).kill();
  await docker.getContainer(auxContainer.id).remove();
}, 9000)