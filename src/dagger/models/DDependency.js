function DDependency(n){
    this.name = n;
}

DDependency.prototype.addDependency = function (dependency) {
    if(!this.dependencies) this.dependencies = [];
    this.dependencies.push(dependency);
}

DDependency.prototype.addInjectionPath = function (injectionPath) {
    if(!this.injectionPaths) this.injectionPaths = [];
    this.injectionPaths.push(injectionPath);
}

module.exports = DDependency;