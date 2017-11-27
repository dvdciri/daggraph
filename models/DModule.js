function DModule(name){
    this.name = name;
    this.providedDependencies = [];
}

DModule.prototype.setScope = function(scope) {
	this.scope = scope;
}

DModule.prototype.addDependency = function(scope) {
	this.providedDependencies.push(scope);
}

module.exports = DModule;