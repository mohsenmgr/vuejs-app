import axios from 'axios';

export function getWeights(store) {
    let trialIdFromModuleDiet;
    if (store.rootGetters)
        trialIdFromModuleDiet = store.rootGetters['moduleDiet/getTrialId'];
    else if (store.state.moduleDiet.trialId)
        trialIdFromModuleDiet = store.state.moduleDiet.trialId;
    else return Promise.reject('Error: Can not SET trail ID');

    let endPoint;

    if (!trialIdFromModuleDiet || trialIdFromModuleDiet === '')
        endPoint = 'weighings';
    else endPoint = 'weighings/' + trialIdFromModuleDiet;

    return axios({
        method: 'get',
        url: endPoint,
    })
        .then((response) => {
            store.commit('SET_WEIGHING', response.data._embedded.item);
            return 'SUCCESS';
        })
        .catch((err) => {
            return Promise.reject(
                'MODULE WEIGHT:ACTIONS:getWeights ERROR => ' + err
            );
        });
}

export function addWeight(store, weightObj) {
    if (!weightObj || !weightObj.day)
        return Promise.reject('FAILURE: Null weight Object.');

    let trialIdFromModuleDiet;
    if (store.rootGetters)
        trialIdFromModuleDiet = store.rootGetters['moduleDiet/getTrialId'];
    else if (store.state.moduleDiet.trialId)
        trialIdFromModuleDiet = store.state.moduleDiet.trialId;
    else return Promise.reject('Error: Can not SET trail ID');

    let endPointAddress;
    if (!trialIdFromModuleDiet || trialIdFromModuleDiet === '')
        endPointAddress = '/weighing/';
    else endPointAddress = '/weighing/' + trialIdFromModuleDiet;

    return axios
        .post(endPointAddress, {
            day: weightObj.day,
            weight: Number(weightObj.weight),
            moment: weightObj.moment,
        })
        .then(() => {
            store.commit('ADD_WEIGHT', weightObj);
            return 'SUCCESS';
        })
        .catch((err) => {
            return Promise.reject(
                'MODULE WEIGHT:ACTIONS:addWeight ERROR => ' + err
            );
        });
}

export function editWeight(context, weightObj) {
    if (!weightObj) return Promise.reject('Error: Can not read Null weightObj');

    let endPointAddress;
    if (weightObj.link) endPointAddress = weightObj.link;
    else return Promise.reject('Error: Can not read Null weightObj.link');

    return axios
        .put(endPointAddress, {
            day: weightObj.day,
            weight: Number(weightObj.weight),
            moment: weightObj.moment,
        })
        .then(() => {
            context.commit('EDIT_WEIGHT', weightObj);
            return 'SUCCESS';
        })
        .catch((e) => {
            return Promise.reject(
                'MODULE WEIGHT:ACTIONS:editWeight ERROR => ' + e
            );
        });
}

export function deleteWeight(context, weightObj) {
    if (!weightObj || !weightObj.link)
        return Promise.reject('Error: Can not read Null weightObj');

    //console.log(weightObj.link.replace('http://localhost:4000', ''));

    let endPointAddress = weightObj.link;

    return axios
        .delete(endPointAddress)
        .then(() => {
            context.commit('DELETE_WEIGHT', weightObj);
            return 'SUCCESS';
        })
        .catch((e) => {
            console.log('moduleWeight:actions error => ' + e);
            return Promise.reject(
                'moduleWeight:actions:deleteWeight ERROR => ' + e
            );
        });
}

// add weight /weighing/2021-09-06/
// {"weight":78435,"moment":"after-breakfast"}
