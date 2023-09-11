export function getUser(state) {
    return state.user;
}

export function isLoggedIn(state) {
    //console.log('inside function isLoggedIn');
    //console.log('state token: ' + !!state.token);
    return !!state.token;
}

export function authStatus(state) {
    return state.status;
}
