const FS = require('fs');
const Regularity = require('regularity');

function DComponent(){
    this.modules = [];
    this.injections = [];
}

DComponent.prototype.init = (filePath) =>{
    // Set file name
    this.name = getFilenameFromPath(filePath);
    // Load modules
    this.injections = getInjections(filePath);
    // Load injections
    this.modules = getModules(filePath);
};

function getInjections(path){
    const file = FS.readFileSync(path, 'utf8');
    var result = [];

    var regularity = new Regularity();
    var injectionsRegex = regularity
        .then("inject(")
        .oneOrMore("alphanumeric")
        .global()
        .multiline()
        .done();

    var result = file.match(injectionsRegex);
    if (result != null) {
        result.forEach(element => {
            var injection = element.split('(')[1];
            result.push(injection);
        });
    } else {
        console.log("Couldn't find any result for injection in file " + path);
    }
    return result;
}
  
function getModules(path){
    return [];
}

function getFilenameFromPath(path){
    return path.split("/").pop().split(".")[0];
}

module.exports = DComponent;