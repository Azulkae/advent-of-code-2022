"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getInput_1 = __importDefault(require("../Helpers/getInput"));
const currentDay = 5;
const runParts = async () => {
    console.log("Running part 1");
    const result1 = await part1();
    console.log("Part 1 Result: ", result1);
    console.log("Running part 2");
    const result2 = await part2();
    console.log("Part 2 Result: ", result2);
};
const part1 = async () => {
    const data = await (0, getInput_1.default)(`./Day ${currentDay}/input.txt`);
    const containers = data.split("\n").slice(0, 9).map(container => Array.from(container));
    const moves = data.split("\n").slice(10).map(line => line.split(",")).map(line => line.map(Number));
    moves.forEach(move => {
        const [amount, start, end] = move;
        containers[end - 1] = [...containers[end - 1], ...(containers[start - 1].slice(-amount).reverse())];
        containers[start - 1] = containers[start - 1].slice(0, -amount);
    });
    return containers.map(result => result[result.length - 1] ?? " ").join("");
};
const part2 = async () => {
    const data = await (0, getInput_1.default)(`./Day ${currentDay}/input.txt`);
    const containers = data.split("\n").slice(0, 9).map(container => Array.from(container));
    const moves = data.split("\n").slice(10).map(line => line.split(",")).map(line => line.map(Number));
    moves.forEach(move => {
        const [amount, start, end] = move;
        containers[end - 1] = [...containers[end - 1], ...(containers[start - 1].slice(-amount))];
        containers[start - 1] = containers[start - 1].slice(0, -amount);
    });
    return containers.map(result => result[result.length - 1] ?? " ").join("");
};
runParts();
