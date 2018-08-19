export default class DDependency {
    constructor(name) {
        this.name = name;
    }

    dependencies = [];
    injectionPaths = [];

    addDependency = (dependency) => {
        this.dependencies.push(dependency);
    }
    addInjectionPath = (injectionPath) => {
        this.injectionPaths.push(injectionPath);
    }

    addNamed = (n) => {
        this.named = n;
    }
};