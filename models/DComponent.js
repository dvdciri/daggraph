const FS = require('fs');
const Regularity = require('regularity');

function DComponent(){
    this.name = '';
    this.modules = [];
    this.injections = [];
}

DComponent.prototype.init = (filePath) =>{
    // Set file name
    this.name = getFilenameFromPath(filePath);
    // Load modules
    loadModules(filePath);
    // Load injections
    loadInjections(filePath);
};

function loadInjections(path){
    const file = FS.readFileSync(path, 'utf8');

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
}
  
function loadModules(path){
    // TODO: Impl
}

function getFilenameFromPath(path){
    return path.split("/").pop().split(".")[0];
}

module.exports = DComponent;