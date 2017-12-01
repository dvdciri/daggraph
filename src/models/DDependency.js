function DDependency(n){
    this.name = n;
}

DDependency.prototype.addDependency = function (dependency) {
    if(!this.dependencies) this.dependencies = [];
    this.dependencies.push(dependency);
}

module.exports = DDependency;