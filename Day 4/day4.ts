import getInput from "../Helpers/getInput";

const currentDay = 4;

const runParts = async () => {
    console.log("Running part 1");
    const result1 = await part1();
    console.log("Part 1 Result: ", result1);
    
    console.log("Running part 2");
    const result2 = await part2();
    console.log("Part 2 Result: ", result2);
}

const toRange = (range: string) => {
    return [Number(range.split("-")[0]), Number(range.split("-")[1])];
}

const rangeContains = (range1: number[], range2: number[]) => {
    return range1[0] >= range2[0] && range1[1] >= range2[0] && range1[0] <= range2[1] && range1[1] <= range2[1]
}

const doOverlap = (range1: number[], range2: number[]) => {
    return !((range1[0] < range2[0] && range1[1] < range2[0]) || (range1[0] > range2[1] && range1[1] > range2[1]))
}

const part1 = async () => {
    const data = await getInput(`./Day ${currentDay}/input.txt`);
    const stringRanges = data.split("\n");
    const ranges = stringRanges.map(r => r.split(",")).map(r => [toRange(r[0]), toRange(r[1])]);

    var count = 0;

    for (var i = 0; i < ranges.length; i++) {
        const curRange = ranges[i];

        if (rangeContains(curRange[0], curRange[1]) || rangeContains(curRange[1], curRange[0])) {
            count++;
        }
    }

    return count;
}

const part2 = async () => {
    const data = await getInput(`./Day ${currentDay}/input.txt`);
    const stringRanges = data.split("\n");
    const ranges = stringRanges.map(r => r.split(",")).map(r => [toRange(r[0]), toRange(r[1])]);

    var count = 0;

    for (var i = 0; i < ranges.length; i++) {
        const curRange = ranges[i];

        if (doOverlap(curRange[0], curRange[1])) {
            count++;
        }
    }

    return count;
}

runParts();