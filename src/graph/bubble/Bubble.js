export default class Bubble {
    constructor(n) {
        this.name = n;
    }

    children = [];

    setSize = (s) => {
        this.size = s;
    }

    addChildren = (c) => {
        this.children.push(c);
    }
}