FROM caddy:2-alpine
WORKDIR /app
COPY index.html /app
COPY Caddyfile /etc/caddy
EXPOSE 8080
