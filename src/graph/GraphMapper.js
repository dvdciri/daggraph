/**
 * Use this class to map any dagger component to any kind of graph that we support.
 */
const Bubble = require('./bubble/Bubble')


/**
 * Converts some components into a Bubble graph structure
 */
function toBubbleGraph(components){
    console.log('\nGenerating bubble graph..')

    return new Promise((resolve, reject) => {
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

        resolve(mainBubble);
    });
}

exports.toBubbleGraph = toBubbleGraph;