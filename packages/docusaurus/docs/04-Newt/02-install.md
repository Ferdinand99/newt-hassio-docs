import CodeBlock from '@theme/CodeBlock';
import WgetNewtInstaller from "@site/src/components/WgetNewtInstaller";

# Install

Newt can be used as either a static binary executable or a Docker container.

### Configuration

Configuration is passed in as CLI args in both the binary and the Docker container. In order to run Newt and have it connect to something you **must first create a site and copy the newt config** in Pangolin.

### Binary

Binaries for Linux, MacOS, and Windows can be found in the [Github releases](https://github.com/fosrl/newt/releases) for ARM and AMD64 (x86_64) versions of Newt. It should be as simple as downloading for your respective platform, making sure it is executable, and running it with the correct [CLI args](/Newt/overview#cli-args).

On Linux for example:

Download Newt with either wget or curl or from your browser and make it executable:

<WgetNewtInstaller />

And run it:

```bash
./newt \
--id 31frd0uzbjvp721 \
--secret h51mmlknrvrwv8s4r1i210azhumt6isgbpyavxodibx1k2d6 \
--endpoint https://example.com
```

To install permanently to your PATH (may need to run as root):

```bash
mv ./newt /usr/local/bin
```

Finally a basic systemd service:

```
[Unit]
Description=Newt VPN Client
After=network.target

[Service]
ExecStart=/usr/local/bin/newt --id 31frd0uzbjvp721 --secret h51mmlknrvrwv8s4r1i210azhumt6isgbpyavxodibx1k2d6 --endpoint https://example.com
Restart=always
User=root

[Install]
WantedBy=multi-user.target
```

Make sure to `mv ./newt /usr/local/bin/newt`!

### Docker

You can find the built docker container [on Docker hub](https://hub.docker.com/r/fosrl/newt).

To pull it:

```bash
docker pull fosrl/newt:latest
```

Then to run it from the command line with args from Pangolin:

```bash
docker run -it fosrl/newt --id 31frd0uzbjvp721 \
--secret h51mmlknrvrwv8s4r1i210azhumt6isgbpyavxodibx1k2d6 \
--endpoint https://example.com
```

You can also run it with Docker compose. For example, a service in your `docker-compose.yml` might look like this using environment vars (recommended):

```yaml
services:
  newt:
    image: fosrl/newt
    container_name: newt
    restart: unless-stopped
    environment:
      - PANGOLIN_ENDPOINT=https://example.com
      - NEWT_ID=2ix2t8xk22ubpfy
      - NEWT_SECRET=nnisrfsdfc7prqsp9ewo1dvtvci50j5uiqotez00dgap0ii2
```

You can also pass the CLI args to the container:

```yaml
services:
  newt:
    image: fosrl/newt
    container_name: newt
    restart: unless-stopped
    command:
      - --id 31frd0uzbjvp721
      - --secret h51mmlknrvrwv8s4r1i210azhumt6isgbpyavxodibx1k2d6
      - --endpoint https://example.com
```

### Unraid

Newt is available in the Unraid Community Applications store. You can install it by searching for Newt in the store and following the prompts. Enter in the ID, secret, and endpoint from Pangolin in the template fields.

<p align="center">
    <img src={require("./img/unraid_store.png").default} alt="Newt on CA" style={{
        width: "400px",
        height: "auto"
    }}/>
</p>

### Portainer, and other UIs

These container management UIs typically allow for passing commands and environment vars to the container similar to Docker compose. Look for a commands or arguments box and follow relevant guides.

And you could start it by simply running:

```bash
docker compose up -d
```

We intend to create more extensive documentation on this in the future. If you would like to contribute, please do!
