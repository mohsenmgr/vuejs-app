import axios from 'axios';
import { env } from '../../../env.js';

const IDENTITY_ACCESS_URI =
    env.VUE_APP_IDENTITY_ACCESS_URI || 'http://localhost:3001';

export function login(context, user) {
    const uri = IDENTITY_ACCESS_URI + '/patient/login';

    return new Promise((resolve, reject) => {
        context.commit('auth_request');
        axios({
            url: uri,
            data: user,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => {
                const token = resp.data.token;
                localStorage.setItem('token', token);
                // axios.defaults.headers.common['Authorization'] =
                //     'Bearer ' + token;
                axios.defaults.headers.common['Authorization'] = token
                    ? `Bearer ${token}`
                    : '';
                // this.$http.defaults.headers.common['Authorization'] =
                //     'Bearer ' + token;
                //console.log('action_login=>user: ' + user);
                context.commit('auth_success', { token, user });
                resolve(resp);
            })
            .catch((err) => {
                context.commit('auth_error');
                localStorage.removeItem('token');

                const { response } = err;
                const { ...errorObject } = response;
                let status = errorObject.status;
                reject(status);
            });
    });
}

export function logout(context) {
    return new Promise((resolve) => {
        context.commit('logout');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        resolve();
    });
}
