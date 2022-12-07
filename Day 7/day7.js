"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getInput_1 = __importDefault(require("../Helpers/getInput"));
const currentDay = 7;
const runParts = async () => {
    console.log("Running part 1");
    const result1 = await part1();
    console.log("Part 1 Result: ", result1);
    console.log("Running part 2");
    const result2 = await part2();
    console.log("Part 2 Result: ", result2);
};
const getSumOfDirsSizes = (dir, limit) => {
    return ((dir.size <= limit) ? dir.size : 0) + dir.contains.map(d => d.dir ? getSumOfDirsSizes(d, limit) : 0).reduce((a, b) => a + b, 0);
};
const part1 = async () => {
    const data = await (0, getInput_1.default)(`./Day ${currentDay}/input.txt`);
    const commands = data.split("\n");
    const start = { name: "/", dir: true, size: 0, contains: [], parent: null };
    var currentDir = start;
    for (var i = 0; i < commands.length; i++) {
        const command = commands[i];
        if (command.startsWith("$ ls")) {
            continue;
        }
        if (command.startsWith("$ cd /")) {
            currentDir = start;
            continue;
        }
        ;
        if (command.startsWith("$ cd ..")) {
            currentDir = currentDir.parent;
            continue;
        }
        ;
        if (command.startsWith("$ cd ")) {
            const dirName = command.slice(5);
            var dir = currentDir.contains.filter(d => d.name === dirName)[0];
            if (!dir) {
                dir = { name: dirName, contains: [], size: 0, dir: true, parent: currentDir };
                currentDir.contains = [...currentDir.contains, dir];
            }
            currentDir = dir;
            continue;
        }
        ;
        var [fileSize, fileName] = command.split(" ");
        if (fileSize === 'dir') {
            continue;
        }
        if (!currentDir.contains.some(f => f.name === fileName)) {
            currentDir.contains = [...currentDir.contains, { dir: false, name: fileName, size: Number(fileSize), parent: currentDir, contains: [] }];
            var parentChain = currentDir;
            while (parentChain != null) {
                parentChain.size = parentChain.size + Number(fileSize);
                parentChain = parentChain.parent;
            }
        }
    }
    return getSumOfDirsSizes(start, 100000);
};
const smallestDirLargerThanSize = (dir, size) => {
    const dirs = dir.contains.filter(d => d.dir && d.size >= size);
    if (dirs.length === 0) {
        return dir;
    }
    const smallestDirs = dirs.map(d => smallestDirLargerThanSize(d, size));
    smallestDirs.sort((d1, d2) => d1.size - d2.size);
    console.log(smallestDirs.map(d => d.size));
    return (smallestDirs[0]);
};
const part2 = async () => {
    const data = await (0, getInput_1.default)(`./Day ${currentDay}/input.txt`);
    const commands = data.split("\n");
    const start = { name: "/", dir: true, size: 0, contains: [], parent: null };
    var currentDir = start;
    for (var i = 0; i < commands.length; i++) {
        const command = commands[i];
        if (command.startsWith("$ ls")) {
            continue;
        }
        if (command.startsWith("$ cd /")) {
            currentDir = start;
            continue;
        }
        ;
        if (command.startsWith("$ cd ..")) {
            currentDir = currentDir.parent;
            continue;
        }
        ;
        if (command.startsWith("$ cd ")) {
            const dirName = command.slice(5);
            var dir = currentDir.contains.filter(d => d.name === dirName)[0];
            if (!dir) {
                dir = { name: dirName, contains: [], size: 0, dir: true, parent: currentDir };
                currentDir.contains = [...currentDir.contains, dir];
            }
            currentDir = dir;
            continue;
        }
        ;
        var [fileSize, fileName] = command.split(" ");
        if (fileSize === 'dir') {
            continue;
        }
        if (!currentDir.contains.some(f => f.name === fileName)) {
            currentDir.contains = [...currentDir.contains, { dir: false, name: fileName, size: Number(fileSize), parent: currentDir, contains: [] }];
            var parentChain = currentDir;
            while (parentChain != null) {
                parentChain.size = parentChain.size + Number(fileSize);
                parentChain = parentChain.parent;
            }
        }
    }
    return smallestDirLargerThanSize(start, start.size - 40000000)?.size;
};
runParts();
