function DDependency(n){
    this.name = n;
    this.dependencies = [];
}

DDependency.prototype.addDependency = function (dependency) {
    this.dependencies.push(dependency);
}

module.exports = DDependency;