#!/bin/sh

set -e

sed -e "s,#{NODE_ENV},$NODE_ENV,g" \
    -e "s,#{VUE_APP_BACKEND_URI},$VUE_APP_BACKEND_URI,g" \
    -e "s,#{VUE_APP_DATAFOOD_URI},$VUE_APP_DATAFOOD_URI,g" \
    -e "s,#{VUE_APP_IDENTITY_ACCESS_URI},$VUE_APP_IDENTITY_ACCESS_URI,g" \
    /inject.template.js > /usr/share/nginx/html/inject.js

sed -i -e 's,</head>,<script src="inject.js"></script></head>,g' /usr/share/nginx/html/index.html

exec "$@"
