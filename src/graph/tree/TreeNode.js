export default class TreeNode {
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