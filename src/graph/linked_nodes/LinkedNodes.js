function LinkedNodes(){
    this.links = [];
    this.nodes = [];
}

LinkedNodes.prototype.addLink = function(link) {
    this.links.push(link);
}

LinkedNodes.prototype.addNode = function(node) {
    this.nodes.push(node);
}

LinkedNodes.prototype.containsNodeWithId = function(id) {
    return this.nodes.some(node => node.id === id);
}

module.exports = LinkedNodes;