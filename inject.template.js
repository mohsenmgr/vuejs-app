(function () {
    'use strict';
    window.env = {
        NODE_ENV: '#{NODE_ENV}',
        VUE_APP_BACKEND_URI: '#{VUE_APP_BACKEND_URI}',
        VUE_APP_DATAFOOD_URI: '#{VUE_APP_DATAFOOD_URI}',
        VUE_APP_IDENTITY_ACCESS_URI: '#{VUE_APP_IDENTITY_ACCESS_URI}',
    };
})();
