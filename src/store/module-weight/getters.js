export function getWeights(state) {
    return state.weights;
}

export function getNewWeight(state) {
    return state.newWeight;
}

export function getDateExists(state) {
    return (date) =>
        state.weights.filter((item) => {
            return item.day === date;
        }).length;
}
