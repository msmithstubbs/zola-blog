---
#layout: post
#title: Setting up a Cloudflare Tunnel for Shopify app development
#date: 2023-05-05 15:55 +1000
#categories: elixir cloudflare
---

Cloudflare offers a service called Tunnel. It does lots of secure, enterprisey things but you can also use it to connect a domain to your local development environment. You install a client, run it and specify the local port you want traffic to connect to. Cloudflare will assign a temporary domain (something like `abcd-1234.cfargotunnel.com`). When you open `https://abcd-1234.cfargotunnel.com` in your browser Cloudflare forwards the request to your local machine on the port you specify.

You need a Cloudflare account, and to install the `cloudflared` command line tool. This tool connects your local machine to the Cloudflare network.

## Quick tunnels

You then setup a temporary tunnel by running `cloudflared tunnel --url http://localhost:8080`

You'll get a response with a tunnel id:

```
> cloudflared tunnel --url http://localhost:8080
Use `cloudflared tunnel run` to start tunnel 8921403b-dd2f-1234-b2be-d29663710123
```

Run `cloudflared tunnel run <YOUR_TUNNEL_ID>` to start the connection. The tunnel URL will be the tunnel id from the previous command, followed by `cfargotunnel.com`. For example, the tunnel above would be accessible at `https://8921403b-dd2f-1234-b2be-d29663710123.cfargotunnel.com`. This is the URL you can use when creating Shopify webhooks, or configuring OAuth URLs for testing.

## Cloudflare tunnels with custom domains

You can also use your own domain by setting a CNAME record that maps to the tunnel subdomain. You can create a configuration file that maps requests from a domain to a local port.

The configuration goes in your `~/.cloudflared/config.yaml` on a Mac. The first two lines are the tunnel id and credentials file, followed by ingress rules. For example:

```
tunnel: 8921403b-dd2f-1234-b2be-d29663710123
credentials-file: /Users/matt/.cloudflared/8921403b-dd2f-1234-b2be-d29663710123.json

ingress:
  - hostname: test.batchbrew.app
    service: http://localhost:4000
  - service: http_status:404%
```

Then add a CNAME record for the domain:

![](/assets/img/cloudflare-tunnel.png)

