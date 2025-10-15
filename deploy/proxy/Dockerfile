# deploy/proxy/Dockerfile
FROM nginx:stable-alpine
COPY proxy/nginx.conf /etc/nginx/conf.d/default.conf
# certs will be mounted into /etc/nginx/certs
