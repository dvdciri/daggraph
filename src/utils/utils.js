#!/usr/bin/env node
'use strict';

const fs = require('fs');

// Main code //
const self = module.exports = {
	getFilenameFromPath: (path) => {
		return path.split("/").pop().split(".")[0];
	},
	isModule: (fileContent) => {
		return fileContent.match(new RegExp("@Module"));
	},
	isComponent: (fileContent) => {
		return fileContent.match(new RegExp("@Component"));
	},
	isInjectingDependencies: (fileContent) => {
		return fileContent.match(new RegExp("@Inject"));
	}
};
