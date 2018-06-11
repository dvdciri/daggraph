export default class LinkedNodes {
    links = [];
    nodes = [];

    addLink = (link) => {
        this.links.push(link);
    }

    addNode = (node) => {
        this.nodes.push(node);
    }

    containsNodeWithId = (id) => this.nodes.some(node => node.id === id);
};