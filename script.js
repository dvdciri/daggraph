let file = `
@Provides
@Singleton
public QmsService provideQmsService(QmsClient qmsClient, ConfigurationProvider configurationProvider) {
    return new QmsService(qmsClient, configurationProvider.getConfiguration().getQmsConfiguration().getQmsUrl());
}

@Provides
@Singleton
public ExampleReturn provideQmsService(ExampleParam exParam) {
    return new ExampleReturn(exParam);
}
`;

const fullDependencyRegex = /@\w+\s*(?:protected|public)?\s*(\w+(?:\.\w+))\s*provide\w+\s\(([^\)]*)\)/;
const paramRegex = /\s*(\w+)\s*\w+\s*,?\s*/;

let fullMatch;
while ((fullMatch = fullDependencyRegex.exec(file)) !== null) {
    file = file.replace(fullDependencyRegex, "");
    const returnType = fullMatch[1];
    let params = fullMatch[2];

    console.log("return: " + returnType);
    console.log("param list: " + params);

    let paramMatch;
    while ((paramMatch = paramRegex.exec(params)) !== null) {
        params = params.replace(paramRegex, "");
        console.log("paramType: " + paramMatch[1]);
    }
    console.log("-----------");
}