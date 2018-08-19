import FS from 'fs';
import { getFilenameFromPath } from './../../utils/utils';
import DModule from './DModule';

function getModules(file, allModules){
    // Find the modules in the components for java or kotlin
    var modulesRegex = /(\w+)(?:.|::)class,*/g; 

    // For each module specified in the component, try to find it in the loaded modules
    var moduleMatches = file.match(modulesRegex);

    const result = []
    if(moduleMatches != null){
        moduleMatches.forEach(element => {
            let array;
            while ((array = modulesRegex.exec(element)) !== null) {

                // If the model name in the component matches one of the modules that we have loaded, then add it to the component
                var loadedModule;
                allModules.forEach(m => {
                    if (array[1] === m.name) {
                        loadedModule = m;
                    }
                });
                // If we don't have the module loaded, check if is one of the special modules of dagger
                if (array[1] === "AndroidSupportInjectionModule"){
                    loadedModule = new DModule();
                    loadedModule.name = array[1];
                }

                if (loadedModule !== undefined){
                    result.push(loadedModule);
                }
            }
        });
    }
    return result;
}

function getInjections(file){
    var result = []; 

    // Find all the injections in this component for java or kotlin
    var injectionsRegex = /(?:void|fun)\s*inject\s*\((?:\w+:)?(?:\s*)?(\w*)/g;

    var matches = file.match(injectionsRegex);
    if (matches != null) {
        matches.forEach(element => {
            let array;
            while ((array = injectionsRegex.exec(element)) !== null) {
                result.push(array[1]);
            }
        });
    }
    return result;
}

export default class DComponent {
    modules = [];
    injections = [];

    init = (path, allModules) => {
        const file = FS.readFileSync(path, 'utf8');
        
        this.name = getFilenameFromPath(path);
        this.injections = getInjections(file);
        this.modules = getModules(file, allModules);
    };
};