#!/usr/bin/env node
'use strict';

const fs = require('fs');

// Main code //
const self = module.exports = {
	getFilenameFromPath: (path) => {
		return path.split("/").pop().split(".")[0];
	},
	getDefaultSearchCriteria: (rootPath) => {
		return FileHound.create()
		.paths(rootPath)
		// .discard("*build/*")		
		.depth(20)
		.ignoreHiddenDirectories()
		.ignoreHiddenFiles()		
		.ext('java');
	}
};
