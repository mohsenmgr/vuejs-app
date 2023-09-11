import store from '@/store';

const DEFAULT_STATE = JSON.parse(JSON.stringify(store.state));
export function resetState() {
    console.log(JSON.stringify(DEFAULT_STATE));
    store.replaceState(JSON.parse(JSON.stringify(DEFAULT_STATE)));
}
