/**
 * Use this class to map any dagger component to any kind of graph that we support.
 */
const Bubble = require('./bubble/Bubble')
const TreeNode = require('./tree/TreeNode')


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

exports.toBubbleGraph = toBubbleGraph;
exports.toTreeGraph = toTreeGraph;