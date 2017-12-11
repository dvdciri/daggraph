/**
 * Use this class to map any dagger component to any kind of graph that we support.
 */
const Bubble = require('./bubble/Bubble')
const TreeNode = require('./tree/TreeNode')
const Link = require('./linked_nodes/Link')
const Node = require('./linked_nodes/Node')
const LinkedNodes = require('./linked_nodes/LinkedNodes')


/**
 * Converts components into a Bubble graph structure
 */
function toBubbleGraph(components){
    const mainBubble = new Bubble("Dependencies");

    components.map((component) => {
        const componentBubble = new Bubble(component.name);

        component.modules.map((module) => {
            const moduleBubble = new Bubble(module.name);

            module.dependencies.map((dependency) => {
                const dependencyBubble = new Bubble(dependency.name);

                // Set size in relation of the dependencies needed for that dependency
                let bubbleSize = 1;
                if (dependency.dependencies){
                    bubbleSize += dependency.dependencies.length;
                }
                dependencyBubble.setSize(bubbleSize);

                moduleBubble.addChildren(dependencyBubble);
            });

            componentBubble.addChildren(moduleBubble);
        });

        mainBubble.addChildren(componentBubble);
    });
    return mainBubble;
}

/**
 * Converts components into a Tree graph structure
 */
function toTreeGraph(components){
    const mainNode = new TreeNode("Dependencies");

    components.map((component) => {
        const componentNode = new TreeNode(component.name);

        component.modules.map((module) => {
            const moduleNode = new TreeNode(module.name);

            module.dependencies.map((dependency) => {
                const dependencyNode = new TreeNode(dependency.name);
                moduleNode.addChildren(dependencyNode);
            });

            componentNode.addChildren(moduleNode);
        });

        mainNode.addChildren(componentNode);
    });
    return mainNode;
}

function toLinkedNodes(components) {
    const linkedNodes = new LinkedNodes();
    var componentGroup = 1;
    var moduleGroup = 2;
    var dependencyGroup = 3;

    components.forEach(component => {
         // For each components add one node
         const componentNode = new Node(component.name);
         componentNode.setGroup(componentGroup);
         linkedNodes.addNode(componentNode);
 
         // For each module add one node and one link to the component
         component.modules.forEach(module => {
            // Add the module node if is not already there
            if (!linkedNodes.containsNodeWithId(module.name)){
                const moduleNode = new Node(module.name);
                moduleNode.setGroup(moduleGroup);
                linkedNodes.addNode(moduleNode);
            }

            // Create the component-module link (always)
            const componentModuleLink = new Link(component.name, module.name);
            linkedNodes.addLink(componentModuleLink);

            // For each dependency add one node and one link to the module
            module.dependencies.forEach(dep => {
                // Add the module node if is not already there
                if (!linkedNodes.containsNodeWithId(dep.name)){
                    const depNode = new Node(dep.name);
                    depNode.setGroup(dependencyGroup);
                    linkedNodes.addNode(depNode);
                }

                // Create the module-dependency link
                const moduleDepLink = new Link(module.name, dep.name);
                linkedNodes.addLink(moduleDepLink);
            });
         });
    }); 
    return linkedNodes;
}

exports.toBubbleGraph = toBubbleGraph;
exports.toTreeGraph = toTreeGraph;
exports.toLinkedNodes = toLinkedNodes;