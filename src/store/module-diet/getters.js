export function getDietPlan(state) {
    return state.weekDays;
}

export function getPatientFullName(state) {
    return state.patientName + ' ' + state.patientSurname;
}

export function getPatientName(state) {
    return state.patientName;
}

export function getTrialId(state) {
    return state.trialId;
}
