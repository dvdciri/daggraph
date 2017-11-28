function DDependency(n){
    this.name = n;
    this.usages = [];
}

DDependency.prototype.addUsageClass = function (usageClassName) {
    this.usages.push(usageClassName);
}

module.exports = DDependency;