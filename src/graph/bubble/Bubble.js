function Bubble(n){
    this.name = n;
}

Bubble.prototype.setSize = function(s) {
    this.size = s;
}

Bubble.prototype.addChildren = function(c) {
    if(!this.children) this.children = [];
    this.children.push(c);
}

module.exports = Bubble;