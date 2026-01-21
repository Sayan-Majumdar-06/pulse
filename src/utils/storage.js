export const loadState = () => {
    try {
        const indexedState = localStorage.getItem("pulse-stats");

        if(!indexedState) return undefined;

        return JSON.parse(indexedState);
    } catch(e) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const indexedState = JSON.stringify(state);

        localStorage.setItem("pulse-stats", indexedState);
    } catch(e) {
        //dummy block
    }
}