const FS = require('fs');
const Regularity = require('regularity');

function DComponent(){
    this.modules = [];
    this.injections = [];
}

DComponent.prototype.init = function(path){
    // Set file name
    this.name = getFilenameFromPath(path);

    const file = FS.readFileSync(path, 'utf8');
    
    // Load injections
    var regularity = new Regularity();
    var injectionsRegex = regularity
        .then("inject(")
        .oneOrMore("alphanumeric")
        .global()
        .multiline()
        .done();

    var matches = file.match(injectionsRegex);
    if (matches != null) {
        matches.forEach(element => {
            var injection = element.split('(')[1];
            this.injections.push(injection);
        });
    } else {
        console.log("Couldn't find any result for injection in file " + path);
    }

    // Load modules
    var regularity1 = new Regularity();
    var modulesRegex = regularity1
        .oneOrMore("alphanumeric")
        .then('Module')
        .then(".class")
        .maybe(',')
        .global()
        .multiline()
        .done();

    var moduleMatches = file.match(modulesRegex);
    if (moduleMatches != null) {
        moduleMatches.forEach(element => {
            var moduleName = element.split('.')[0];
            this.modules.push(moduleName);
        });
    } else {
        console.log("Couldn't find any result for injection in file " + path);
    }

    console.log(this);
};

function getFilenameFromPath(path){
    return path.split("/").pop().split(".")[0];
}

module.exports = DComponent;