FROM caddy:2-alpine
WORKDIR /app
COPY index.html /app
COPY Caddyfile /etc/caddy
EXPOSE 80
EXPOSE 443/tcp
EXPOSE 443/udp
