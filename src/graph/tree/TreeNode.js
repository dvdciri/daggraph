function TreeNode(n){
    this.name = n;
}

TreeNode.prototype.setSize = function(s) {
    this.size = s;
}

TreeNode.prototype.addChildren = function(c) {
    if(!this.children) this.children = [];
    this.children.push(c);
}

module.exports = TreeNode;