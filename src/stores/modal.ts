import { defineStore } from "pinia";

export default defineStore("modal", {
    state: () => ({
        isOpen: false,
    }),
    getters: {
        hiddenClass(state) {  // every getter can have a state
            return !state.isOpen ? "hidden" : ""
        }
    }
})