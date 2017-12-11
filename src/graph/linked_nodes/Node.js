function Node(id){
    this.id = id;
}

Node.prototype.setGroup = function(g) {
    this.group = g;
}

module.exports = Node;