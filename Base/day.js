"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getInput_1 = __importDefault(require("../Helpers/getInput"));
const currentDay = -1;
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
};
const part2 = async () => {
    const data = await (0, getInput_1.default)(`./Day ${currentDay}/input.txt`);
};
runParts();
