export function SET_WEIGHING(state, weightsArray) {
    function isEditNull(weight) {
        let childObj = weight['_links'];
        return !childObj['edit-weighing'];
    }

    if (weightsArray.length !== 0) {
        let result = weightsArray.find(isEditNull);
        if (result) result.disableEdit = true;
        state.weights = weightsArray;
    } else {
        state.weights = [];
    }
}

export function ADD_WEIGHT(state, weightObject) {
    state.weights.push(weightObject);
    state.weights.sort(function (a, b) {
        var dateA = new Date(a.day),
            dateB = new Date(b.day);
        return dateA - dateB;
    });
}

export function EDIT_WEIGHT(state, weightObject) {
    let index = weightObject.index;
    let newWeightObject = state.weights[index];

    newWeightObject.weight = weightObject.weight;
    newWeightObject.moment = weightObject.moment;
    //console.log('previous date: ' + newWeightObject.day);
    //console.log('new date: ' + weightObject.day);

    newWeightObject.day = weightObject.day;

    state.weights.sort(function (a, b) {
        var dateA = new Date(a.day),
            dateB = new Date(b.day);
        return dateA - dateB;
    });
}

export function DELETE_WEIGHT(state, weightObject) {
    let index = weightObject.index;
    state.weights.splice(index, 1);
}
