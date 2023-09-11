export function SET_PAGE(state, currentPage) {
    state.navModel.push(currentPage);
}

export function REMOVE_PAGE(state) {
    state.navModel.pop();
}

export function REMOVE_ALL_HISTORY(state) {
    state.navModel = [];
}

export function SET_NAV_WARNING(state, warning) {
    let length = state.navModel.length;
    if (length != 0) {
        let currentNav = state.navModel[length - 1];
        currentNav.navWarning = warning;
    }
}

export function SET_SNACK_ALERT(state, snackAlert) {
    let length = state.navModel.length;
    if (length != 0) {
        let currentNav = state.navModel[length - 1];
        currentNav.snackAlert = snackAlert;
    }
}
