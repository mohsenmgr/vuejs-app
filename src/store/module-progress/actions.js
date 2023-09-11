import axios from 'axios';

export async function getProgress({ commit, rootGetters }, dateObject) {
    let beginDate;
    let endDate;

    if (dateObject) {
        if (dateObject.beginDate && dateObject.endDate) {
            beginDate = dateObject.beginDate;
            endDate = dateObject.endDate;
        } else
            return Promise.reject(
                'moduleProgress:getProgress error => dateObject does not include beginDate and/or endDate.'
            );
    } else
        return Promise.reject(
            'moduleProgress:getProgress error => dateObject is null.'
        );

    let endPoint;

    let trialIdFromModuleDiet = rootGetters['moduleDiet/getTrialId'];
    if (!trialIdFromModuleDiet || trialIdFromModuleDiet === '')
        endPoint = '/progress/food-diary';
    else endPoint = '/progress/' + trialIdFromModuleDiet + '/food-diary';

    // axios returns a promise, which when it is resolved the resolved value is always the -
    // data response from the API.
    // Here I wrapped axios request inside my own Promise, this will ensure I can customize the resolve response -
    // with my own message => in this case SUCCESS. So when axios request is actually resolved, it will call my Own Promise resolve method.
    // On the UI side I can await this promise to be resolved then update the view.

    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: endPoint,
            params: { from: beginDate, to: endDate },
        })
            .then((response) => {
                commit('ADD_PROGRESS', response.data);
                resolve('SUCCESS');
            })
            .catch((err) => reject(err));
    });
}
