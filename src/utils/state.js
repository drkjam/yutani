'use strict'

class State {
    //  A simple class for representing and managing state transitions.
    constructor(states, initial_state) {
        this.states = states
        this.current = initial_state
    }

    transition(new_state) {
        if (this.states.hasOwnProperty(new_state)) {
            let next_states = this.states[this.current]
            if (next_states.indexOf(new_state) !== -1) {
                this.current = new_state
                console.log("state transition: " + this.current)
            }
        }
    }
}
