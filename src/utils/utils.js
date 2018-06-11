import fs from 'fs';

// Main code //
export const getFilenameFromPath = path => path.split("/").pop().split(".")[0];
