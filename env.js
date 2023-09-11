/* jshint node: true, esversion: 9 */
/* jshint -W117 */
'use strict';

const env = Object.assign(
    {
        VUE_APP_BACKEND_URI: process.env.VUE_APP_BACKEND_URI,
        VUE_APP_DATAFOOD_URI: process.env.VUE_APP_DATAFOOD_URI,
        VUE_APP_IDENTITY_ACCESS_URI: process.env.VUE_APP_IDENTITY_ACCESS_URI,
    },
    window.env ? window.env : {}
);

export { env };
