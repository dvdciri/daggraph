#!/usr/bin/env node
'use strict';

const fs = require('fs');

// Main code //
const self = module.exports = {
	getFilenameFromPath: (path) => {
		return path.split("/").pop().split(".")[0];
	}
};
