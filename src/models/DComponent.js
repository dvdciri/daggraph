const FS = require('fs');
const Regularity = require('regularity');
const Utils = require('./../utils/utils');

function DComponent(){
    this.modules = [];
    this.injections = [];
}

DComponent.prototype.init = function(path){
    // Set file name
    this.name = Utils.getFilenameFromPath(path);

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
    }
};

module.exports = DComponent;