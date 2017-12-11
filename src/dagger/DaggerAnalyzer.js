// Files
const FILE_HOUND = require('filehound');
const FILE_SNIFFER = require('filesniffer');
const FS = require('fs');
// Models
const DModule = require('./models/DModule.js');
const DComponent = require('./models/DComponent.js');

/**
 * Find and load the dagger components and modules
 * @param {*Path of the android project} projectRootPath 
 */
function findComponents(projectRootPath){
    return new Promise((resolve, reject) => {
        console.log('Analyzing dagger components and modules..');

        const searchCriteria = FILE_HOUND.create()
        .paths(projectRootPath)
        .discard("build")		
        .depth(20)
        .ignoreHiddenDirectories()
        .ignoreHiddenFiles()
        .ext(['.java', '.kt']);
    
        searchModules(searchCriteria)
        .then(modules => findAndAddInjections(modules, searchCriteria))
        .then(modules => searchComponents(modules, searchCriteria))
        .then(components => resolve(components))
        .catch(e => reject(e));
    });
}

function searchModules(searchCriteria){
    return new Promise((resolve, reject) => {
      const daggerModules = [];
      const fileSniffer = FILE_SNIFFER.create(searchCriteria);
  
      fileSniffer.on("match", (path) => {
        var module = new DModule();
        module.init(path);
        daggerModules.push(module);
      });
      fileSniffer.on("end", (files) => resolve(daggerModules));
      fileSniffer.on("error", reject);
      fileSniffer.find("@Module");
    });
  }
  
  function searchComponents(modules, searchCriteria){
    return new Promise((resolve, reject) => {
      const  daggerComponents = [];
      const fileSniffer = FILE_SNIFFER.create(searchCriteria);
  
      fileSniffer.on('match', (path) => {
        const component = new DComponent();
        component.init(path, modules);
        daggerComponents.push(component);
      });
      fileSniffer.on("end", (files) => resolve(daggerComponents));
      fileSniffer.on("error", reject);
      fileSniffer.find(/@Component|@Subcomponent/);
    });
  }

  function findAndAddInjections(modules, searchCriteria){
    return new Promise((resolve, reject) => {
        
        const injectionPathMap = [];
        const injectRegex = /@Inject(?:\n|.)*?\s+(?:protected|public)*\s*(\w*)/g;
        const fileSniffer = FILE_SNIFFER.create(searchCriteria);

        fileSniffer.on('match', (path) => {
          // Open file
          const file = FS.readFileSync(path, 'utf8');
          // Find injections
          while ((fullMatch = injectRegex.exec(file)) !== null) {
            // For each injections found, save the path in the array corresponding to the right dependency

            // If the array of paths for that dep is not initialised, init
            if (injectionPathMap[fullMatch[1]] === undefined) injectionPathMap[fullMatch[1]] = [];

            // If the path is not already in the list, add it
            if (!injectionPathMap[fullMatch[1]].includes(path)){
              injectionPathMap[fullMatch[1]].push(path);
            }
          }
        });
        fileSniffer.on("end", (files) => {
          addInjectionsToModules(injectionPathMap, modules);
          resolve(modules);
        });
        fileSniffer.on("error", reject);
        fileSniffer.find(/@Inject/i);

    });
  }

  function addInjectionsToModules(injectionPathMap, modules){
    modules.forEach(module => {
      module.dependencies.forEach(dep => {
        // If i have some injections for that dependency in the map, add them
        if(injectionPathMap[dep.name] !== undefined){
          injectionPathMap[dep.name].forEach(path => {
            dep.addInjectionPath(path);
          });
        }
      });
    });
  }

  exports.findComponents = findComponents;