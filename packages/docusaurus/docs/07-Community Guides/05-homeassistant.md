# Home Assistant Add-on

:::note

This is a community add-on and is not officially supported. If you have any issues, please reach out to the [author](https://github.com/Ferdinand99/home-assistant-newt-addon).

:::

This Home Assistant add-on allows you to easily run **Newt** directly in Home Assistant. The add-on lets you configure **PANGOLIN_ENDPOINT**, **NEWT_ID**, and **NEWT_SECRET** via the Home Assistant interface.

## Features

- Easy installation via Home Assistant Add-on Store
- Automated setup and execution of the Newt container
- Supports `amd64`, `armv7`, `armhf`, and `aarch64` architectures
- Automatic restart on crash

## Installation

### **1. Add the GitHub Repository as an Add-on Source**

- Go to **Settings → Add-ons → Add-on Store**.
- Click the menu (three dots in the top right) and select **Repositories**.
- Add the following URL:
  ```
  https://github.com/Ferdinand99/home-assistant-newt-addon
  ```
  or
  ```
  https://git.opland.net/Ferdinand99/home-assistant-newt-addon/
  ```

1. Click **Add** and wait for the repository to load.

### **2. Install and Start the Add-on**

1. Find **Newt Add-on** in the list and click **Install**.
2. Go to the **Configuration** tab and enter your values for:
   - **PANGOLIN_ENDPOINT** (e.g., `https://example.com`)
   - **NEWT_ID**
   - **NEWT_SECRET**
3. Click **Save** and then **Start**.
4. Check the **Logs** tab to verify that everything is running correctly.

## **Configuration**

After installation, you can configure the add-on via the Home Assistant UI:

```yaml
PANGOLIN_ENDPOINT: "https://example.com"
NEWT_ID: "your_newt_id"
NEWT_SECRET: "your_newt_secret"
```

### **Docker Environment Variables**

The following environment variables are passed to the `Newt` container:

- `PANGOLIN_ENDPOINT`
- `NEWT_ID`
- `NEWT_SECRET`

## Exposing Home Assistant through addon
1. Connect addon to your Pangolin by completing environment variables and starting the addon
2. In Pangolin create new HTTP resource for your new Tunnel with subdomain
3. Within the created Resource add new Target Configuration

| Method | IP / Hostname | Port |
| --- | ----------- | --- |
| HTTP | 127.0.0.1 | 8123 |

4. In Home Assistant's `configuration.yaml` add these two sections:
```yaml
http:
  use_x_forwarded_for: true
  trusted_proxies:
    - 127.0.0.1
homeassistant:
  allowlist_external_urls:
    - "https://<subdomain>.example.com" # <-- Replace with URL of created resource in Pangolin
```

4.5: If you wan't to use SSO Authentication in Pangolin you need to set up the `configuration.yaml` like this:
```
http:
cors_allowed_origins:
- https://google.com
- https://www.home-assistant.io
ip_ban_enabled: true
login_attempts_threshold: 2
use_x_forwarded_for: true
trusted_proxies:
- 127.0.0.1
- Local IP of your NEWT instance
- VPS IP
```
You also need to set up `Resource rules` in the pangolin dashboard. See rule overview here:
https://github.com/fosrl/docs/blob/1e754b66c09447a6e6d68e08fb3c9d31646f7d9d/packages/docusaurus/docs/03-Pangolin/05-bypass-rules.md

Many thanks to steuerlexi for finding this out!

https://github.com/fosrl/pangolin/issues/757#issuecomment-2903774897

:::note
Please see [http](https://www.home-assistant.io/integrations/http/) documentation and [allowlist_external_urls](https://www.home-assistant.io/integrations/homeassistant/#external_url) on Home Assistant site.

:::
5. Restart Home Assistant and your new Pangolin Proxy should be alive


## Troubleshooting

#### **Add-on does not start?**

- Check the logs in Home Assistant (`Settings → Add-ons → Newt → Logs`).
- Ensure that `PANGOLIN_ENDPOINT`, `NEWT_ID`, and `NEWT_SECRET` are set correctly.

#### **Changes in configuration do not take effect?**

- Restart the add-on after making changes.
- Try removing the container manually:

  ```shell
  docker stop newt
  docker rm newt
  ```

- Then start the add-on again.

#### **Docker not available?**

- Home Assistant OS manages Docker automatically, but check if the system has access to Docker by running:
  ```shell
  docker info
  ```

If this fails, there may be a restriction in Home Assistant OS.

## Useful Links

- [HA addon repo](https://github.com/Ferdinand99/home-assistant-newt-addon)
- [Newt Documentation](https://docs.fossorial.io/Newt/overview)
- [Home Assistant](https://www.home-assistant.io/)
- [Docker Docs](https://docs.docker.com/)
