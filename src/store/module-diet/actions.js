import axios from 'axios';

export async function getDietPlan({ commit }) {
    let res = new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: 'diet-plan',
        })
            .then((response) => {
                commit('SET_DIET_PLAN', response.data);
                resolve('SUCCESS');
            })
            .catch((err) =>
                reject('moduleDiet:actions:getDietPlan Error => ' + err)
            );
    });

    return res;
}
