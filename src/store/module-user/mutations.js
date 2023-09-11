export function auth_request(state) {
    state.status = 'loading';
}

export function auth_success(state, { token, user }) {
    state.status = 'success';
    state.token = token;

    //console.log('user is: ' + user);

    state.user = user;
}

export function auth_error(state) {
    state.status = 'error';
    state.token = '';
}

export function logout(state) {
    state.status = '';
    state.token = '';
}
