class Player {
    constructor(name, team, role) {
        this.name = name;
        this.team = team;
        this.role = role
    }
}

const Teams = Object.freeze({
    RED: {
        left: "BLUE",
        right: "NONE",
        name: "RED"
    },
    BLUE: {
        left: "NONE",
        right: "RED",
        name: "BLUE"
    },
    NONE: {
        left: "RED",
        right: "BLUE",
        name: "NONE"
    }
})

export {Teams as Teams};
export default Player;
