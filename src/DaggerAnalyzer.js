// Files
const FILE_HOUND = require('filehound');
const FILE_SNIFFER = require('filesniffer');
// Models
const DModule = require('./models/DModule.js');
const DComponent = require('./models/DComponent.js');

/**
 * Find and load the dagger components and modules
 * @param {*Path of the android project} projectRootPath 
 */
function getComponents(projectRootPath){
    return new Promise((resolve, reject) => {
        const searchCriteria = FILE_HOUND.create()
        .paths(projectRootPath)
        .discard("build")		
        .depth(20)
        .ignoreHiddenDirectories()
        .ignoreHiddenFiles()
        .ext('java');
    
        searchModules(searchCriteria)
        .then(modules => searchComponents(modules, searchCriteria))
        .then(components => resolve(components))
        .catch(e => reject);
    });
}

function searchModules(searchCriteria){
    return new Promise((resolve, reject) => {
      console.log("\nLoading modules..");
  
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
      console.log("\nLoading components..");
  
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

  exports.getComponents = getComponents;