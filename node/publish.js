// During development, TypeScript source code is in a separate /lib directory,
// while compiled JavaScript output goes to /build/lib. But when creating an npm
// package, all the JavaScript files (and type definitions) need to be relative
// to the package root to enable direct module references. This script copies
// the built files to the root before publishing, then cleans them up afterward.

var shell = require("shelljs");

if (process.argv[2] === "prepublish") {
    prepublish();
} else if (process.argv[2] === "postpublish") {
    postpublish();
}

function prepublish() {
    // Explicitly copy readme.md from root to this current folder
    // so the npm publish can pick this up and include it in the package.
    shell.cp("-f", "../README.md", ".");
}

function postpublish() {
    shell.find("README.md").forEach(function(file) {
        shell.rm("-f", file);
    });
}
