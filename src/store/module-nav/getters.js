export function getNavigationObject(state) {
    if (state.navModel) {
        let length = state.navModel.length;
        return state.navModel[length - 1];
    }

    return [];
}
