# GeoBlock

:::note

This is a community guide and is not officially supported. If you have any issues, please reach out to the [author](https://github.com/Lokowitz).

:::

GeoBlock is a Traefik middleware that uses IP-based geolocation to allow or block traffic from specific countries. It helps enhance security and access control by restricting unwanted or potentially harmful connections based on geographic regions.

## Installation

To integrate GeoBlock into your Traefik setup, follow the steps below:

1. Add the following configuration to your `/config/traefik/traefik_config.yml` file:

```yaml
entryPoints:
  websecure:
    http:
      middlewares:
        - geoblock@file

experimental:
  plugins:
    geoblock:
      moduleName: github.com/PascalMinder/geoblock
      version: v0.3.2
```

2. Add the following configuration to your `/config/traefik/dynamic_config.yml` file. Setting `blackListMode: false` enables GeoBlock in whitelist mode, allowing only the specified countries. Remember to add the appropriate countries when traveling. A list of country codes can be found in the [documentation](https://github.com/PascalMinder/geoblock#full-plugin-sample-configuration).

```yaml
http:
  middlewares:
    geoblock:
      plugin:
        geoblock:
          silentStartUp: false
          allowLocalRequests: true
          logLocalRequests: false # change to true to see logs and verify if it is working
          logAllowedRequests: false # change to true to see logs and verify if it is working
          logApiRequests: false # change to true to see logs and verify if it is working
          api: "https://get.geojs.io/v1/ip/country/{ip}"
          apiTimeoutMs: 500
          cacheSize: 25
          forceMonthlyUpdate: true
          allowUnknownCountries: false
          unknownCountryApiResponse: "nil"
          blackListMode: false
          countries:
            - DE # add/replace with your country code
```

3. Restart Traefik to apply the changes:

```bash
docker restart traefik
```

## Testing

To monitor GeoBlock activities in the Traefik logs, enable logging by setting the following options to `true`:

```yaml
logLocalRequests: true
logAllowedRequests: true
logApiRequests: true
```
