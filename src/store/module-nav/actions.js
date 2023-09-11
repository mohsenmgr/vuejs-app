export function setCurrentPage(context, currentPage) {
    context.commit('SET_PAGE', currentPage);
}

export function removeCurrentPage(context) {
    context.commit('REMOVE_PAGE');
}

export function removeAllHistory(context) {
    context.commit('REMOVE_ALL_HISTORY');
}

export function setNavWarning(context, warningStat) {
    context.commit('SET_NAV_WARNING', warningStat);
}

export function setSnackAlert(context, alertStat) {
    context.commit('SET_SNACK_ALERT', alertStat);
}
