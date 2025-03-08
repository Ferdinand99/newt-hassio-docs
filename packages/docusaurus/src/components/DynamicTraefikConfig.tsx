import CodeBlock from '@theme/CodeBlock';

const DynamicTraefikConfig: React.FC = () => {
    return (
        <CodeBlock language="yml">
        {`http:
  middlewares:
    redirect-to-https:
      redirectScheme:
        scheme: https

  routers:
    # HTTP to HTTPS redirect router
    main-app-router-redirect:
      rule: "Host(\`pangolin.example.com\`)" # REPLACE THIS WITH YOUR DOMAIN
      service: next-service
      entryPoints:
        - web
      middlewares:
        - redirect-to-https

    # Next.js router (handles everything except API and WebSocket paths)
    next-router:
      rule: "Host(\`pangolin.example.com\`) && !PathPrefix(\`/api/v1\`)" # REPLACE THIS WITH YOUR DOMAIN
      service: next-service
      entryPoints:
        - websecure
      tls:
        certResolver: letsencrypt

    # API router (handles /api/v1 paths)
    api-router:
      rule: "Host(\`pangolin.example.com\`) && PathPrefix(\`/api/v1\`)" # REPLACE THIS WITH YOUR DOMAIN
      service: api-service
      entryPoints:
        - websecure
      tls:
        certResolver: letsencrypt

    # WebSocket router
    ws-router:
      rule: "Host(\`proxy.example.com\`)" # REPLACE THIS WITH YOUR DOMAIN
      service: api-service
      entryPoints:
        - websecure
      tls:
        certResolver: letsencrypt

  services:
    next-service:
      loadBalancer:
        servers:
          - url: "http://pangolin:3002" # Next.js server

    api-service:
      loadBalancer:
        servers:
          - url: "http://pangolin:3000" # API/WebSocket server
`}
        </CodeBlock>
    );
};

export default DynamicTraefikConfig;
