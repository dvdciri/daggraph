const FS = require('fs');
const Regularity = require('regularity');
const Utils = require('./../../utils/utils');

function DComponent(){
    this.modules = [];
    this.injections = [];
}

DComponent.prototype.init = function(path, allModules){
    const file = FS.readFileSync(path, 'utf8');
    
    this.name = Utils.getFilenameFromPath(path);
    this.injections = getInjections(file);
    this.modules = getModules(file, allModules);
};

function getModules(file, allModules){
    // Load modules
    var regularity = new Regularity();
    var modulesRegex = /(\w+)\.class,*/g;

    // For each module specified in the component, try to find it in the loaded modules
    var moduleMatches = file.match(modulesRegex);

    const result = []
    if(moduleMatches != null){
        moduleMatches.forEach(element => {
            while ((array = modulesRegex.exec(element)) !== null) {

                // If the model name in the component matches one of the modules that we have loaded, then add it to the component
                allModules.forEach(module => {
                    if (array[1] === module.name) {
                        result.push(module);
                    }
                });
            }
        });
    }
    return result;
}

function getInjections(file){
    var result = []; 

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
            result.push(injection);
        });
    }
    return result;
}

module.exports = DComponent;